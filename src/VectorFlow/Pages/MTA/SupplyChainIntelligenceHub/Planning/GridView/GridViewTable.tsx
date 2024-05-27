import { Allotment } from "allotment"
import {useContext} from "react"
import "allotment/dist/style.css";
import { GridViewLayout } from "./styles";
import { AgGridReactProps } from "ag-grid-react";
import { ColDef } from "ag-grid-enterprise";
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable';
import BPRViewTable from '../../BPR/BPRViewTable'
import VFPagination from "../../../../../../components/VectorFLOW/commons/VFPagination";
import { type VFPaginationProps } from "../../../../../../components/VectorFLOW/commons/VFPagination";
import { GridStateContext } from "../../../../../../context/GridStateContext";
// import { useGetState } from "../../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
// import VFLoader from "../../../../../../components/VectorFLOW/commons/VFLoader";
// import { notifyError } from "../../../../../../helpers/notify";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../../../redux/store/store";

// import VFPagination from "~/components/VectorFLOW/commons/VFPagination";


interface GridViewTableProps {
    agGridProps:AgGridReactProps,
    agGridColDefs:ColDef[],
    agGridRowData:any,
    customGridRowData:any,
    customGridColDef:Array<{headerName:string,colId:string,field:string}>
    isSubGridOpen:boolean
    showStockGrid?:boolean
    stockGridData?:Array<any>
    onRequestExpediting?:()=>void
    paginationProps?:VFPaginationProps
    currentTab:string
    currentCategory:string,
    gridHeight?:number,
    tablePrefixSrc?:string,
    tableHeader?:string
}

const GridViewTable = ({agGridProps,agGridColDefs,agGridRowData,customGridRowData,customGridColDef,showStockGrid,isSubGridOpen,stockGridData,onRequestExpediting,paginationProps,gridHeight,tablePrefixSrc,tableHeader}:GridViewTableProps) => {
    const {ref} = useContext(GridStateContext)
    // const {mutateAsync:getState,isLoading} = useGetState()
    // const [columnState,setColumnState] = useState<any>()
    // const {currentGridState} = useSelector((state:RootState)=>state.mta)
    // useEffect(()=>{
    //     const getTableState = async()=>{
    //       try{
    //         const data =  await getState(`${currentCategory}${currentTab}`)
    //         setColumnState(JSON.parse(data.data.data))
    //       }catch(err:any){
    //         notifyError(err)
    //         setColumnState(agGridColDefs)
    //       }
    //     }
    //     getTableState()
    // },[currentGridState])


    // if(isLoading){
    //     return <VFLoader/>
    // }

    const renderSubGrid = ()=>{
        if(showStockGrid){
            return(
                <Allotment>
                    <Allotment.Pane className="sub-grid-allotment">
                        <BPRViewTable
                            tableHeader={tableHeader ||'In Transit/WIP'}
                            tablePrefixSrc={tablePrefixSrc ? tablePrefixSrc : "/assets/img/VectorFLOW/BPR/in-transit.svg"}
                            rowData={customGridRowData}
                            colDefs={customGridColDef}
                        />
                    </Allotment.Pane>
                    <Allotment.Pane className="sub-grid-allotment">
                        {showStockGrid && (
                            <BPRViewTable
                                onRequestExpediting={onRequestExpediting}
                                tableHeader="Stocks (Detail Of Parent)"
                                tablePrefixSrc="/assets/img/VectorFLOW/BPR/stock.svg"
                                rowData={stockGridData?stockGridData:[]}
                                colDefs={[
                                    {
                                        headerName:"Stock at Parent",
                                        colId:'sap',
                                        field:'sap'
                                    },
                                    {
                                        headerName:"ETA from parent ",
                                        colId:'eta',
                                        field:'eta'
                                    },
                                    // {
                                    //     headerName:"Eco Color",
                                    //     colId:'ec',
                                    //     field:'ec'
                                    // },
                                    {
                                        headerName:"Remarks",
                                        colId:'remark',
                                        field:'remark'
                                    },
                                    {
                                        headerName:"Request Expediting",
                                        colId:'request',
                                        field:'request',
                                        onCellClicked:onRequestExpediting
                                    },
                                ]}
                            />
                        )}
                    </Allotment.Pane>
                </Allotment>
            )
        }
        return(
            <BPRViewTable
                tableHeader={tableHeader ||'In Transit/WIP'}
                tablePrefixSrc={tablePrefixSrc ? tablePrefixSrc : "/assets/img/VectorFLOW/BPR/in-transit.svg"}
                rowData={customGridRowData}
                colDefs={customGridColDef}
            />
        )
    }

    return(
        <GridViewLayout>
            <div style={{height:'95vh'}}>
                <Allotment defaultSizes={[200,100]} vertical>
                {
                    (isSubGridOpen || showStockGrid ) && (
                        <Allotment.Pane >
                    
                        <VFTable
                            ref={ref}
                            {...agGridProps}
                            columnDefs={agGridColDefs}
                            rowData={agGridRowData}
                            height={380}
                            // onGridReady={(params)=>{
                            //     if(columnState){
                            //         params.columnApi.applyColumnState({state:columnState})
                            //     }
                            // }}
                        />
                        {paginationProps && <VFPagination {...paginationProps}/>}
    
                        </Allotment.Pane>
                    ) 
                }    
                
                {
                    !(isSubGridOpen || showStockGrid ) && (
                        <Allotment.Pane >
                    
                        <VFTable
                            ref={ref}
                            {...agGridProps}
                            columnDefs={agGridColDefs}
                            rowData={agGridRowData}
                            height={gridHeight ? gridHeight : 380}
                            // onGridReady={(params)=>{
                            //     if(columnState){
                            //         params.columnApi.applyColumnState({state:columnState})
                            //     }
                            // }}
                        />
                        {paginationProps && <VFPagination {...paginationProps}/>}
    
                        </Allotment.Pane>
                    ) 
                }
                {isSubGridOpen && (
                    <Allotment.Pane  >
                        {renderSubGrid()}
                    </Allotment.Pane>
                )}
                </Allotment>
            </div>
            
        </GridViewLayout>
    )
}   

export default GridViewTable