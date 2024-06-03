// import { useState, useMemo } from "react"
// import { AgGridReactProps } from "ag-grid-react"
// import { useUserData } from "../../../../../context"
// import { OrderDetailsData } from '../MaterialCoverage/Data';
// //import AvailabilityToolTip from "../../../MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
// import AvailabilityCellRenderer from "../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityCellRenderer";
// import ColorCellRenderer from "../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/ColorCellRenderer";
// import { OrderDetailsHeaderData } from '../MaterialCoverage/Data';
// import { mapOrderFieldsToColDefs } from '../../../../../helpers/utils'

// const useMaterialSO = () => {
//     const { isSideBarOpen } = useUserData()
//     // const [rowData, setRowData] = useState(OrderDetailsData);
//     // const [coverageAvlRow, setCoverageAvlData] = useState(coverageAvlData);
//     const {HeaderData} = OrderDetailsHeaderData;
//     const columnDef = mapOrderFieldsToColDefs(HeaderData);
//     // const [covAvlDef] = useState(gridOptions.CoverageAvlColumnDef);

//     const customCellRenderers = useMemo(() => (
//         {
//             "availabilityCellRenderer": AvailabilityCellRenderer,
//         }), []);
//     const icons = useMemo(() => {
//         return {
//             groupExpanded: `<img src="${'/assets/img/VectorFLOW/NMS/minus_circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
//             groupContracted: `<img src="${'/assets/img/VectorFLOW/NMS/add-circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
//         };
//     }, []);

//     const autoGroupColumnDef = useMemo(() => {
//         return {
//             minWidth: 250,
//         };
//     }, []);

//     const detailCellRendererParams = useMemo(() => {
//         return {
//             // level 2 grid options
//             detailGridOptions: {
//                 columnDefs: [
//                     { field: "rmc", headerName: "RM code" },
//                     { field: "rmd", headerName: "RM Descp" },
//                     { field: "rmrq", headerName: "RM RegdQty" },
//                     { field: "rma", headerName: "RM Available" },
//                     { field: "rmall", headerName: "RM Allocatte" },
//                 ],
//                 defaultColDef: {
//                     flex: 0,
//                 },
//                 masterDetail: true,
//                 rowSelection: "multiple",
//                 suppressRowClickSelection: true,
//                 enableRangeSelection: true,
//                 pagination: true,
//                 paginationAutoPageSize: true,
//                 alwaysShowVerticalScroll: true,
//             },
//             getDetailRowData: (params: any) => {
//                 if (undefined != params.data.children) {
//                     params.successCallback(params.data.children);
//                 }
//             },
//         };
//     }, []);



//     const agGridProps: AgGridReactProps = {
//         tooltipShowDelay: 0,
//         tooltipTrigger: "focus",
//         gridOptions: {
//             rowHeight: 50,
//             getRowStyle: (params: any) => {
//                 return {
//                     background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
//                 };
//             },
//             pagination: false,
//             rowSelection: 'multiple',
//             suppressRowClickSelection: true,
//             enableBrowserTooltips: true,
//             enableRangeSelection: true,
//             components:customCellRenderers,
//             icons: icons,
//             defaultColDef: {
//                 cellStyle: {
//                     'text-align': 'center',
//                     'height': '50px',
//                     "font-style": "normal",
//                     "font-variant": "normal",
//                     "font-weight": "300",
//                     "font-size": "20px",
//                     "font-family": "Roboto",
//                     'text-overflow': 'ellipsis',
//                     'white-space': 'nowrap',
//                     'resizable': 'true',
//                 },
//             },
//         },
//         masterDetail: true,
//         detailCellRendererParams: detailCellRendererParams,
//         autoGroupColumnDef: autoGroupColumnDef,
//         paginationAutoPageSize: true,
//         enterNavigatesVertically: true,
//         enterNavigatesVerticallyAfterEdit: true,
//     };

//     return {
//         isSideBarOpen,
//         columnDef,
//         agGridProps,
//         RRRRowData: OrderDetailsData,
//     }
// }

// export default useMaterialSO;

import {  useMemo } from "react"
import { AgGridReactProps } from "ag-grid-react"
import AvlCellRenderer from '../Planning/SimulateFullKit/Simulate/AvlCellRenderer';
import AvailabilityToolTip from "../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import DetailCellRenderer from "../../Procurement/MaterialCoverage/MaterialCellRendere";
import { useUserData } from "../../../../../context"
import { OrderDetailsData } from '../MaterialCoverage/Data';
import { OrderDetailsHeaderData } from '../MaterialCoverage/Data'
import { mapMaterialCoverageFieldsToColDefs } from '../../../../../helpers/utils'
import ColorCellRenderer from "../Planning/SimulateFullKit/Simulate/ColorCellRenderer";
const useMaterialSO = () => {
    const { isSideBarOpen } = useUserData()
    const {HeaderData} = OrderDetailsHeaderData;
    const columnDef = mapMaterialCoverageFieldsToColDefs(HeaderData);
   
    const LoadData = (data:any) => {
       const calculate=data.map((item:any) => ({
           ...item,
           fkapr: ((item.fka/item.oq)*100).toFixed(2)
       }))
       return calculate;
    }
    const output = LoadData(OrderDetailsData);
    const icons = useMemo(() => {
        return {
            groupExpanded: `<img src="${'/assets/img/VectorFLOW/NMS/minus_circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
            groupContracted: `<img src="${'/assets/img/VectorFLOW/NMS/add-circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
        };
    }, []);
   
    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []);
  
    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);
    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": ColorCellRenderer,
            "avlCellRenderer": AvlCellRenderer,
            "availabilityToolTip": AvailabilityToolTip
        }), []);
 
    const agGridProps: AgGridReactProps = {
        tooltipShowDelay: 0,
        tooltipTrigger: "focus",
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },
            pagination: true,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,
            components: customCellRenderers,
            icons: icons,
            defaultColDef: {
                cellStyle: {
                    'text-align': 'center',
                    'height': '50px',
                    "font-style": "normal",
                    "font-variant": "normal",
                    "font-weight": "300",
                    "font-size": "20px",
                    "font-family": "Roboto",
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'resizable': 'true',
                },
            },
        },
        sideBar: sideBar,
        masterDetail: true,
        detailCellRenderer: DetailCellRenderer,
        autoGroupColumnDef: autoGroupColumnDef,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
    };
 
    return {
        isSideBarOpen,
        agGridProps,
        columnDef,
        RRRRowData: output,
    }
}
 
export default useMaterialSO;