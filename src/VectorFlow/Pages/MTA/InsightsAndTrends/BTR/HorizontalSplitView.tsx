import {useRef,useState} from 'react'
import { AgGridReactProps } from "ag-grid-react"
import { Allotment } from "allotment"
import useViewPort from "../../../../../hooks/useViewPort"
import { BTRTableHeader, BTRTableWrapper ,BTRAllomentSection,LockBtnWrapper, LockBtn, HorizontalViewWrapper} from "./styles"
import CustomVFTable from "./CustomVFTable"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination"
import { GridRef } from '../../../../../VectorFlow/types/MDM'

interface SpliViewTableProps extends AgGridReactProps{
    header:string
    paginationProps:any
}

export interface SplitViewProps{
    techTable:SpliViewTableProps
    ecoTable:SpliViewTableProps
    isLocked:boolean
    toggleLockMode:(value:boolean)=>void
}

const VerticalSplitView = (props:SplitViewProps)=>{

    const{
        techTable,
        ecoTable,
        isLocked,
        toggleLockMode
    } = props

    const ref1 = useRef<GridRef>()
    const ref2 = useRef<GridRef>()

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
            else{
                const currIndex = parseInt((params.left/80).toFixed(0))
                const columns = techTable.columnDefs
                if(columns){
                    const currColumn:any = columns[currIndex]
                
                    if(from===1){
                        ref2.current?.api.ensureColumnVisible(currColumn.colId)
                    }
                    else{
                        ref1.current?.api.ensureColumnVisible(currColumn.colId)
                    }
                }
            }
        }
    }
   
    const {screenHeight} = useViewPort()

   return (
        <HorizontalViewWrapper>
            <BTRTableWrapper style={{height:screenHeight - 100,margin:'0'}}>
            <Allotment vertical={true} defaultSizes={[400,200]}  onChange={handleChange} >
                <Allotment.Pane >
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
                        />
                        <div style={{zoom:0.7,marginBottom:'20px'}}>
                            <VFPagination
                                {...techTable.paginationProps}
                            />
                         </div>
                    </BTRAllomentSection>
                </Allotment.Pane>
                
                <Allotment.Pane>
                    <BTRAllomentSection>
                        <BTRTableHeader>{ecoTable.header}</BTRTableHeader>
                        <CustomVFTable 
                            ref={ref2}
                            rowHeight={25}
                            disableZoomScaling
                            gridOptions={{
                                ...ecoTable.gridOptions
                            }}
                            columnDefs={ecoTable.columnDefs}
                            rowData={ecoTable.rowData}
                            tooltipMouseTrack={true}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
                            onBodyScroll={(params)=>onBodyScroll(params,2)}
                        />
                         <div style={{zoom:0.7,marginBottom:'20px'}}>
                            <VFPagination
                                {...ecoTable.paginationProps}
                            />
                         </div>
                    </BTRAllomentSection>
                </Allotment.Pane>
            </Allotment>
            
        </BTRTableWrapper>
        <LockBtnWrapper style={{height:screenHeight - 100}}>
            <LockBtn style={{top:lockBtnPosition -12}} src={isLocked?"/assets/img/VectorFLOW/BPR/lock.svg":"/assets/img/VectorFLOW/BPR/unlock.svg"} onClick={()=>toggleLockMode(!isLocked)}/>        
        </LockBtnWrapper>
        </HorizontalViewWrapper>
    )
}

export default VerticalSplitView