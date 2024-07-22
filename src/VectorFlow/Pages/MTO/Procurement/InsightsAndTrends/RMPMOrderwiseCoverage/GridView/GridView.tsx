import { useRef } from "react"
import { VFTableWrapper } from "../../../../../../../components/VectorFLOW/commons/VFTable/styles"
import VFTable from "../../../../../../../components/VectorFLOW/commons/VFTable"


interface GridProps {
    agGridProps: any
    ShortageColumns: any
    ShortageDatas: any
}

const GridView = ({ agGridProps, ShortageColumns, ShortageDatas }: GridProps) => {

    const gridRef = useRef();





    return (
        <>
            <VFTableWrapper>


                <VFTable

                    {...agGridProps}
                    columnDefs={ShortageColumns}
                    rowData={ShortageDatas}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    tooltipMouseTrack={true}
                    height={"790px"}
                    ref={gridRef}
                    statusBar={{
                        statusPanels: [
                            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                        ]
                    }}

                />
            </VFTableWrapper>


        </>
    );
}

export default GridView