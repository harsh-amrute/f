import React, { useEffect, useRef, useState } from "react"
import VFTable from "../../../Common/VFTable";
import { GridOptions } from "ag-grid-enterprise";
import CustomPageSizeInput from "../../../Common/VFPagination/CustomPageSizeInput";
import { VFTableWrapper } from "./styles";
import { GridFilterWrapper, TextBtn } from "../../../Common/VFPagination/styles";
import { useUserData } from "../../../../../../context/index";
import { AgGridReact } from "ag-grid-react";




const GridView = ({gridData, colDef, columnState, setCurrentGridRef, currentGridRef,savePageSize,userPageSize}: any) => {
    // const gridRef = useRef();
    const gridRef = useRef<AgGridReact>(null);
    const [isDisabled, setIsDisabled]= useState<boolean>(true)
    const { user } = useUserData();
    const theme_ui = user.user.theme_ui


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


    const customPage = () => (
        <div style={{paddingBottom:'4px', paddingRight:'7px'}}>
          <CustomPageSizeInput 
            savePageSize={savePageSize}
            userPageSize={userPageSize}
          />
        </div>
      );

      console.log('fdata',gridData )

      const clearGridFilter = () =>{
        gridRef?.current?.api?.setFilterModel(null);
          setIsDisabled(true);
    }
    
      const CustomStatusPanel = () => {
            return (
                <GridFilterWrapper>
                    <TextBtn onClick={clearGridFilter} disabled={isDisabled} themeUi={theme_ui}>
                        Clear All Grid Filters
                    </TextBtn>  
                </GridFilterWrapper>           
            );
        }; 


    return (
        // <div data-testid="grid-view" style={{ height:"95%", width: '100%', margin:"20px", paddingRight:"20px", paddingBottom:"10px"}}>
             <VFTableWrapper data-testid="grid-view" >
            <VFTable
                {...gridOptions}
                columnDefs={colDef}
                rowData={gridData}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                ref={gridRef}
                pagination={true}
                paginationPageSize={userPageSize}
                paginationPageSizeSelector={false}        
                statusBar={{
                    statusPanels: [
                        // { statusPanel: "agTotalRowCountComponent", align: "left" },
                        { statusPanel: customPage, align:'right' },
                        { statusPanel: CustomStatusPanel, align: "left" }

                    ],
                }}
                onGridReady={(params: any) => {
                    params.api.autoSizeAllColumns();
                    setCurrentGridRef(gridRef);
                    params.api.addEventListener('filterChanged', () => {
                      const filterModel = params.api.getFilterModel();
                      if (Object.keys(filterModel).length > 0) {
                          setIsDisabled(false); 
                      } else {
                          setIsDisabled(true); 
                      }
                      });
                  }}
                maintainColumnOrder
            />
          </VFTableWrapper>
        // </div>
    )
}

export default React.memo(GridView);