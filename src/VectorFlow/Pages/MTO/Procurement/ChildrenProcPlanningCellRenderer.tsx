import { useMemo } from 'react';
import VFTable from '../../../../components/VectorFLOW/commons/VFTable';
import { mapProcPlanningChildrenFieldsToColDefs } from '../../../../helpers/utils';
import GetProcHeaderChildren from './Planning/GetProcHeaderChildren.json';
import ChildrenColor from "../Common/ChildrenColor/ChildrenColor";
import { ChildTableWrapper } from './Planning/styles';

const ChildrenProcPlanningCellRenderer = (params: any) => {
    const { HeaderChildren } = GetProcHeaderChildren;
    const ProcPlanningChildrenColumns = mapProcPlanningChildrenFieldsToColDefs(HeaderChildren);

    const customChildrenCellRenderers = useMemo(() => ({
        "coloPriorityOfBall": ChildrenColor
    }), []);

    return (
        <div style={{ backgroundColor: 'white' }}>
            <ChildTableWrapper>

                <VFTable
                    data-testid='VFTable'
                    disableZoomScaling
                    className='child-grid'
                    columnDefs={ProcPlanningChildrenColumns}
                    defaultColDef={{
                        cellStyle: {
                            'text-align': 'center',
                            'height': '50px',
                            "font-style": "normal",
                            "font-variant": "normal",
                            "font-weight": "300",
                            "font-size": "20px",
                            "font-family": "Roboto",
                            'text-overflow': 'ellipsis',
                            'white-space': 'nowrap',
                            'resizable': 'true',
                            'background': 'white',
                        },
                        flex: 0,
                    }}
                    rowData={params.data && params.data.children ? params.data.children : []}
                    height={'300px'}
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
            </ChildTableWrapper>
        </div>
    );
};

export default ChildrenProcPlanningCellRenderer;
