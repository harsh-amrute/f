

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import ActionToolBar from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar"
import BPRSubmiRemarkToolTip from "../../SupplyChainIntelligenceHub/BPR/BPRSubmitRemarkToolTip"


import { GridStateContext } from "../../../../../context/GridStateContext"
import useInTransitWhereAbouts from "./useInTransitWhereAbouts"
import ContactDetailsModal from "./ContactDetailsModal"
import RemarkModal from "./RemarkModal"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import { ButtonWrapper } from "../../SupplyChainIntelligenceHub/OpenExpeditingRequests/styles"
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"



const InTransitWhereAbouts = ()=>{


    const {
        agGridProps,
        rowData,
        remark,
        isLoading,
        remarkHistory,
        isSubmitRemarkToolTipOpen,
        isRemarkHistoryToolTipOpen,
        submitRemarkToolTipPosition,
        ref,
        updateRemark,
        onSubmitRemark,
        onCloseSubmitRemark,
        onCloseRemarkHistory,
        tempDownloadData,
        setTempDownloadData,
        colDefs,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        currentUserDetails,
        isContactModalOpen,
        onCloseContactModal,
        isSubmitETAToolTipOpen,
        etaValue,
        setETAValue,
        submitETAToolTipPosition,
        onCloseSubmitETA,
        isSubmitCurrentLocationTipOpen,
        submitCurrentLocationToolTipPosition,
        currentLocationValue,
        setCurrentLocationValue,
        onCloseSubmitCurentLocation,
        recordCount,
        currentPage,
        currentFilter,
        setCurrFilter,
        onDelete,
        onApplyFilter,
        onExportToExcelCallBack,
        tempRef,
        tempAgGridProps,
        onSubmitCurrentLocation,
        onSubmitETA,
        handlePageChange,
        editedRows,
        onSubmitEditedRows,
        themeUi
    } = useInTransitWhereAbouts()


    return(
        <GridStateContext.Provider
        value={{
          ref:ref,
          exportExcelColumns:exportExcelColumns,
          setExportExcelColumns:setExportExcelColumns,
          tempDownloadData:tempDownloadData,
          setTempDownloadData:setTempDownloadData,
          exportExcelRowData:exportExcelRowData,
          setExportExcelRowData:setExportExcelRowData

      }}
        >
            <div style={{zoom:'0.8'}}>
                <ActionToolBar 
                view={'grid'} 
                setCurrentTab={''} 
                currCategory={'InTransitWhereabouts'} 
                currentTab={''} 
                tabsList={[]} 
                onFloatingTabChange={()=>console.log('')} 
                onGoBack={()=>console.log('')} 
                onViewChange={()=>console.log('')}
                genericRecordCount={recordCount}
                onExportToExcelCallBack={onExportToExcelCallBack}
                multiFilter={currentFilter}
                setMultiFilter={setCurrFilter}
                onDelete={onDelete}
                onApplyFilter={onApplyFilter}
                onSubmitEditedRows={onSubmitEditedRows}
                disableSubmitEditedRowsBtn={editedRows.length===0}
              />
              </div>
          
        {
            isLoading
            ?
            <VFLoader/>
            :
            <>
                <VFTable
                    columnDefs={colDefs}
                    rowData={[...rowData]}
                    {...agGridProps}
                    ref={ref}
                    height={"65%"}
                    
                />
                <div style={{marginBottom:'10px'}}>
                <VFPagination
                    selectedRows={0}
                    totalRows={recordCount}
                    currentPage={currentPage}
                    rowsPerPage={100}
                    handleChangePage={handlePageChange}
                />
                </div>
                <ButtonWrapper>
                    <VFButtonOutline disabled={editedRows.length===0} themeUi={themeUi} width={169} style={{fontSize:'20px', fontWeight:'500'}} onClick={onSubmitEditedRows}>Save  Remarks</VFButtonOutline>
                </ButtonWrapper>
            </>
        }
          
        
        {isSubmitRemarkToolTipOpen && (
            <BPRSubmiRemarkToolTip
                remark={remark}
                setRemark={updateRemark}
                style={submitRemarkToolTipPosition}
                onSuccess={onSubmitRemark}
                onClose={onCloseSubmitRemark}
                themeUi={themeUi}
                
            />
        )}
        {isSubmitETAToolTipOpen && (
            <BPRSubmiRemarkToolTip
                remark={etaValue}
                setRemark={(e)=>setETAValue(e.target.value)}
                style={submitETAToolTipPosition}
                onSuccess={onSubmitETA}
                onClose={onCloseSubmitETA}
                isDate
                themeUi={themeUi}
            />
        )}
         {isSubmitCurrentLocationTipOpen && (
            <BPRSubmiRemarkToolTip
                remark={currentLocationValue}
                setRemark={(e)=>setCurrentLocationValue(e.target.value)}
                style={submitCurrentLocationToolTipPosition}
                onSuccess={onSubmitCurrentLocation}
                onClose={onCloseSubmitCurentLocation}
                themeUi={themeUi}
            />
        )}
            <ContactDetailsModal isOpen={isContactModalOpen} onClose={onCloseContactModal} data={currentUserDetails}/>
            <RemarkModal isOpen={isRemarkHistoryToolTipOpen} onClose={onCloseRemarkHistory} data={remarkHistory}/>
            <div style={{display:'none'}}>                
                  <VFTable
                    ref={tempRef}
                    columnDefs={colDefs}
                    rowData={exportExcelRowData}
                    {...tempAgGridProps}
                  />
                </div>
        </GridStateContext.Provider>
    )
}

export default InTransitWhereAbouts