import React, { createContext, useContext, useEffect, useState } from "react";
import { ReactFlow, Handle, Position } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import Checkbox from "../../../components/VectorFLOW/commons/MTO/Checkbox";
import { BaseEdge, getStraightPath } from "@xyflow/react";

import { useUserData } from "../../../context";
import styled from "styled-components";
import { set } from "lodash";

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

const ToggleContainer = styled.div`
  display: flex;
  background-color: #fff;
  //   border: 1.5px solid #d08ba5;
  border-radius: 999px;
  overflow: hidden;
  width: fit-content;
  padding: 3px;
  gap: 8px;
  font-size: 8px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 4px 14px;
  border: none;
  background-color: ${({ active }) => (active ? "#f1d2e0" : "#f5f5f5")};
  color: ${({ active }) => (active ? "#c72e64" : "#000")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-radius: 999px;
  cursor: pointer;
  font-size: 10px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#f1d2e0" : "#f5f5f5")};
  }
`;
//@TODO: add type definations later
const ViewToggle = ({
  allApplications,
  selectedApplication,
  setSelectedApplication,
}: any) => {
  return (
    <ToggleContainer>
      {allApplications.map((app: string) => (
        <ToggleButton
          key={app}
          active={selectedApplication === app}
          onClick={() => setSelectedApplication(app)}
        >
          {app === "location_permission" ? "Location" : "Product"}
        </ToggleButton>
      ))}
    </ToggleContainer>
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
  };
}) => {
  const {
    nodes,
    opened,
    setOpened,
    checked,
    setChecked,
    selectedPermissions,
    setSelectedPermissions,
    selectedApplication,
    permissionType,
  } = useNodeDataContext();

  const { user } = useUserData();

  const getPathArray = (key: string) =>
    key.split(">").map((part) => part.split("_")[1]);

  const pathArray = getPathArray(data.key);

  const getPermissionList = () =>
    (selectedPermissions?.[selectedApplication]?.[permissionType] ??
      []) as string[][];

  const isPermissionChecked = (key: string) => {
    const path = getPathArray(key); // e.g., ['Vendor', 'P001']
    const permissionList = getPermissionList(); // e.g., [['Vendor', 'P001', 'WSO'], ...]

    return permissionList.some((perm) =>
      path.every((val, idx) => perm[idx] === val)
    );
  };

  const getAllChildrenPaths = (pathArray: string[]) => {
    const currentPath = pathArray.join("/");
    return nodes
      .map((node: any) => ({
        path: getPathArray(node.data.key).join("/"),
        index: node.data.index,
        arrPath: getPathArray(node.data.key),
      }))
      .filter(
        ({ path }: { path: any }) =>
          path.startsWith(currentPath) && path !== currentPath
      );
  };

  const getAllParentPaths = (pathArray: string[]) => {
    const parents: string[][] = [];
    for (let i = 1; i < pathArray.length; i++) {
      parents.push(pathArray.slice(0, i));
    }
    return parents;
  };

  function getUpdatedPermissionsOnDeselect(
    currentPath: string[],
    existingPermissions: string[][]
  ): string[][] {
    // Remove all permissions that are same as or deeper than currentPath
    const updatedPermissions = existingPermissions.filter(
      (perm) => !currentPath.every((val, idx) => perm[idx] === val)
    );

    const parentPath = currentPath.slice(0, -1); // e.g. ['A','B']

    // Count how many remaining permissions still share the same parent path
    const stillHasChildren = updatedPermissions.some(
      (perm) =>
        parentPath.every((val, idx) => perm[idx] === val) &&
        perm.length > parentPath.length
    );

    const parentExists = updatedPermissions.some(
      (perm) => JSON.stringify(perm) === JSON.stringify(parentPath)
    );

    // Only add back the parentPath if it has no children left
    if (!stillHasChildren && parentPath.length > 0 && !parentExists) {
      updatedPermissions.push(parentPath);
    }

    return updatedPermissions;
  }

  const setTheChecked = () => {
    const newChecked = [...checked];
    const isCurrentlyChecked = isPermissionChecked(data.key);
    const currentPath = pathArray;
    const currentPathStr = JSON.stringify(currentPath);

    // Get all children
    const children = getAllChildrenPaths(pathArray);
    const childrenPaths = children.map((c: any) => c.arrPath);

    const allPathsToToggle = [currentPath, ...childrenPaths];
    const allPathsStr = allPathsToToggle.map((p) => JSON.stringify(p));

    // Get existing permissions
    const existingPermissions = getPermissionList();

    if (isCurrentlyChecked) {
      //  Uncheck: remove this path and all children

      const updatedPermissions = getUpdatedPermissionsOnDeselect(
        currentPath,
        existingPermissions
      );

      // Update visual check state
      newChecked[data.index] = 0;
      children.forEach(({ index }: any) => {
        newChecked[index] = 0;
      });

      setChecked(newChecked);
      setSelectedPermissions((prev: any) => ({
        ...prev,
        [selectedApplication]: {
          ...(prev[selectedApplication] || {}),
          [permissionType]: updatedPermissions,
        },
      }));
    } else {
      // ✅ Check: add current and parent paths if not present
      const parentPaths = getAllParentPaths(pathArray);
      const pathsToAdd = [currentPath];

      const updatedPermissions = existingPermissions.filter((existingPath) => {
        // Remove if existing path is a prefix of any new path
        return !pathsToAdd.some((newPath) =>
          existingPath.every((val, idx) => newPath[idx] === val)
        );
      });

      const finalPermissions = [...updatedPermissions, ...pathsToAdd];

      pathsToAdd.forEach((p) => {
        const pStr = JSON.stringify(p);
        if (!finalPermissions.some((perm) => JSON.stringify(perm) === pStr)) {
          finalPermissions.push(p);
        }
      });

      // Update visual check state
      newChecked[data.index] = 1;

      setChecked(newChecked);
      setSelectedPermissions((prev: any) => ({
        ...prev,
        [selectedApplication]: {
          ...(prev[selectedApplication] || {}),
          [permissionType]: finalPermissions,
        },
      }));
    }
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
        border: "1px solid #ddd",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: "5px",
        color: "black",
        background: "#cecece",
      }}
    >
      <label
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <Checkbox
          checked={isPermissionChecked(data.key)}
          onChange={setTheChecked}
          theme={user.user.theme_ui}
          style={{ zoom: 0.5 }}
        />
        <span
          style={{ padding: "10px", fontSize: "11px", fontFamily: "roboto" }}
        >
          {data.label}
        </span>
      </label>
      {!(data?.level === 2) && (
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
      {data.level !== 2 && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: "#555" }}
        />
      )}
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

