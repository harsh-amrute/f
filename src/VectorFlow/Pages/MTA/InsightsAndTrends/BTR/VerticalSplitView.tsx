import {useRef,useState} from 'react'

import { AgGridReactProps } from "ag-grid-react"
import { Allotment } from "allotment"

import CustomVFTable from "./CustomVFTable"
import { BTRTableWrapper,BTRTableHeader, LockBtnWrapper, LockBtn } from "./styles"
import { GridRef } from '../../../../../VectorFlow/types/MDM'
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'

interface SpliViewTableProps extends AgGridReactProps {
    header: string
    paginationProps: any
}

export interface SplitViewProps{
    techTable:SpliViewTableProps
    ecoTable:SpliViewTableProps
    isLocked:boolean
    toggleLockMode:(value:boolean)=>void
}

const VerticalSplitView = (props: SplitViewProps) => {
    const {
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
    

   return (
        <BTRTableWrapper>
            <Allotment vertical={false} onChange={handleChange}>
                <Allotment.Pane >
                    <BTRTableHeader>{techTable.header}</BTRTableHeader>
                    <div style={{ marginTop: -10 }}>
                        <CustomVFTable
                        ref={ref1}
                        rowHeight={25}
                        height={300}
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
                        <div style={{ zoom: 0.7 }}>
                            <VFPagination
                                {...techTable.paginationProps}
                            />
                        </div>
                    </div>
                    {/* <VFTableWrapper>
                        <AgGridReact
                            ref={techRef}
                            gridOptions={{
                                components:techTable.gridOptions?.components
                            }}
                            columnDefs={techTable.columnDefs}
                            rowData={techTable.rowData}
                        />
                    </VFTableWrapper> */}
                </Allotment.Pane>
                <Allotment.Pane>
                    <BTRTableHeader>{ecoTable.header}</BTRTableHeader>
                    <div style={{marginTop:-10}}>
                    <CustomVFTable 
                        ref={ref2}
                        rowHeight={25}
                         height={300}
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
                    <div style={{zoom:0.7}}>
                        <VFPagination
                                {...ecoTable.paginationProps}
                            />
                        </div>
                    </div>
                    {/* <VFTableWrapper>
                        <AgGridReact
                            ref={ecoRef}
                            gridOptions={{
                                components:ecoTable.gridOptions?.components
                            }}
                            columnDefs={ecoTable.columnDefs}
                            rowData={ecoTable.rowData}
                            
                        />
                    </VFTableWrapper> */}
                </Allotment.Pane>
            </Allotment>
            <LockBtnWrapper>
                <LockBtn style={{left:lockBtnPosition -12}} src={isLocked?"/assets/img/VectorFLOW/BPR/lock.svg":"/assets/img/VectorFLOW/BPR/unlock.svg"} onClick={()=>toggleLockMode(!isLocked)}/>
            </LockBtnWrapper>

        </BTRTableWrapper>
    )
}

export default VerticalSplitView