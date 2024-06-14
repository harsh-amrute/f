

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import ActionToolBar from "../Planning/ActionToolBar"
import BPRSubmiRemarkToolTip from "../BPR/BPRSubmitRemarkToolTip"

import useOpenExpeditingRequests from "./useOpenExpeditingRequests"
import { GridStateContext } from "../../../../../context/GridStateContext"
import RemarkModal from "./RemarkModal"

// import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"




const OpenExpeditingRequests = ()=>{

    const {
        agGridProps,
        rowData,
        remark,
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
        currentFilter,
        setCurrentFilter,
        onDelete,
        onApplyFilter
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
                multiFilter={currentFilter}
                setMultiFilter={setCurrentFilter}
                onDelete={onDelete}
                onApplyFilter={onApplyFilter}
              />
          {/* {(isLoading)?
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
            // onGridReady={(params)=>{
            //   if(columnState){
            //     params.columnApi.applyColumnState({state:columnState})
            //   }
            // }}
            height={800}
        />
          )
        } */}
        <VFTable
            columnDefs={colDefs}
            rowData={rowData}
            enableRangeSelection={true} 
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
            {...agGridProps}
            ref={ref}
            // onGridReady={(params)=>{
            //   if(columnState){
            //     params.columnApi.applyColumnState({state:columnState})
            //   }
            // }}
            height={"85%"}
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

            <RemarkModal
                isOpen={isRemarkHistoryToolTipOpen}
                data={remarkHistory}
                onClose={onCloseRemarkHistory}
            />
        </GridStateContext.Provider>
    )
}

export default OpenExpeditingRequests