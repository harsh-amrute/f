import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { BPRLayout,BPRTaskBar } from "./styles"
import BPRViewTable from "./BPRViewTable"
import "allotment/dist/style.css";
import { Allotment } from "allotment"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import useBPR from "./useBPR"




const BPR = ()=>{

  const {
    isSideBarOpen,
    isSubGridOpen,
    isLoading ,
    activeRow,
    BPRColumns,
    BPRRowData,
    agGridProps,

} = useBPR()

  
    if(isLoading){
      return (
        <VFLoader/>
      )
    }

    return(
        <BPRLayout>
            <BPRTaskBar style={{width:isSideBarOpen?'77%':'97%'}}>
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
            </BPRTaskBar>
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
            
        </BPRLayout>
    )
}

export default BPR