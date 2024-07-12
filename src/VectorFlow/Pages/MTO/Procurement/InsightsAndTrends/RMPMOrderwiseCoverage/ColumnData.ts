import { ColDef } from "ag-grid-enterprise"
const columnData: ColDef[] = [
    {
        colId: "bpp",
        field: "bpp",
        headerName: "BPP",
        hide: false,
        cellRenderer: "coloPriority",
        tooltipComponent: "availabilityToolTip",
        initialWidth: 100,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        cellStyle: {
            backgroundColor: "black",
            color: "white",
            border: "8px solid white"

        }

    },
    {
        colId: "pnm",
        field: "pnm",
        headerName: "Plant",
        hide: false,
        cellRenderer: "coloPriority",
        tooltipComponent: "availabilityToolTip",
        initialWidth: 200,
        autoHeaderHeight: true,
        wrapHeaderText: true
    },
    {
        colId: "oid",
        field: "oid",
        headerName: "Order ID",
        hide: false,

        tooltipField: "rm",
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "lid",
        field: "lid",
        headerName: "Line Item ID",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "ic",
        field: "ic",
        headerName: "Item Code",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "id",
        field: "id",
        headerName: "Item Description",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "dd",
        field: "dd",
        headerName: "Due Date",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "rd",
        field: "rd",
        headerName: "Release Date",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "oq",
        field: "oq",
        headerName: "Order Quantity",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "bs",
        field: "bs",
        headerName: "Batch Size",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "fk",
        field: "fk",
        headerName: "Full Kit Available",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "rmpm",
        field: "rmpm",
        headerName: "RM / PM Coverage",
        hide: false,
        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 400,
        filter: "agMultiColumnFilter",
        floatingFilter: true,
    },
    {
        colId: "cc",
        field: "cc",
        headerName: "Customer Code",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "cn",
        field: "cn",
        headerName: "Customer Name",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    }
]

export default columnData