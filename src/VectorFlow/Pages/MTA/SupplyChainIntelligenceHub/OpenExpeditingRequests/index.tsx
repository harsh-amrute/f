import React from "react"

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import ActionToolBar from "../Planning/ActionToolBar"
import BPRRemarkHistoryToolTip from "../BPR/BPRRemarkHistoryToolTip"
import BPRSubmiRemarkToolTip from "../BPR/BPRSubmitRemarkToolTip"

import useOpenExpeditingRequests from "./useOpenExpeditingRequests"




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
        updateRemark,
        onSubmitRemark,
        onCloseSubmitRemark,
        onCloseRemarkHistory
    } = useOpenExpeditingRequests()

    return(
        <React.Fragment>
                <ActionToolBar view={'grid'} setCurrentTab={''} currCategory={'OpenExpeditingRequests'} currentTab={''} tabsList={[]} onFloatingTabChange={()=>console.log('')} onGoBack={()=>console.log('')} onViewChange={()=>console.log('')}/>
            <VFTable
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
        </React.Fragment>
    )
}

export default OpenExpeditingRequests