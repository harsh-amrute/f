import { useState, useMemo } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { useUserData } from "../../../../../context"
import data from './data.json';
import coverageAvlData from './coverageAvlData.json';
import ColoPriority from "../../../MTA/InsightsAndTrends/BTR/ColorPriority";
import colorPriority from "./colorPriority";
import AvailabilityToolTip from "../../../MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import inputbox from './inputbox';
import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import { useNavigate } from "react-router-dom";

const usePP = () => {
    const { isSideBarOpen } = useUserData()
    const [currentPage, setCurrentPage] = useState<any>(1);
    const navigate = useNavigate();
    const tabs: Array<VFFloatingTabItemProps> = [
        {
            id: 'ca',
            label: 'Completely Available',
            value: 'ca'
        },
        {
            id: 'short',
            label: 'Shortage',
            value: 'short'
        }
    ];
    const [currentTab, setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0]);
    const [rowData, setRowData] = useState(data);
    const [coverageAvlRow, setCoverageAvlData] = useState(coverageAvlData);
    const gridOptions = {
        ShortcolumnDef: [
            {
                headerName: "", field: "icon", initialWidth: 25, autoHeaderHeight: true, wrapHeaderText: true,
                cellRenderer: "agGroupCellRenderer",
            },
            {
                headerName: "Color Priority", field: "cp", initialWidth: 150, autoHeaderHeight: true, wrapHeaderText: true,
                cellRenderer: ColoPriority, tooltipComponent: AvailabilityToolTip
            },
            {
                headerName: "Order Line Item", field: "oli", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true,
            },
            {
                headerName: "RM Code", field: "rmCode", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true,
            },
            {
                headerName: "RM Description", field: "rmDesc", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 180, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "No of Orders Impacted", field: "noOfOrdImp",
                autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Total Req", field: "totalReq", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "UOM", field: "uom", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Stock On Hand", field: "soh", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Stock in QC", field: "sq", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Stock In Transit", field: "st", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Gap", field: "gap", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Pending PO", field: "penD", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Expected Add Stock",
                field: "edit",
                cellRenderer: inputbox,
                editable: true,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true,
            },
            {
                headerName: "Total Stock For Simulation", field: "tsfs", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            }
        ],
        CoverageAvlColumnDef: [
            {
                headerName: "", field: "icon", initialWidth: 25, autoHeaderHeight: true, wrapHeaderText: true,
                cellRenderer: "agGroupCellRenderer",
            },
            {
                headerName: "Color Priority", field: "cp", initialWidth: 150, autoHeaderHeight: true, wrapHeaderText: true,
                cellRenderer: ColoPriority, tooltipComponent: AvailabilityToolTip
            },
            {
                headerName: "Order Line Item", field: "oli", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true,
            },
            {
                headerName: "RM Code", field: "rmCode", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true,
            },
            {
                headerName: "RM Description", field: "rmDesc", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 180, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "No of Orders Impacted", field: "noOfOrdImp",
                autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Total Req", field: "totalReq", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "UOM", field: "uom", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Stock On Hand", field: "soh", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Stock in QC", field: "sq", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Stock In Transit", field: "st", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Gap", field: "gap", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Pending PO", field: "penD", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Total Stock For Simulation", field: "tsfs", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            }
        ],
    }

    const [columnDef] = useState(gridOptions.ShortcolumnDef);
    const [covAvlDef] = useState(gridOptions.CoverageAvlColumnDef);

    const icons = useMemo(() => {
        return {
            groupExpanded: `<img src="${'/assets/img/VectorFLOW/NMS/minus_circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
            groupContracted: `<img src="${'/assets/img/VectorFLOW/NMS/add-circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
        };
    }, []);

    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []);

    const detailCellRendererParams = useMemo(() => {
        return {
            // level 2 grid options
            detailGridOptions: {
                columnDefs: [
                    {
                        field: "orderNo", headerName: "Order No",
                        cellRendererSelector: (params: any) => {
                            const moodDetails = {
                                component: colorPriority,
                                params: { values: ["BMN1231", "BSW1231"] },
                            };

                            if (params.data) {
                                if (params.data.type === "child") return moodDetails;
                            }
                            return undefined;
                        },
                    },
                    { field: "orderQty", headerName: "Order Qty" },
                    { field: "custName", headerName: "Cust Name" },
                    { field: "custCode", headerName: "Cust Code" },
                    { field: "orderDueDate", headerName: "Order Due Date" },
                    { field: "orderRlsDate", headerName: "Order Release Date" },
                ],
                defaultColDef: {
                    flex: 0,
                },
                masterDetail: true,
                rowSelection: "multiple",
                suppressRowClickSelection: true,
                enableRangeSelection: true,
                pagination: true,
                paginationAutoPageSize: true,
                alwaysShowVerticalScroll: true,
            },
            getDetailRowData: (params: any) => {
                if (undefined != params.data.children) {
                    params.successCallback(params.data.children);
                }
            },
        };
    }, []);
    const toggleCurrentTab = (tab: VFFloatingTabItemProps) => setCurrentTab(tab);
    const navigateToSimulateScreen = () => {
        navigate("/planning/simulativeFullKit");
    }

    const renderView = () => {
        switch (currentTab.id) {
            case "ca":
                return (
                    <div>
                        <VFTable
                            {...agGridProps}
                            columnDefs={covAvlDef}
                            rowData={coverageAvlRow}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                        />
                    </div>
                );
            case "short":
                return (
                    <div>
                        <VFTable
                            {...agGridProps}
                            columnDefs={columnDef}
                            rowData={rowData}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                        />
                        <div style={{ textAlign: 'right' }}>
                            <VFButton onClick={navigateToSimulateScreen} themeUi="" disabled={false} width={250}>Simulate improvement in Full Kits</VFButton>
                        </div>

                    </div>
                );
            default:
                return <VFTable columnDefs={[]} rowData={[]} {...agGridProps} />
        }
    }
    const agGridProps: AgGridReactProps = {
        tooltipShowDelay: 0,
        tooltipTrigger: "focus",
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },
            pagination: false,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,
            icons: icons,
            defaultColDef: {
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
            },
        },
        masterDetail: true,
        detailCellRendererParams: detailCellRendererParams,
        autoGroupColumnDef: autoGroupColumnDef,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
    };

    return {
        isSideBarOpen,
        columnDef,
        agGridProps,
        RRRRowData: data,
        currentPage,
        toggleCurrentTab,
        renderView,
        currentTab
    }
}

export default usePP;