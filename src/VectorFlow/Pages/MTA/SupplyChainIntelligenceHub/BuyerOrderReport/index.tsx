import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";

 import { BORLayout } from "./styles"
 import {useBOR} from "./useBOR"
 import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
 import ActionToolBar from "../Planning/ActionToolBar"
import { GridStateContext } from "../../../../../context/GridStateContext";
import DailyDataGraphModal from "../../../../../components/VectorFLOW/commons/DailyDataGraphModal";
import NormChangeHistoryTable from "../../../../../components/VectorFLOW/commons/NormChangeHistoryTable";
import BPRRemarkHistoryModal from "../BPR/BPRRemarkHistoryModal";
import { useUserData } from "../../../../../context/UserDataContext";
import VFSaveRemark from "../../../../../components/VectorFLOW/commons/VFSaveRemark"


const BuyerOrderReport = ()=>{

    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;

    const {     
     isLoading,      
        BORColumns,
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
        onSubmitRemarks,
        editedRows,
        isRemarkHistoryToolTipOpen,
        remarkHistory,
        generalFilterOptions,
        onCloseRemarkHistory,
        onResetCallback
    } = useBOR()


    return(

     
      <GridStateContext.Provider
        value={{
          ref: ref,
          exportExcelColumns: exportExcelColumns,
          setExportExcelColumns: setExportExcelColumns,
          tempDownloadData: tempDownloadData,
          setTempDownloadData: setTempDownloadData,
          exportExcelRowData: exportExcelRowData,
          setExportExcelRowData: setExportExcelRowData,
          onResetCallback:onResetCallback
        }}
      >
        <div style={{ marginLeft: '10px' }}>
          <ActionToolBar
            view={'grid'}
            setCurrentTab={''}
            currCategory={'BOR'}
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
            onSubmitEditedRows={onSubmitRemarks}
            disableSubmitEditedRowsBtn={editedRows.length===0}
            generalFilterOptions={generalFilterOptions}
            onDelete={onDeleteFilter} />
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
              <div style={{ height: '78vh' }}>
                {showDailyDataGraphModal && <DailyDataGraphModal rowData={dailyData.rowData} chartData={dailyData.chartData} normChangeData={dailyData.normChangeData} masterData={dailyData.masterData} isModalOpen={showDailyDataGraphModal} suggestionData={dailyData.suggestionData} monitoringData={dailyData.monitoringData} skuKey={'SKUCode'} whKey={'WHDescription'} />}
                {showNormChangeHistoryTable && <NormChangeHistoryTable data={dailyData.normChangeData} />}

                <VFTable
                  {...agGridProps}
                  columnDefs={BORColumns}
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
                  height={"80%"} />
                <VFPagination
                  selectedRows={0}
                  totalRows={recordCount}
                  currentPage={currentPage}
                  rowsPerPage={parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100')}
                  handleChangePage={(e) => handleChangePage(e)} />

                <VFSaveRemark onSubmitRemarks={onSubmitRemarks} themeUi={themeUi}  />

              </div>
            )}
          {/* <div style={{ display: 'none' }}>
            <VFTable
              ref={tempRef}
              columnDefs={BORColumns}
              rowData={exportExcelRowData}
              {...tempAgGridProps} />
          </div> */}



            {/* {isSubmitRemarkToolTipOpen && (
                <BPRSubmiRemarkToolTip
                    remark={remark}
                    setRemark={updateRemark}
                    style={submitRemarkToolTipPosition}
                    onSuccess={onSubmitRemark}
                    onClose={onCloseSubmitRemark}
                    themeUi={themeUi}
                />
            )} */}

            <BPRRemarkHistoryModal
                data={remarkHistory}
                isOpen={isRemarkHistoryToolTipOpen}
                onClose={onCloseRemarkHistory}
            />
            <div style={{display:'none'}}>                
                  <VFTable
                    ref={tempRef}
                    columnDefs={BORColumns}
                    rowData={exportExcelRowData}
                    {...tempAgGridProps}
                  />
                </div>

        </BORLayout>
      </GridStateContext.Provider>
    )
}

export default BuyerOrderReport