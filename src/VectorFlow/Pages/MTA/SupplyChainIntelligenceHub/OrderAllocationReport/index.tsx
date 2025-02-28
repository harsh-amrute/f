import {RRRLayout} from './styles'
import useOrderAllocation from './useOrderAllocationReport';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'
import ActionToolBar from "../Planning/ActionToolBar"
import { GridStateContext } from '../../../../../context/GridStateContext';



const OrderAllocationReport = () => {

 const { 
  colDefs,
  agGridProps,
  rowData, 
  isLoading,
  recordCount,
  currentPage,
  tempRef,
  tempDownloadData,
  setTempDownloadData,
  tempAgGridProps,
  exportExcelRowData,
  setExportExcelRowData,
  exportExcelColumns,
  setExportExcelColumns,
  onExportToExcelCallBack,
  handleChangePage,
  onApplyFilter,
  currFilter,
  setCurrFilter,
  onDeleteFilter,
  isSavedDataLoading,
  ref,
  generalFilterOptions,
  onResetCallback
} = useOrderAllocation();


 
  return (
  <GridStateContext.Provider
  value={{
    ref:ref,
    exportExcelColumns:exportExcelColumns,
    setExportExcelColumns:setExportExcelColumns,
    tempDownloadData:tempDownloadData,
    setTempDownloadData:setTempDownloadData,
    exportExcelRowData:exportExcelRowData,
    setExportExcelRowData:setExportExcelRowData,
    onResetCallback:onResetCallback
}}
  >
    <div style={{marginLeft:'10px'}}>
      <ActionToolBar 
        view={'grid'} 
        setCurrentTab={''} 
        currCategory={'OrderAllocationReport'} 
        currentTab={''} 
        tabsList={[]} 
        onApplyFilter={(e)=>onApplyFilter(e)}
        onFloatingTabChange={()=>console.log('')} 
        onGoBack={()=>console.log('')} 
        onViewChange={()=>console.log('')}
        genericRecordCount={recordCount}
        disableChartAndGridViewToggle
        onExportToExcelCallBack={onExportToExcelCallBack}
        multiFilter={currFilter}
        generalFilterOptions={generalFilterOptions}
        setMultiFilter={setCurrFilter}
        onDelete={onDeleteFilter}
      />
    </div>
    <RRRLayout>
        {/* <RRRTaskBar style={{width:isSideBarOpen? '77%':'97%'}}>
            <VFButtonOutline
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Excel Export 
            </VFButtonOutline>
            <VFButton
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Edit Filter
            </VFButton>
            <VFButton
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Reset Filter
            </VFButton>
        </RRRTaskBar> */}
        {(isLoading || isSavedDataLoading)?(
          <VFLoader/>
        ):
        (
          <div style={{height:'70vh'}}>

          <VFTable
                  ref={ref}
                  {...agGridProps}
                  columnDefs={colDefs}
                  rowData={rowData}
                  enableRangeSelection={true} // Added property
                rowSelection="multiple"
                statusBar = {{
                    statusPanels: [
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                      { statusPanel: 'agTotalRowCountComponent', align:'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                      { statusPanel: 'agAggregationComponent', align:'left' },
                    ],
                  }}
                height={"100%"}
                maintainColumnOrder
              />  
              <VFPagination 
                selectedRows={0} 
                totalRows={recordCount} 
                currentPage={currentPage} 
                rowsPerPage={parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '100')}
                handleChangePage={handleChangePage} 
              />  
        </div>
        )}
        <div style={{display:'none'}}>                
          <VFTable
            ref={tempRef}
            columnDefs={colDefs}
            rowData={exportExcelRowData}
            {...tempAgGridProps}
          />
        </div>
    </RRRLayout>
  </GridStateContext.Provider>
  )
}

export default OrderAllocationReport