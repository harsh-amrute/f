import { useRef } from "react"
import { pagination } from "../../../../../../../VectorFlow/Pages/MTO/Common/Enum"
import VFTable from "../../../../../../../VectorFlow/Pages/MTO/Common/VFTable"
import { TableWrapper } from "../styles"

interface GridProps {
    agGridProps: any
    ShortageColumns: any
    ShortageDatas: any
}

const GridView = ({ agGridProps, ShortageColumns, ShortageDatas }: GridProps | any) => {

    const gridRef = useRef();

    return (

        <TableWrapper>
            <VFTable

                {...agGridProps}
                columnDefs={ShortageColumns}
                rowData={ShortageDatas}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                paginationPageSize={pagination.mtoPageSize}
                ref={gridRef}
                statusBar={{
                    statusPanels: [
                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                }}


            />
        </TableWrapper>


    );
}

export default GridView