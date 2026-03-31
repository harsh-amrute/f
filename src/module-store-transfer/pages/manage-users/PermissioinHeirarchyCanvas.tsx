import React, { createContext, useContext, useEffect, useState } from "react";
import { ReactFlow, Handle, Position, Background, BackgroundVariant, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Checkbox from "../../../components/VectorFLOW/commons/MTO/Checkbox";
import { useUserData } from "../../../context";
import Tooltip from "../../../VectorFlow/Pages/MTO/Common/Tooltip";
import {
  ToggleContainer,
  ToggleButton,
  ChartWrapper,
  toggleBgVar,
  toggleColorVar,
  toggleWeightVar,
} from "./PermissionHeirarchyStyles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const NodeDataContext = createContext<any>(undefined);

function useNodeDataContext() {
  const context = useContext(NodeDataContext);
  if (!context) {
    throw new Error(
      "useNodeDataContext must be used within a NodeDataProvider"
    );
  }
  return context;
}

const ViewToggle = ({
  allApplications,
  selectedApplication,
  setSelectedApplication,
}: any) => {
  const getLabel = (app: string) => {
    // Remove _permission suffix and capitalize
    const name = app.replace("_permission", "").replace(/_/g, " ");
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className={ToggleContainer}>
      {allApplications.map((app: string) => (
        <button
          className={ToggleButton}
          key={app}
          style={assignInlineVars({
            [toggleBgVar]: selectedApplication === app ? "#f1d2e0" : "#f5f5f5",
            [toggleColorVar]: selectedApplication === app ? "#c72e64" : "#000",
            [toggleWeightVar]: selectedApplication === app ? "bold" : "normal",
          })}
          onClick={() => setSelectedApplication(app)}
        >
          {getLabel(app)}
        </button>
      ))}
    </div>
  );
};

const CustomNode = ({
  data,
}: {
  data: {
    label: string;
    key: string;
    isOpen: boolean;
    index: number;
    level?: number;
    hasChildren?: boolean;
  };
}) => {
  const {
    opened,
    setOpened,
    selectedPermissions,
    setSelectedPermissions,
    selectedApplication,
    permissionType,
    readOnly,
    permissionIds
  } = useNodeDataContext();

  const { user } = useUserData();
  const inherited_access = user.config_data?.INHERITED_ACCESS
  const isInheritedOn = inherited_access === "1"

  const getPathArray = (key: string) => {
    if (!key) return [];
    return key.split(">").map((part) => part.split("_").slice(1).join("_"));
  }

  const pathArray = getPathArray(data.key);

  const getPermissionList = () =>
    (selectedPermissions?.[selectedApplication]?.[permissionType] ??
      []) as string[][];

  const getNodeMeta = () => {
    const path = getPathArray(data.key);
    const prefix = permissionType.split("_")[0];
  
    const match = permissionIds?.find((p: any) => {
      const h1 = p[`${prefix}_hierarchy_1`] || p.hierarchy_1;
      const h2 = p[`${prefix}_hierarchy_2`] || p.hierarchy_2;
      const h3 = p[`${prefix}_hierarchy_3`] || p.hierarchy_3;
  
      if (path.length === 1) return h1 === path[0] && (!h2 || h2 === "") && (!h3);
      if (path.length === 2) return h1 === path[0] && h2 === path[1] && (!h3);
      if (path.length === 3) return h1 === path[0] && h2 === path[1] && h3 === path[2];
  
      return false;
    });
  
  
    return {
      isActive: match?.isActive ?? true,  
      h_id: match?.h_id,
    };
  };
  
  const { h_id } = getNodeMeta();

// level 0 = L1, level 1 = L2, level 2 = L3
  const isL3Node = data.level==2;
  
  const isDisable =readOnly || !h_id || (!isL3Node && !data?.hasChildren && !isInheritedOn) 
   
  const getSelectionState = (key: string) => {
    const path = getPathArray(key);
    const permissionList = getPermissionList();

    // 1. Explicitly Selected
    const isExplicit = permissionList.some((perm) =>
      JSON.stringify(perm) === JSON.stringify(path)
    );
    if (isExplicit) return "explicit";

    // 2. Implicitly Selected (Ancestor is selected)
    const isImplicit = permissionList.some((perm) => {
      // Check if perm is an ancestor of path
      // perm length < path length
      if (perm.length >= path.length) return false;
      // perm must match start of path
      return path.slice(0, perm.length).every((val, idx) => val === perm[idx]);
    });
    if (isImplicit) return "implicit";

    // 3. Has Descendant Selected (Visual Pink / Bubble Up)
    const hasDescendant = permissionList.some((perm) => {
      // perm length > path length
      if (perm.length <= path.length) return false;
      // path must match start of perm
      return perm.slice(0, path.length).every((val, idx) => val === path[idx]);
    });
    if (hasDescendant) return "explicit"; // Treat as explicit/pink for visual

    return "unchecked";
  };

  const setTheChecked = () => {
    const currentPath = pathArray;
    let existingPermissions = [...getPermissionList()];
    const currentState = getSelectionState(data.key);


    if (currentState === "unchecked") {
      // Add current path
      // Simple add:
      const pStr = JSON.stringify(currentPath);
      if (!existingPermissions.some((perm) => JSON.stringify(perm) === pStr)) {
        existingPermissions.push(currentPath);
      }
    } else {
      // Handle Uncheck (from Implicit or Explicit)

      // 1. Remove explicit self if present
      const explicitIndex = existingPermissions.findIndex((perm) => JSON.stringify(perm) === JSON.stringify(currentPath));
      if (explicitIndex !== -1) {
        existingPermissions.splice(explicitIndex, 1);
      }

      // 2. Handle Implicit (Ancestor Selected)
      // Find ancestor
      const coveringAncestorIndex = existingPermissions.findIndex((perm) =>
        perm.length < currentPath.length &&
        currentPath.slice(0, perm.length).every((val, idx) => val === perm[idx])
      );

      // This check will be true if the node is grey selected
      if (coveringAncestorIndex !== -1) {

        const ancestorPath = existingPermissions[coveringAncestorIndex];
        // Remove ancestor
        existingPermissions.splice(coveringAncestorIndex, 1);

        // Add current path (Narrowing from Ancestor to Specific Child)
        existingPermissions.push(currentPath);

        /////////////


        const parentPath = currentPath.slice(0, -1);
        if (parentPath.length > 0) {
          // Check if parent has any descendants in existingPermissions
          const hasDescendants = existingPermissions.some(perm =>
            perm.length > parentPath.length &&
            perm.slice(0, parentPath.length).every((val, idx) => val === parentPath[idx])
          );

          // Also check if parent itself is in existingPermissions (explicitly)
          const hasParentExplicit = existingPermissions.some(perm =>
            JSON.stringify(perm) === JSON.stringify(parentPath)
          );

          if (!hasDescendants && !hasParentExplicit) {
            // Parent became empty -> Reselect Parent explicitly
            existingPermissions.push(parentPath);
          }
        }
      }
      else {

        const parentPath = currentPath.slice(0, -1);

        if (parentPath.length > 0) {
          // Check if parent has any descendants in existingPermissions
          const hasDescendants = existingPermissions.some(perm =>
            perm.length > parentPath.length &&
            perm.slice(0, parentPath.length).every((val, idx) => val === parentPath[idx])
          );

          // Also check if parent itself is in existingPermissions (explicitly)
          const hasParentExplicit = existingPermissions.some(perm =>
            JSON.stringify(perm) === JSON.stringify(parentPath)
          );

          if (!hasDescendants && !hasParentExplicit) {
            // Parent became empty -> Reselect Parent explicitly
            existingPermissions.push(parentPath);
          }
          else if (hasDescendants) {
            const existingPermIndex = existingPermissions.findIndex((perm) => JSON.stringify(perm) === JSON.stringify(currentPath));
            if (existingPermIndex !== -1) {
              existingPermissions.splice(existingPermIndex, 1);
            }
            // Check if in existingPermissions there is a permission that is currentPath or descendant of currentPath
            // Use proper array comparison instead of JSON string startsWith to avoid B/B' edge case
            const filteredPermissionsWithRemovedChilds = existingPermissions.filter((perm) => {
              // Keep perm if it's NOT currentPath and NOT a descendant of currentPath
              const isCurrentPath = perm.length === currentPath.length && 
                perm.every((val, idx) => val === currentPath[idx]);
              const isDescendant = perm.length > currentPath.length && 
                currentPath.every((val, idx) => val === perm[idx]);
              return !isCurrentPath && !isDescendant;
            });
            existingPermissions = filteredPermissionsWithRemovedChilds;


            // Check if this is an IA node (path ends with prime suffix)
            // IA nodes should not trigger parent reselection when unchecked
            const lastElement = currentPath[currentPath.length - 1] || '';
            const isIANode = lastElement.endsWith("'");

            if (!isIANode && !existingPermissions.some(perm => JSON.stringify(perm.slice(0, -1)) === JSON.stringify(currentPath.slice(0, -1)))) {
              existingPermissions.push(currentPath.slice(0, -1));
            }
          }
          else {
            existingPermissions.splice(existingPermissions.findIndex((perm) => JSON.stringify(perm) === JSON.stringify(parentPath)), 1);
          }
        }
        else {
          // Use proper array comparison instead of JSON string startsWith to avoid B/B' edge case
          const newEP = existingPermissions.filter((perm) => {
            // Keep perm if it's NOT currentPath and NOT a descendant of currentPath
            const isCurrentPath = perm.length === currentPath.length && 
              perm.every((val, idx) => val === currentPath[idx]);
            const isDescendant = perm.length > currentPath.length && 
              currentPath.every((val, idx) => val === perm[idx]);
            return !isCurrentPath && !isDescendant;
          });
          existingPermissions = newEP;
        }

      }

    }

    setSelectedPermissions((prev: any) => ({
      ...prev,
      [selectedApplication]: {
        ...(prev[selectedApplication] || {}),
        [permissionType]: existingPermissions,
      },
    }));
  };

  const setTheIndex = () => {
    const newArr = [...opened];
    newArr[data.index] = opened[data.index] === 1 ? 0 : 1;
    setOpened(newArr);
  };


  return (
    <div
      style={{
        padding: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: "5px",
        color: "black",
        background: data.hasChildren ? "white" : "#F0E6F2",
        border: data.hasChildren ? "1px solid #ddd" : "none",
        width: "140px",
        justifyContent: "space-between",
      }}
    >
      <label
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <Checkbox
          checked={getSelectionState(data.key) !== "unchecked"}
          onChange={readOnly ? undefined : setTheChecked}
          disabled={isDisable}
          theme={user.user.theme_ui}
          style={{
            zoom: 0.7,
            minWidth: '18px',
            minHeight: '18px',
            flexShrink: 0,
            ...(getSelectionState(data.key) === "implicit" ? {
              backgroundColor: "#e8cae0ff",
              borderColor: "#947484ff",
              filter: "grayscale(100%)" // visual tick hack
            } : {})
          }}
        />
        <Tooltip content={<span style={{ fontSize: "1.2rem", fontFamily: "roboto", padding: '1px 6px' }}>
          {data.label}
        </span>
        }>
          <span
            style={{
              padding: "10px",
              fontSize: "1.2rem",
              fontFamily: "roboto",
              display: "inline-block",
            }}
          >
            {data.label.length > 8
              ? `${data.label.substring(0, 8)}...`
              : data.label}
          </span>
        </Tooltip>
      </label>
      {data.hasChildren && (
        <div
          onClick={setTheIndex}
          style={{
            margin: "2px",
            font: "bold",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {opened?.[data?.index] !== 1 ? (
            <img
              alt="arrow-right"
              src="\assets\img\mto\dayWiseCoverage\arrow_right.svg"
            ></img>
          ) : (
            <img
              style={{ rotate: "90deg" }}
              alt="arrow-left"
              src="\assets\img\nav\arrow_down.svg"
            ></img>
          )}
        </div>
      )}
      {data.level !== 0 && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#555" }}
        />
      )}
      {data.hasChildren && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: "#555" }}
        />
      )}
    </div>
  );
};