export default function PermissionHeirarchyCanvas({
  dataAllPermissions,
  selectedApplication,
  selectedPermissions,
  setSelectedPermissions,
}: any) {
  const [permissionType, setPermissionType] = useState<
    "location_permission" | "product_permission"
  >("location_permission");

  const [selectedAppAllPermissions, setSelectedApplication] = useState<any>(
    dataAllPermissions?.find(
      (ele: any) => ele.application_name === selectedApplication
    )
  );

  useEffect(() => {
    setSelectedApplication(
      dataAllPermissions?.find(
        (ele: any) => ele.application_name === selectedApplication
      )
    );
  }, [selectedApplication]);

  const [opened, setOpened] = useState<any>([]);

  const [checked, setChecked] = useState<any>([]);

  const generateTreeNodesAndEdges = (allNodes: any) => {
    const nodes: any[] = [];
    const edges: any[] = [];
    const positionX = 100;
    const positionY = 0;

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
          if (permissionType === "location_permission") {
            level3.push(
              `${index}_${key}>${inIndex}_${item}>${inIndex2}_${
                ele[permissionType.split("_")[0] + "_heirarchy_3"]
              }`
            );
          } else {
            level3.push(
              `${index}_${key}>${inIndex}_${item}>${inIndex2}_${
                ele[permissionType.split("_")[0] + "_hierarchy_3"]
              }`
            );
          }
          inIndex2++;
        });
        inIndex++;
      });
    });
    const level1Gap = level3.length / level1.length;

    let index = 0;
    let indexY = 0;

    level1.forEach((key) => {
      const id = index + "_" + key;
      nodes.push({
        id: id,
        type: "customNode",
        position: {
          x: positionX,
          y: positionY + (indexY * level1Gap * 100 + 150),
        },
        data: { label: key, key: id, isOpen: false, index: index, level: 0 },
      });
      index++;
      indexY++;
    });
    indexY = 0;

    level2.forEach((key) => {
      const parts = key.split(">");
      const parentId = parts[0];
      const label = parts[1].split("_")[1];
      if (opened[key.split("_")[0]] == 0) {
        index++;
        indexY++;
        return;
      }
      nodes.push({
        id: key,
        type: "customNode",
        position: { x: positionX + 400, y: positionY + indexY * 100 },
        data: {
          label: label,
          key,
          isOpen: false,
          index: level1.length + indexY,
          level: 1,
        },
      });
      edges.push({
        id: `${parentId}-${key}`,
        source: key.split(">")[0],
        target: key,
        style: { stroke: "#676565", strokeDasharray: "5 5" },
      });
      index++;
      indexY++;
    });
    indexY = 0;

    level3.forEach((key, index3) => {
      const parts = key.split(">");
      const parentId = parts[0] + ">" + parts[1];
      const label = parts[2].split("_")[1];
      if (
        opened[parts[0].split("_")[0]] == 0 ||
        opened[parts[1].split("_")[0]] == 0
      ) {
        index++;
        indexY++;
        return;
      }
      nodes.push({
        id: key,
        type: "customNode",
        position: { x: positionX + 800, y: positionY + indexY * 100 },
        data: {
          label: label,
          key,
          isOpen: false,
          index: level1.length + level2.length + index3,
          level: 2,
        },
      });
      edges.push({
        id: `${parentId}-${key}`,
        source: key.split(">")[0] + ">" + key.split(">")[1],
        target: key,
        style: { stroke: "#676565", strokeDasharray: "5 5" },
      });
      index++;
      indexY++;
    });

    return { nodes, edges };
  };

  const { user } = useUserData();

  const [nodes, setNodes] = React.useState<any>([]);
  const [edges, setEdges] = React.useState<any>([]);

  React.useEffect(() => {
    if (checked && checked.length && opened && opened.length) {
      const { nodes: generatedNodes, edges: generatedEdges } =
        generateTreeNodesAndEdges(selectedAppAllPermissions[permissionType]);
      setNodes(generatedNodes);
      setEdges(generatedEdges);
    }
  }, [opened, checked, selectedAppAllPermissions, permissionType]);

  // @TODO: tell backend to fix the spelling of heirarchy and hierarychy

  React.useEffect(() => {
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
            if (permissionType === "location_permission") {
              level3.push(
                `${index}_${key}>${inIndex}_${item}>${inIndex2}_${
                  ele[permissionType.split("_")[0] + "_heirarchy_3"]
                }`
              );
            } else {
              level3.push(
                `${index}_${key}>${inIndex}_${item}>${inIndex2}_${
                  ele[permissionType.split("_")[0] + "_hierarchy_3"]
                }`
              );
            }
            inIndex2++;
          });
          inIndex++;
        });
      });

      setOpened(Array(level1.length + level2.length + level3.length).fill(1));
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
        }}
      >
        <ViewToggle
          allApplications={["location_permission", "product_permission"]}
          selectedApplication={permissionType}
          setSelectedApplication={setPermissionType}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "90%",
            borderRadius: "10px",
          }}
        >
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
        </div>
      </div>
    </NodeDataContext.Provider>
  );
}
