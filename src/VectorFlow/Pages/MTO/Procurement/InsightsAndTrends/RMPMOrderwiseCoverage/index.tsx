import { useState, useEffect } from 'react'
import ActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import GridView from './GridView/GridView'
import GraphView from './GraphView/GraphView'
import { InsightsAndTrendsString } from '../../../Common/String'
import { Order } from '../../../../../../VectorFlow/types/MTO'
import { ColDef } from 'ag-grid-enterprise'
import columnData from './ColumnData'
import { AgGridReactProps } from 'ag-grid-react'
import { useGetOrderwiseCoverageData } from '../../../../../../VectorFlow/Services/MTO/Procurement/OrderwiseCoverage'
import { toast } from 'react-toastify'
import { notifyError, notifyLoader, notifySuccess } from '../../../../../../helpers/notify'
import { useGetUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UIConfig'
import { getColumnDefinations } from '../../../../../../helpers/utils'
import ColorCellRenderer from '../../../Common/ColorCellRenderer'
import ColorRangeCellRenderer from '../../../Common/ColorRangeCellRenderer'
import FullkitCellRenderer from '../../../Common/FullkitCellRenderer'
import { pagination } from '../../../Common/Enum'


const RMPMOrderwiseCoverage = () => {

    const [isGridView, setIsGridView] = useState(false);


    const { mutateAsync: getOrderwiseCoverageData } = useGetOrderwiseCoverageData();



    const agGridProps: AgGridReactProps = {
        tooltipShowDelay: 0,
        tooltipTrigger: "focus",
        sideBar: {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    minWidth: 225,
                    maxWidth: 225,
                    width: 225
                }
            ],
        },

        gridOptions: {

            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },


            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,

            pagination: true,
            paginationAutoPageSize: false,
            paginationPageSize: pagination.mtoPageSize,

            defaultColDef: {
                filter: "agTextColumnFilter",
                floatingFilter: true,
                suppressMenu: true,
                resizable: true,

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
                },
                flex: 1,
                // floatingFilterComponentParams: { suppressFilterButton: true },
            },

        },
        masterDetail: true,

        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,

        onCellEditingStopped(event: any) {
            const field = event.colDef.field;
            // const newValue = event.newValue;
            const rowIndex = event.rowIndex;

            if (!field || rowIndex == null) {
                return;
            }
        }
    };

    // const [ShortageColumns, setShortageColumns] = useState(columnData);
    const [HeaderData, setHeaderData] = useState([{}]);
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()

    const reportName = "RMPMOrderWiseCoverage";

    const customColumnDefs = {
        BPP: {
            cellRenderer: ColorCellRenderer,
        }
    }

    const [ShortageColumns, setShortageColumns] = useState([{}]);
    const setColumnDef = async () => {
        try {
            const response = await getUIConfigData(reportName);
            setHeaderData(response?.data?.data);
            setShortageColumns(getColumnDefinations(HeaderData, customColumnDefs, []));
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setColumnDef();
    }, [])

    const customHeader = {
        BPP: {
            cellRenderer: ColorRangeCellRenderer,
            initialWidth: 200,
            autoHeaderHeight: true,
            wrapHeaderText: true,
        },
        OrderType: {
            cellRenderer: () => {

                return (
                    <>{"END-TO-END"}</>
                )
            },
        },
        FullKitAvailable: {
            cellRenderer: FullkitCellRenderer,
            minWidth: 90,
            cellStyle: {
                paddingRight: '20px'
            },
        }


    }


    useEffect(() => {
        setShortageColumns(getColumnDefinations(HeaderData, customHeader))
    }, [HeaderData])

    const mapDataToColumns = (data: any, columns: ColDef[]) => {
        return data?.map((item: any) => {
            const mappedItem: any = {};
            columns?.forEach(column => {
                if (column.field) {
                    if (column.field === "rmpm") {
                        if (item['or'] > 0) {
                            mappedItem[column.field] = InsightsAndTrendsString.ordersWithRMPM;
                        }
                        else if (item['po'] > 0) {
                            mappedItem[column.field] = InsightsAndTrendsString.ordersWithFullkitOPO;
                        }
                        else if (item['sit'] > 0) {
                            mappedItem[column.field] = InsightsAndTrendsString.ordersWithFullkitSIT;
                        }
                        else {
                            mappedItem[column.field] = InsightsAndTrendsString.ordersWithFullkitOHS;
                        }
                    }
                    else {
                        mappedItem[column.field] = item[column.field as keyof Order];
                    }
                }
            });
            return mappedItem;

        });
    };

    const [convertedData, setConvertedData] = useState([{}]);
    const [GraphDatas, setGraphDatas] = useState([{}])
    const [apiGraphData, setApiGraphData] = useState([{}]);
    const [apiGridData, setApiGridData] = useState([{}]);
    const GetData = async (graph: any, page: any) => {
        if (graph === 1) {

            try {
                notifyLoader("Loading Data...")
                const APIData = await getOrderwiseCoverageData({ graph, page });
                if (APIData.status.toString() === '200') {
                    toast.dismiss();
                    notifySuccess("Data Fetched Successfully!")
                }
                setApiGraphData(APIData?.data?.data);


            } catch (e) {
                toast.dismiss();
                notifyError("Failed to fetch Data");
            }
        }
        else {
            try {
                notifyLoader("Loading Data...")
                const APIData = await getOrderwiseCoverageData({ graph, page });
                if (APIData.status.toString() === '200') {
                    toast.dismiss();
                    notifySuccess("Data Fetched Successfully!")
                }
                setApiGridData(APIData?.data?.data);


            } catch (e) {
                toast.dismiss();
                notifyError("Failed to fetch Data");
            }

        }

    }

    useEffect(() => {
        GetData(1, 1);
        GetData(0, 1);
    }, [])

    useEffect(() => {
        setConvertedData(mapDataToColumns(apiGridData, columnData));
    }, [apiGridData])

    useEffect(() => {
        setGraphDatas(apiGraphData)
    }, [apiGraphData])




    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>


                <ActionToolBar comp={"rmpm"} isGoBackButton={isGridView} handleGoBack={() => { (setIsGridView(false)) }} isAddFilterButton isChartGridToggle isGridView={isGridView} setIsGridView={setIsGridView} />

                <div style={{ flex: '1' }}>

                    {(isGridView) ? <GridView agGridProps={agGridProps} ShortageColumns={ShortageColumns} ShortageDatas={convertedData} /> : <GraphView shortageData={GraphDatas} />}
                </div>
            </div>
        </>
    )
}
export default RMPMOrderwiseCoverage
