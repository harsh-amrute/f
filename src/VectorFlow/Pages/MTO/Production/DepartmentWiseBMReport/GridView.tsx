import React, { useRef } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

interface GridProps {
    agGridProps: any
    columDef: any
    convercolumnDef: any
}

const GridView = ({ agGridProps, columDef, convercolumnDef }: GridProps) => {

    const gridRef = useRef();
    return (
        <>
            <VFTable
                {...agGridProps}
                sideBar="columns"
                columnDefs={columDef}
                rowData={convercolumnDef}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                height={"750px"}
                ref={gridRef}
                defaultColDef={{maxWidth:150}}
                //gridOptions={...columDef}
                statusBar={{
                    statusPanels: [
                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                }}
            />

        </>
    )
}

export default GridView