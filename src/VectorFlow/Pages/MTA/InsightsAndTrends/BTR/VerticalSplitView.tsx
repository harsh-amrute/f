import { useRef } from 'react'

import { AgGridReactProps } from "ag-grid-react"
import { Allotment } from "allotment"

import CustomVFTable from "./CustomVFTable"
import { BTRTableWrapper, BTRTableHeader } from "./styles"
import { GridRef } from '../../../../../VectorFlow/types/MDM'
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'

interface SpliViewTableProps extends AgGridReactProps {
    header: string
    paginationProps: any
}

export interface SplitViewProps {
    techTable: SpliViewTableProps
    ecoTable: SpliViewTableProps
}

const VerticalSplitView = (props: SplitViewProps) => {
    const {
        techTable,
        ecoTable,
    } = props

    const ref1 = useRef<GridRef>()
    const ref2 = useRef<GridRef>()

    return (
        <BTRTableWrapper>
            <Allotment vertical={false}>
                <Allotment.Pane >
                    <BTRTableHeader>{techTable.header}</BTRTableHeader>
                    <div style={{ marginTop: -10 }}>
                        <CustomVFTable
                            ref={ref1}
                            rowHeight={25}
                            height={400}
                            disableZoomScaling
                            gridOptions={{
                                ...techTable.gridOptions
                            }}
                            columnDefs={techTable.columnDefs}
                            rowData={techTable.rowData}
                            tooltipMouseTrack={true}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}

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
                    <div style={{ marginTop: -10 }}>
                        <CustomVFTable
                            ref={ref2}
                            rowHeight={25}
                            height={400}
                            disableZoomScaling
                            gridOptions={{
                                ...ecoTable.gridOptions
                            }}
                            columnDefs={ecoTable.columnDefs}
                            rowData={ecoTable.rowData}
                            tooltipMouseTrack={true}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
                        />
                        <div style={{ zoom: 0.7 }}>
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
        </BTRTableWrapper>
    )
}

export default VerticalSplitView