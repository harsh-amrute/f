import React, { useEffect, useRef } from "react"
import VFTable from "../../../Common/VFTable";
import { GridOptions } from "ag-grid-enterprise";

const GridView = ({gridData, colDef, columnState, setCurrentGridRef, currentGridRef}: any) => {
    const gridRef = useRef();

    const gridOptions: GridOptions = {
        sideBar: {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    minWidth: 225,
                    maxWidth: 225,
                    width: 225
                }
            ],
        },
        defaultColDef: {
            initialFlex: 1,
            wrapHeaderText: true,
            autoHeaderHeight: true,
            filter: "agTextColumnFilter",
            floatingFilter: true,
            enableRowGroup: true,
            floatingFilterComponentParams: { suppressFilterButton: true },
        },
        rowGroupPanelShow: "always",
    };

    useEffect(() => {
        if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
            const result = currentGridRef.current.api.applyColumnState({
                state: columnState,
                applyOrder: true
            });
            if (!result) {
                console.error('Failed to apply column state');
            }
        }
    }, [columnState]);

    return (
        <div data-testid="grid-view" style={{ height:"95%", width: '100%', margin:"20px", paddingRight:"20px", paddingBottom:"10px"}}>
            <VFTable
                {...gridOptions}
                columnDefs={colDef}
                rowData={gridData}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                ref={gridRef}
                onGridReady={(params: any) => {
                    params.api.autoSizeAllColumns();
                    
                    setCurrentGridRef(gridRef);
                }}
                statusBar={{
                    statusPanels: [
                        { statusPanel: "agTotalRowCountComponent", align: "left" },
                    ],
                }}
                maintainColumnOrder
            />
        </div>
    )
}

export default React.memo(GridView);