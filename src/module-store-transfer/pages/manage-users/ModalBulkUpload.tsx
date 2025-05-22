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


    const generateTreeNodesAndEdges=(data: any)=> {

        console.log("data....", data);
        const nodes: any[] = [];
        const edges: any[] = [];
        const positionX = 100;
        const positionY = 0;
    
        const level1 = Object.keys(data)
        .map((ele:any)=>{
            return {ele, id: uuidv4(), isOpen: false};
        })
    
        const level2:any = [];
        level1?.forEach((ele:any)=>{
            let newArr:any = [];
            newArr = [...newArr, ...Object.keys(data[ele])];
            level2.push(newArr);
        })
    
        let Yinc = 0;
        level2.forEach((parent:any, index:number) => {
            
            parent.forEach((key:any, index2:number) => {
            const val = uuidv4();
            nodes.push({
                id: key+val,
                type: 'customNode',
                position: { x: positionX+500 , y: positionY+(Yinc) },
                data: { label: key, value: false, isOpen: true, index: index2 },
            })
            Yinc+=120;
            edges.push({              
                id: `e${parent}-${key+val}`,
                source: level1[index],
                target: key+val,
            });
        });
        Yinc+= 120;
        });
    
        let val2 = level2.length/level1.length*10+500;
    
        level1.forEach((key, index) => {
            nodes.push({
                id: key,
                type: 'customNode',
                isOpen: true,
                position: { x: positionX , y: positionY+(index )*80+val2},
                data: { label: key, value: false, isOpen: true },
            })
            val2+=500;
        });
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
        const {nodes: generatedNodes, edges: generatedEdges} = generateTreeNodesAndEdges(allPermissions?.[0]?.location_permission);
        setNodes(generatedNodes);
        setEdges(generatedEdges);
    }, [allPermissions]);
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
        console.log("checked.....", checked)
    },[checked])


    
    return (
        <NodeDataContext.Provider value={{ nodes, edges, opened, setOpened, checked, setChecked}}>
        <div style={{ width: '80vw', height: '80vh' }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
        </div>
        </NodeDataContext.Provider>
    );
}