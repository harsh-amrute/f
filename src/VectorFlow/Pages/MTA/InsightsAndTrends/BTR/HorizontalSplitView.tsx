import { AgGridReactProps } from "ag-grid-react"
import { Allotment } from "allotment"
import useViewPort from "../../../../../hooks/useViewPort"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { BTRTableHeader, BTRTableWrapper ,BTRAllomentSection} from "./styles"

interface SpliViewTableProps extends AgGridReactProps{
    header:string
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
            <Allotment vertical={true}>
                <Allotment.Pane >
                    <BTRAllomentSection>
                        <BTRTableHeader>{techTable.header}</BTRTableHeader>
                        <VFTable 
                            
                            disableZoomScaling
                            gridOptions={{
                                components:techTable.gridOptions?.components
                            }}
                            columnDefs={techTable.columnDefs}
                            rowData={techTable.rowData}
                            tooltipMouseTrack={true}
                            pagination
                            paginationPageSize={50}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
                        />
                    </BTRAllomentSection>
                </Allotment.Pane>
                <Allotment.Pane>
                    <BTRAllomentSection>
                        <BTRTableHeader>{ecoTable.header}</BTRTableHeader>
                        <VFTable 
                            disableZoomScaling
                            gridOptions={{
                                components:ecoTable.gridOptions?.components
                            }}
                            columnDefs={ecoTable.columnDefs}
                            rowData={ecoTable.rowData}
                            tooltipMouseTrack={true}
                            pagination
                            paginationPageSize={50}
                            tooltipShowDelay={0}
                            tooltipHideDelay={100000}
                        />
                    </BTRAllomentSection>
                </Allotment.Pane>
            </Allotment>
        </BTRTableWrapper>
    )
}

export default VerticalSplitView