import React, { useEffect, useState } from "react";
import {  SearchInputMultiple } from "../../../components";
import { useUserData } from "../../../context";
import Checkbox from "../../../components/VectorFLOW/commons/MTO/Checkbox";
import { SelectAllWrapper, SectionContainer, SectionTitle, SelectContainer, Label, Grid, TitleContainer } from "./style";


const PermissionForm = ({
  currentAppAllPermissions,
  selectedPermissions,
  setSelectedPermissions,
  selectedApplication,
}: any) => {

  console.log("currentAppAllPermissions", currentAppAllPermissions)

  // Dynamic State
  const [permissionTypes, setPermissionTypes] = useState<string[]>([]);
  
  // Stores all raw nodes for filtering: key = permissionType
  const [allNodes, setAllNodes] = useState<Record<string, { L1: string[], L2: string[], L3: string[] }>>({});
  
  // Stores options for dropdowns: key = permissionType
  const [options, setOptions] = useState<Record<string, { L1: any[], L2: any[], L3: any[] }>>({});

  useEffect(() => {
    if (!currentAppAllPermissions) return;

    const types = Object.keys(currentAppAllPermissions).filter(
      (key) => key.endsWith("_permission") && typeof currentAppAllPermissions[key] === "object" && !Array.isArray(currentAppAllPermissions[key])
    );
    setPermissionTypes(types);

    const parsedNodes: Record<string, { L1: string[], L2: string[], L3: string[] }> = {};

    types.forEach(type => {
      const pData = currentAppAllPermissions[type];
      const l1Keys = Object.keys(pData);
      const l2Keys: string[] = [];
      const l3Keys: string[] = [];

      l1Keys.forEach(l1 => {
        const l2Obj = pData[l1];
        if (l2Obj) {
          Object.keys(l2Obj).forEach(l2 => {
            l2Keys.push(`${l1}>${l2}`);
            
            const l3Array = l2Obj[l2];
            if (Array.isArray(l3Array)) {
              l3Array.forEach((entry: any) => {
                let l3Val = entry;
                if (typeof entry === "object") {
                     // Dynamic Key Extraction same as HeirarchyCanvas
                     const prefix = type.split("_")[0];
                     const candidateKeys = [
                        `${prefix}_hierarchy_3`,
                        "hierarchy_3"
                    ];
                    const foundKey = Object.keys(entry).find(k => candidateKeys.includes(k)) || Object.keys(entry)[0];
                    l3Val = entry[foundKey];
                }
                
                // Handle empty string L3
                 if (l3Val !== undefined && l3Val !== null) {
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

      // L1 Options: Always all L1 (Level 0 Items) - No IA here
      const l1Opts: any[] = [];
      nodes.L1.forEach(k => {
          l1Opts.push({ label: k, value: k });
      });
      
      // L2 Options: Filter based on Selected L1
      const selectedL1Keys = Array.from(new Set(currentPerms.map((e: any) => e[0])));
      
      const l2Opts: any[] = [];
      // 1. Add standard children
      nodes.L2
        .filter(l2 => selectedL1Keys.some((selL1: any) => selL1 === l2.split('>')[0]))
        .forEach(l2 => {
            l2Opts.push({ label: l2, value: l2 });
        });
      
      // 2. Add IA nodes for selected Parents (L0)
      selectedL1Keys.forEach((selL1: any) => {
          if (checkIsIA(0, "", selL1)) {
               // Show in L2 dropdown
               l2Opts.push({ label: `${selL1}'`, value: `${selL1}>isActive` });
          }
      });
        
      // L3 Options: Filter based on Selected L2
      const selectedL2Keys = Array.from(new Set(currentPerms
        .filter((e: any) => e.length >= 2 && e[1] !== 'isActive') // Filter out IA selections themselves
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

      // 2. Add IA nodes for selected Parents (L1)
      selectedL2Keys.forEach((selL2: any) => {
          const [p, c] = selL2.split('>');
          if (checkIsIA(1, p, c)) {
               l3Opts.push({ label: `${selL2}'`, value: `${selL2}>isActive` });
          }
      });

      newOptions[type] = { L1: l1Opts, L2: l2Opts, L3: l3Opts };
    });

    setOptions(newOptions);

  }, [allNodes, selectedPermissions, selectedApplication, permissionTypes, currentAppAllPermissions]);

  const getUniqueObjects=(arr:any, key:any)=> {
    const seen = new Set();
    return arr.filter((item:any) => {
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
    const currentPermissions =  (selectedPermissions && selectedPermissions?.[selectedApplication]) || {};

    const permissionSet = currentPermissions?.[permissionType] || [];

    let val: { value: string; label: string }[] = [];

    if (level === 0) {
      val = permissionSet
        .filter((e: any) => e.length >= 1)
        .map((e: any) => {
             // Level 0: Pure Level 0 items only
             // IA nodes (length 2, 'isActive') are now shown in Level 1 dropdown
             if (e.length === 2 && e[1] === 'isActive') {
                 return null;
             }
             return { value: e[0], label: e[0] };
        })
        .filter((e: any) => e !== null);
    }

    if (level === 1) {
      val = permissionSet
        .filter((e: any) => e.length >= 2)
        .map((e: any) => {
           // Level 1: Show L1 items AND L0 IA nodes
           
           // Case 1: L0 IA Node ("ZoneA>isActive")
           if (e.length === 2 && e[1] === 'isActive') {
               return { value: `${e[0]}>isActive`, label: `${e[0]}'` };
           }
           
           // Case 2: L1 IA Node ("ZoneA>GroupB>isActive") -> Show in Level 2!
           if (e.length === 3 && e[2] === 'isActive') {
               return null;
           }

           // Case 3: Standard L1 Item ("ZoneA>GroupB")
           const joined = e.slice(0, 2).join(">");
           return { value: joined, label: joined };
        })
        .filter((e: any) => e !== null);
    }

    if (level === 2) {
      val = permissionSet
        .filter((e: any) => e.length >= 3)
        .map((e: any) => {
          // Level 2: Show L2 Items AND L1 IA nodes
          
          // Case 1: L1 IA Node ("ZoneA>GroupB>isActive")
          if (e.length === 3 && e[2] === 'isActive') {
              return { value: `${e[0]}>${e[1]}>isActive`, label: `${e[0]}>${e[1]}'` };
          }

          const joined = e.slice(0, 3).join(">");
          // Handle empty third level values
          const displayLabel = e[2] === "" 
            ? `${e[0]}>${e[1]}>` 
            : joined;
          return { value: joined, label: displayLabel };
        });
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
      // Update L0 Items (ZoneA)
      // If ZoneA removed, remove all children AND ZoneA' (isActive node)
      
      const existingLevel0Values = Array.from(
        new Set(selectPermissions.map((perm: any) => perm[0]))
      );
      
      const permissionsToKeep = selectPermissions.filter((perm: any) => 
        values.includes(perm[0])
      );
      
      const newLevel0Permissions = values
        .filter((value: string) => !existingLevel0Values.includes(value))
        .map((value: string) => [value]); // Pure L0
      
      newPerm = [...permissionsToKeep, ...newLevel0Permissions];
    }
  
    if (level === 1) {
      // Update L1 Items (ZoneA>GroupB) AND L0 IA nodes (ZoneA>isActive)
      
      // Values can be: "ZoneA>GroupB" OR "ZoneA>isActive"
      const valMap = values; 

      // Identify currently selected items visible in this dropdown (L1 items + L0 IA items)
      // to determine what was DESELECTED.
      
      const existingVisibleCombinations = selectPermissions
        .filter((perm: any) => {
             // Include L0 IA
             if (perm.length === 2 && perm[1] === 'isActive') return true;
             // Include L1 Standard
             if (perm.length >= 2 && !(perm.length === 3 && perm[2] === 'isActive')) return true;
             return false;
        })
        .map((perm: any) => {
             if (perm.length === 2 && perm[1] === 'isActive') return `${perm[0]}>isActive`;
             return `${perm[0]}>${perm[1]}`;
        });
      
      const permissionsToKeep = selectPermissions.filter((perm: any) => {
        // 1. Check L0 Items (ZoneA).
        // If we represent ZoneA (via valMap), we must REMOVE the generic Parent Node
        // so we can replace it with specific Children.
        if (perm.length === 1) {
            const parentName = perm[0];
            // Check if this Parent is involved in current values
            const isParentInvolved = valMap.some((v: string) => v.split('>')[0] === parentName);
            if (isParentInvolved) return false; // Remove! We will add children instead.
            return true; // Keep irrelevant parents
        }
        
        // 2. Visible Items (L0 IA or L1 Standard) -> Keep if in values
        // These are the items explicitly managed by this dropdown.
        const isVisible = (
            (perm.length === 2 && perm[1] === 'isActive') ||
            (perm.length >= 2 && !(perm.length === 3 && perm[2] === 'isActive'))
        );
        
        if (isVisible) {
             const key = (perm.length === 2 && perm[1] === 'isActive') 
                ? `${perm[0]}>isActive` 
                : `${perm[0]}>${perm[1]}`;
             return values.includes(key);
        }

        // 3. Deeper Items (children of L1 items) -> Keep if their L1 parent is still selected?
        // e.g. ZoneA>GroupB>WH1. If ZoneA>GroupB is removed, then WH1 must be removed.
        // ZoneA>GroupB is removed if it is NOT in values.
        if (perm.length >= 3) {
             const parentKey = `${perm[0]}>${perm[1]}`;
             return values.includes(parentKey);
        }
        
        return false;
      });
      
      // Add New
      const newItems = valMap
        .filter((v: string) => !existingVisibleCombinations.includes(v))
        .map((v: string) => {
             if (v.endsWith('>isActive')) {
                 const [p] = v.split('>');
                 return [p, 'isActive'];
             }
             return v.split('>');
        });
      
      // Add back Level 0? NO.
      // We purposefully removed Level 0 to "explode" it into siblings.
      // We only add what is in `newItems`.
      const level0ToAdd: any[] = [];
      newPerm = [...permissionsToKeep, ...newItems];
    }
  
    if (level === 2) {
      // Update L2 Items AND L1 IA nodes
      
      const valMap = values; // strings like "Z>G>W" or "Z>G>isActive"
      
      const existingVisibleCombinations = selectPermissions
        .filter((perm: any) => {
             // Include L1 IA
             if (perm.length === 3 && perm[2] === 'isActive') return true;
             // Include L2 Standard
             if (perm.length >= 3 && perm[2] !== 'isActive') return true;
             return false;
        })
        .map((perm: any) => {
             if (perm.length === 3 && perm[2] === 'isActive') return `${perm[0]}>${perm[1]}>isActive`;
             return `${perm[0]}>${perm[1]}>${perm[2] || ""}`;
        });
      
      const permissionsToKeep = selectPermissions.filter((perm: any) => {
         // 1. Check Lower levels (L0, L0-IA, L1)
         // If we represent ZoneA>GroupB (via valMap), we must REMOVE the generic Parent Node (ZoneA, ZoneA>GroupB)
         // so we can replace it with specific Children.
         
         const currentPath = valMap.find((v: string) => {
             // Does this value cover the permission `perm`?
             // If perm is ZoneA, and valMap has ZoneA>GroupB>WH1...
             // We check if `perm` is an ancestor of ANY `valMap` entry.
             // Actually, we check if `perm` is an ancestor of `val`.
             return v.split('>').slice(0, perm.length).join('>') === perm.join('>');
         });
         
         if (perm.length === 1 && currentPath) return false; // Remove L0 implicit
         if (perm.length === 2 && currentPath) return false; // Remove L1 implicit (if standard L1)
         
         // Note: L0-IA (length 2, isActive) or L1-IA (length 3, isActive) are explicit leaf nodes usually,
         // but if L1-IA is considered a "Parent" of L2? No.
         // If `perm` is ZoneA>isActive. Does ZoneA>GroupB>WH1 imply it? No.
         // So we only remove Standard Parents.
         if (perm.length === 2 && perm[1] === 'isActive') return true; 

         // 2. Visible Items (L1 IA or L2 Standard) - items in this dropdown
         const isVisible = (
             (perm.length === 3 && perm[2] === 'isActive') ||
             (perm.length >= 3 && perm[2] !== 'isActive')
         );
         
         if (isVisible) {
             const key = (perm.length === 3 && perm[2] === 'isActive')
                ? `${perm[0]}>${perm[1]}>isActive`
                : `${perm[0]}>${perm[1]}>${perm[2] || ""}`;
             
             return values.some((v: string) => {
                const vParts = v.split(">");
                // Handle empty string L3 special case match
                const vKey = vParts.length === 2 ? `${vParts[0]}>${vParts[1]}>` : v;
                return vKey === key || v === key;
             });
         }
         
         return false;
      });
      
      const newItems = valMap
        .filter((v: string) => !existingVisibleCombinations.includes(v))
        .map((v: string) => {
          if (v.endsWith('>isActive')) {
              const [p, c] = v.split('>');
              return [p, c, 'isActive'];
          }
          const parts = v.split(">");
          if (parts.length === 2) parts.push("");
          else if (parts.length === 3 && parts[2] === undefined) parts[2] = "";
          return parts;
        });
      
      // Add back L0/L1? NO.
      // We purposefully removed them to separate selection logic.
      
      newPerm = [...permissionsToKeep, ...newItems];
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

  const themeUi= useUserData().user.user.theme_ui


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
      const l1IA = nodes.L1.filter(k => checkIsIA(0, "", k)).map(k => [k, 'isActive']);
      
      const l2 = nodes.L2.map(k => k.split('>'));
      const l2IA = nodes.L2
        .filter(k => {
            const [p, c] = k.split('>');
            return checkIsIA(1, p, c);
        })
        .map(k => {
             const [p, c] = k.split('>');
             return [p, c, 'isActive'];
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
  }

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
             <SectionContainer key={type}>
             <TitleContainer>
                 <SectionTitle>{getLabel(type)}</SectionTitle>
                 <div style={{ marginBottom: "20px", fontSize: "14px", fontWeight: 600, display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
                   <SelectAllWrapper>
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
     
                   </SelectAllWrapper>
                 </div>
               
             </TitleContainer>
             <Grid>
               <SelectContainer>
                   <Label>{getHeaderLabel(type, 0)}</Label>
                 <SearchInputMultiple
                   disabled={false}
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
               </SelectContainer>
               <SelectContainer>
                 <Label>{getHeaderLabel(type, 1)}</Label>
                 <SearchInputMultiple
                   placeholder="Select"
                   disabled={false}
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
               </SelectContainer>
               <SelectContainer>
                 <Label>{getHeaderLabel(type, 2)}</Label>
                 <SearchInputMultiple
                   placeholder="Select"
                   disabled={false}
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
               </SelectContainer>
             </Grid>
           </SectionContainer>
        ))}
    </div>
  );
};

export default PermissionForm;