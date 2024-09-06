import React from 'react'
import { GridOptions } from 'ag-grid-enterprise'
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable'

const DayWiseCoverageDetailsCellRenderer = (params: any) => {

    const options: GridOptions<any> = {
        columnDefs: [
            {
                headerName: "Missing RM Qty", field: "mrq",
                cellStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                },
                cellRenderer: (params: any) => {
                    return (<div style={{ borderRadius: "50%", background: params.data.rmq == params.data.rmal ? "#33800B" : "#E53F3F", width: "30px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", padding: "1.5rem", color: "white" }}>
                        {params.value}
                    </div>)
                }
            },
            { headerName: "RM Code", field: "rmc" },
            { headerName: "RM Descp", field: "rmd" },
            { headerName: "RM ReqQty", field: "rmq" },
            { headerName: "RM Available", field: "rmav" },
            { headerName: "RM Allocated", field: "rmal" },
        ],
        defaultColDef: {
            suppressMenu: true,
            cellStyle: {
                textAlign: "center"
            }
            // flex: 1
        },
    }


    return (
        // <div>{params.data.status}</div>
        <div style={{ padding: "2rem" }}>
            <h4 style={{ margin: "0" }}>Raw Material Details</h4>
            <VFTable
                className='child-grid'
                pagination={true}
                gridOptions={options}
                rowData={params.data?.children}
                height={"300px"}
                disableZoomScaling={true}
                onGridReady={(params: any) => {
                    params?.columnApi?.autoSizeAllColumns()
                }}
            />
        </div>
    )
}

export default DayWiseCoverageDetailsCellRenderer