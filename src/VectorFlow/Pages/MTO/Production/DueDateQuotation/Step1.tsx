import { GridOptions } from 'ag-grid-enterprise';
import _ from 'lodash';
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import VFTable from '../../Common/VFTable';
import { pagination } from '../../Common/Enum';

interface IStep1Props {
  gridOptions: GridOptions,
  rows: any,
  selectedRows: any,
  currentPageSelectedRows: React.MutableRefObject<any>,
  totalRows: React.MutableRefObject<number>,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  scheduledOrders: any,
  setSelectedRows: any
}

const Step1 = forwardRef(({ gridOptions, rows, selectedRows, currentPageSelectedRows, totalRows, currentPage, setCurrentPage, setSelectedRows }: IStep1Props, ref: any) => {

  const gridRef = useRef<any>()
  const handlePageChange = async (currPage: number) => {
    setCurrentPage(currPage)
  }

  // useEffect(()=>{
  //   const newMap = new Map(selectedRows)
  //   scheduledOrders.forEach((order: any)=>{
  //     newMap.delete(order);
  //   })
  //   setSelectedRows(newMap)
  // }, [scheduledOrders])

  const deselectAllForStep1 = () => {
    gridRef.current?.api.deselectAll();
    setSelectedRows(new Map());
  }

  useImperativeHandle(ref, () => ({
    deselectAllForStep1: deselectAllForStep1
  }));

  return (
    <>
      <VFTable
        key="allRows"
        ref={gridRef}
        gridOptions={gridOptions}
        columnDefs={gridOptions.columnDefs}
        rowData={rows}
        // domLayout="autoHeight"
        rowSelection="multiple"
        onGridReady={(params: any) => {
          params.columnApi.autoSizeAllColumns();
        }}
        onRowDataUpdated={(params) => {
          const selectedRowIds = Array.from(selectedRows.keys());
          const newCurrentPageSeleceted: any = []
          params.api.forEachNode(node => {
            if (selectedRowIds.includes(node.data.ok)) {
              newCurrentPageSeleceted.push(node)
            }
          });
          currentPageSelectedRows.current = newCurrentPageSeleceted;
          params.api.setNodesSelected({ nodes: newCurrentPageSeleceted, newValue: true });
        }}
        onSelectionChanged={(params: any) => {
          const newMap = new Map(selectedRows);
          _.differenceWith(currentPageSelectedRows.current, params.api.getSelectedNodes(), _.isEqual).forEach((node: any) => {
            newMap.delete(node.data.ok);
          })
          //to sort within the same page
          // params.api.getSelectedNodes().forEach((node: any) => {
          //   newMap.delete(node.data.ok);
          // })
          params.api.getSelectedNodes().forEach((node: any) => {
            newMap.set(node.data.ok, node);
          })
          setSelectedRows(newMap)
          currentPageSelectedRows.current = params.api.getSelectedNodes();
        }}
      />
      <VFPagination
        selectedRows={0}
        totalRows={totalRows.current}
        rowsPerPage={pagination.mtoPageSize}
        currentPage={currentPage}
        handleChangePage={handlePageChange}
      />
    </>
  )
})

export default Step1