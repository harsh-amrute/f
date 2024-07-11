import { useState, useEffect, useRef } from 'react'
import VFFloatingTab from '../../../../../../components/VectorFLOW/commons/VFFloatingTab'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { ApplyZoomOut } from './styles'
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable'
import { VFTableWrapper } from '../../../../../../components/VectorFLOW/commons/VFTable/styles'
import VFButton from '../../../../../../components/VectorFLOW/commons/VFButton'
import ReasonCellRenderer from './ReasonCellRenderer'
import columnData from './ColumnData'
import DueDateCellRenderer from './DueDateCellRenderer'
import { useGetOrderSchedulingData } from '../../../../../../VectorFlow/Services/MTO/Production/OrderRescheduling'
import { AgGridReactProps } from 'ag-grid-react'
import { GridApi } from 'ag-grid-enterprise'
import { GridRef } from '../../../../../../VectorFlow/types/MDM'


const user = { user: { them_ui: 'pure' } }


const OrderRescheduling = () => {

    const refGraph1 = useRef<GridRef>(null);

    const [selectedRowData, setSelectedRowData] = useState([{}]);


    const getSelectedRowData = () => {
        const selectedData = refGraph1.current?.api.getSelectedRows();
        setSelectedRowData(selectedData!);
    };





    const agGridProps: AgGridReactProps = {

        suppressRowTransform: true,
        tooltipShowDelay: 0.3,
        tooltipTrigger: 'focus',
        tooltipInteraction: true,
        readOnlyEdit: true,
        pagination: true,
        suppressRowClickSelection: true,
        defaultColDef: {
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType: false,
            resizable: false,
            minWidth: 140,
            wrapHeaderText: true,
            autoHeaderHeight: true,
            cellStyle: {
                "text-align": "center",
                'text-overflow': 'ellipsis',

            },
            flex: 1,
        },
        onSelectionChanged: getSelectedRowData

    }


    const [currTab, setCurrTab] = useState('Unschedule');
    const tabs = [{ label: 'Unschedule', value: 'Unschedule', id: 'Unschedule' },
    { label: 'Overwrite Due Date', value: 'Overwrite Due Date', id: 'Overwrite Due Date' }
    ]

    const [tableLoading, setTableLoading] = useState(true);

    let colDef = columnData;
    const [rowData, setRowData] = useState([])




    const addChangeDate = (date: string, key: string) => {

        const newData = rowData;

        newData.forEach(myFunction)

        function myFunction(item: any) {
            if (item.oid === key) {
                item.dd = date;
            }
        }

        setRowData(newData);

    }

    colDef = [{
        field: "",
        headerCheckboxSelection: false,
        checkboxSelection: true,
        maxWidth: 50,
        floatingFilter: false,
    }, ...colDef,
    {
        colId: "dd",
        field: "dd",
        headerName: "Due Date",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        cellRenderer: (currTab === 'Unschedule') ? "" : DueDateCellRenderer,
        cellRendererParams: {
            data: {
                addChangeDate: addChangeDate
            }
        },
        initialWidth: 200,
        width: 200,

        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "rs",
        field: "rs",
        headerName: "Reason",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 210,
        width: 210,
        filter: "agMultiColumnFilter",
        cellRenderer: ReasonCellRenderer,

        floatingFilter: true

    }
    ]
    const { mutateAsync: getOrderSchedulingData } = useGetOrderSchedulingData();
    const GetData = async () => {
        const APIData = await getOrderSchedulingData();
        setRowData(APIData.data.data.results);
        setTableLoading(false);
    }

    const PostData = (data: any) => {
        console.log(data);
    }
    useEffect(() => {
        GetData();

    }, [])


    const unschedule = () => {
        PostData(selectedRowData);
    }

    const overwriteDD = () => {
        PostData(selectedRowData);
    }



    return (
        <>
            <div style={{ width: "100%", position: 'relative', height: '85vh' }}>
                <MTOActionToolBar comp={'orderReschedule'} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <ApplyZoomOut >
                            <VFFloatingTab
                                handleClick={(e) => setCurrTab(e.value)}
                                tabs={tabs}
                                defaultTab={0}
                            />
                        </ApplyZoomOut>
                    </div>
                    <div style={{ width: '100%' }}>
                        <VFTableWrapper height='85vh' >

                            <VFTable
                                disableZoomScaling
                                columnDefs={colDef}
                                rowData={rowData}
                                ref={refGraph1}
                                enableRangeSelection={true}
                                rowSelection="multiple"
                                statusBar={{
                                    statusPanels: [
                                        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                        { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                                        { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                                        { statusPanel: 'agAggregationComponent', align: 'left' },
                                    ],
                                }}
                                onGridReady={() => { setTableLoading(false) }}

                                {...agGridProps}

                                height={"85%"}
                            />
                        </VFTableWrapper>
                    </div>

                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>

                        <div style={{ width: '100%', height: '65px', padding: '30px 80px', background: 'white', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                            <ApplyZoomOut>
                                {
                                    (currTab === 'Unschedule') ?
                                        <VFButton style={{ width: '150px' }} themeUi={user.user.them_ui} onClick={unschedule}>Unschedule</VFButton>
                                        :
                                        <VFButton style={{ width: '200px' }} themeUi={user.user.them_ui} onClick={overwriteDD}>Overwrite Due Date</VFButton>
                                }
                            </ApplyZoomOut>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderRescheduling