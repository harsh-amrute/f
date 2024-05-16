import { useState, useMemo } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { useUserData } from "../../../../../context"
import { OrderDetailsData } from '../MaterialCoverage/Data';
//import AvailabilityToolTip from "../../../MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import AvailabilityCellRenderer from "../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityCellRenderer";
import { ColorCellRenderer } from "../../../../../components/VectorFLOW/commons/MTO/ColorCellRenderer";

const useMaterialSO = () => {
    const { isSideBarOpen } = useUserData()
    // const [rowData, setRowData] = useState(OrderDetailsData);
    // const [coverageAvlRow, setCoverageAvlData] = useState(coverageAvlData);
    const gridOptions = {
        ShortcolumnDef: [
            {
                headerName: "",
                field: "icon",
                initialWidth: 25,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                cellRenderer: "agGroupCellRenderer",
            },
            {
                headerName: "Color Priority",
                field: "cp",
                initialWidth: 150,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                cellRenderer: ColorCellRenderer,
            },
            {
                headerName: "Order Line Item",
                field: "oli",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true,
            },
            {
                headerName: "Order No",
                field: "rmCode",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true,
            },
            {
                headerName: "Order Qty",
                field: "rmDesc",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 180,
                filter: 'agMultiColumnFilter',
                floatingFilter: true
            },
            {
                headerName: "Batch Size",
                field: "noOfOrdImp",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true
            },
            {
                headerName: "Full Kit Avail",
                field: "totalReq",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true
            },
            {
                headerName: "",
                field: "Availability",
                initialWidth: 150,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                cellRenderer: AvailabilityCellRenderer,
            },
            {
                headerName: "Cust Name",
                field: "uom",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true
            },
            {
                headerName: "Cust Code",
                field: "soh",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true
            },
            {
                headerName: "FG Code",
                field: "sq",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true
            },
            {
                headerName: "FG Descp",
                field: "st",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true
            },
            {
                headerName: "Order Receipt Date",
                field: "gap",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true
            },
            {
                headerName: "Order Due Date",
                field: "penD",
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true
            },
            {
                headerName: "Order Release Date",
                field: "edit",
                //   cellRenderer: inputbox,
                editable: true,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 150,
                filter: 'agMultiColumnFilter',
                floatingFilter: true,
            }
        ],

    }

    const [columnDef] = useState(gridOptions.ShortcolumnDef);
    // const [covAvlDef] = useState(gridOptions.CoverageAvlColumnDef);

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
                    { field: "RMcode", headerName: "RM code" },
                    { field: "RMDescp", headerName: "RM Descp" },
                    { field: "RMRegdQty", headerName: "RM RegdQty" },
                    { field: "RMAvailable", headerName: "RM Available" },
                    { field: "RMAllocatte", headerName: "RM Allocatte" },
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
        RRRRowData: OrderDetailsData,
    }
}

export default useMaterialSO;