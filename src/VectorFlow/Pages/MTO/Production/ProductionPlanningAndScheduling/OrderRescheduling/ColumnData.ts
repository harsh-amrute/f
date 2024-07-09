import { ColDef } from "ag-grid-enterprise"
import DueDateCellRenderer from "./DueDateCellRenderer"
import ReasonCellRenderer from "./ReasonCellRenderer"
const columnData: ColDef[] = [
    {
        colId: "oid",
        field: "oid",
        headerName: "Column Id",
        hide: false,
        tooltipComponent: "availabilityToolTip",
        initialWidth: 800,
        autoHeaderHeight: true,
        // wrapHeaderText: true,
    },
    {
        colId: "lid",
        field: "lid",
        headerName: "Line Item",
        hide: false,
        tooltipComponent: "availabilityToolTip",
        initialWidth: 150,
        width: 150,
        maxWidth: 150,
        autoHeaderHeight: true,
        wrapHeaderText: true
    },
    {
        colId: "PcSz",
        field: "PcSz",
        headerName: "Procurement Buffer",
        hide: false,

        tooltipField: "rm",
        initialWidth: 180,
        width: 180,
        maxWidth: 180,

        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "PdSz",
        field: "PdSz",
        headerName: "Production Buffer",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    },
    {
        colId: "rnm",
        field: "rnm",
        headerName: "Route",
        hide: false,

        autoHeaderHeight: true,
        wrapHeaderText: true,
        initialWidth: 200,
        filter: "agMultiColumnFilter",
        floatingFilter: true
    }
]

export default columnData