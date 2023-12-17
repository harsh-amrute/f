import { ColDef, ColGroupDef } from "ag-grid-enterprise"
import { useEffect, useState } from "react"

import { getExistingColumnFields, getExistingColumns, mapMasterToColumnGroupDefs, mapNewAndOldMasterRowDataToCustomRowData, mapPendingTaskToColumnDefs,mapRowDataWithSrNo } from "../../../../../helpers/utils"


const useTaskPendingForReview = ()=>{
    const [isViewTableOpen,setIsViewTableOpen] = useState(true)
    const [viewTableColDefs,setViewTableColDefs] = useState<ColDef[] | ColGroupDef[]>()
    const [viewTableRowData,setViewTableRowData] = useState<any[]>([])
    const [detailTableColDefs,setDetailTableColDefs] = useState<ColDef[] | ColGroupDef[]>()
    const [detailTableRowData,setDetailTableRowData] = useState<any[]>([])

    
    const existingColumns = getExistingColumns(detailRowDummyData)
    const existingColumnFields = getExistingColumnFields(existingColumns,detailColumnFieldsDummy)

    const handleOnClick = ()=>{
        setIsViewTableOpen(false)
        setDetailTableColDefs(mapMasterToColumnGroupDefs(existingColumnFields))
        setDetailTableRowData(mapNewAndOldMasterRowDataToCustomRowData(detailRowDummyData,existingColumnFields))
    }

    useEffect(()=>{
        setIsViewTableOpen(false)
        setDetailTableColDefs(mapMasterToColumnGroupDefs(existingColumnFields))
        setDetailTableRowData(mapNewAndOldMasterRowDataToCustomRowData(detailRowDummyData,existingColumnFields))
        // setViewTableColDefs(mapPendingTaskToColumnDefs([
        //     {
        //         field:"SrNo",
        //         colId:"SrNo",
        //         headerName:"Sr No.",
        //     },
        //     {
        //         field:"PendingSince",
        //         colId:"PendingSince",
        //         headerName:"Pending since",
        //     },
        //     {
        //         field:"ageing",
        //         colId:"ageing",
        //         headerName:"Ageing",
        //     },
        //     {
        //         field:"TaskName",
        //         colId:"TaskName",
        //         headerName:"Task Name",
        //         onCellClicked:handleOnClick                  
        //     },
        //     {
        //         field:"RequesterName",
        //         colId:"RequesterName",
        //         headerName:"Requester",                  
        //     }
        // ]))
        // setViewTableRowData(mapRowDataWithSrNo([
        //     {
        //         "TaskID": "1_20231206175429",
        //         "PendingSince": "2023-12-06T17:59:01.667",
        //         "ageing": 8,
        //         "TaskName": "M_SKU",
        //         "RequesterName": "Admin"
        //       },
        //       {
        //         "TaskID": "1_20231206182017",
        //         "PendingSince": "2023-12-06T18:20:36.320",
        //         "ageing": 8,
        //         "TaskName": "M_SKU",
        //         "RequesterName": "Admin"
        //       },
        //       {
        //         "TaskID": "1_20231207113016",
        //         "PendingSince": "2023-12-07T11:34:47.813",
        //         "ageing": 7,
        //         "TaskName": "M_LOC",
        //         "RequesterName": "Admin"
        //       },
        //       {
        //         "TaskID": "1_20231207113620",
        //         "PendingSince": "2023-12-07T11:36:24.930",
        //         "ageing": 7,
        //         "TaskName": "M_LOC",
        //         "RequesterName": "Admin"
        //       }
        // ]))
    },[])
    return{
        isViewTableOpen,
        viewTableColDefs,
        detailTableColDefs,
        viewTableRowData,
        detailTableRowData
    }
}

export default useTaskPendingForReview



const detailRowDummyData = [
    {
      "new": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
      "old": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
    },
    {
      "new": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
      "old": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
    },
    {
      "new": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
      "old": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
    },
    {
        "new": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689125STXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXL\",\"c2\":\"XL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689125STXXL001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689125STXXL\",\"c2\":\"XXL\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      },
      {
        "new": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls\",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}",
        "old": "{\"SKUCode\":\"X9I689195STM001\",\"SKUDescription\":\"ksls      \",\"c1\":\"X9I689195STM\",\"c2\":\"M\",\"c3\":\"8.91E+12\",\"c4\":\"PC\",\"c5\":\"999\",\"c7\":\"UI\",\"c6\":\"USPA\"}"
      }
]

const detailColumnFieldsDummy = [
    {
      "displayName": "SKU Code",
      "key": "SKUCode",
      "visible": true,
      "editable":false
    },
    {
      "displayName": "SKU Name",
      "key": "SKUDescription",
      "visible": true,
      "editable":false
    },
    {
      "displayName": "STYLE CODE",
      "key": "c1",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "Programme",
      "key": "c2",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "Type",
      "key": "c3",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "Style status",
      "key": "c4",
      "visible": false,
      "editable":true
    },
    {
      "displayName": "IMPORT",
      "key": "c5",
      "visible": false,
      "editable":true
    },
    {
      "displayName": "Colour",
      "key": "c6",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "Used in FG Codes",
      "key": "c7",
      "visible": false,
      "editable":true
    },
    {
      "displayName": "SIZE",
      "key": "c8",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "EAN",
      "key": "c9",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "UoM",
      "key": "c10",
      "visible": false,
      "editable":true
    },
    {
      "displayName": "MRP",
      "key": "c11",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "BRAND",
      "key": "c12",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "SUB BRAND",
      "key": "c13",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "CATEGORY",
      "key": "c14",
      "visible": true,
      "editable":true
    },
    {
      "displayName": "SEASON",
      "key": "c15",
      "visible": true,
      "editable":true
    }
]