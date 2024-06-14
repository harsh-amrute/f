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
            overlayNoRowsTemplate: `
            <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: ${Math.random() < 0.5 ? "#EBEBEB" : "#F7F7F7"};">
                No Rows To Show
            </div>`,

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


    return (
        <>
            {/* <VFTable
        {...agGridProps}
        columnDefs={ShortageColumns}
        rowData={ShortageDatas}
        tooltipHideDelay={100000}
        tooltipShowDelay={0}
        tooltipMouseTrack={true}
        height={750}
        ref={gridRef}
        statusBar={{
            statusPanels: [
                { statusPanel: 'agTotalRowCountComponent', align: 'left' },
            ]
        }}
        />
    <div style={{ textAlign: 'right', flexDirection: 'row' }}>

        <VFButtonOutline
            onClick={navigateToSimulateScreen}
            themeUi=""
            disabled={false}
            width={150}
            style={{
                marginRight: 20,
                borderColor: '#BC3D81',
                color: '#BC3D81',
                fontWeight: 'bold',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/assets/img/VectorFLOW/reset.svg" alt="Reset Icon" style={{ marginRight: 8 }} />
                Reset Data
            </div>
        </VFButtonOutline>
        <VFButton
            onClick={navigateToSimulateScreen}
            themeUi=""
            disabled={false}
            width={250}>Simulate improvement in Full Kits
        </VFButton>
    </div>

</div>
</>
); */}

            <VFTable columnDefs={[]} rowData={[]} {...agGridProps} />

        </>
    )
}

export default GridView