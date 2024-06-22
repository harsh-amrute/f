import { GridOptions } from 'ag-grid-enterprise'
import React from 'react'
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable'
import CustomGroupCellRenderer from './CustomGroupCellRenderer'
import DayWiseCoverageDetailsCellRenderer from './DayWiseCoverageDetailsCellRenderer'
import { tableData } from './table_data'


const DayWiseCoverageTable = () => {

    const options: GridOptions<any> = {
        columnDefs: [
            { headerName: "Status", field: "status", rowGroup: true, hide: true, suppressMenu: true, },
            { headerName: "Color Priority", field: "clr", suppressMenu: true, },
            { headerName: "Order Number", field: "on", suppressMenu: true },
            { headerName: "Order Receive Date", field: "ord", suppressMenu: true },
            { headerName: "Order Due Date", field: "odd", suppressMenu: true },
            { headerName: "Order Quantity", field: "oq", suppressMenu: true },
            { headerName: "Customer Name", field: "cn", suppressMenu: true },
            { headerName: "Customer Code", field: "cc", suppressMenu: true },
            { headerName: "Item Code", field: "ic", suppressMenu: true },
            { headerName: "Item Descp", field: "id", suppressMenu: true },
        ],
        autoGroupColumnDef: {
            headerName: "Group",
            cellRenderer: CustomGroupCellRenderer,
            suppressMenu: true,
        },
        defaultColDef: {
            resizable: true
        },
        masterDetail: true,
        detailCellRenderer: DayWiseCoverageDetailsCellRenderer,
        sideBar: "columns",
    }

    return (
        <VFTable
            animateRows={true}
            gridOptions={options}
            height={"500px"}
            disableZoomScaling={true}
            columnDefs={options.columnDefs}
            rowData={tableData.data}
        />
    )
}

export default DayWiseCoverageTable