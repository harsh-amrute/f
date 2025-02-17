import { useRef,useState} from 'react'
import { AgGridReact, AgGridReactProps } from "ag-grid-react"
import { Allotment } from "allotment"
import useViewPort from "../../../../../hooks/useViewPort"
import { BTRTableHeader, BTRTableWrapper ,BTRAllomentSection,LockBtnWrapper, LockBtn, HorizontalViewWrapper, LocktBtnContent, LockLabel} from "./styles"
import CustomVFTable from "./CustomVFTable"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination"

interface SpliViewTableProps extends AgGridReactProps{
    header:string
    paginationProps:any
}

export interface SplitViewProps{
    techTable:SpliViewTableProps
    ecoTable:SpliViewTableProps
    isLocked:boolean
    toggleLockMode:(value:boolean)=>void
    themeUi:string
}

const HorizontalSplitView = (props:SplitViewProps)=>{

    const{
        techTable,
        ecoTable,
        isLocked,
        toggleLockMode,
        themeUi
    } = props

    const ref1 = useRef<AgGridReact>(null)
    const ref2 = useRef<AgGridReact>(null)

    const [lockBtnPosition,setLockBtnPosition] = useState<number>(0)

    const handleChange = (sizes:Array<number>)=>{
        setLockBtnPosition(sizes[0])
    }

    const onBodyScroll = (params:any,from:number)=>{
        if(isLocked){
            if(params.direction==='vertical'){
                let currIndex = parseInt((params.top/21).toFixed(0))
                if(currIndex>100)currIndex=100
                if(from===1){
                    ref2.current?.api.ensureIndexVisible(currIndex)
                }
                else{
                    ref1.current?.api.ensureIndexVisible(currIndex)
                }
            }
            // else{
            //     const currIndex = parseInt((params.left/80).toFixed(0))
            //     console.log(currIndex)
            //     const columns = techTable.columnDefs
            //     if(columns){
            //         const currColumn:any = columns[currIndex]
                
            //         if(from===1){
            //             ref2.current?.api.ensureColumnVisible(currColumn.colId)
            //         }
            //         else{
            //             ref1.current?.api.ensureColumnVisible(currColumn.colId)
            //         }
            //     }
            // }
        }
    }
   
    const {screenHeight} = useViewPort()

    if(techTable.columnDefs)
    {   
            techTable.columnDefs.forEach(item => {
                if ('field' in item && (item.field === 'WhCode' || item.field === 'Whcode' || item.field === 'LocationName' || item.field === 'Norm' || item.field === 'VirtualNorm' || item.field === 'Availability' || item.field === 'Norm' || item.field === 'VirtualNorm'  || item.field === 'Category' || item.field === 'SKUCode' || item.field === 'SKUDescription' || item.field === 'Tags')) {
                    item.pinned = 'left';
                    item.width = 50;
                }
            });
    }
   return (
        <HorizontalViewWrapper>
            <BTRTableWrapper style={{height:screenHeight - 100,margin:'0'}}>
            <Allotment vertical={true} onChange={handleChange}>
                <Allotment.Pane preferredSize={'50%'}>
                    <BTRAllomentSection>
                        <BTRTableHeader>{techTable.header}</BTRTableHeader>
                        <CustomVFTable 
                            ref={ref1}
                            rowHeight={25}
                            disableZoomScaling
                            gridOptions={{
                               ...techTable.gridOptions
                            }}
                            columnDefs={techTable.columnDefs}
                            rowData={techTable.rowData}
                            tooltipMouseTrack={true}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
                            onBodyScroll={(params)=>onBodyScroll(params,1)}
                            height={"100%"}
                            defaultColDef={{
                                floatingFilter:false,
                                filter:false,
                                sortable:false
                            }}
                            alignedGrids={isLocked?[ref2]:[]}
                        />
                        <div style={{zoom:0.7,margin:'0px -15px 20px -15px'}}>
                            <VFPagination
                                {...techTable.paginationProps}
                            />
                         </div>
                    </BTRAllomentSection>
                </Allotment.Pane>
                
                <Allotment.Pane preferredSize={'50%'}>
                    <BTRAllomentSection style={{marginTop:'20px',paddingBottom:'20px'}}>
                        <BTRTableHeader>{ecoTable.header}</BTRTableHeader>
                        <CustomVFTable 
                            height={"100%"}
                            ref={ref2}
                            rowHeight={25}
                            disableZoomScaling
                            gridOptions={{
                                ...ecoTable.gridOptions
                            }}
                            columnDefs={techTable.columnDefs}
                            rowData={ecoTable.rowData}
                            tooltipMouseTrack={true}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
                            onBodyScroll={(params)=>onBodyScroll(params,2)}
                            defaultColDef={{
                                floatingFilter:false,
                                filter:false,
                                sortable:false
                            }}
                            alignedGrids={isLocked?[ref1]:[]}
                        />
                         <div style={{zoom:0.7,margin:'0px -15px 20px -15px'}}>
                            <VFPagination
                                {...ecoTable.paginationProps}
                            />
                         </div>
                    </BTRAllomentSection>
                </Allotment.Pane>
            </Allotment>
            
        </BTRTableWrapper>
        <LockBtnWrapper >
            <LocktBtnContent style={{top:lockBtnPosition -5,right:100}}>
                <LockBtn  src={isLocked?themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/BPR/lock-regal.svg":"/assets/img/VectorFLOW/BPR/lock.svg":themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/BPR/unlock-regal.svg":"/assets/img/VectorFLOW/BPR/unlock.svg"} onClick={()=>toggleLockMode(!isLocked)}/>        
                <LockLabel>{isLocked?"Unlock":"Lock"}</LockLabel>
            </LocktBtnContent>
        </LockBtnWrapper>
        </HorizontalViewWrapper>
    )
}

export default HorizontalSplitView;