const GroupNode = ({ data }: { data: { level: string } }) => {
  return (
    <div style={{ width: '100%', height: '104%', background: 'white', border: "1px solid #d9d9d9", borderRadius: '8px', padding: '0 10px 10px 10px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} >
      <div style={{ height: '30px', background: 'white', padding: '5px 10px', fontSize: '10px', color: '#888', fontWeight: 'bold' }}>
        {data.level}
      </div>
      <div style={{ flex: 1, background: '#F0E6F2', width: '100%', borderRadius: '8px', border: '1px solid #d9d9d9' }}>
      </div>
    </div>
  );
};

const ParentGroupNode = ({ data }: { data: { level: string } }) => {
  return (
    <div style={{ width: '100%', height: '106%', background: 'white', border: "1px solid #d9d9d9", borderRadius: '8px', padding: '0 8px 8px 8px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} >
      <div style={{ height: '30px', background: 'white', padding: '5px 10px', fontSize: '10px', color: '#888', fontWeight: 'bold' }}>
        {data.level}
      </div>
      <div style={{ flex: 1, background: '#F0E6F2', width: '100%', borderRadius: '8px', border: '1px solid #d9d9d9' }}>
      </div>
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
  groupNode: GroupNode,
  parentGroupNode: ParentGroupNode
};

export default function PermissionHeirarchyCanvas({
  dataAllPermissions,
  selectedApplication,
  selectedPermissions,
  setSelectedPermissions,
  readOnly = false,
}: any) {

  const START_X = 100;
  const START_Y = 100;
  const HORIZONTAL_GAP = 400;
  const NODE_HEIGHT = 50;
  const SIBLING_GAP = 40;
  const GROUP_PADDING = 15;
  const GROUP_WIDTH = 180;

  const GROUP_VERTICAL_SPACING = 40;
  const HEADER_HEIGHT = 30;
  const [permissionType, setPermissionType] = useState<string>("");
  const [availablePermissionTypes, setAvailablePermissionTypes] = useState<string[]>([]);



  const [nodes, setNodes] = React.useState<any>([]);
  const [edges, setEdges] = React.useState<any>([]);

  const [opened, setOpened] = useState<any>([]);

  // Cache for opened state per application + permissionType
  const openedStateCache = React.useRef<Record<string, any[]>>({});
  // Track previous key to save state before switching
  const prevCacheKey = React.useRef<string>("");

  const [checked, setChecked] = useState<any>([]);
  const [selectedAppAllPermissions, setSelectedApplication] = useState<any>(
    dataAllPermissions?.find(
      (ele: any) => ele.application_name === selectedApplication
    )
  );




  useEffect(() => {
    const appData = dataAllPermissions?.find(
      (ele: any) => ele.application_name === selectedApplication
    );
    setSelectedApplication(appData);

    if (appData) {
      // dynamically find keys ending with _permission
      const types = Object.keys(appData).filter(
        (key) =>
          key.endsWith("_permission") &&
          typeof appData[key] === "object" &&
          !Array.isArray(appData[key]) // Assuming the permission structure is an object/map, whereas _permission_ids is array
      );

      // Filter out null/undefined/empty objects if necessary, or just trust the key convention
      setAvailablePermissionTypes(types);

      // Set default permission type if current one is invalid
      if (types.length > 0 && (!permissionType || !types.includes(permissionType))) {
        setPermissionType(types[0]);
      }
    }
  }, [selectedApplication, dataAllPermissions]);




  function createEdge(sourceId: string, targetId: string) {
    return {
      id: `${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
      selectable: false,
      style: {
        stroke: "#676565",
        strokeDasharray: "5 5",
        PointerEvents: "none",
        cursor: "grab",
      },
    };
  }

  const generateTreeNodesAndEdges = (
    allNodes: any,
    permissionType: string,
    opened: number[],
    permissionIds: any
  ) => {
    if (!allNodes) {
      return { nodes: [], edges: [] };
    }

    const level1Keys = Object.keys(allNodes);
    const level1: { id: string; key: string; index: number }[] = [];
    const level2: { id: string; key: string; index: number }[] = [];
    const level3: { id: string; key: string; index: number }[] = [];
    const childrenMap = new Map<string, string[]>();

    const checkIsIA = (nodeId: string) => {
      const parts = nodeId.split(">");
      const pathArray = parts.map((part) => {
        const split = part.split("_");
        return split.slice(1).join("_");
      });

      const prefix = permissionType.split('_')[0];

      if (pathArray.length === 1) {
        return permissionIds.some((p: any) => {
          const h1 = p[`${prefix}_hierarchy_1`] || p.hierarchy_1;
          const h2 = p[`${prefix}_hierarchy_2`] || p.hierarchy_2;
          return h1 === pathArray[0] && (!h2 || h2 === "") && p.isActive === true;
        });
      } else if (pathArray.length === 2) {
        return permissionIds.some((p: any) => {
          const h1 = p[`${prefix}_hierarchy_1`] || p.hierarchy_1;
          const h2 = p[`${prefix}_hierarchy_2`] || p.hierarchy_2;
          const h3 = p[`${prefix}_hierarchy_3`] || p.hierarchy_3;
          return h1 === pathArray[0] && h2 === pathArray[1] && (!h3 || h3 === "") && p.isActive === true;
        });
      }
      return false;
    };

    let l1Index = 0;
    let l2Index = level1Keys.length;
    let l3BaseIndex = -1;

    level1Keys.forEach((key, index) => {
      const l1Id = `${index}_${key}`;
      level1.push({ id: l1Id, key: key, index: index });
      childrenMap.set(l1Id, []);
      l1Index++;
    });

    level1.forEach((l1Node) => {
      const arr = Object.keys(allNodes[l1Node.key]);
      arr.forEach((item) => {
        const l2Id = `${l1Node.id}>${l2Index}_${item}`;
        level2.push({ id: l2Id, key: item, index: l2Index });
        childrenMap.get(l1Node.id)!.push(l2Id);
        childrenMap.set(l2Id, []);
        l2Index++;
      });
    });

    l3BaseIndex = l1Index + level2.length;
    let l3RelativeIndex = 0;

    level1.forEach((l1Node) => {
      childrenMap.get(l1Node.id)!.forEach((l2Id) => {
        const l2Node = level2.find(n => n.id === l2Id)!;
        const l3Items = allNodes[l1Node.key][l2Node.key];

        l3Items.forEach((ele: any) => {
          let l3Key = ele;
          if (typeof ele === "object") {
            // Dynamic key extraction
            const prefix = permissionType.split("_")[0]; // e.g. location from location_permission
            // Try known patterns
            const candidateKeys = [
              `${prefix}_hierarchy_3`,
              "hierarchy_3"
            ];
            const foundKey = Object.keys(ele).find(k => candidateKeys.includes(k)) || Object.keys(ele)[0];
            l3Key = ele[foundKey];
          }

          const l3Index = l3BaseIndex + l3RelativeIndex;
          const l3Id = `${l2Id}>${l3Index}_${l3Key}`;

          level3.push({ id: l3Id, key: l3Key, index: l3Index });
          childrenMap.get(l2Id)!.push(l3Id);
          l3RelativeIndex++;
        });
      });
    });

    const finalNodes: any[] = [];
    const finalEdges: any[] = [];


    let currentY = START_Y;

    const positionCache = new Map<string, { y: number; yStart: number; yEnd: number }>();

    function calculateNodePosition(nodeId: string, level: number) {
      if (positionCache.has(nodeId)) {
        return positionCache.get(nodeId)!;
      }

      const nodeInfo =
        level === 0 ? level1.find(n => n.id === nodeId) :
          level === 1 ? level2.find(n => n.id === nodeId) :
            level3.find(n => n.id === nodeId);

      if (!nodeInfo) return { y: 0, yStart: 0, yEnd: 0 };

      const children = childrenMap.get(nodeId) || [];
      const isOpened = opened[nodeInfo.index] === 1;

      let yPosition: number;
      let yStartSpan: number = currentY;
      let yEndSpan: number;

      if (children.length === 0 || !isOpened) {
        yPosition = currentY;
        yEndSpan = currentY + NODE_HEIGHT;
        currentY += NODE_HEIGHT;
      } else {
        // Group if the children are leaves (have no children of their own)
        const isLeafGroup = children.every(
          (childId) => (childrenMap.get(childId)?.length ?? 0) === 0
        );

        if (isLeafGroup) {
          const groupStartY = currentY;
          currentY += HEADER_HEIGHT + GROUP_PADDING;

          let previousWasGroup = false;

          children.forEach((childId, idx) => {
            const childNodeInfo = childrenMap.get(childId) ?
              (level + 1 === 0 ? level1.find(n => n.id === childId) :
                level + 1 === 1 ? level2.find(n => n.id === childId) :
                  level3.find(n => n.id === childId)) : null;

            const childHasChildren = (childrenMap.get(childId)?.length ?? 0) > 0;
            const childIsOpened = childNodeInfo ? opened[childNodeInfo.index] === 1 : false;
            const isGroup = childHasChildren && childIsOpened;

            if (idx > 0) {
              let gap = SIBLING_GAP;
              if (previousWasGroup) gap -= GROUP_PADDING;
              if (isGroup) gap -= GROUP_PADDING;
              currentY += gap;
            }

            calculateNodePosition(childId, level + 1);
            previousWasGroup = isGroup;
          });

          currentY += GROUP_PADDING;
          const groupEndY = currentY;

          finalNodes.push({
            id: `group_${nodeId}`,
            type: 'groupNode',
            position: {
              x: START_X + (level + 1) * HORIZONTAL_GAP - 20,
              y: groupStartY
            },
            style: {
              width: GROUP_WIDTH,
              height: groupEndY - groupStartY,
              zIndex: -1
            },
            data: { label: '', level: `L${level + 2}` }
          });

          yPosition = groupStartY + (groupEndY - groupStartY) / 2 - (NODE_HEIGHT / 2);
          yStartSpan = groupStartY;
          yEndSpan = groupEndY;
        } else {
          // Individual Wrapper Logic for Parents
          const startSpanY = currentY;

          children.forEach((childId, idx) => {
            if (idx > 0) {
              currentY += SIBLING_GAP;
            }

            const nodeStartY = currentY;

            // Move down for Header
            currentY += HEADER_HEIGHT;

            // Calculate position (will recurse)
            const childPos = calculateNodePosition(childId, level + 1);

            const isIA = checkIsIA(childId);
            let wrapperHeight = NODE_HEIGHT + (GROUP_PADDING * 2) + HEADER_HEIGHT;

            if (isIA) {
              wrapperHeight += NODE_HEIGHT + 10;
              // Derived Label: ParentLabel ~ ChildLabel
              // For a child `level1>level2_item`, the parent is `level1`. 
              // But `childId` is constructed as `...parentKey>index_childKey`.
              // We need the ACTUAL label shown on the node.
              // The main node has label `nodeInfo.key` (or derived from it).

              // Let's get the parent key. 
              // `nodeId` logic is complex. 
              // Simplified approach based on request "LL1 ~ LL1_2". 
              // If child is `LL1_2` and parent is `LL1`, then label is `LL1 ~ LL1_2`.

              // Current node being wrapped is `childId`.
              // `childId` corresponds to `key` in `allNodes` structure.
              // Let's find the nodeInfo again to get the clean key.
              const iaNodeKey = (level + 1 === 0 ? level1.find(n => n.id === childId) :
                level + 1 === 1 ? level2.find(n => n.id === childId) :
                  level3.find(n => n.id === childId))?.key || childId;

              // Add P' Node
              // Use parent node (nodeId) as the base so IA node is a child of parent for selection
              // This makes B' grey-ticked when A is selected (not when B is selected)
              const iaKey = `${nodeId}>0_${iaNodeKey}'`;

              finalNodes.push({
                id: `ia_${childId}`,
                type: "customNode",
                position: { x: START_X + (level + 1) * HORIZONTAL_GAP, y: childPos.y + NODE_HEIGHT + 10 },
                data: {
                  label: `${iaNodeKey}'`, // Simple Label
                  key: iaKey,
                  isOpen: false,
                  index: -1,
                  level: level + 1,
                  hasChildren: false,
                  isIA: true
                },
                zIndex: 10,
              });
            }

            const wrapperTop = childPos.y - GROUP_PADDING - HEADER_HEIGHT;
            const wrapperBottom = wrapperTop + wrapperHeight;

            // Ensure currentY accounts for the wrapper size, preventing overlap with next sibling
            if (currentY < wrapperBottom) {
              currentY = wrapperBottom;
            }

            finalNodes.push({
              id: `parent_wrapper_${childId}`,
              type: 'parentGroupNode',
              position: {
                x: START_X + (level + 1) * HORIZONTAL_GAP - 20,
                y: wrapperTop
              },
              style: {
                width: GROUP_WIDTH,
                height: wrapperHeight,
                zIndex: -1
              },
              data: { label: '', level: `L${level + 2}` } // Wrap specific parent (child). Child is at level+1.
            });
          });

          yPosition = startSpanY + (currentY - startSpanY) / 2 - (NODE_HEIGHT / 2); // Center parent relative to entire span
          yStartSpan = startSpanY;
          yEndSpan = currentY;
        }
      }

      finalNodes.push({
        id: nodeInfo.id,
        type: "customNode",
        position: { x: START_X + level * HORIZONTAL_GAP, y: yPosition },
        data: {
          label: nodeInfo.key,
          key: nodeInfo.id,
          isOpen: isOpened,
          index: nodeInfo.index,
          level: level,
          hasChildren: children.length > 0,
        },
        zIndex: 10,
      });

      if (isOpened) {
        children.forEach(childId => {
          finalEdges.push(createEdge(nodeId, childId));
        });
      }

      const position = { y: yPosition, yStart: yStartSpan, yEnd: yEndSpan };
      positionCache.set(nodeId, position);
      return position;
    }


    level1.forEach((l1Node, idx) => {
      const childHasChildren = (childrenMap.get(l1Node.id)?.length ?? 0) > 0;
      const childIsOpened = opened[l1Node.index] === 1;
      const isParent = childHasChildren && childIsOpened;

      if (idx > 0) {
        currentY += SIBLING_GAP + GROUP_VERTICAL_SPACING;
      }

      // Add space for header
      currentY += HEADER_HEIGHT;

      const nodePos = calculateNodePosition(l1Node.id, 0);

      // Always wrap root nodes? Or only if they are parents / leaves?
      // Request: "root Node doesn't seem to be wrapped ... I wish to wrap it in a wrapper also"

      // Determine wrapper type
      // If it's a leaf (no children or children not opened), use GroupNode style logic?
      // Or just wrap everything?
      // "node which is the parent and the leafNode i.e the root Node" 

      // Let's wrap EVERY root node.
      if (isParent) {
        // Wrap as Parent

        const isIA = checkIsIA(l1Node.id);
        let wrapperHeight = NODE_HEIGHT + (GROUP_PADDING * 2) + HEADER_HEIGHT;

        if (isIA) {
          wrapperHeight += NODE_HEIGHT + 10; // Extra height for P'

          // Add P' Node
          // Root level IA should NOT inherit from parent A - make it a standalone sibling
          // Use a key that is at the same level as A, not as a child of A
          const iaKey = `0_${l1Node.key}'`;

          finalNodes.push({
            id: `ia_${l1Node.id}`,
            type: "customNode",
            position: { x: (START_X + 0 * HORIZONTAL_GAP), y: nodePos.y + NODE_HEIGHT + 10 },
            data: {
              label: `${l1Node.key}'`,
              key: iaKey,
              isOpen: false,
              index: -1,
              level: 0,
              hasChildren: false,
              isIA: true
            },
            zIndex: 10,
          });
        }

        const wrapperTop = nodePos.y - GROUP_PADDING - HEADER_HEIGHT;
        const wrapperBottom = wrapperTop + wrapperHeight;

        // Ensure currentY accounts for wrapper size
        if (currentY < wrapperBottom) {
          currentY = wrapperBottom;
        }

        finalNodes.push({
          id: `root_wrapper_${l1Node.id}`,
          type: 'parentGroupNode',
          position: {
            x: START_X - 20,
            y: wrapperTop
          },
          style: {
            width: GROUP_WIDTH,
            height: wrapperHeight,
            zIndex: -1
          },
          data: { label: '', level: 'L1' }
        });
      } else {
        // It's a "leaf" at root level (or closed). Wrap as GroupNode (box around it)
        const wrapperHeight = NODE_HEIGHT + (GROUP_PADDING * 2) + HEADER_HEIGHT;
        finalNodes.push({
          id: `root_leaf_wrapper_${l1Node.id}`,
          type: 'groupNode', // Use the leaf style
          position: {
            x: START_X - 20,
            y: nodePos.y - GROUP_PADDING - HEADER_HEIGHT
          },
          style: {
            width: GROUP_WIDTH,
            height: wrapperHeight,
            zIndex: -1
          },
          data: { label: '', level: 'L1' }
        });
      }
    });
    return { nodes: finalNodes, edges: finalEdges };
  };


  useEffect(() => {
    if (checked && checked.length && opened && opened.length && selectedAppAllPermissions) {
      const { nodes: generatedNodes, edges: generatedEdges } =
        generateTreeNodesAndEdges(
          selectedAppAllPermissions[permissionType],
          permissionType,
          opened,
          selectedAppAllPermissions?.[`${permissionType}_permission_ids`] || selectedAppAllPermissions?.[`${permissionType.replace("_permission", "")}_permission_ids`] || []
        );
      setNodes(generatedNodes);
      setEdges(generatedEdges);
    }
  }, [opened, checked, selectedAppAllPermissions, permissionType]);

  useEffect(() => {
    if (
      selectedAppAllPermissions &&
      selectedAppAllPermissions[permissionType]
    ) {
      const allNodes = selectedAppAllPermissions[permissionType];
      const level1 = Object.keys(allNodes);
      let level2: string[] = [];
      let inIndex = level1.length;
      level1.forEach((key, index) => {
        const arr = Object.keys(allNodes[key]);
        const newArr: string[] = [];
        arr.forEach((item) => {
          const val = `${index}_${key}>${inIndex}_${item}`;
          newArr.push(val);
          inIndex++;
        });
        level2 = [...level2, ...newArr];
      });

      const level3: string[] = [];
      inIndex = level1.length;
      let inIndex2 = level1.length + level2.length - 1;
      level1.forEach((key, index) => {
        const arr = Object.keys(allNodes[key]);

        arr.forEach((item) => {
          allNodes[key][item].forEach((ele: any) => {
            let l3Val = ele;
            if (typeof ele === "object") {
              const prefix = permissionType.split("_")[0];
              const candidateKeys = [
                `${prefix}_hierarchy_3`,
                "hierarchy_3"
              ];
              const foundKey = Object.keys(ele).find(k => candidateKeys.includes(k)) || Object.keys(ele)[0];
              l3Val = ele[foundKey];
            }

            level3.push(
              `${index}_${key}>${inIndex}_${item}>${inIndex2}_${l3Val}`
            );
            inIndex2++;
          });
          inIndex++;
        });
      });

      // Save current opened state to cache before resetting
      if (prevCacheKey.current && opened.length > 0) {
        openedStateCache.current[prevCacheKey.current] = [...opened];
      }

      const cacheKey = `${selectedApplication}_${permissionType}`;
      prevCacheKey.current = cacheKey;

      const totalLength = level1.length + level2.length + level3.length;
      const cached = openedStateCache.current[cacheKey];

      if (cached && cached.length === totalLength) {
        setOpened(cached);
      } else {
        setOpened(Array(totalLength).fill(0));
      }
      setChecked(Array(level1.length + level2.length + level3.length).fill(0));
    }
  }, [selectedAppAllPermissions, permissionType]);

  return (
    <NodeDataContext.Provider
      value={{
        nodes,
        edges,
        opened,
        setOpened,
        checked,
        setChecked,
        selectedPermissions,
        selectedApplication,
        permissionType,
        setSelectedPermissions,
        readOnly,
        permissionIds:
      selectedAppAllPermissions?.[`${permissionType}_permission_ids`] ||
      selectedAppAllPermissions?.[`${permissionType.replace("_permission", "")}_permission_ids`] ||
      [],
      }}
    >
      <div
        style={{
          width: "100%",
          height: "94%",
          margin: "8px auto 0 auto",
          border: "1.5px dashed #cecece",
          borderRadius: "10px",
          padding: "8px",
          background: '#FAF7F7'
        }}
      >
        <ViewToggle
          allApplications={availablePermissionTypes}
          selectedApplication={permissionType}
          setSelectedApplication={setPermissionType}
        />
        <div
          className={ChartWrapper}
          style={{
            position: "relative",
            width: "100%",
            height: "90%",
            borderRadius: "10px",
          }}
        >
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView >
            <Background color="#ccc" variant={BackgroundVariant.Dots} bgColor={'#FAF7F7'} />
            <Controls />
          </ReactFlow>
          <div style={{ position: "absolute", bottom: 5, right: 10 }}>
            <Tooltip content={<span style={{ color: '#cecece', padding: '14px', fontSize: '12px', fontFamily: 'roboto' }}>
              Expand / collapse
            </span>
            }>

              <button style={{ background: 'transparent' }} onClick={() => {
                const allOpened = opened.every((ele: any) => ele === 1);
                const newOpened = opened.map(() => allOpened ? 0 : 1);
                setOpened(newOpened);
              }}>
                {opened.some((ele: any) => ele === 0) ?
                  <img height={28} src="\assets\img\profile\expand.svg" alt="expand-all">
                  </img>
                  : <img height={28} src="\assets\img\profile\shrink.svg" alt="collapse-all">
                  </img>}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </NodeDataContext.Provider>
  );
}