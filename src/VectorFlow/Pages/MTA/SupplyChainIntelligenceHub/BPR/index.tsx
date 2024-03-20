
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { BPRLayout } from "./styles"
import BPRViewTable from "./BPRViewTable"
import VFMultiFilter from "../../../../../components/VectorFLOW/commons/VFMultiFilter"
import { Allotment } from "allotment"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import useBPR from "./useBPR"
import BPRSubmiRemarkToolTip from "./BPRSubmitRemarkToolTip"

import "allotment/dist/style.css";
import BPRRemarkHistoryToolTip from "./BPRRemarkHistoryToolTip"
import { useState } from "react"
import { BPRFilterState } from "../../../../../VectorFlow/types/BPR"


const BPR = ()=>{

    const [multiFilter, setMultiFilter]= useState<BPRFilterState>(
        {
            supplyChainFilter:{
                id:'1',
                label:'SupplyChain',
                filters:[]
            },
            locationFilter:{
                id:'2',
                label:'Location',
                filters:[]
            },
            productFilter:{
                id:'3',
                label:'Product',
                filters:[]
            },
            availabilityFilter:{
                id:'4',
                label:'Availability',
                filters:[]
            },
            coverageFilter:{
                id:'5',
                label:'Coverage',
                filters:[]
            },
            colorFilter:{
                id:'6',
                label:'Color',
                filters:[]
            },
        }
    )
    

  const {
        // isSideBarOpen,
        isSubGridOpen,
        isLoading ,
        activeRow,
        BPRColumns,
        BPRRowData,
        agGridProps,
        submitRemarkToolTipPosition,
        isSubmitRemarkToolTipOpen,
        remark,
        isRemarkHistoryToolTipOpen,
        remarkHistoryToolipPosition,
        remarkHistory,
        updateRemark,
        onCloseSubmitRemark,
        onSubmitRemark,
        onCloseRemarkHistory
    } = useBPR();
  
    if(isLoading){
      return (
        <VFLoader/>
      )
    }

    // const [multiFilter, setMultiFilter]= useState<BPRFilterState>(
    //     {
    //         supplyChainFilter:{
    //             id:'1',
    //             label:'SupplyChain',
    //             filters:[]
    //         },
    //         locationFilter:{
    //             id:'2',
    //             label:'Location',
    //             filters:[]
    //         },
    //         productFilter:{
    //             id:'3',
    //             label:'Product',
    //             filters:[]
    //         },
    //         availabilityFilter:{
    //             id:'4',
    //             label:'Availability',
    //             filters:[]
    //         },
    //         coverageFilter:{
    //             id:'5',
    //             label:'Coverage',
    //             filters:[]
    //         },
    //         colorFilter:{
    //             id:'6',
    //             label:'Color',
    //             filters:[]
    //         },
    //     }
    // )
    
    return(
        <>
        <VFMultiFilter onApplyFilter={()=>console.log("")} onGoBack={()=>console.log("")} availabilityFilterActive={true} colorFilterActive={true} coverageFilterActive={true} horizonActive={true} multiFilter={multiFilter} setMultiFilter={setMultiFilter}></VFMultiFilter>
        <BPRLayout>
            {/* <BPRTaskBar style={{width:isSideBarOpen?'77%':'97%'}}>
                <VFButtonOutline
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Excel Export 
                </VFButtonOutline>
                <VFButton
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Edit Filter
                </VFButton>
            </BPRTaskBar> */}
            <div style={{height:'100vh'}}>
            <Allotment vertical defaultSizes={[400,100]}>
              <Allotment.Pane >
              <VFTable
                {...agGridProps}
                columnDefs={BPRColumns}
                rowData={BPRRowData}
            />
              </Allotment.Pane>
              <Allotment.Pane maxSize={300}>
              {isSubGridOpen && (
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
            )}
              </Allotment.Pane>
            </Allotment>
            </div>
            {isSubmitRemarkToolTipOpen && (
                <BPRSubmiRemarkToolTip
                    remark={remark}
                    setRemark={updateRemark}
                    style={submitRemarkToolTipPosition}
                    onSuccess={onSubmitRemark}
                    onClose={onCloseSubmitRemark}
                />
            )}

            {isRemarkHistoryToolTipOpen && (
                <BPRRemarkHistoryToolTip
                    remarkHistory={remarkHistory}
                    onClose={onCloseRemarkHistory}
                    style={remarkHistoryToolipPosition}
                />
            )}
        </BPRLayout>
        </>
    )
            }

export default BPR
