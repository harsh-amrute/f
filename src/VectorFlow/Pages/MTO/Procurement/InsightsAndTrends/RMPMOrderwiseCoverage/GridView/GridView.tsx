import { useRef, useEffect } from "react"
import { pagination } from "../../../../../../../VectorFlow/Pages/MTO/Common/Enum"
import VFTable from "../../../../../../../VectorFlow/Pages/MTO/Common/VFTable"
import { TableWrapper } from "../styles"

interface GridProps {
    agGridProps: any
    ShortageDatas: any
    setCurrentGridRef: any,
    currentGridRef: any,
    columnState: any,
}

const GridView = ({ agGridProps, colDef, ShortageDatas,  setCurrentGridRef, currentGridRef, columnState  }: GridProps | any) => {

    const gridRef = useRef();

    useEffect(()=>{ 
        if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
            const result = currentGridRef.current.api.applyColumnState({
                state: columnState,
                applyOrder: true
            });
            if (!result) {
                console.error('Failed to apply column state');
            }
        }
    });

    return (

        <TableWrapper>
            <VFTable
                {...agGridProps}
                columnDefs={colDef}
                rowData={ShortageDatas}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                paginationPageSize={pagination.mtoPageSize}
                ref={gridRef}
                onGridReady={(params: any) => {
                    params.api.autoSizeAllColumns();

                    setCurrentGridRef(gridRef);
                }}
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