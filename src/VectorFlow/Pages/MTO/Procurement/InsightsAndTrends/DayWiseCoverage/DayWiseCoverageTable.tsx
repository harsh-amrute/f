import { GridOptions } from 'ag-grid-enterprise'
import React from 'react'
import ColorCellRenderer from '../../../Common/ColorCellRenderer'
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable'
import CustomGroupCellRenderer from './CustomGroupCellRenderer'
import DayWiseCoverageDetailsCellRenderer from './DayWiseCoverageDetailsCellRenderer'
import { tableData } from './table_data'

// interface IDayWiseCoverageProps {
//     selectedDate?: string,
// }

// const DayWiseCoverageTable = ({
//     selectedDate,
// }: IDayWiseCoverageProps) => {
const DayWiseCoverageTable = () => {

    const options: GridOptions<any> = {
        getRowStyle: (params: any) => {
            return {
                background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
            };
        },
        columnDefs: [
            { headerName: "Status", field: "status", rowGroup: true, hide: true, suppressMenu: true, },
            {
                headerName: "Color Priority", field: "clr", suppressMenu: true, cellRenderer: (params: any) => {
                    if (params.node.group) {
                        return null
                    }
                    return ColorCellRenderer(params)
                }
            },
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
            initialWidth: 220
        },
        masterDetail: true,
        detailCellRendererParams: {
            innerHeight: 400
        },
        detailCellRenderer: DayWiseCoverageDetailsCellRenderer,
        detailRowAutoHeight: true,
        sideBar: {
            toolPanels: ['columns']
        }

    }

    return (
        <VFTable
            animateRows={true}
            gridOptions={options}
            height={"450px"}
            disableZoomScaling={true}
            columnDefs={options.columnDefs}
            rowData={tableData.data}
            pagination={true}
            onGridReady={(params: any) => {
                console.log(params.api.sizeColumnsToFit)
                params.columnApi.autoSizeAllColumns()
            }}
        />
    )
}

export default DayWiseCoverageTable