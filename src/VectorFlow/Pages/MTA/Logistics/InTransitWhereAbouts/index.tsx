

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import ActionToolBar from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar"
import BPRSubmiRemarkToolTip from "../../SupplyChainIntelligenceHub/BPR/BPRSubmitRemarkToolTip"


import { GridStateContext } from "../../../../../context/GridStateContext"
import useInTransitWhereAbouts from "./useInTransitWhereAbouts"
import ContactDetailsModal from "./ContactDetailsModal"
import RemarkModal from "./RemarkModal"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"




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
        getRowData,
        currentFilter,
        setCurrFilter,
        onDelete,
        onApplyFilter,
        onExportToExcelCallBack,
        tempRef,
        tempAgGridProps,
        onSubmitCurrentLocation,
        onSubmitETA,
        handlePageChange
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
              />
          
        {
            isLoading
            ?
            <VFLoader/>
            :
            <>
                <VFTable
                    columnDefs={colDefs}
                    rowData={rowData}
                    {...agGridProps}
                    ref={ref}
                    height={600}
                />
                <div style={{marginBottom:'40px'}}>
                <VFPagination
                    selectedRows={0}
                    totalRows={recordCount}
                    currentPage={currentPage}
                    rowsPerPage={100}
                    handleChangePage={handlePageChange}
                />
                </div>
            </>
        }
          
        
        {isSubmitRemarkToolTipOpen && (
            <BPRSubmiRemarkToolTip
                remark={remark}
                setRemark={updateRemark}
                style={submitRemarkToolTipPosition}
                onSuccess={onSubmitRemark}
                onClose={onCloseSubmitRemark}
                
            />
        )}
        {isSubmitETAToolTipOpen && (
            <BPRSubmiRemarkToolTip
                remark={etaValue}
                setRemark={(e)=>setETAValue(e.target.value)}
                style={submitETAToolTipPosition}
                onSuccess={onSubmitETA}
                onClose={onCloseSubmitETA}
                
            />
        )}
         {isSubmitCurrentLocationTipOpen && (
            <BPRSubmiRemarkToolTip
                remark={currentLocationValue}
                setRemark={(e)=>setCurrentLocationValue(e.target.value)}
                style={submitCurrentLocationToolTipPosition}
                onSuccess={onSubmitCurrentLocation}
                onClose={onCloseSubmitCurentLocation}
                
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