import { useEffect, useState } from "react";
import {  SearchInputMultiple } from "../../../components";
import { useUserData } from "../../../context";
import Checkbox from "../../../components/VectorFLOW/commons/MTO/Checkbox";
import { selectAllWrapper,
  sectionContainer,
  sectionTitle,
  selectContainer,
  label,
  grid, titleContainer } from "./style.css";


const PermissionForm = ({
  currentAppAllPermissions,
  selectedPermissions,
  setSelectedPermissions,
  selectedApplication,
  readOnly = false,
}: any) => {


  // Dynamic State
  const [permissionTypes, setPermissionTypes] = useState<string[]>([]);
  
  // Stores all raw nodes for filtering: key = permissionType
  const [allNodes, setAllNodes] = useState<Record<string, { L1: string[], L2: string[], L3: string[] }>>({});
  
  // Stores options for dropdowns: key = permissionType
  const [options, setOptions] = useState<Record<string, { L1: any[], L2: any[], L3: any[] }>>({});
  const {user} = useUserData();
  const inherited_access = user.config_data?.INHERITED_ACCESS
  const isInheritedOn = inherited_access === "1"

  useEffect(() => {
    if (!currentAppAllPermissions) return;

    const types = Object.keys(currentAppAllPermissions).filter(
      (key) => key.endsWith("_permission") && typeof currentAppAllPermissions[key] === "object" && !Array.isArray(currentAppAllPermissions[key])
    );
    setPermissionTypes(types);

    const parsedNodes: Record<string, { L1: string[], L2: string[], L3: string[] }> = {};

    types.forEach(type => {
      const pData = currentAppAllPermissions[type];
      const prefix = type.split('_')[0];

      const idKey = `${type}_permission_ids`;
      const fallbackIdKey = `${type.replace("_permission", "")}_permission_ids`;
      const permissionIds = currentAppAllPermissions[idKey] || currentAppAllPermissions[fallbackIdKey] || [];

      //h_id 
      const hasHId = (level: number, l1: string, l2?: string, l3?: string) => {
        return permissionIds.some((p: any) => {
          const h1 = p[`${prefix}_hierarchy_1`] || p.hierarchy_1;
          const h2 = p[`${prefix}_hierarchy_2`] || p.hierarchy_2;
          const h3 = p[`${prefix}_hierarchy_3`] || p.hierarchy_3;

          if (level === 1) {
            return h1 === l1 && (!h2 || h2 === "") && (!h3 || h3 === "") && p.h_id;
          }
          if (level === 2) {
            return h1 === l1 && h2 === l2 && (!h3 || h3 === "") && p.h_id;
          }
          if (level === 3) {
            return h1 === l1 && h2 === l2 && h3 === l3 && p.h_id;
          }
          return false;
        });
      };

      let l1Keys = Object.keys(pData);
    
      l1Keys = l1Keys.filter(l1 => {
        const isHIdPresent = hasHId(1, l1);
        const hasChildren = Object.keys(pData[l1] || {}).length > 0;
            
        // no h_id → always remove
        if (!isHIdPresent) {
          return false;
        }
      
        // h_id + children + inherited_acess → keep 
        // h_id + children + !inherited_acess → keep
        if (hasChildren) {
          return true;
        }
      
        // h_id + no children + inherited_acess → keep
        if (!hasChildren && isInheritedOn) {
          return true;
        }
      
        // h_id + no chidlren + no inherited_acess --> remove
        if (isHIdPresent && !hasChildren && !isInheritedOn) {
          return false;
        }
      

        // h_id + no children + OFF → remove
        return false;
      });

      const l2Keys: string[] = [];
      const l3Keys: string[] = [];

      l1Keys.forEach(l1 => {
        const l2Obj = pData[l1];
        if (l2Obj) {
          let l2List = Object.keys(l2Obj);

        l2List = l2List.filter(l2 => {
          const isHIdPresent = hasHId(2, l1, l2);
          const hasChildren = (l2Obj[l2] || []).length > 0;
                
          // no h_id → always remove
          if (!isHIdPresent) {
            return false;
          }
        
          // h_id + children + ON → keep
          // h_id + children + OFF → keep
          if (hasChildren) {
            return true;
          }
        
          // h_id + no children + ON → keep
          if (!hasChildren && isInheritedOn) {
            return true;
          }
        
           //h_id+no chidlren + no inherited_acess --> remove
            if (isHIdPresent && !hasChildren && !isInheritedOn) {
          return false;
          }
          
          // h_id + no children + OFF → remove
          return false;
        });
          
          l2List.forEach(l2 => {
            l2Keys.push(`${l1}>${l2}`);

            const l3Array = l2Obj[l2];
            if (Array.isArray(l3Array)) {
              l3Array.forEach((entry: any) => {
                let l3Val = entry;
                if (typeof entry === "object") {
                  const candidateKeys = [
                    `${prefix}_hierarchy_3`,
                    "hierarchy_3"
                  ];
                  const foundKey = Object.keys(entry).find(k => candidateKeys.includes(k)) || Object.keys(entry)[0];
                  l3Val = entry[foundKey];
                }

                if (l3Val !== undefined && l3Val !== null) {
                  const hasL3HId = hasHId(3, l1, l2, l3Val);
                  if (!hasL3HId) { //if no h_id - remove
                    return;
                  }

                  const l3Key = l3Val === ""
                    ? `${l1}>${l2}>`
                    : `${l1}>${l2}>${l3Val}`;
                  l3Keys.push(l3Key);
                }
              });
            }
          });
        }
      });
      parsedNodes[type] = { L1: l1Keys, L2: l2Keys, L3: l3Keys };
    });

    setAllNodes(parsedNodes);
  }, [currentAppAllPermissions]);

  // Effect to update Options based on Selections
  useEffect(() => {
    if (!selectedApplication || !permissionTypes.length) return;

    const newOptions: Record<string, { L1: any[], L2: any[], L3: any[] }> = {};

    permissionTypes.forEach(type => {
      const nodes = allNodes[type];
      if (!nodes) return;

      const currentPerms = selectedPermissions[selectedApplication]?.[type] || [];
      
      // Get IDs for IA check
      const idKey = `${type}_permission_ids`;
      const fallbackIdKey = `${type.replace("_permission", "")}_permission_ids`;
      const permissionIds = currentAppAllPermissions[idKey] || currentAppAllPermissions[fallbackIdKey] || [];

      const checkIsIA = (level: number, parentKey: string, key: string) => {
           // L1: hierarchy_1 == key, !hierarchy_2
           // L2: hierarchy_1 == parentKey, hierarchy_2 == key, !hierarchy_3
           const prefix = type.split('_')[0];
           return permissionIds.some((p: any) => {
               if (level === 0) {
                   const h1 = p[`${prefix}_hierarchy_1`] || p.hierarchy_1;
                   const h2 = p[`${prefix}_hierarchy_2`] || p.hierarchy_2;
                   return h1 === key && (!h2 || h2 === "") && p.isActive;
               } 
               if (level === 1) {
                   const h1 = p[`${prefix}_hierarchy_1`] || p.hierarchy_1;
                   const h2 = p[`${prefix}_hierarchy_2`] || p.hierarchy_2;
                   const h3 = p[`${prefix}_hierarchy_3`] || p.hierarchy_3;
                   return h1 === parentKey && h2 === key && (!h3 || h3 === "") && p.isActive;
               }
               return false;
           });
      }

      // L1 Options: Include L1 Items AND L0 IA nodes
      const l1Opts: any[] = [];
      nodes.L1.forEach(k => {
          l1Opts.push({ label: k, value: k });
          // Check for L0 IA Node
          if (checkIsIA(0, "", k)) {
               // Value is now prime suffixed key: "ZoneA'"
               l1Opts.push({ label: `${k}'`, value: `${k}'` });
          }
      });
      
      // L2 Options: Filter based on Selected L1
      // We only care about standard L1 selections (e.g., ZoneA) for expansion.
      // ZoneA' (IA) does not expand.
      const selectedL1Keys = Array.from(new Set(currentPerms
        .filter((e: any) => e.length >= 1 && !e[0].endsWith("'"))
        .map((e: any) => e[0])));
      
      const l2Opts: any[] = [];
      // 1. Add standard children
      nodes.L2
        .filter(l2 => selectedL1Keys.some((selL1: any) => selL1 === l2.split('>')[0]))
        .forEach(l2 => {
            l2Opts.push({ label: l2, value: l2 });
            
            // 2. Add L1 IA nodes for these children
            // l2 is "ZoneA>GroupB"
            const [p, c] = l2.split('>');
            if (checkIsIA(1, p, c)) {
                 // Value: "ZoneA>GroupB'"
                 l2Opts.push({ label: `${l2}'`, value: `${l2}'` });
            }
        });
        
      // L3 Options: Filter based on Selected L2
      // We only care about standard L2 selections.
      const selectedL2Keys = Array.from(new Set(currentPerms
        .filter((e: any) => e.length >= 2 && !e[1].endsWith("'") && !(e.length === 3 && e[2] === 'isActive')) // Clean up old isActive logic if present, but mainly check prime
        .map((e: any) => `${e[0]}>${e[1]}`)));
      
      const l3Opts: any[] = [];
      
      // 1. Standard Children
      nodes.L3
        .filter(l3 => selectedL2Keys.some((selL2: any) => selL2 === l3.split('>').slice(0, 2).join('>')))
        .forEach(l3 => {
             const label = l3.endsWith('>') && l3.split('>').length === 3 && l3.split('>')[2] === '' 
                ? l3.slice(0, -1) + '> ' 
                : l3;
             l3Opts.push({ label: label, value: l3 });
        });

      newOptions[type] = { L1: l1Opts, L2: l2Opts, L3: l3Opts };
    });

    setOptions(newOptions);

  }, [allNodes, selectedPermissions, selectedApplication, permissionTypes, currentAppAllPermissions]);

  const getUniqueObjects=(arr:any, key:any)=> {
    const seen = new Set();
    return arr.filter((item: any) => {
      const val = item[key];
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  }
  
  const getSelectedPermissions = ({
    selectedPermissions,
    selectedApplication,
    permissionType,
    level,
  }: any) => {
    const currentPermissions =
      (selectedPermissions && selectedPermissions?.[selectedApplication]) || {};

    const permissionSet = currentPermissions?.[permissionType] || [];

    let val: { value: string; label: string }[] = [];

    if (level === 0) {
      val = permissionSet
        .filter((e: any) => e.length >= 1)
        .map((e: any) => {
             // Level 0 Dropdown: Show L1 Items AND L0 IA nodes
             
             // Case 1: L0 IA Node ("ZoneA'")
             // It will be stored as ["ZoneA'"] (Length 1)
             // Check if it ends with prime
             if (e.length === 1 && e[0].endsWith("'")) {
                 return { value: e[0], label: e[0] };
             }
             
             // Case 2: Standard L1 Item ("ZoneA")
             // It will be stored as ["ZoneA"] (Length 1)
             return { value: e[0], label: e[0] };
        })
        .filter((e: any) => e !== null);
    }

    if (level === 1) {
      val = permissionSet
        .filter((e: any) => e.length >= 2)
        .map((e: any) => {
           // Level 1: Show L2 Items AND L1 IA nodes
           
           // Filter out L0 IA nodes (already handled in L0)
           // If permission is ["ZoneA'"] it waits in Level 0. Not here.
           // Here we see length >= 2.
           
           // Case 1: L1 IA Node ("ZoneA>GroupB'")
           // Stored as ["ZoneA", "GroupB'"]
           if (e.length === 2 && e[1].endsWith("'")) {
               return { value: `${e[0]}>${e[1]}`, label: `${e[0]}>${e[1]}` };
           }

           // Case 2: Standard L2 Item ("ZoneA>GroupB")
           const joined = e.slice(0, 2).join(">");
           return { value: joined, label: joined };
        })
        .filter((e: any) => e !== null);
    }

    if (level === 2) {
      val = permissionSet
        .filter((e: any) => e.length >= 3)
        .map((e: any) => {
          // Level 2: Show L3 Items
          
          // Filter out L1 IA nodes (length 2).
          
          // Note: Standard L3 items are length 3.
          const joined = e.slice(0, 3).join(">");
          // Handle empty third level values
          const displayLabel = e[2] === "" 
            ? `${e[0]}>${e[1]}>` 
            : joined;
          return { value: joined, label: displayLabel };
        })
        .filter((e: any) => e !== null);
    }

    return getUniqueObjects(val, "value");
  };

  const updateSelectedPermissions = ({
    val,
    selectedPermissions,
    selectedApplication,
    permissionType,
    level,
  }: any) => {
    if (!val || !Array.isArray(val)) return;

    // Extract the `value` property from each object in `val`
    const values = val.map((item: any) => item.value);

    const prevPerms =
      selectedPermissions?.[selectedApplication]?.[permissionType] || [];

    const selectPermissions = Array.isArray(prevPerms) ? prevPerms : [];

    let newPerm: any[] = [];

    if (level === 0) {
      // Update L0 Items (ZoneA) AND L0 IA Nodes (ZoneA')
      
      // Existing L0 Selections (Standard & IA)
      // Both are length 1.
      const existingLevel0Values = Array.from(
        new Set(selectPermissions.map((perm: any) => perm[0]))
      );
      
      const permissionsToKeep = selectPermissions.filter((perm: any) => {
        // Keep if involved in current selection
        // OR if it's deeper level (length > 1) and its parent is NOT involved in current interaction?
        
        // Wait. `values` contains ALL selected itmes for this dropdown.
        // If "ZoneA" is unchecked, it won't be in `values`.
        // If "ZoneA'" is unchecked, it won't be in `values`.
        
        // Check if this permission's L0 component is in `values`.
        if (perm.length === 1) {
            return values.includes(perm[0]);
        }
        
        // For deeper permissions (children of ZoneA), we only keep them if their parent ZoneA is still "selected" implicitly?
        // Actually, if ZoneA is unchecked in UI, we remove all children.
        // But ZoneA is unchecked effectively if it is NOT in values.
        // However, `values` only contains items visible in dropdown.
        // If ZoneA is visible, and unselected -> Remove children.
        // If ZoneA is hidden (not possible for L0), then keep.
        
        // But for L0, all L0 items are visible.
        // So if `perm[0]` is not in `values`, passing.
        
        // EXCEPT: ZoneA' (IA) logic.
        // ZoneA' is distinct. Unchecking ZoneA' should remove ZoneA'.
        // Unchecking ZoneA should remove ZoneA children.
        
        // Logic:
        // `values` contains "ZoneA" and "ZoneA'".
        
        // If `perm` is ["ZoneA'"] (Length 1, endsWith '):
        // It must be in `values`.
        if (perm.length === 1 && perm[0].endsWith("'")) {
            return values.includes(perm[0]);
        }
        
        // If `perm` starts with "ZoneA" (Standard):
        // It must carry the semantic of "ZoneA parent selected".
        // `values` must include "ZoneA".
        if (perm[0].endsWith("'") === false) {
             return values.includes(perm[0]);
        }
        
        return false;
      });
      
      const newLevel0Permissions = values
        .filter((value: string) => !existingLevel0Values.includes(value))
        .map((value: string) => [value]); // Pure L0 or L0'
      
      newPerm = [...permissionsToKeep, ...newLevel0Permissions];
    }

    if (level === 1) {
      // Update L1 Items (ZoneA>GroupB) AND L1 IA nodes (ZoneA>GroupB')
      
      const valMap = values; 

      // Identifying visible items in THIS dropdown
      const existingVisibleCombinations = selectPermissions
        .filter((perm: any) => {
             // Exclude L0 IA (Length 1, endsWith ')
             if (perm.length === 1 && perm[0].endsWith("'")) return false;
             
             // Include L1 IA (Length 2, endsWith ')
             if (perm.length === 2 && perm[1].endsWith("'")) return true;
             
             // Include L1 Standard (Length >= 2, no ')
             // Note: Standard items don't have ' in path parts usually.
             if (perm.length >= 2 && !perm[1].endsWith("'")) return true;
             
             return false;
        })
        .map((perm: any) => `${perm[0]}>${perm[1]}`);
      
      const permissionsToKeep = selectPermissions.filter((perm: any) => {
        // 1. Keep L0 IA nodes untouched (Length 1)
        if (perm.length === 1 && perm[0].endsWith("'")) return true;
        
        // 2. Check L0 Standard Items (Parents)
        // If we represent ZoneA (via valMap or context), we normally explode it.
        // If we serve ZoneA options, we remove generic ZoneA parent.
        if (perm.length === 1) {
            const parentName = perm[0];
            const isParentInvolved = valMap.some((v: string) => v.split('>')[0] === parentName);
            if (isParentInvolved) return false; // Replace generic parent with specific children
            return true;
        }
        
        // 3. Visible Items (L1 IA or L1 Standard) -> Keep if in values
        const isVisible = (
            (perm.length === 2 && perm[1].endsWith("'")) ||
            (perm.length >= 2 && !perm[1].endsWith("'"))
        );
        
        if (isVisible) {
             const key = `${perm[0]}>${perm[1]}`;
             return values.includes(key);
        }

        // 4. Deeper Items (children of L1 items)
        if (perm.length >= 3 && !perm[1].endsWith("'")) {
             const parentKey = `${perm[0]}>${perm[1]}`;
             return values.includes(parentKey);
        }
        
        return false;
      });
      
      // Add New
      const newItems = valMap
        .filter((v: string) => !existingVisibleCombinations.includes(v))
        .map((v: string) => v.split('>'));
      
      newPerm = [...permissionsToKeep, ...newItems];

      // Post-Processing: Restore Parent if Last Child Removed (Level 1)
      const removedVisibleItems = existingVisibleCombinations.filter((comb: string) => !values.includes(comb));

      removedVisibleItems.forEach((removedComb: string) => {
        const parts = removedComb.split('>');
        // Removed item is A>B (Length 2). Parent A (Length 1).

        if (parts.length > 1) {
          const parentParts = parts.slice(0, -1);
          const parentKey = parentParts.join('>');

          // Check if Parent is already in newPerm
          const parentExists = newPerm.some((p: any) => p.join('>') === parentKey);
          if (parentExists) return;

          // Check if any sibling exists in newPerm
          const siblingExists = newPerm.some((p: any) => {
            if (p.length <= parentParts.length) return false;
            return p.slice(0, parentParts.length).join('>') === parentKey;
          });

          if (!siblingExists) {
            newPerm.push(parentParts);
          }
        }
      });
    }

    if (level === 2) {
      // Update L2 Items (ZoneA>GroupB>WH1)
      // L1 IA nodes (ZoneA>GroupB') are moved to L1 dropdown.
      
      const valMap = values; 
      
      const existingVisibleCombinations = selectPermissions
        .filter((perm: any) => {
             // Exclude L1 IA
             if (perm.length === 2 && perm[1].endsWith("'")) return false;
             // Include L2 Standard
             if (perm.length >= 3) return true;
             return false;
        })
        .map((perm: any) => perm.join('>')); 
      
      const permissionsToKeep = selectPermissions.filter((perm: any) => {
         // 1. Keep Higher Level IA nodes untouched
         if (perm.length === 1 && perm[0].endsWith("'")) return true;
         if (perm.length === 2 && perm[1].endsWith("'")) return true;

         // 2. Check Ancestors (L0, L1 Standard)
         const currentPath = valMap.find((v: string) => {
             return v.split('>').slice(0, perm.length).join('>') === perm.join('>');
         });
         
         if (perm.length === 1 && currentPath) return false; 
         if (perm.length === 2 && currentPath) return false; 
         
        // Fix: If Parent (Length 1 or 2) matches scope but has NO selected children, KEEP IT.
        // This ensures that deselecting the last child reverts to the Parent selection (implicit all).
        if (perm.length === 2 && !currentPath) return true;
        if (perm.length === 1 && !currentPath) return true;

         // 3. Visible Items (L3 Standard)
         if (perm.length >= 3) {
             const key = perm.join('>');
             const match = values.some((v: string) => {
                const vKey = v.endsWith('>') && v.split('>').length === 3 && v.split('>')[2] === '' 
                    ? `${v} ` 
                    : v;
                return v === key;
             });
             return match;
         }
         
         return false;
      });
      
      const newItems = valMap
        .filter((v: string) => !existingVisibleCombinations.includes(v))
        .map((v: string) => {
          const parts = v.split(">");
          if (parts.length === 2) parts.push("");
          else if (parts.length === 3 && parts[2] === undefined) parts[2] = "";
          return parts;
        });
      
      newPerm = [...permissionsToKeep, ...newItems];

      // Post-Processing: Restore Parent if Last Child Removed
      // Identify what was removed
      const removedVisibleItems = existingVisibleCombinations.filter((comb: string) => !values.includes(comb));

      removedVisibleItems.forEach((removedComb: string) => {
        const parts = removedComb.split('>');
        // Potential Parent is parts.slice(0, -1)
        // If we are at L2, removed item is A>B>C (Length 3). Parent A>B (Length 2).
        // If we are at L1, removed item is A>B (Length 2). Parent A (Length 1).

        if (parts.length > 1) {
          const parentParts = parts.slice(0, -1);
          const parentKey = parentParts.join('>');

          // Check if Parent is already in newPerm
          const parentExists = newPerm.some((p: any) => p.join('>') === parentKey);
          if (parentExists) return;

          // Check if any sibling exists in newPerm
          // Sibling has same parent prefix
          const siblingExists = newPerm.some((p: any) => {
            if (p.length <= parentParts.length) return false;
            return p.slice(0, parentParts.length).join('>') === parentKey;
          });

          if (!siblingExists) {
            // Restore Parent!
            newPerm.push(parentParts);
          }
        }
      });
    }

    // Update the selected permissions state
    setSelectedPermissions((prev: any) => ({
      ...prev,
      [selectedApplication]: {
        ...prev[selectedApplication],
        [permissionType]: newPerm,
      },
    }));
  };

  const themeUi = useUserData().user.user.theme_ui;


  const getAllPossiblePermissions = (type: string) => {
      const nodes = allNodes[type];
      if (!nodes) return [];

      const idKey = `${type}_permission_ids`;
      const fallbackIdKey = `${type.replace("_permission", "")}_permission_ids`;
      const permissionIds = currentAppAllPermissions[idKey] || currentAppAllPermissions[fallbackIdKey] || [];
      const prefix = type.split('_')[0];

      const checkIsIA = (level: number, parentKey: string, key: string) => {
           return permissionIds.some((p: any) => {
               if (level === 0) {
                   return (p[`${prefix}_hierarchy_1`] === key || p.hierarchy_1 === key) && 
                          (!p[`${prefix}_hierarchy_2`] && !p.hierarchy_2) && 
                          p.isActive;
               } 
               if (level === 1) {
                   return (p[`${prefix}_hierarchy_1`] === parentKey || p.hierarchy_1 === parentKey) && 
                          (p[`${prefix}_hierarchy_2`] === key || p.hierarchy_2 === key) && 
                          (!p[`${prefix}_hierarchy_3`] && !p.hierarchy_3) && 
                          p.isActive;
               }
               return false;
           });
      }

      const l1 = nodes.L1.map(k => [k]);
      // Use prime suffix for L0 IA
      const l1IA = nodes.L1.filter(k => checkIsIA(0, "", k)).map(k => [`${k}'`]);
      
      const l2 = nodes.L2.map(k => k.split('>'));
      const l2IA = nodes.L2
        .filter(k => {
            const [p, c] = k.split('>');
            return checkIsIA(1, p, c);
        })
        .map(k => {
             const [p, c] = k.split('>');
             // Use prime suffix for L1 IA child
             return [p, `${c}'`];
        });
      
      const l3 = nodes.L3.map(k => {
          const parts = k.split('>');
          if (parts.length === 2) parts.push("");
          else if (parts.length === 3 && parts[2] === undefined) parts[2] = "";
          return parts.length === 3 ? parts : [...parts, ""];
      });

      return [...l1, ...l1IA, ...l2, ...l2IA, ...l3];
  }

  const isSelectAll = (selectedPermissions: any, type: string) => {
    if (!selectedApplication || !allNodes[type]) return false;

    const currentPermissions = selectedPermissions[selectedApplication]?.[type] || [];
    const allPossible = getAllPossiblePermissions(type);
    
    if (allPossible.length === 0) return false;
    
    // Check if every possible permission is in currentPermissions
    // We compare stringified versions for deep equality check
    const currentSet = new Set(currentPermissions.map((p: any) => p.join('>')));
    return allPossible.every(p => currentSet.has(p.join('>')));
  }

  const setAllPermissions = (type: string) => {
    if (!selectedApplication || !allNodes[type]) return;

    if (isSelectAll(selectedPermissions, type)) {
      // Deselect all
      setSelectedPermissions((prev: any) => ({
        ...prev,
        [selectedApplication]: {
          ...prev[selectedApplication],
          [type]: [],
        },
      }));
    } else {
      // Select all
      const allPerms = getAllPossiblePermissions(type);
      
      setSelectedPermissions((prev: any) => ({
        ...prev,
        [selectedApplication]: {
          ...prev[selectedApplication],
          [type]: allPerms,
        },
      }));
    }
  };

  const getLabel = (type: string) => {
      const name = type.replace("_permission", "").replace(/_/g, " ");
      return name.charAt(0).toUpperCase() + name.slice(1) + " Permission"; 
  }

  // Define Headers manually if needed to match specific designs, or generic:
  // Since we don't know the exact headers for dynamic types (e.g. Zone vs Business), 
  // we will use generic Level 1, Level 2, Level 3 labels or derive from keys if possible.
  // For now using generic labels or mapping if known type.
  const getHeaderLabel = (type: string, level: number) => {
      const base = type.split('_')[0];
      if (base === 'location') {
          if (level === 0) return 'Zone';
          if (level === 1) return 'Location Group';
          if (level === 2) return 'WH Type';
      }
      if (base === 'product') {
          if (level === 0) return 'Business';
          if (level === 1) return 'Category';
          if (level === 2) return 'Value';
      }
      return `Level ${level + 1}`;
  }


  return (
    <div style={{ padding: "40px 20px 20px 20px" }}>
        {permissionTypes.map((type) => (
             <div className={sectionContainer} key={type}>
             <div className={titleContainer}>
                 <div className={sectionTitle}>{getLabel(type)}</div>
                 <div style={{ marginBottom: "20px", fontSize: "14px", fontWeight: 600, display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
                   {!readOnly && (
                     <div className={selectAllWrapper}>
                     <Checkbox
                                 id={`selectAll_${type}`}
                                 style={{ zoom: 0.5 }}
                                 theme={themeUi}
                                 type="checkbox"
                                 checked={isSelectAll(selectedPermissions, type)}
                                 onClick={(e) => e.stopPropagation()}
                                 onChange={(e: any) => {setAllPermissions(type)}}
                                 />
                               <label htmlFor={`selectAll_${type}`} style={{ cursor: "pointer" }}>Select All</label>
       
                     </div>
                   )}
                 </div>
               
             </div>
             <div className={grid}>
               <div className={selectContainer}>
                   <div className={label}>{getHeaderLabel(type, 0)}</div>
                 <SearchInputMultiple
                   disabled={readOnly}
                   placeholder="Select"
                   options={options[type]?.L1 || []}
                   value={getSelectedPermissions({
                     selectedPermissions,
                     selectedApplication,
                     permissionType: type,
                     level: 0,
                   })}
                   setValue={(e: any) => {
                     updateSelectedPermissions({
                       val: e,
                       selectedPermissions,
                       selectedApplication,
                       permissionType: type,
                       level: 0,
                     });
                   }}
                   key={1}
                 />
               </div>
               <div className={selectContainer}>
                 <div className={label}>{getHeaderLabel(type, 1)}</div>
                 <SearchInputMultiple
                   placeholder="Select"
                   disabled={readOnly}
                   options={options[type]?.L2 || []}
                   value={getSelectedPermissions({
                     selectedPermissions,
                     selectedApplication,
                     permissionType: type,
                     level: 1,
                   })}
                   setValue={(e: any) => {
                     updateSelectedPermissions({
                       val: e,
                       selectedPermissions,
                       selectedApplication,
                       permissionType: type,
                       level: 1,
                     });
                   }}
                   key={2}
                 />
               </div>
               <div className={selectContainer}>
                 <div className={label}>{getHeaderLabel(type, 2)}</div>
                 <SearchInputMultiple
                   placeholder="Select"
                   disabled={readOnly}
                   options={options[type]?.L3 || []}
                   value={getSelectedPermissions({
                     selectedPermissions,
                     selectedApplication,
                     permissionType: type,
                     level: 2,
                   })}
                   setValue={(e: any) => {
                     updateSelectedPermissions({
                       val: e,
                       selectedPermissions,
                       selectedApplication,
                       permissionType: type,
                       level: 2,
                     });
                   }}
                   key={3}
                 />
               </div>
             </div>
           </div>
        ))}
    </div>
  );
};

export default PermissionForm;