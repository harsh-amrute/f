import React, { createContext, useContext, useState } from 'react';
import { ReactFlow, Handle, Position } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from "uuid";

const NodeDataContext = createContext<any>(undefined);

export default function PermissionHeirarchyCanvas({ heirarchyData,allPermissions}:any) {

    function useNodeDataContext() {
        const context = useContext(NodeDataContext);
        if (!context) {
            throw new Error('useNodeDataContext must be used within a NodeDataProvider');
        }
        return context;
    }

    const [opened, setOpened] = useState<any>([]);

    const [checked, setChecked] = useState<any>([]);


    const generateTreeNodesAndEdges=(allNodes: any)=> {

        console.log("allNodes...", allNodes);
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
                    level3.push(`${index}_${key}>${inIndex}_${item}>${inIndex2}_${ele.location_heirarchy_3}`);
                    inIndex2++;
                });
                inIndex++;
            })
        })
        console.log("level1", level1);
        console.log("level2", level2);
        console.log("level3", level3);



        let index = 0;
        let indexY = 0;

        level1.forEach((key) => {
            nodes.push({
                id: index+'_'+key,
                type: 'customNode',
                position: { x: positionX , y: positionY+(indexY*200) },
                data: { label: index+'_'+key, value: true, isOpen: false, index: index }
            });
            index++;
            indexY++;
        });
        indexY=0;

        level2.forEach((key) => {
            const parts = key.split('>');
            const parentId = parts[0];
            const label = parts[1];
            if(opened[key.split('_')[0]]==0){
                console.log("opened", opened[key.split('_')[0]])
                index++;
                indexY++;
                return;
            }
            nodes.push({
                id: key,
                type: 'customNode',
                position: { x: positionX + 400, y: positionY+(indexY*200) },
                data: { label: key, value: true, isOpen: false, index: level1.length+indexY }
            });
            edges.push({ id: `${parentId}-${key}`, source: key.split('>')[0], target: key });
            console.log("Id level2 parent",  key )
            index++;
            indexY++;
        });
        indexY=0;

        level3.forEach((key, index3) => {
            const parts = key.split('>');
            const parentId = parts[0] + '>' + parts[1];
            const label = parts[2];
            if(opened[parts[0].split('_')[0]]==0 || opened[parts[1].split('_')[0]]==0){
                console.log("opened", opened[key.split('_')[0]], opened[key.split('_')[1]])
                index++;
                indexY++;
                return;
            }
            nodes.push({
                id: key,
                type: 'customNode',
                position: { x: positionX + 800, y: positionY+(indexY*200) },
                data: { label: key, value: true, isOpen: false, index: level1.length+ level2.length+ index3 }
            })
            console.log("parentId level3", parentId)
            edges.push({ id: `${parentId}-${key}`, source: key.split('>')[0]+'>'+key.split('>')[1], target: key });
            index++;
            indexY++;
        });

        console.log("nodes....", nodes)

        


        return {nodes,edges};
    }

    const CustomNode = ({ data }: { data: { label: string, value: boolean , isOpen: boolean, index: number} }) => {

        const { nodes, edges, opened, setOpened, checked, setChecked } = useNodeDataContext();

        // if(opened?.[data.index]==1){
        //     setOpen(true);
        // }

        const setTheIndex = ()=>{
            const newArr = [...opened];
            newArr[data.index] = opened?.[data.index]===1?0:1;
            setOpened(newArr);
        }

        const setTheChecked = ()=>{
            console.log("index", data.index)
            const newArr = [...checked];
            newArr[data.index] = checked?.[data.index]===1?0:1;
            console.log("newArr", newArr);
            setChecked(newArr);
        }

        return (
            <div style={{ padding: '10px', border: '1px solid #ddd',display: 'flex',flexDirection: 'row',  borderRadius: '5px',color: '#cecece', background: '#000000' }}>
                <input type="checkbox" onChange={(e)=>{setTheChecked()}}  checked={checked?.[data?.index]} style={{ marginRight: '10px' }} />
                <span>{data.label}</span>
                <div onClick={setTheIndex} style={{margin: '4px', font: 'bold', fontSize: '20px', cursor: 'pointer'}}>{opened?.[data?.index]==1?`<`:`>`}</div>
                <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
                <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
            </div>
        );
    };
    



    const nodeTypes = {
        customNode: CustomNode,
    };

    const [nodes, setNodes] = React.useState<any>([]);
    const [edges, setEdges] = React.useState<any>([]);

   


    React.useEffect(() => {
        const {nodes: generatedNodes, edges: generatedEdges} = generateTreeNodesAndEdges(allPermissions?.[1]?.location_permission);
        setNodes(generatedNodes);
        setEdges(generatedEdges);
    }, [opened]);
    // const nodes = [
    //     { id: '1', type: 'customNode', position: { x: 0, y: 0 }, data: { label: 'Parent Node', value: true } },
    //     { id: '2', type: 'customNode', position: { x: 200, y: 100 }, data: { label: 'Child Node 1', value: true } },
    //     { id: '3', type: 'customNode', position: { x: 400, y: 0 }, data: { label: 'Child Node 2', value: false} },
    // ];

    // const edges = [
    //     { id: 'e1-2', source: '1', target: '2' },
    //     { id: 'e1-3', source: '2', target: '3' },
    // ];
    

    React.useEffect(()=>{
        const allNodes = allPermissions?.[1]?.location_permission
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
                    level3.push(`${index}_${key}>${inIndex}_${item}>${inIndex2}_${ele.location_heirarchy_3}`);
                    inIndex2++;
                });
                inIndex++;
            })
        })

        setOpened(Array(level1.length + level2.length + level3.length).fill(0));
    },[allPermissions])


    
    return (
        <NodeDataContext.Provider value={{ nodes, edges, opened, setOpened, checked, setChecked}}>
        <div style={{ width: '80vw', height: '80vh' }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
        </div>
        </NodeDataContext.Provider>
    );
}