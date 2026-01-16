import React from 'react'
import { GridOptions } from 'ag-grid-enterprise'
import VFTable from "../../../Common/VFTable";
import { VFTableWrapper } from '../../../../../../components/VectorFLOW/commons/VFTable/styles'

const DayWiseCoverageDetailsCellRenderer = (params: any) => {

    const options: GridOptions<any> = {
        sideBar: false,
        columnDefs: params?.colDef || [],
        defaultColDef: {
            flex:1,
            suppressMenu: true,
            cellStyle: {
                textAlign: "center"
            }
        },
    }


    return (
        // <div>{params.data.status}</div>
        <VFTableWrapper style={{ padding: "2rem" }}>
            <h4 style={{ margin: "0",padding: "0.25rem 0 1rem 0" ,fontSize: '1.6rem'}}>Raw Material Details</h4>
            <VFTable
                className='child-grid'
                pagination={true}
                gridOptions={options}
                columnDefs={options.columnDefs}
                rowData={params.data?.children}
                height={"470px"}
                rowHeight={35}
                disableZoomScaling={true}
                onGridReady={(params: any) => {
                    params?.api?.autoSizeAllColumns()
                }}
            />
        </VFTableWrapper>
    )
}

export default DayWiseCoverageDetailsCellRenderer