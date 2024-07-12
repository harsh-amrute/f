import { ColDef } from "ag-grid-enterprise"

export const columnDataLevel1: ColDef[] = [
    {
        colId: "plnt",
        field: "plnt",
        headerName: "Plant",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true,
        cellRenderer: "agGroupCellRenderer"
    },
    {
        colId: "dept",
        field: "dept",
        headerName: "Department",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "ccrGrp",
        field: "ccrGrp",
        headerName: "CCR Group",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "ccr",
        field: "ccr",
        headerName: "CCR Name",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "r_wip",
        field: "r_wip",
        headerName: "Released WIP In Days",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 300,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "un_fk",
        field: "un_fk",
        headerName: "Unreleased Full Kit In Days",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 300,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    }
]
export const columnDataLevel2: ColDef[] = [
    {
        colId: "order_details",
        field: "order_details",
        headerName: "Order Details",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        cellRenderer: ""
        
    },
    {
        colId: "or_id",
        field: "or_id",
        headerName: "Order Id",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        cellRenderer: "agGroupCellRenderer"
    },
    {
        colId: "or_type",
        field: "or_type",
        headerName: "Order Type",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "line_item_id",
        field: "line_item_id",
        headerName: "Line Item Id",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "fg_code",
        field: "fg_code",
        headerName: " FG Code",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "fg_desc",
        field: "fg_desc",
        headerName: "FG Desc",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 300,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "order_quality",
        field: "order_quality",
        headerName: "Order Quality",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 300,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "quantity_manufacture",
        field: "quantity_manufacture",
        headerName: "Quantity Bal. to Mfg.",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 300,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "r_wip",
        field: "r_wip",
        headerName: "Release WIP In Days",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 300,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "fk",
        field: "fk",
        headerName: "Full Kit",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 300,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "un_fk",
        field: "un_fk",
        headerName: "Unreleased Full Kit In Days",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 300,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
]


export const columnDataLevel3: ColDef[] = [
    {
        colId: "rm_code",
        field: "rm_code",
        headerName: "RM Code",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true,
        cellRenderer: "agGroupCellRenderer"
    },
    {
        colId: "rm_desc",
        field: "rm_desc",
        headerName: "RM Desc",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "rm_req",
        field: "rm_req",
        headerName: "Required RM",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "rm_avbl",
        field: "rm_avbl",
        headerName: "Available RM",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "gap",
        field: "gap",
        headerName: "Gap",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 300,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    }
]

export const colDef = [[...columnDataLevel1], [...columnDataLevel2], [...columnDataLevel3]];
