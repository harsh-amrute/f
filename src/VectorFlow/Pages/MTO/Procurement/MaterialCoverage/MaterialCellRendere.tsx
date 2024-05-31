import React, { useMemo } from 'react';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import ChildrenColor from "./ChildrenColor";
import {HeaderChildren} from './Data';
import {mapChildrenHeaderFieldsToColDefs} from '../../../../../helpers/utils';
const MaterialCellRenderer = (params: any) => {
  //  const {HeaderChildren} = HeaderChildren
    const columnDef = mapChildrenHeaderFieldsToColDefs(HeaderChildren)
 
    const customChildrenCellRenderers = useMemo(() => ({
        "coloPriorityOfBall": ChildrenColor
    }), []);
 
    return (
        <div style={{ backgroundColor: 'white' }}>
            <h3 style={{ marginLeft: 20, fontSize: 17 }}>Raw Material Details</h3>
            <VFTable
                className='child-grid'
                columnDefs={columnDef}
                defaultColDef={{
                    cellStyle: {
                        'flex': 1,
                        'text-align': 'center',
                        'height': '50px',
                        "font-style": "normal",
                        "font-variant": "normal",
                        "font-weight": "bold",
                        "font-size": "20px",
                        "font-family": "Roboto",
                        'text-overflow': 'ellipsis',
                        'white-space': 'nowrap',
                        'resizable': 'true',
                        'background': 'white',
                        "display": "block",
                    },
                    flex: 0,
                }}
                rowData={params.data.children}
                height={300}
                pagination={true}
                components={customChildrenCellRenderers}
                masterDetail={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                enableRangeSelection={true}
                paginationAutoPageSize={true}
                alwaysShowVerticalScroll={true}
                statusBar={{
                    statusPanels: [
                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                }}
            />
        </div>
    );
};
 
export default MaterialCellRenderer;