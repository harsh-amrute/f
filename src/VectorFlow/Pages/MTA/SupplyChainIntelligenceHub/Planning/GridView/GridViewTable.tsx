
import { Allotment } from "allotment"
import "allotment/dist/style.css";
import { GridViewLayout } from "./styles";
import { AgGridReactProps } from "ag-grid-react";
import { ColDef } from "ag-grid-enterprise";
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable';
import BPRViewTable from '../../BPR/BPRViewTable'
// import VFPagination from "~/components/VectorFLOW/commons/VFPagination";


interface GridViewTableProps {
    agGridProps:AgGridReactProps,
    agGridColDefs:ColDef[],
    agGridRowData:any,
    customGridRowData:any,
    customGridColDef:Array<{headerName:string,colId:string,field:string}>
    isSubGridOpen:boolean
    showStockGrid?:boolean
}

const GridViewTable = ({agGridProps,agGridColDefs,agGridRowData,customGridRowData,customGridColDef,showStockGrid,isSubGridOpen}:GridViewTableProps) => {
    console.log(customGridColDef);
    console.log(customGridRowData);
    
    return(
        <GridViewLayout>
            <div style={{height:'100vh'}}>
                <Allotment vertical defaultSizes={[400,400]}>
                <Allotment.Pane >
                    <VFTable
                        {...agGridProps}
                        columnDefs={agGridColDefs}
                        rowData={agGridRowData}
                    />
                    {/* <VFPagination/> */}
                </Allotment.Pane>
                {isSubGridOpen && (
                    <Allotment.Pane >
                
                    <BPRViewTable
                        tablePrefixSrc="/assets/img/VectorFLOW/BPR/in-transit.svg"
                        rowData={customGridRowData}
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
                    {showStockGrid && (
                        <BPRViewTable
                        tableHeader="Details of parent"
                        tablePrefixSrc="/assets/img/VectorFLOW/BPR/stock.svg"
                        rowData={[{}]}
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
                    )}
                
                </Allotment.Pane>
                )}
                </Allotment>
            </div>
            
        </GridViewLayout>
    )
}   

export default GridViewTable