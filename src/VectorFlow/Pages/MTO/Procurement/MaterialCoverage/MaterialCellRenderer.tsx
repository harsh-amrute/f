import { useMemo } from 'react';
import VFTable from '../../Common/VFTable';
import ChildrenColor from "../../Common/ChildrenColor/ChildrenColor";
import { HeaderChildren } from './Data';
import { mapSimulateHedaerChildrenFieldsToColDefs } from '../../../../../helpers/utils';
import { SCDynamicContainer } from './styles';
const MaterialCellRenderer = (params: any) => {
    //  const {HeaderChildren} = HeaderChildren
    const columnDef = mapSimulateHedaerChildrenFieldsToColDefs(HeaderChildren)

    const customChildrenCellRenderers = useMemo(() => ({
        "coloPriorityOfBall": ChildrenColor,
    }), []);

    return (
        <div style={{ backgroundColor: 'transparent' }}>
            <h3 style={{ marginLeft: 20, fontSize: 12 }}>Raw Material Details</h3>

            <SCDynamicContainer>

                <VFTable
                    className='child-grid'
                    columnDefs={columnDef}
                    disableZoomScaling
                    defaultColDef={{
                        cellStyle: {
                            'flex': 1,
                            'text-align': 'center',
                            'height': '50px',
                            "font-style": "normal",
                            "font-variant": "normal",
                            "font-weight": "normal",
                            "font-size": "20px",
                            "font-family": "Roboto",
                            'text-overflow': 'ellipsis',
                            'white-space': 'nowrap',
                            'resizable': 'true',
                            'background': 'white',
                            "display": "block",
                        },
                        flex: 1,
                    }}
                    rowData={params.data.children}
                    height={'180px'}
                    pagination={true}
                    paginationPageSize={3}
                    components={customChildrenCellRenderers}
                    masterDetail={true}
                    rowSelection="multiple"

                    suppressRowClickSelection={true}
                    enableRangeSelection={true}
                    // paginationAutoPageSize={true}
                    // suppressPaginationPanel
                    statusBar={{
                        statusPanels: [
                            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                        ]
                    }}
                />
            </SCDynamicContainer>
        </div>
    );
};

export default MaterialCellRenderer;