import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { GridOptions, SideBarDef } from 'ag-grid-enterprise';
import _ from 'lodash';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import VFTable from '../../Common/VFTable';

interface IStep1Props {
  gridOptions: GridOptions,
  rows: any,
  selectedRows: any,
  currentPageSelectedRows: React.MutableRefObject<any>,
  totalRows: React.MutableRefObject<number>,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  scheduledOrders: any,
  setSelectedRows: any,
  setCurrentGridRef: any,
  currentGridRef: any,
  columnState: any,
  colDef: any,
}

const Step1 = forwardRef(({ gridOptions, colDef, rows, selectedRows, currentPageSelectedRows, totalRows, currentPage, setCurrentPage, setSelectedRows, currentGridRef, setCurrentGridRef, columnState }: IStep1Props, ref: any) => {

  const gridRef = useRef<any>();

  const handlePageChange = useCallback(async (currPage: number) => {
    setCurrentPage(currPage);
  },[]);

  const deselectAllForStep1 = () => {
    gridRef.current?.api.deselectAll();
    setSelectedRows(new Map());
  };

  useImperativeHandle(ref, () => ({
    deselectAllForStep1: deselectAllForStep1
  }));

  const isRowSelectable = useCallback((params: any) => {
    return (params.data.dd == null || params.data.dd == undefined);
  }, []);



  useEffect(()=>{
    if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
        const result = currentGridRef?.current?.api.applyColumnState({
            state: columnState,
            applyOrder: true
        });
        if (!result) {
            console.error('Failed to apply column state');
        }
    }
  }, []);

  const sideBar = React.useMemo<
  SideBarDef | string | string[] | boolean | null
>(() => {
  return {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        toolPanelParams: {
          suppressPivots: true,
          suppressPivotMode: true,
        },
      },
    ],
  };
}, []);

  return (
    <>
      <VFTable
        key="allRows"
        ref={gridRef}
        gridOptions={gridOptions}
        columnDefs={colDef}
        rowData={rows}
        isRowSelectable={isRowSelectable}
        rowSelection="multiple"
        onGridReady={(params: any) => {
          params.api.autoSizeAllColumns();
          setCurrentGridRef(gridRef);
        }}        
        onRowDataUpdated={(params) => {
          console.log("running row data update")
          const selectedRowIds = Array.from(selectedRows.keys());
          const newCurrentPageSelected: any = [];
          params.api.forEachNode(node => {
            if (selectedRowIds.includes(node.data.ok)) {
              newCurrentPageSelected.push(node);
            }
          });
          currentPageSelectedRows.current = newCurrentPageSelected;
          params.api.setNodesSelected({ nodes: newCurrentPageSelected, newValue: true });
        }}
        onSelectionChanged={(params: any) => {
          const newMap = new Map(selectedRows);
          const selectedRowIds = Array.from(selectedRows.keys());
          const newCurrentPageSelected: any = [];
          params.api.forEachNode((node:any) => {
            if (selectedRowIds.includes(node.data.ok)) {
              newCurrentPageSelected.push(node);
            }
          });
          currentPageSelectedRows.current = newCurrentPageSelected;
          _.differenceWith(currentPageSelectedRows.current, params.api.getSelectedNodes(), _.isEqual).forEach((node: any) => {
            newMap.delete(node.data.ok);
          });
          params.api.getSelectedNodes().forEach((node: any) => {
            newMap.set(node.data.ok, node);
          });       
          setSelectedRows(newMap);
          currentPageSelectedRows.current = params.api.getSelectedNodes();
        }}
        maintainColumnOrder={true}
        sideBar={sideBar}
      />
      <VFPagination
        selectedRows={0}
        totalRows={totalRows.current}
        rowsPerPage={15}
        currentPage={currentPage}
        handleChangePage={handlePageChange}
      />
    </>
  );
});

export default Step1;
