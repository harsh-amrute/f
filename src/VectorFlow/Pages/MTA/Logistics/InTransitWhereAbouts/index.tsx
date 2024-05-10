

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import ActionToolBar from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar"
import BPRRemarkHistoryToolTip from "../../SupplyChainIntelligenceHub/BPR/BPRRemarkHistoryToolTip"
import BPRSubmiRemarkToolTip from "../../SupplyChainIntelligenceHub/BPR/BPRSubmitRemarkToolTip"


import { GridStateContext } from "../../../../../context/GridStateContext"
import useInTransitWhereAbouts from "./useInTransitWhereAbouts"
import ContactDetailsModal from "./ContactDetailsModal"
import RemarkModal from "./RemarkModal"




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
        remarkHistoryToolipPosition,
        isSavedDataLoading,
        ref,
        columnState,
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
        onCloseContactModal
    } = useInTransitWhereAbouts()

    console.log(rowData)

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
              <>
                <ActionToolBar 
                view={'grid'} 
                setCurrentTab={''} 
                currCategory={'InTransitWhereabouts'} 
                currentTab={''} 
                tabsList={[]} 
                onFloatingTabChange={()=>console.log('')} 
                onGoBack={()=>console.log('')} 
                onViewChange={()=>console.log('')}
                genericRecordCount={12}
                onExportToExcelCallBack={()=>{return }}
              />
          
            <VFTable
            columnDefs={colDefs}
            rowData={rowData}
            {...agGridProps}
            ref={ref}
            height={800}
        />
          
        
        {isSubmitRemarkToolTipOpen && (
            <BPRSubmiRemarkToolTip
                remark={remark}
                setRemark={updateRemark}
                style={submitRemarkToolTipPosition}
                onSuccess={onSubmitRemark}
                onClose={onCloseSubmitRemark}
                
            />
        )}

        {/* {isRemarkHistoryToolTipOpen && (
            <BPRRemarkHistoryToolTip
                remarkHistory={remarkHistory}
                onClose={onCloseRemarkHistory}
                style={remarkHistoryToolipPosition}
            />
        )} */}
              </>
            <ContactDetailsModal isOpen={isContactModalOpen} onClose={onCloseContactModal} data={currentUserDetails}/>
            <RemarkModal isOpen={isRemarkHistoryToolTipOpen} onClose={onCloseRemarkHistory} data={[]}/>
        </GridStateContext.Provider>
    )
}

export default InTransitWhereAbouts