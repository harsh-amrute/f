

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import ActionToolBar from "../Planning/ActionToolBar"
import BPRRemarkHistoryToolTip from "../BPR/BPRRemarkHistoryToolTip"
import BPRSubmiRemarkToolTip from "../BPR/BPRSubmitRemarkToolTip"

import useOpenExpeditingRequests from "./useOpenExpeditingRequests"
import { GridStateContext } from "../../../../../context/GridStateContext"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"




const OpenExpeditingRequests = ()=>{

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
        setExportExcelColumns
    } = useOpenExpeditingRequests()

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
                currCategory={'OpenExpeditingRequests'} 
                currentTab={''} 
                tabsList={[]} 
                onFloatingTabChange={()=>console.log('')} 
                onGoBack={()=>console.log('')} 
                onViewChange={()=>console.log('')}
                genericRecordCount={12}
                onExportToExcelCallBack={()=>{return }}
              />
          {(isLoading|| isSavedDataLoading)?
          (
            <VFLoader/>
          )
            :
          (
            <VFTable
            columnDefs={colDefs}
            rowData={rowData}
            {...agGridProps}
            ref={ref}
            onGridReady={(params)=>{
              if(columnState){
                params.columnApi.applyColumnState({state:columnState})
              }
            }}
            height={800}
        />
          )
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

        {isRemarkHistoryToolTipOpen && (
            <BPRRemarkHistoryToolTip
                remarkHistory={remarkHistory}
                onClose={onCloseRemarkHistory}
                style={remarkHistoryToolipPosition}
            />
        )}
        </GridStateContext.Provider>
    )
}

export default OpenExpeditingRequests