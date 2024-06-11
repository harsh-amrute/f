import { useMemo } from 'react';
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable';
import { mapSimulateHedaerChildrenFieldsToColDefs } from '../../../../../../helpers/utils';
import GetSimulateHeaderChildren from './GetSimulateChildrenHeader.json';
import ChildrenColor from "../../../Common/ChildrenColor/ChildrenColor";

const DetailCellRenderer = (params: any) => {
    const { HeaderChildren } = GetSimulateHeaderChildren;
    const SimulateChildrenColumns = mapSimulateHedaerChildrenFieldsToColDefs(HeaderChildren);

    const customChildrenCellRenderers = useMemo(() => ({
        "coloPriorityOfBall": ChildrenColor
    }), []);

    return (
        <div style={{ backgroundColor: 'white' }}>
            <h3 style={{ marginLeft: 20, fontSize: 17 }}>Raw Material Details</h3>
            <VFTable
                className='child-grid'
                columnDefs={SimulateChildrenColumns}
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

export default DetailCellRenderer;
