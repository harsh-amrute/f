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


