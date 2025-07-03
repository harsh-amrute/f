import useElephantOrders from "./useElephantOrders";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import { GridStateContext } from "../../../../../context/GridStateContext";
import { EOLayout } from "./styles";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import VFPagination from "../../../../../VectorFlow/Pages/MTO/Common/VFPagination"
import ActionToolBar from "../Planning/ActionToolBar";
import { useState } from "react";
import VFSave from "./VFSave";

const ElephantOrder = () => {
  

  const {
    VDRColumns,
    RowData,
    EOCount,
    currentPage,
    setExportExcelColumns,
    exportExcelColumns,
    tempDownloadData,
    setTempDownloadData,
    exportExcelRowData,
    setExportExcelRowData,
    isLoading,
    GetEOData,
    tempRef,
    tempAgGridProps,
    currFilter,
    setCurrFilter,
    onDeleteFilter,
    onExportToExcelCallBack,
    onApplyFilter,
    ref,
    agGridProps,
    generalFilterOptions,
    onResetCallback,
    onSubmitDueDate
  } = useElephantOrders();

      const [isDisabled, setIsDisabled]= useState<boolean>(true)
  
  

  
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
        onResetCallback:onResetCallback
      }}
    >

       
      <div style={{marginLeft:'10px'}}>
      <ActionToolBar 
        view={'grid'} 
        setCurrentTab={''} 
        currCategory={'EO'} 
        currentTab={''} 
        tabsList={[]} 
        onApplyFilter={(e) => onApplyFilter(e)}
        onFloatingTabChange={() => console.log('')} 
        onGoBack={() => console.log('')} 
        onViewChange={() => console.log('')}
        genericRecordCount={EOCount}
        onExportToExcelCallBack={onExportToExcelCallBack}
        multiFilter={currFilter}
        generalFilterOptions={generalFilterOptions}
        setMultiFilter={setCurrFilter}
        onDelete={onDeleteFilter}
      />
      </div>
      <EOLayout>
      {(isLoading )?(
          <VFLoader/>
        ):
      (<div style={{height:'60vh'}}>
       <VFTable
                  ref={ref}
                  {...agGridProps}
                  columnDefs={VDRColumns}
                  rowData={RowData}
                  height={'100%'}
                  onFilterChanged={() => {
                    const filterModel = ref?.current?.api?.getFilterModel();
                    if (filterModel && Object.keys(filterModel).length > 0) {
                      setIsDisabled(false);
                    } else {
                      setIsDisabled(true);
                    }
                }}
                
        />
       
        <div>
        <VFPagination 
                selectedRows={0} 
                totalRows={EOCount} 
                currentPage={currentPage} 
                rowsPerPage={parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '100')}
                handleChangePage={(e)=>GetEOData(e)} 

                resetGridRef={ref} 
                isDisabled={isDisabled}
              />
              <VFSave onSubmitRemarks={onSubmitDueDate}/>

            </div>
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
      </EOLayout>
    </GridStateContext.Provider>
  );
};

export default ElephantOrder;
