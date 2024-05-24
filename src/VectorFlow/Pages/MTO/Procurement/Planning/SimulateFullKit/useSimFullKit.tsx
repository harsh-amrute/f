import { useState, useMemo } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { useUserData } from "../../../../../../context"
import simulativeData from '../SimulateFullKit/simulativeFullKit.json'
import AvailabilityCellRenderer from "../../../../MTA/InsightsAndTrends/BTR/AvailabilityCellRenderer";
//import colorPriority from ".././colorPriority";
import AvailabilityToolTip from "../../../../MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import { VFFloatingTabItemProps } from "../../../../../../components/VectorFLOW/commons/VFFloatingTab"
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable';
import { ColorCellRenderer } from '../../../Common/ColorCellRenderer';

const useSimFullKit = () => {
    const { isSideBarOpen } = useUserData()
    const [currentPage, setCurrentPage] = useState<any>(1);
    const tabs: Array<VFFloatingTabItemProps> = [
        {
            id: 'iof',
            label: 'Incremental Order In Fullkit',
            value: 'iof'
        },
        {
            id: 'cf',
            label: 'Cumulative FullKit',
            value: 'cf'
        }
    ];
    const [currentTab, setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0]);
    const [rowData, setRowData] = useState(simulativeData);
    const gridOptions = {
        simFullKitCol: [
            {
                headerName: "", field: "icon", initialWidth: 25, autoHeaderHeight: true, wrapHeaderText: true,
                cellRenderer: "agGroupCellRenderer",
            },
            {
                headerName: "Color Priority", field: "cp", initialWidth: 150, autoHeaderHeight: true, wrapHeaderText: true,
                //  cellRenderer: ColorCellRenderer,
                tooltipComponent: AvailabilityToolTip
            },
            {
                headerName: "Order Line Item", field: "oli", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true,
            },
            {
                headerName: "Order No", field: "ordNo", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true,
            },
            {
                headerName: "FG Code", field: "fgCode", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 180, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "FG Desc", field: "fgDesc",
                autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Order Qty", field: "ordQty", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Batch Size", field: "bs", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Kits Before SM", field: "ksm", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Full Kits Avail", field: "Availability", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true, cellRenderer: AvailabilityCellRenderer, tooltipComponent: AvailabilityToolTip
            },
            {
                headerName: "Cust Name", field: "cn", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Cist Code", field: "cc", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Order Receipt Date", field: "ord", autoHeaderHeight: true, wrapHeaderText: true, initialWidth: 150,
                filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Order Due Date", field: "odd", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            },
            {
                headerName: "Order Release Date", field: "orlsd", autoHeaderHeight: true, wrapHeaderText: true,
                initialWidth: 150, filter: 'agMultiColumnFilter', floatingFilter: true
            }
        ],

    }

    const [columnDef] = useState(gridOptions.simFullKitCol);


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
                        field: "rmcode", headerName: "RM Code",
                        // cellRendererSelector: (params: any) => {
                        //     const moodDetails = {
                        //         component: colorPriority,
                        //         params: { values: ["BMN1231", "BSW1231"] },
                        //     };

                        //     if (params.data) {
                        //         if (params.data.type === "child") return moodDetails;
                        //     }
                        //     return undefined;
                        // },
                    },
                    { field: "rmdesc", headerName: "RM Descp" },
                    { field: "rmreqty", headerName: "RM Reqdty" },
                    { field: "rmavai", headerName: "RM Available" },
                    { field: "rmall", headerName: "RM Allocated" },
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


    const renderView = () => {
        switch (currentTab.id) {
            case "iof":
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
                    </div>
                );
            case "cf":
                return (
                    <div>
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
        RRRRowData: simulativeData,
        currentPage,
        toggleCurrentTab,
        renderView,
        currentTab
    }
}

export default useSimFullKit;