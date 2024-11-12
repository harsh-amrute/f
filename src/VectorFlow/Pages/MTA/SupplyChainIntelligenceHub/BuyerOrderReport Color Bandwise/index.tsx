import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";

 import { BORLayout } from "./styles"
 import {useBORColorBandwise} from "./useBORColorBandwise"
 import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
 import ActionToolBar from "../Planning/ActionToolBar"
import { GridStateContext } from "../../../../../context/GridStateContext";
import DailyDataGraphModal from "../../../../../components/VectorFLOW/commons/DailyDataGraphModal";
import NormChangeHistoryTable from "../../../../../components/VectorFLOW/commons/NormChangeHistoryTable";
const BuyerOrderReportColorBandwise = ()=>{

    const {     
     isLoading,      
        colDefs,
        agGridProps,
        rowData,       
        currentPage,
        recordCount,
        ref,
        isSavedDataLoading,
        handleChangePage,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        onExportToExcelCallBack,
        showDailyDataGraphModal,
        showNormChangeHistoryTable,
        dailyData,
        currFilter,
        setCurrFilter,
        onDeleteFilter, 
        onApplyFilter ,
        generalFilterOptions,
        onSubmitRemarks,
        editedRows
    } = useBORColorBandwise()


    return(

     
      <GridStateContext.Provider
        value={{
          ref: ref,
          exportExcelColumns: exportExcelColumns,
          setExportExcelColumns: setExportExcelColumns,
          tempDownloadData: tempDownloadData,
          setTempDownloadData: setTempDownloadData,
          exportExcelRowData: exportExcelRowData,
          setExportExcelRowData: setExportExcelRowData
        }}
      >
        <div style={{ marginLeft: '10px' }}>
          <ActionToolBar
            view={'grid'}
            setCurrentTab={''}
            currCategory={'BORColorBandwise'}
            currentTab={''}
            tabsList={[]}
            onApplyFilter={(e) => onApplyFilter(e)}
            onFloatingTabChange={() => console.log('')}
            onGoBack={() => console.log('')}
            onViewChange={() => console.log('')}
            genericRecordCount={recordCount}
            onExportToExcelCallBack={onExportToExcelCallBack}
            multiFilter={currFilter}
            setMultiFilter={setCurrFilter}
            disableChartAndGridViewToggle
            generalFilterOptions={generalFilterOptions}
            onDelete={onDeleteFilter} 
            onSubmitEditedRows={onSubmitRemarks}
            disableSubmitEditedRowsBtn={editedRows.length===0}
            />
        </div>
        <BORLayout>
          {/* <BORTaskBar style={{width:'74%'}}>
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
    </BORTaskBar> */}
          {(isLoading || isSavedDataLoading) ? (
            <VFLoader />
          ) :
            (
              <div style={{ height: '100vh' }}>
                {showDailyDataGraphModal && <DailyDataGraphModal rowData={dailyData.rowData} chartData={dailyData.chartData} normChangeData={dailyData.normChangeData} masterData={dailyData.masterData} isModalOpen={showDailyDataGraphModal} suggestionData={dailyData.suggestionData} monitoringData={dailyData.monitoringData} skuKey={'SKUCode'} whKey={'WHDescription'} />}
                {showNormChangeHistoryTable && <NormChangeHistoryTable data={dailyData.normChangeData} />}

                <VFTable
                  {...agGridProps}
                  columnDefs={colDefs}
                  rowData={rowData}
                  ref={ref}
                  enableRangeSelection={true} // Added property
                  rowSelection="multiple"
                  statusBar={{
                    statusPanels: [
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ],
                  }}
                  height={"90%"} />
                <VFPagination
                  selectedRows={0}
                  totalRows={recordCount}
                  currentPage={currentPage}
                  rowsPerPage={parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100')}
                  handleChangePage={(e) => handleChangePage(e)} />

              </div>
            )}
          <div style={{ display: 'none' }}>
            <VFTable
              ref={tempRef}
              columnDefs={colDefs}
              rowData={exportExcelRowData}
              {...tempAgGridProps} />
          </div>
        </BORLayout>
      </GridStateContext.Provider>
    )
}

export default BuyerOrderReportColorBandwise