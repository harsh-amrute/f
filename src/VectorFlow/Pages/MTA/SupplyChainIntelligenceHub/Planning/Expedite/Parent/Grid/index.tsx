import React,{useState,useMemo} from 'react'

import GridViewTable from "../../../GridView/GridViewTable"
import { BPREcoColorCellRenderer,BPRRemarksCellRenderer,BPRSubmitRemarkCellRenderer,BPRTechColorCellRenderer,BPRTagsCellRenderer } from "../../../../BPR/BPRCellRenderers";
import { useGetBPRUIConfiguration } from "../../../../../../../Services/MTA/SupplyChainIntelligenceHub/BPR";
import { AgGridReactProps } from "ag-grid-react";
import {mapBPRFieldsToColDefs} from '../../../../../../../../helpers/utils';
import RequestExpeditingModal from '../../../../BPR/RequestExpeditingModal';

const ExpediteParentGrid = ({data}:{data:any})=>{

    const {data:bprUIConfigData} = useGetBPRUIConfiguration()

    const [activeRow,setActiveRow] = useState()
    const [isSubGridOpen,toggleSubGrid] = useState(false)

    const [isExpeditingModalOpen,toggleExpeditingModal] =  useState<boolean>(false)


    const customCellRenderers = useMemo(() => ({
        // grapCellRenderer:BPRGraphCellRenderer,
        colorTechCellRenderer:BPRTechColorCellRenderer,
        colorEcoCellRenderer:BPREcoColorCellRenderer,
        tagsCellRenderer:BPRTagsCellRenderer,
        submitRemarkCellRenderer:BPRSubmitRemarkCellRenderer,
        remarksCellRenderer:BPRRemarksCellRenderer
      }), []);

    const agGridProps:AgGridReactProps = {
        
        suppressRowTransform:true,
        tooltipShowDelay:0.3,
        tooltipTrigger:'focus',
        tooltipInteraction:true,
        // rowSelection:'single',
        readOnlyEdit:true,
        onRowClicked:(params:any)=>{
            if(params.data.transit && params.data.transit.length>0){
                setActiveRow(params.data.transit)
                toggleSubGrid(true)
            }
        },
        gridOptions:{
            rowHeight:50,
            getRowStyle: (params: any) => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#EBEBEB" };
            }
            return { background: "#F7F7F7" };
            },
        },
        pagination:true,
        suppressRowClickSelection:true,
        components:customCellRenderers,
        defaultColDef:{
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType:false,
            resizable:false,
            cellStyle:{
                "flex":1,
                'text-align':'center',
                'height':'50px',
                "font-style":"normal",
                " font-variant":"normal",
                " font-weight":"300",
                " font-size":"20px",
                " font-family":"Roboto",
                "display":"block",
                'text-overflow':'ellipsis',
                'white-space':'nowrap'
            },
        }
    }

 

    const PlanningColumns = mapBPRFieldsToColDefs(bprUIConfigData?.data.data,()=>{console.log('hello')},()=>{console.log('hello')},()=>{console.log('hello')})

    return(
        <React.Fragment>
            <GridViewTable agGridProps={agGridProps} agGridColDefs={PlanningColumns} agGridRowData={data ? data : []} customGridRowData={activeRow} customGridColDef={[]} showStockGrid stockGridData={[{remarks:'Testing to be done fro bpr, for POC which will enable us to proceed with BPR',request:'d'},{remarks:'Testing to be done fro bpr, for POC which will enable us to proceed with BPR',request:'d'}]} isSubGridOpen={isSubGridOpen} onRequestExpediting={()=>toggleExpeditingModal(true)}/>
            <RequestExpeditingModal isOpen={isExpeditingModalOpen} onClose={()=>toggleExpeditingModal((prev:boolean)=>!prev)}/>
        </React.Fragment>
    )
}

export default ExpediteParentGrid