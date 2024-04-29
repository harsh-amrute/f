

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
        tableColDefs,
        remark,
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

        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        onExportToExcelCallBack
    } = useOpenExpeditingRequests()

    if(isSavedDataLoading){
      return <VFLoader/>
    }

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
                onExportToExcelCallBack={onExportToExcelCallBack}
              />
            <VFTable height={800}
            columnDefs={tableColDefs}
            rowData={[
                {
                  "sc": "456ZY...",
                  "rl": "Mumbai, Maharashtra",
                  "sl": "Delhi, Delhi",
                  "rr": 2,
                  "rp": "White",
                  "br": "7 Days",
                  "plpd": "₹ 6.2L",
                  "action": "Pending",
                  "eta": "2023-11-28",
                  "history": ""
                },
                {
                  "sc": "789WX...",
                  "rl": "Bangalore, Karnataka",
                  "sl": "Kolkata, West Bengal",
                  "rr": 3,
                  "rp": "Blue",
                  "br": "14 Days",
                  "plpd": "₹ 4.8L",
                  "action": "Approved",
                  "eta": "2023-10-05",
                  "history": ""
                },
                {
                  "sc": "234AB...",
                  "rl": "Chennai, Tamil Nadu",
                  "sl": "Hyderabad, Telangana",
                  "rr": 1,
                  "rp": "Red",
                  "br": "5 Days",
                  "plpd": "₹ 7.3L",
                  "action": "Completed",
                  "eta": "2023-12-20",
                  "history": ""
                },
                {
                    "sc": "456ZY...",
                    "rl": "Mumbai, Maharashtra",
                    "sl": "Delhi, Delhi",
                    "rr": 2,
                    "rp": "White",
                    "br": "7 Days",
                    "plpd": "₹ 6.2L",
                    "action": "Pending",
                    "eta": "2023-11-28",
                    "history": ""
                  },
                  {
                    "sc": "789WX...",
                    "rl": "Bangalore, Karnataka",
                    "sl": "Kolkata, West Bengal",
                    "rr": 3,
                    "rp": "Blue",
                    "br": "14 Days",
                    "plpd": "₹ 4.8L",
                    "action": "Approved",
                    "eta": "2023-10-05",
                    "history": ""
                  },
                  {
                    "sc": "234AB...",
                    "rl": "Chennai, Tamil Nadu",
                    "sl": "Hyderabad, Telangana",
                    "rr": 1,
                    "rp": "Red",
                    "br": "5 Days",
                    "plpd": "₹ 7.3L",
                    "action": "Completed",
                    "eta": "2023-12-20",
                    "history": ""
                  },
                  {
                    "sc": "456ZY...",
                    "rl": "Mumbai, Maharashtra",
                    "sl": "Delhi, Delhi",
                    "rr": 2,
                    "rp": "White",
                    "br": "7 Days",
                    "plpd": "₹ 6.2L",
                    "action": "Pending",
                    "eta": "2023-11-28",
                    "history": ""
                  },
                  {
                    "sc": "789WX...",
                    "rl": "Bangalore, Karnataka",
                    "sl": "Kolkata, West Bengal",
                    "rr": 3,
                    "rp": "Blue",
                    "br": "14 Days",
                    "plpd": "₹ 4.8L",
                    "action": "Approved",
                    "eta": "2023-10-05",
                    "history": ""
                  },
                  {
                    "sc": "234AB...",
                    "rl": "Chennai, Tamil Nadu",
                    "sl": "Hyderabad, Telangana",
                    "rr": 1,
                    "rp": "Red",
                    "br": "5 Days",
                    "plpd": "₹ 7.3L",
                    "action": "Completed",
                    "eta": "2023-12-20",
                    "history": ""
                  },
                  {
                    "sc": "456ZY...",
                    "rl": "Mumbai, Maharashtra",
                    "sl": "Delhi, Delhi",
                    "rr": 2,
                    "rp": "White",
                    "br": "7 Days",
                    "plpd": "₹ 6.2L",
                    "action": "Pending",
                    "eta": "2023-11-28",
                    "history": ""
                  },
                  {
                    "sc": "789WX...",
                    "rl": "Bangalore, Karnataka",
                    "sl": "Kolkata, West Bengal",
                    "rr": 3,
                    "rp": "Blue",
                    "br": "14 Days",
                    "plpd": "₹ 4.8L",
                    "action": "Approved",
                    "eta": "2023-10-05",
                    "history": ""
                  },
                  {
                    "sc": "234AB...",
                    "rl": "Chennai, Tamil Nadu",
                    "sl": "Hyderabad, Telangana",
                    "rr": 1,
                    "rp": "Red",
                    "br": "5 Days",
                    "plpd": "₹ 7.3L",
                    "action": "Completed",
                    "eta": "2023-12-20",
                    "history": ""
                  }
              ]
              }
            {...agGridProps}
            ref={ref}
            onGridReady={(params)=>{
              if(columnState){
                params.columnApi.applyColumnState({state:columnState})
              }
            }}
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