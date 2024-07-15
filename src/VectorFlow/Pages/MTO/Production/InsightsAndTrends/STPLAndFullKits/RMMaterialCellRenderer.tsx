import { GridOptions } from 'ag-grid-enterprise'
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable'

  const CustomHeader = ({ headerName }: any) => {
    return (
      <div
        style={{
          fontFamily: "Roboto",
          background: "black",
          fontWeight: "500",
          fontSize: "14px",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        {headerName}
      </div>
    );
  };


const RMMaterialCellRenderer = (params: any) => {
    
    const options: GridOptions<any> = {
        columnDefs:  [
                        {
                            colId: "rm_material",
                            field: "rm_material",
                            headerName: "RM Material",
                            hide: false,
                            autoHeaderHeight: true,
                            wrapHeaderText: true,
                            // initialWidth: 200,
                            headerComponent: () => <CustomHeader headerName="RM Material" />
        
                        },
                        {
                            colId: "rm_code",
                            field: "rm_code",
                            headerName: "RM Code",
                            hide: false,
                            autoHeaderHeight: true,
                            wrapHeaderText: true,
                            // initialWidth: 200,
                            cellRenderer: "agGroupCellRenderer"
                        },
                        {
                            colId: "rm_desc",
                            field: "rm_desc",
                            headerName: "RM Desc",
                            hide: false,
                            autoHeaderHeight: true,
                            wrapHeaderText: true,
                            // initialWidth: 200,
                        },
                        {
                            colId: "rm_req",
                            field: "rm_req",
                            headerName: "Required RM",
                            hide: false,
                            autoHeaderHeight: true,
                            wrapHeaderText: true,
                            // initialWidth: 200,
                        },
                        {
                            colId: "rm_avbl",
                            field: "rm_avbl",
                            headerName: "Available RM",
                            hide: false,
                            autoHeaderHeight: true,
                            wrapHeaderText: true,
                            // initialWidth: 200,
                        },
                        {
                            colId: "gap",
                            field: "gap",
                            headerName: "Gap",
                            hide: false,
                            autoHeaderHeight: true,
                            wrapHeaderText: true,
                            // initialWidth: 300,
                        }
                    ],
        defaultColDef: {
            suppressMenu: true,
            cellStyle: {
                textAlign: "center"
            },
            flex: 1
        },
    }


    return (
        <div style={{ padding: "2rem" }}>
            <VFTable
                className='child-grid'
                pagination={true}
                gridOptions={options}
                rowData={params.data?.children}
                height={"300px"}
                disableZoomScaling={true}
                onGridReady={(params: any) => {
                    params.columnApi.autoSizeAllColumns()
                }}
            />
        </div>
    )
}

export default RMMaterialCellRenderer;