import { GridOptions } from 'ag-grid-enterprise';
import _ from 'lodash';
import React, { useState } from 'react'
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

interface IStep1Props{
    theme: string,
    gridOptions: GridOptions,
    rows: any,
    selectedRows: any,
    currentPageSelectedRows: React.MutableRefObject<any>,
    totalRows: React.MutableRefObject<number>,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Step1 = ({theme, gridOptions, rows, selectedRows, currentPageSelectedRows, totalRows, currentPage, setCurrentPage}: IStep1Props) => {

  const handlePageChange = async (currPage: number) => {
    setCurrentPage(currPage)
  }


  return (
      <>
        <VFTable
            key="allRows"
            gridOptions={gridOptions}
            columnDefs={gridOptions.columnDefs}
            rowData={rows}
            // domLayout="autoHeight"
            rowSelection="multiple"
            onGridReady={(params: any) => {
                params.columnApi.autoSizeAllColumns();
            }}
            onRowDataUpdated={(params)=>{
              const selectedRowIds = Array.from(selectedRows.keys());
              const newCurrentPageSeleceted: any = []
              params.api.forEachNode(node => {
                  if (selectedRowIds.includes(node.data.oid)) {
                      newCurrentPageSeleceted.push(node)
                  }
              });
              currentPageSelectedRows.current = newCurrentPageSeleceted;
              params.api.setNodesSelected({ nodes: newCurrentPageSeleceted, newValue: true });
            }}
            
            onSelectionChanged={(params: any) => {
              _.differenceWith(currentPageSelectedRows.current, params.api.getSelectedNodes(), _.isEqual).forEach((node: any) => {
                selectedRows.delete(node.data.oid);
              }) 
              params.api.getSelectedNodes().forEach((node: any) => {
                  selectedRows.set(node.data.oid, node);
              })
              currentPageSelectedRows.current = params.api.getSelectedNodes();
            }}
        />
        <VFPagination
            selectedRows={0}
            totalRows={totalRows.current}
            rowsPerPage={10}
            currentPage={currentPage}
            handleChangePage={handlePageChange}
        />
    </>
  )
}

export default Step1