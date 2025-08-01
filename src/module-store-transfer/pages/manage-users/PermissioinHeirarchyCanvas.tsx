import React, { createContext, useContext, useState } from 'react';
import { ReactFlow, Handle, Position } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from "uuid";
import Checkbox from '../../../components/VectorFLOW/commons/MTO/Checkbox'
import { BaseEdge, getStraightPath } from '@xyflow/react';


import { useUserData } from '../../../context';
import styled from 'styled-components';

const NodeDataContext = createContext<any>(undefined);


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
  background-color: ${({ active }) => (active ? '#f1d2e0' : '#f5f5f5')};
  color: ${({ active }) => (active ? '#c72e64' : '#000')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  border-radius: 999px;
  cursor: pointer;
  font-size: 10px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#f1d2e0' : '#f5f5f5')};
  }
`;
//@TODO: add type definations later
const ViewToggle = ({allApplications, selectedApplication, setSelectedApplication}:any) => {

  return (
    <ToggleContainer>
        {allApplications.map((app: string) => (
            <ToggleButton
            key={app}
            active={selectedApplication === app}
            onClick={() => setSelectedApplication(app)}
            >
            {app==='location_permission'? 'Location': 'Product'}
            </ToggleButton>
        ))}
    </ToggleContainer>
  );
};

export default function PermissionHeirarchyCanvas({ selectedAppAllPermissions}:any) {

    function useNodeDataContext() {
        const context = useContext(NodeDataContext);
        if (!context) {
            throw new Error('useNodeDataContext must be used within a NodeDataProvider');
        }
        return context;
    }

    const [permissionType, setPermissionType] = useState<'location_permission'| 'product_permission'>('location_permission');


    const [opened, setOpened] = useState<any>([]);

    const [checked, setChecked] = useState<any>([]);


    const generateTreeNodesAndEdges=(allNodes: any)=> {

        const nodes: any[] = [];
        const edges: any[] = [];
        const positionX = 100;
        const positionY = 0;

        
        const level1 = Object.keys(allNodes);
        let level2:string[] = [];
        let inIndex = level1.length;
        level1.forEach((key,index) => {
            const arr = Object.keys(allNodes[key]);
            const newArr:string[] = [];
            arr.forEach((item) => {
                const val = `${index}_${key}>${inIndex}_${item}`;
                newArr.push(val);
                inIndex++;
            });
            level2 = [...level2, ...newArr];
        })

        const level3: string[] = [];
        inIndex = level1.length;
        let inIndex2 = level1.length + level2.length-1;
        level1.forEach((key,index) => {
            const arr = Object.keys(allNodes[key]);

            arr.forEach((item) => {
                allNodes[key][item].forEach((ele:any)=>{
                    if(permissionType==='location_permission'){
                        level3.push(`${index}_${key}>${inIndex}_${item}>${inIndex2}_${ele[permissionType.split('_')[0]+"_heirarchy_3"]}`);
                    }
                    else{
                        level3.push(`${index}_${key}>${inIndex}_${item}>${inIndex2}_${ele[permissionType.split('_')[0]+"_hierarchy_3"]}`);

                    }
                    inIndex2++;
                });
                inIndex++;
            })
        })
        const level1Gap = level3.length/level1.length;

        let index = 0;
        let indexY = 0;

        level1.forEach((key) => {
            const id = index+'_'+key;
            nodes.push({
                id: id,
                type: 'customNode',
                position: { x: positionX , y: positionY+(indexY*level1Gap*100+150) },
                data: { label: key, key: id, isOpen: false, index: index , level: 0}
            });
            index++;
            indexY++;
        });
        indexY=0;

        level2.forEach((key) => {
            const parts = key.split('>');
            const parentId = parts[0];
            const label = parts[1].split('_')[1];
            if(opened[key.split('_')[0]]==0){
                index++;
                indexY++;
                return;
            }
            nodes.push({
                id: key,
                type: 'customNode',
                position: { x: positionX + 400, y: positionY+(indexY*100) },
                data: { label: label, key,isOpen: false, index: level1.length+indexY, level: 1 }
            });
            edges.push({ id: `${parentId}-${key}`, source: key.split('>')[0], target: key, style:{stroke: "#676565", strokeDasharray: '5 5' } });
            index++;
            indexY++;
        });
        indexY=0;

        level3.forEach((key, index3) => {
            const parts = key.split('>');
            const parentId = parts[0] + '>' + parts[1];
            const label = parts[2].split('_')[1];
            if(opened[parts[0].split('_')[0]]==0 || opened[parts[1].split('_')[0]]==0){
                index++;
                indexY++;
                return;
            }
            nodes.push({
                id: key,
                type: 'customNode',
                position: { x: positionX + 800, y: positionY+(indexY*100) },
                data: { label: label,key, isOpen: false, index: level1.length+ level2.length+ index3 , level: 2}
            })
            edges.push({ id: `${parentId}-${key}`, source: key.split('>')[0]+'>'+key.split('>')[1], target: key, style:{stroke: "#676565", strokeDasharray: '5 5' } });
            index++;
            indexY++;
        });

        return {nodes,edges};
    }

    const {user} = useUserData();


    const CustomNode = ({ data }: { data: {  label: string, key:string,isOpen: boolean, index: number, level?: number} }) => {

        const { opened, setOpened, checked, setChecked } = useNodeDataContext();


        const setTheIndex = ()=>{
            const newArr = [...opened];
            newArr[data.index] = opened?.[data.index]===1?0:1;
            setOpened(newArr);
        }

        const setTheChecked = ()=>{
            const newArr:any = [...checked];
            if(newArr[data.index]===0){
                newArr[data.index] = 1;
                newArr[Number(data.key.split('_')[0])] = 1; // Set the parent to checked if this is checked
                newArr[Number(data.key.split('>')[1].split('_')[0])] = 1;
            }else{
                newArr[data.index] = 0;
            }
            newArr[data.index] = checked?.[data.index]===1?0:1;
            setChecked(newArr);
        }

        return (
            <div style={{ padding: '8px', border: '1px solid #ddd',display: 'flex',flexDirection: 'row', alignItems: 'center',  borderRadius: '5px',color: 'black', background: '#cecece' }}>
                <Checkbox checked={checked[data?.index]}  onChange={(e)=>{setTheChecked()}} theme={user.user.theme_ui} style={{ zoom: 0.5}} />
                <span style={{padding: '10px', fontSize: '11px', fontFamily: 'roboto'}}>{data.label}</span>
                {(!(data?.level==2)) && <div onClick={setTheIndex} style={{margin: '2px', font: 'bold', fontSize: '14px', cursor: 'pointer'}}>{opened?.[data?.index]!=1?`<`:`>`}</div>}
                {(!(data?.level==0)) && <Handle type="target" position={Position.Left} style={{ background: '#555' }} />}
                {(!(data?.level==2)) && <Handle type="source" position={Position.Right} style={{ background: '#555' }} />}
            </div>
        );
    };
    

    const nodeTypes = {
        customNode: CustomNode,
    };


    const [nodes, setNodes] = React.useState<any>([]);
    const [edges, setEdges] = React.useState<any>([]);

   


    React.useEffect(() => {
        console.log("checked", checked, "\n open", opened)
        if(checked && checked.length && opened && opened.length){

            const {nodes: generatedNodes, edges: generatedEdges} = generateTreeNodesAndEdges(selectedAppAllPermissions[permissionType]);
            setNodes(generatedNodes);
            setEdges(generatedEdges);

            console.log("gneratedNodes,,,,,,,", generatedNodes);
        }
    }, [opened, checked]);

   
    // @TODO: tell backend to fix the spelling of heirarchy and hierarychy

    React.useEffect(()=>{
        console.log("selectedAppAllPermissions", selectedAppAllPermissions, "\n permissionType", permissionType, selectedAppAllPermissions[permissionType]);
        if(selectedAppAllPermissions && selectedAppAllPermissions[permissionType]){

            const allNodes = selectedAppAllPermissions[permissionType]
            const level1 = Object.keys(allNodes);
            let level2:string[] = [];
            let inIndex = level1.length;
            level1.forEach((key,index) => {
            const arr = Object.keys(allNodes[key]);
            const newArr:string[] = [];
            arr.forEach((item) => {
                const val = `${index}_${key}>${inIndex}_${item}`
                newArr.push(val)
                inIndex++
            })
            level2 = [...level2, ...newArr];
        })

        const level3: string[] = [];
        inIndex = level1.length;
        let inIndex2 = level1.length + level2.length-1;
        level1.forEach((key,index) => {
            const arr = Object.keys(allNodes[key]);

            arr.forEach((item) => {
                allNodes[key][item].forEach((ele:any)=>{
                    if(permissionType==='location_permission'){

                        level3.push(`${index}_${key}>${inIndex}_${item}>${inIndex2}_${ele[permissionType.split('_')[0]+"_heirarchy_3"]}`);
                    }
                    else{
                        level3.push(`${index}_${key}>${inIndex}_${item}>${inIndex2}_${ele[permissionType.split('_')[0]+"_hierarchy_3"]}`);
                    }
                    inIndex2++;
                });
                inIndex++;
            })
        })

        console.log("level1", level1, "\n level2", level2, "\n level3", level3);

        setOpened(Array(level1.length + level2.length + level3.length).fill(1));
        setChecked(Array(level1.length + level2.length + level3.length).fill(0));
    }
    },[selectedAppAllPermissions, permissionType]);


    
    
    return (
        <NodeDataContext.Provider value={{ nodes, edges, opened, setOpened, checked, setChecked}}>
        <div style={{ width: '100%', height: '84%',margin:'8px auto 0 auto', border: '1.5px dashed #cecece', borderRadius: '10px', padding: '8px' }}>
            <ViewToggle allApplications={['location_permission', 'product_permission']} selectedApplication={permissionType} setSelectedApplication={setPermissionType} />
        <div style={{position:'relative', width: '100%', height: '94%', borderRadius: '10px' }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
            </div>
        </div>
        </NodeDataContext.Provider>
    );
}