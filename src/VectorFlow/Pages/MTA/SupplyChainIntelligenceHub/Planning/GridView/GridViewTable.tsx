import {useContext,useEffect,useState} from "react"


import { Allotment } from "allotment"
import "allotment/dist/style.css";
import { GridViewLayout } from "./styles";
import { AgGridReactProps } from "ag-grid-react";
import { ColDef } from "ag-grid-enterprise";
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable';
import BPRViewTable, { BPRViewTableColDef } from '../../BPR/BPRViewTable'
import VFPagination from "../../../../../../VectorFlow/Pages/MTO/Common/VFPagination"
import { type VFPaginationProps } from "../../../../../../components/VectorFLOW/commons/VFPagination";
import { GridStateContext } from "../../../../../../context/GridStateContext";
import { useGetState } from "../../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import { updateCommonAttributes } from '../../../../../../helpers/utils'
import _ from 'lodash'

// import VFPagination from "~/components/VectorFLOW/commons/VFPagination";


interface GridViewTableProps {
    agGridProps:AgGridReactProps,
    agGridColDefs:ColDef[],
    agGridRowData:any,
    customGridRowData:any,
    customGridColDef:Array<BPRViewTableColDef>
    isSubGridOpen:boolean
    showStockGrid?:boolean
    stockGridData?:Array<any>
    onRequestExpediting?:()=>void
    paginationProps?:VFPaginationProps
    currentTab:string
    currentCategory:string,
    gridHeight?:string,
    tablePrefixSrc?:string,
    tableHeader?:string
}

const GridViewTable = ({agGridProps,agGridColDefs,agGridRowData,customGridRowData,customGridColDef,showStockGrid,isSubGridOpen,stockGridData,onRequestExpediting,paginationProps,gridHeight,tablePrefixSrc,tableHeader,currentCategory,currentTab}:GridViewTableProps) => {
    const {ref} = useContext(GridStateContext)
    const {mutateAsync:getState} = useGetState()
    const [gridState,setGridState] = useState<any>()
    const [isDisabled, setIsDisabled]= useState<boolean>(true)


    const [Columns,setColumns] = useState<any[]>(_.cloneDeep(agGridColDefs))

    useEffect(()=>{
        if(agGridColDefs && agGridColDefs.length){
            const getTableState = async()=>{
                try{
                    const data =  await getState({reportname:`${currentCategory}${currentTab}`})
                    const parsedContent = JSON.parse(data.data.data)
                    setGridState(parsedContent)
                }catch(err:any){
                    setGridState({
                        charts:[],
                        columns:Columns,
                        pivot:false
                    })
                }
            }
            
            getTableState()
        }
    },[agGridColDefs])

    useEffect(()=>{
        if(gridState && Array.isArray(gridState.columns) && gridState.columns.length !== 0){
            ref?.current?.api?.applyColumnState({state:gridState.columns,applyOrder:true})
            ref?.current?.api?.sizeColumnsToFit();
        }else{
            if(ref && ref.current){
                ref?.current?.api?.sizeColumnsToFit();
            }
        }
    },[gridState, ref])

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
            <div style={{height:'90vh'}}>
                <Allotment defaultSizes={[350,150]} vertical>
                {
                    (isSubGridOpen || showStockGrid ) && (
                        <Allotment.Pane className="planning-grid-allotment">
                    
                        <VFTable
                            ref={ref}
                            {...agGridProps}
                            columnDefs={agGridColDefs}
                            rowData={agGridRowData}
                            height={gridHeight ? gridHeight : '380px'}
                            maintainColumnOrder
                            onFilterChanged={() => {
                                const filterModel = ref?.current?.api?.getFilterModel();
                                if (filterModel && Object.keys(filterModel).length > 0) {
                                  setIsDisabled(false);
                                } else {
                                  setIsDisabled(true);
                                }
                            }}
                        />
                        {paginationProps && <VFPagination {...paginationProps}
                         resetGridRef={ref} 
                         isDisabled={isDisabled}
                         />}
    
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
                                height={gridHeight ? gridHeight : '380px'}
                                // onGridReady={(params)=>{
                                //     if(columnState){
                                //         params.columnApi.applyColumnState({state:columnState})
                                //     }
                                // }}
                                onFilterChanged={() => { 
                                    const filterModel = ref?.current?.api?.getFilterModel();
                                    if (filterModel && Object.keys(filterModel).length > 0) {
                                      setIsDisabled(false);
                                    } else {
                                      setIsDisabled(true);
                                    }
                                }}

                            />
                            {paginationProps &&
                            <VFPagination {...paginationProps}
                            resetGridRef={ref} 
                            isDisabled={isDisabled}/>
                            }
    
                        </Allotment.Pane>
                    ) 
                }
                {isSubGridOpen && (
                    <Allotment.Pane minSize={180} maxSize={350}>
                        <div style={{marginTop:'20px',height:'100%',zoom:'var(--default-zoom)'}}>
                            {renderSubGrid()}
                        </div>
                    </Allotment.Pane>
                )}
                </Allotment>
            </div>
            
        </GridViewLayout>
    )
}   

export default GridViewTable