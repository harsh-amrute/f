import React from 'react';
import { ReactFlow } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
 

import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }: { data: { label: string } }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px',color: '#cecece', background: '#000000' }}>
            <input type="checkbox" style={{ marginRight: '10px' }} />
            <span>{data.label}</span>
            <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
            <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
        </div>
    );
};

const nodeTypes = {
    customNode: CustomNode,
};

export default function ModalBulkUpload() {
    const nodes = [
        { id: '1', type: 'customNode', position: { x: 0, y: 0 }, data: { label: 'Parent Node' } },
        { id: '2', type: 'customNode', position: { x: 200, y: 0 }, data: { label: 'Child Node 1' } },
        { id: '3', type: 'customNode', position: { x: 400, y: 0 }, data: { label: 'Child Node 2' } },
    ];

    const edges = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e1-3', source: '1', target: '3' },
    ];

    return (
        <div style={{ width: '80vw', height: '80vh' }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
        </div>
    );
}