import { AgGridReactProps } from "ag-grid-react"
import { Allotment } from "allotment"
import useViewPort from "../../../../../hooks/useViewPort"
import { BTRTableHeader, BTRTableWrapper ,BTRAllomentSection} from "./styles"
import CustomVFTable from "./CustomVFTable"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination"

interface SpliViewTableProps extends AgGridReactProps{
    header:string
    paginationProps:any
}

export interface SplitViewProps{
    techTable:SpliViewTableProps
    ecoTable:SpliViewTableProps
}

const VerticalSplitView = (props:SplitViewProps)=>{

    const{
        techTable,
        ecoTable
    } = props
   
    const {screenHeight} = useViewPort()

   return (
        <BTRTableWrapper style={{height:screenHeight - 100,margin:'0'}}>
            <Allotment vertical={true} defaultSizes={[400,200]}>
                <Allotment.Pane >
                    <BTRAllomentSection>
                        <BTRTableHeader>{techTable.header}</BTRTableHeader>
                        <CustomVFTable 
                            rowHeight={25}
                            disableZoomScaling
                            gridOptions={{
                                components:techTable.gridOptions?.components
                            }}
                            columnDefs={techTable.columnDefs}
                            rowData={techTable.rowData}
                            tooltipMouseTrack={true}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
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
                            rowHeight={25}
                            disableZoomScaling
                            gridOptions={{
                                components:ecoTable.gridOptions?.components
                            }}
                            columnDefs={ecoTable.columnDefs}
                            rowData={ecoTable.rowData}
                            tooltipMouseTrack={true}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
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
    )
}

export default VerticalSplitView