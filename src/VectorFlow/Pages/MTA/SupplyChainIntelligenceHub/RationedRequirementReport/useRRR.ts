import { useState,useMemo } from "react"
import { AgGridReactProps } from "ag-grid-react"

import { useGetBPRUIConfiguration } from "../../../../Services/MTA/SupplyChainIntelligenceHub"
import { useUserData } from "../../../../../context"
//import { BPREcoColorCellRenderer,BPRRemarksCellRenderer,BPRTagsCellRenderer,BPRTechColorCellRenderer, BRPRemarksToolTip } from "./BPRCellRenderers"
import { mapBPRFieldsToColDefs } from "../../../../../helpers/utils"

const useBPR =()=>{

    const {isSideBarOpen} = useUserData()

    // const [isSubGridOpen,toggleSubGrid] = useState<boolean>(false)
    // const [activeRow,setActiveRow] = useState<any>()


    //const {data,isLoading} = useGetBPRUIConfiguration()

    //const BPRColumns = mapBPRFieldsToColDefs(data?.data.data)
    

    // const customCellRenderers = useMemo(() => ({
    //     grapCellRenderer:'',
    //     colorTechCellRenderer:BPRTechColorCellRenderer,
    //     colorEcoCellRenderer:BPREcoColorCellRenderer,
    //     tagsCellRenderer:BPRTagsCellRenderer,
    //     remarksToolTipComponent:BRPRemarksToolTip,
    //     remarksCellRenderer:BPRRemarksCellRenderer
    //   }), []);

    // const agGridProps:AgGridReactProps = {
    //     tooltipShowDelay:0,
    //     tooltipTrigger:"focus",
    //     readOnlyEdit:true,
    //     gridOptions:{
    //         rowHeight:50,
    //         getRowStyle: (params: any) => {
    //         if (params.node.rowIndex % 2 === 0) {
    //             return { background: "#EBEBEB" };
    //         }
    //         return { background: "#F7F7F7" };
    //         },
    //     },
    //     pagination:true,
    //     // overlayLoadingTemplate:'<object style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) scale(2)" type="image/svg+xml" data="/assets/img/VectorFLOW/loaderMedium.svg" aria-label="loading"></object>',
    //     // rowSelection:'multiple',
    //     suppressRowClickSelection:true,
    //     components:customCellRenderers,
    //     enableBrowserTooltips:true,
    //     defaultColDef:{
    //         floatingFilter: true,
    //         filter: "agMultiColumnFilter",
    //         // tooltipComponent:'remarksToolTipComponent',
    //         cellDataType:false,
    //         cellStyle:{
    //             'text-align':'center',
    //             'height':'50px',
    //             "font-style":"normal",
    //         " font-variant":"normal",
    //         " font-weight":"300",
    //         " font-size":"20px",
    //         " font-family":"Roboto",
    //         "display":"block",
    //         'text-overflow':'ellipsis',
    //         'white-space':'nowrap'
    //         },
    //         onCellClicked:(params:any)=>{
    //             console.log(params)
    //             if(params.data.transit && params.data.transit.length>0){
    //                 setActiveRow(params.data.transit)
    //                 toggleSubGrid(true)
    //                 return 
    //             }
    //             return setActiveRow(null)
    //         }
    //     }
    // }

    return {
        isSideBarOpen
    }
}

export default  useBPR