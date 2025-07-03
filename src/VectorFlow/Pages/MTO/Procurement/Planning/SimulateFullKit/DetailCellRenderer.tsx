import { useMemo } from 'react';
import VFTable from '../../../Common/VFTable';
import { mapSimulateHedaerChildrenFieldsToColDefs } from '../../../../../../helpers/utils';
import GetSimulateHeaderChildren from './GetSimulateChildrenHeader.json';
import ChildrenColor from "../../../Common/ChildrenColor/ChildrenColor";

const DetailCellRenderer = (params: any, childColDef:any) => {
    const columnDef = params?.colDef
    const rowData = params?.data?.children   
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
                rowData={rowData}
                height={'260px'}
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

export default DetailCellRenderer;
