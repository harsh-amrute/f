import { useMemo, useRef, useState } from 'react'

import { AgGridReact, AgGridReactProps } from "ag-grid-react"
import { Allotment } from "allotment"

import CustomVFTable from "./CustomVFTable"
import { BTRTableWrapper, BTRTableHeader, LockBtnWrapper, LockBtn, LocktBtnContent, LockLabel, VerticalViewLeftTableWrapper } from "./styles"
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable'


interface SpliViewTableProps extends AgGridReactProps {
    header: string
    paginationProps: any
}

export interface SplitViewProps {
    techTable: SpliViewTableProps
    ecoTable: SpliViewTableProps
    isLocked: boolean
    toggleLockMode: (value: boolean) => void
    themeUi: string
}

const VerticalSplitView = (props: SplitViewProps) => {
    const {
        techTable,
        ecoTable,
        isLocked,
        toggleLockMode,
        themeUi
    } = props

    const ref1 = useRef<AgGridReact>(null)
    const ref2 = useRef<AgGridReact>(null)
    const ref3 = useRef<AgGridReact>(null)

    const [lockBtnPosition, setLockBtnPosition] = useState<number>(0)

    const staticTableColDefs = useMemo(() => {
        if (!techTable.columnDefs) return []
        return techTable.columnDefs.filter((col) => col.headerName && ['Category', "LocationName", "Norm", "SKUCode", "SKUDescription", "Tags", "VirtualNorm", "RN", "ParentWhCode", "ParentName"].includes(col.headerName))
    }, [techTable.columnDefs])

    const techTableColDefs = useMemo(() => {
        if (!techTable.columnDefs) return []
        return techTable.columnDefs.filter((col) => col.headerName && !['Category', "LocationName", "Norm", "SKUCode", "SKUDescription", "Tags", "VirtualNorm", "RN", "ParentWhCode", "ParentName"].includes(col.headerName))
    }, [techTable.columnDefs])

    const handleChange = (sizes: Array<number>) => {
        setLockBtnPosition(sizes[0])
    }

    const onBodyScroll = (params: any, from: number) => {

        if (isLocked) {
            if (params.direction === 'vertical') {
                let currIndex = parseInt((params.top / 21).toFixed(0))
                if (currIndex > 100) currIndex = 100
                if (from === 1) {
                    ref2.current?.api.ensureIndexVisible(currIndex)
                    ref3.current?.api.ensureIndexVisible(currIndex)
                }
                else if (from === 3) {
                    ref1.current?.api.ensureIndexVisible(currIndex)
                    ref2.current?.api.ensureIndexVisible(currIndex)
                }
                else {
                    ref1.current?.api.ensureIndexVisible(currIndex)
                    ref3.current?.api.ensureIndexVisible(currIndex)
                }
            }
            // else{
            //     const currIndex = parseInt((params.left/80).toFixed(0))
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


    return (
        <BTRTableWrapper>
            <Allotment defaultSizes={[600, 300]} vertical={false} onChange={handleChange}>
                <Allotment.Pane minSize={500}>
                    <BTRTableHeader style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '50%' }}>{techTable.header}</BTRTableHeader>
                    <VerticalViewLeftTableWrapper>
                        <div style={{ marginTop: -10, height: '85%', width: '100%',minWidth:'50%' }}>
                            {/* <CustomVFTable
                                ref={ref3}
                                rowHeight={25}
                                height={"95%"}
                                disableZoomScaling
                                gridOptions={{
                                    ...techTable.gridOptions
                                }}
                                columnDefs={staticTableColDefs}
                                rowData={techTable.rowData}
                                tooltipMouseTrack={true}
                                tooltipShowDelay={0}
                                tooltipHideDelay={100000}
                                defaultColDef={{
                                    floatingFilter: false,
                                    filter: false,
                                    sortable: false
                                }}
                                onBodyScroll={(params) => onBodyScroll(params, 3)}
                            /> */}
                            <VFTable    
                                key={'ref'}
                                disableZoomScaling
                                ref={ref3}
                                rowHeight={25}
                                height={"95%"}
                                gridOptions={{
                                    ...techTable.gridOptions
                                }}
                                columnDefs={staticTableColDefs}
                                rowData={techTable.rowData}
                                tooltipMouseTrack={true}
                                tooltipShowDelay={0}
                                tooltipHideDelay={100000}
                                defaultColDef={{
                                    floatingFilter: false,
                                    filter: false,
                                    sortable: false
                                }}
                                onBodyScroll={(params:any) => onBodyScroll(params, 3)}
                            />
                            <div style={{ zoom: 0.7, margin: '0px -15px' }}>
                                <VFPagination
                                    {...techTable.paginationProps}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: -10, height: '85%', width: '100%' ,minWidth:'50%'}}>
                            {/* <CustomVFTable
                                ref={ref1}
                                rowHeight={25}
                                height={"95%"}
                                disableZoomScaling
                                gridOptions={{
                                    ...techTable.gridOptions
                                }}
                                columnDefs={techTableColDefs}
                                rowData={techTable.rowData}
                                tooltipMouseTrack={true}
                                tooltipShowDelay={0}
                                tooltipHideDelay={100000}
                                defaultColDef={{
                                    floatingFilter: false,
                                    filter: false,
                                    sortable: false
                                }}
                                onBodyScroll={(params) => onBodyScroll(params, 1)}
                                alignedGrids={isLocked ? [ref2] : []}
                            /> */}
                            <VFTable    
                                ref={ref1}
                                rowHeight={25}
                                height={"95%"}
                                disableZoomScaling
                                gridOptions={{
                                    ...techTable.gridOptions
                                }}
                                columnDefs={techTableColDefs}
                                rowData={techTable.rowData}
                                tooltipMouseTrack={true}
                                tooltipShowDelay={0}
                                tooltipHideDelay={100000}
                                defaultColDef={{
                                    floatingFilter: false,
                                    filter: false,
                                    sortable: false
                                }}
                                onBodyScroll={(params) => onBodyScroll(params, 1)}
                                alignedGrids={isLocked ? [ref2] : []}
                            />
                            <div style={{ zoom: 0.7, margin: '0px -15px' }}>
                                <VFPagination
                                    {...techTable.paginationProps}
                                />
                            </div>
                        </div>
                    </VerticalViewLeftTableWrapper>
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
                <Allotment.Pane minSize={300}>
                    <BTRTableHeader>{ecoTable.header}</BTRTableHeader>
                    <div style={{ marginTop: -10, height: '85%', paddingLeft: '17px' }}>
                        {/* <CustomVFTable
                            ref={ref2}
                            rowHeight={25}
                            height={"95%"}
                            disableZoomScaling
                            gridOptions={{
                                ...ecoTable.gridOptions
                            }}
                            columnDefs={ecoTable.columnDefs}
                            rowData={ecoTable.rowData}
                            tooltipMouseTrack={true}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
                            defaultColDef={{
                                floatingFilter: false,
                                filter: false,
                                sortable: false
                            }}
                            onBodyScroll={(params) => onBodyScroll(params, 2)}
                            alignedGrids={isLocked ? [ref1] : []}
                        /> */}
                        <VFTable    
                            ref={ref2}
                            rowHeight={25}
                            height={"95%"}
                            disableZoomScaling
                            gridOptions={{
                                ...ecoTable.gridOptions
                            }}
                            columnDefs={ecoTable.columnDefs}
                            rowData={ecoTable.rowData}
                            tooltipMouseTrack={true}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
                            defaultColDef={{
                                floatingFilter: false,
                                filter: false,
                                sortable: false
                            }}
                            onBodyScroll={(params) => onBodyScroll(params, 2)}
                            alignedGrids={isLocked ? [ref1] : []}
                            />
                        <div style={{ zoom: 0.7, margin: '0px -15px' }}>
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
                <LocktBtnContent style={{ left: lockBtnPosition - 37 }}>
                    <LockBtn src={isLocked ? themeUi === "REGALBLAZE" ? "/assets/img/VectorFLOW/BPR/lock-regal.svg" : "/assets/img/VectorFLOW/BPR/lock.svg" : themeUi === "REGALBLAZE" ? "/assets/img/VectorFLOW/BPR/unlock-regal.svg" : "/assets/img/VectorFLOW/BPR/unlock.svg"} onClick={() => toggleLockMode(!isLocked)} />
                    <LockLabel>{isLocked ? "Unlock" : "Lock"}</LockLabel>
                </LocktBtnContent>
            </LockBtnWrapper>

        </BTRTableWrapper>
    )
}

export default VerticalSplitView