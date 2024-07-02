import { useRef } from "react"
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable';



interface GridProps {
    agGridProps: any
    ShortageColumns: any
    ShortageDatas: any
}

const GridView = ({ agGridProps, ShortageColumns, ShortageDatas }: GridProps) => {

    const gridRef = useRef();




    return (
        <>
            <VFTable

                {...agGridProps}
                sideBar="columns"
                columnDefs={ShortageColumns}
                rowData={ShortageDatas}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                height={"750px"}
                ref={gridRef}
                statusBar={{
                    statusPanels: [
                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                }}
            />

        </>
    );
}

export default GridView