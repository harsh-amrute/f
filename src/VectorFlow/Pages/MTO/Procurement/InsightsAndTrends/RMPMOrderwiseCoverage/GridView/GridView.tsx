import { useState, useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable';
import columnData from '../ColumnData';
import { Order } from '../../../../../../types/MTO';
import procData from '../ProcurementData';
import { InsightsAndTrendsString } from "../../../../Common/String";
import { ColDef } from "ag-grid-enterprise";


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