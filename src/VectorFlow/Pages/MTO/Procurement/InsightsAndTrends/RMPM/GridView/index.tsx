import React from 'react'
import { useState, useMemo, useRef, useCallback } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { AgGridReact } from "@ag-grid-community/react";
import { useUserData } from "../../../../../../../context"
import ColoPriority from "../../../../Common/ColorPriority/index";
import AvailabilityToolTip from "../../../../../MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import { VFFloatingTabItemProps } from "../../../../../../../components/VectorFLOW/commons/VFFloatingTab"
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable';
import VFButton from '../../../../../../../components/VectorFLOW/commons/VFButton';
import VFButtonOutline from "../../../../../../../components/VectorFLOW/commons/VFButtonOutline";
import columnData from '../ColumnData';
import { Order } from '../../../../../../../VectorFlow/types/MTO';
import { ColumnData } from '../../../../../../../VectorFlow/types/MTO';
import procData from '../ProcurementData';

const GridView = () => {

    const agGridProps: AgGridReactProps = {
        tooltipShowDelay: 0,
        tooltipTrigger: "focus",
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },

            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,

            pagination: true,
            defaultColDef: {
                cellStyle: {
                    'text-align': 'center',
                    'height': '50px',
                    "font-style": "normal",
                    "font-variant": "normal",
                    "font-weight": "300",
                    "font-size": "20px",
                    "font-family": "Roboto",
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'resizable': 'true',
                },
            },

        },
        masterDetail: true,

        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,

        onCellEditingStopped(event: any) {
            const field = event.colDef.field;
            const newValue = event.newValue;
            const rowIndex = event.rowIndex;

            if (!field || rowIndex == null) {
                return;
            }


        }
    };

    const [ShortageColumns, setShortageColumns] = useState(columnData);
    const gridRef = useRef();

    const mapDataToColumns = (data: Order[], columns: ColumnData[]) => {
        return data.map(item => {
            const mappedItem: any = {};
            columns.forEach(column => {
                if (column.field) {
                    mappedItem[column.field] = item[column.field as keyof Order];
                }
                // if (column.field && column.field === "bpp") {
                //     mappedItem[column.field]
                // }
            });
            return mappedItem;
        });
    };

    const convertedData = mapDataToColumns(procData, columnData);
    const [ShortageDatas, setShortageData] = useState(convertedData);


    return (
        <>
            <VFTable

                {...agGridProps}
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