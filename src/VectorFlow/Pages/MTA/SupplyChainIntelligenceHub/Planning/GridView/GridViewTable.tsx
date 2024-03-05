
import { Allotment } from "allotment"
import "allotment/dist/style.css";
import { GridViewLayout } from "./styles";
import { AgGridReactProps } from "ag-grid-react";
import { ColDef } from "ag-grid-enterprise";
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable';


interface GridViewTableProps {
    agGridProps:AgGridReactProps,
    agGridColDefs:ColDef[],
    agGridRowData:any,
    customGridRowData:any,
    customGridColDef:Array<{headerName:string,colId:string,field:string}>

}

const GridViewTable = ({agGridProps,agGridColDefs,agGridRowData,customGridRowData,customGridColDef}:GridViewTableProps) => {
    console.log(customGridColDef);
    console.log(customGridRowData);
    
    return(
        <GridViewLayout>
            <div style={{height:'100vh'}}>
                <Allotment vertical defaultSizes={[400,100]}>
                <Allotment.Pane >
                    <VFTable
                        {...agGridProps}
                        columnDefs={agGridColDefs}
                        rowData={agGridRowData}
                    />
                </Allotment.Pane>
                <Allotment.Pane maxSize={300}>
                {/* {isSubGridOpen && (
                    <BPRViewTable
                        rowData={activeRow}
                        colDefs={[
                            {
                                headerName:"LR Code",
                                colId:'WHCode',
                                field:'WHCode'
                            },
                            {
                                headerName:"Creation Date",
                                colId:'cd',
                                field:'cd'
                            },
                            {
                                headerName:"Ageing",
                                colId:'ageing',
                                field:'ageing'
                            },
                            {
                                headerName:"ETA",
                                colId:'eta',
                                field:'eta'
                            },
                            {
                                headerName:"Current Location",
                                colId:'cl',
                                field:'cl'
                            },
                            {
                                headerName:"Quantity",
                                colId:'quantity',
                                field:'quantity'
                            },
                            {
                                headerName:"Execution Eco Color",
                                colId:'eec',
                                field:'eec'
                            },
                            {
                                headerName:"Remarks",
                                colId:'remarks',
                                field:'remarks'
                            }
                        ]}
                    />
                )} */}
                </Allotment.Pane>
                </Allotment>
            </div>
            
        </GridViewLayout>
    )
}   

export default GridViewTable