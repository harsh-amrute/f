import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { GridOptions } from 'ag-grid-enterprise';
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
  columnState: any
}

const Step1 = forwardRef(({ gridOptions, rows, selectedRows, currentPageSelectedRows, totalRows, currentPage, setCurrentPage, setSelectedRows, currentGridRef, setCurrentGridRef, columnState }: IStep1Props, ref: any) => {

  const gridRef = useRef<any>();

  const handlePageChange = async (currPage: number) => {
    setCurrentPage(currPage);
  };

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

  useEffect(() => {
    if (gridRef.current && columnState.length) {
      console.log('Applying column state:', columnState);
      const result = gridRef.current.columnApi.applyColumnState({
        state: columnState,
        applyOrder: true, // Ensure order is applied
      });
      console.log(result, "RESULT")
      if (!result) {
        console.error('Failed to apply column state');
      }
    }
  }, [columnState, currentGridRef]); // Reapply column state whenever it changes

  // useEffect(()=>{
  //   if(currentGridRef){

  //     if (currentGridRef?.current && columnState?.length) {

  //       const result = currentGridRef.current.columnApi.applyColumnState({
  //         state: columnState,
  //         applyOrder: true, // Ensure order is applied
  //       });
  //       console.log(result, 'RESLUT')
  //       if (!result) {
  //         console.error('Failed to apply column state');
  //       }
  //     }
  //   }
  // },[])

  return (
    <>
      <VFTable
        key="allRows"
        ref={gridRef}
        gridOptions={gridOptions}
        columnDefs={gridOptions.columnDefs}
        rowData={rows}
        isRowSelectable={isRowSelectable}
        rowSelection="multiple"
        onGridReady={(params: any) => {
          params.columnApi.autoSizeAllColumns();
          setCurrentGridRef(gridRef);
        }}
        onRowDataUpdated={(params) => {
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
          _.differenceWith(currentPageSelectedRows.current, params.api.getSelectedNodes(), _.isEqual).forEach((node: any) => {
            newMap.delete(node.data.ok);
          });
          params.api.getSelectedNodes().forEach((node: any) => {
            newMap.set(node.data.ok, node);
          });
          setSelectedRows(newMap);
          currentPageSelectedRows.current = params.api.getSelectedNodes();
        }}
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
