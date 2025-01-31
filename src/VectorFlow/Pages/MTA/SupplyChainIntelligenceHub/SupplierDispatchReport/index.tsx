import useSupplierDispatchReport from "./useSupplierDispatchReport";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import { GridStateContext } from "../../../../../context/GridStateContext";
import { VDRLayout } from "./styles";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import ActionToolBar from "../Planning/ActionToolBar";


const SupplierDispatchReport = () => {
  

  const {
    VDRColumns,
    RowData,
    SDRCount,
    currentPage,
    setExportExcelColumns,
    exportExcelColumns,
    tempDownloadData,
    setTempDownloadData,
    exportExcelRowData,
    setExportExcelRowData,
    isLoading,
    GetSDRData,
    tempRef,
    tempAgGridProps,
    currFilter,
    setCurrFilter,
    onDeleteFilter,
    onExportToExcelCallBack,
    onApplyFilter,
    ref,
    agGridProps,
    generalFilterOptions
  } = useSupplierDispatchReport();
  

  
  return (
    <GridStateContext.Provider
      value={{
        ref: ref,
        exportExcelColumns: exportExcelColumns,
        setExportExcelColumns: setExportExcelColumns,
        tempDownloadData: tempDownloadData,
        setTempDownloadData: setTempDownloadData,
        exportExcelRowData: exportExcelRowData,
        setExportExcelRowData: setExportExcelRowData,
      }}
    >
      <div style={{marginLeft:'10px'}}>
      <ActionToolBar 
        view={'grid'} 
        setCurrentTab={''} 
        currCategory={'SDR'} 
        currentTab={''} 
        tabsList={[]} 
        onApplyFilter={(e)=>onApplyFilter(e)}
        onFloatingTabChange={()=>console.log('')} 
        onGoBack={()=>console.log('')} 
        onViewChange={()=>console.log('')}
        genericRecordCount={SDRCount}
        onExportToExcelCallBack={onExportToExcelCallBack}
        multiFilter={currFilter}
        generalFilterOptions={generalFilterOptions}
        setMultiFilter={setCurrFilter}
        onDelete={onDeleteFilter}
      />
      </div>
      <VDRLayout>
      {(isLoading )?(
          <VFLoader/>
        ):
      (<div style={{height:'70vh'}}>
       <VFTable
                  ref={ref}
                  {...agGridProps}
                  columnDefs={VDRColumns}
                  rowData={RowData}
                  height={'100%'}
        />
        <VFPagination 
                selectedRows={0} 
                totalRows={SDRCount} 
                currentPage={currentPage} 
                rowsPerPage={parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '100')}
                handleChangePage={(e)=>GetSDRData(e)} 
              />
        </div>
      )}
      <div style={{display:'none'}}>                
          <VFTable
            ref={tempRef}
            columnDefs={VDRColumns}
            rowData={exportExcelRowData}
            {...tempAgGridProps}
          />
        </div>
      </VDRLayout>
    </GridStateContext.Provider>
  );
};

export default SupplierDispatchReport;
