import { ColumnDataType } from "../../../../../../VectorFlow/types/MTO"

const columnData: ColumnDataType[] = [
    {
        colId: "bpp",
        field: "bpp",
        headerName: "BPP",
        hide: true,
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
        "colId": "pnm",
        "field": "pnm",
        "headerName": "Plant",
        "hide": false,
        "rowDrag": true,
        "cellRenderer": "coloPriority",
        "tooltipComponent": "availabilityToolTip",
        "initialWidth": 200,
        "autoHeaderHeight": true,
        "wrapHeaderText": true
    },
    {
        "colId": "oid",
        "field": "oid",
        "headerName": "Order ID",
        "hide": false,
        "rowDrag": true,
        "tooltipField": "rm",
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "lid",
        "nooi": "*Error*",
        "field": "lid",
        "headerName": "Line Item ID",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "ic",
        "req": "*Error*",
        "field": "ic",
        "headerName": "Item Code",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "id",
        "uom": "*Error*",
        "field": "id",
        "headerName": "Item Description",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "dd",
        "soh": "*Error*",
        "field": "dd",
        "headerName": "Due Date",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "rd",
        "siqc": "*Error*",
        "field": "rd",
        "headerName": "Release Date",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "oq",
        "sit": "*Error*",
        "field": "oq",
        "headerName": "Order Quantity",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "bs",
        "gap": "*Error*",
        "field": "bs",
        "headerName": "Batch Size",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "fk",
        "ppo": "*Error*",
        "field": "fk",
        "headerName": "Full Kit Available",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "rmpm",
        "field": "rmpm",
        "headerName": "RM / PM Coverage",
        "hide": true,
        "cellRenderer": "inputbox",
        "editable": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true,
        "cellStyle": {
            "backgroundColor": "white",
            "border": "1px solid #b9bdba",
            "color": "black",
            "padding": "1px"
        }
    },
    {
        "colId": "cc",
        "tsfs": "*Error*",
        "field": "cc",
        "headerName": "Customer Code",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    },
    {
        "colId": "cn",
        "tsfs": "*Error*",
        "field": "cn",
        "headerName": "Customer Name",
        "hide": false,
        "rowDrag": true,
        "autoHeaderHeight": true,
        "wrapHeaderText": true,
        "initialWidth": 200,
        "filter": "agMultiColumnFilter",
        "floatingFilter": true
    }
]

export default columnData