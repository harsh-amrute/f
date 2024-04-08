import {useEffect, useRef, useState } from "react";

// import "./styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";
// import _ from "lodash";
import '../../styles';
import { useGetPlanningDataCustom } from "../../../../../../../Services/MTA/SupplyChainIntelligenceHub/Planning";
import VFLoader from "../../../../../../../../components/VectorFLOW/commons/VFLoader";





const OrderFulfillmentCustomCharts = () => {

    const refGraph1 = useRef<GridRef>();
    const [rowData,setRowData] = useState<any>()

    const {mutateAsync:getPlanningDataCustom,isLoading} = useGetPlanningDataCustom();

    useEffect(()=>{
        const fetchCustomPlanningData = async ()=> {
            const body = {
                category:'git',
                type:'child',
                filters:[]
            }
            const result = await getPlanningDataCustom(body);
            setRowData(result.data.data);
        }
        fetchCustomPlanningData()
    },[])
   

    const customColDefsGraph1:ColDef[] = [
        {
            field:'ln',
            headerName:'Location Name',
            colId:'ln',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'d',
            headerName:'Delay',
            colId:'d',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'spd',
            headerName:' Super Delay',
            colId:'spd',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'LL1',
            headerName:'Location Level 1',
            colId:'LL1',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'LL2',
            headerName:'Location Level 2',
            colId:'LL2',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'LL3',
            headerName:'Location Level 3',
            colId:'LL3',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'LL4',
            headerName:'Location Level 4',
            colId:'LL4',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'c1',
            headerName:'Custom Attribute 1',
            colId:'c1',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'c2',
            headerName:'Custom Attribute 2',
            colId:'c2',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'c3',
            headerName:'Custom Attribute 3',
            colId:'c3',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'c4',
            headerName:'Custom Attribute 4',
            colId:'c4',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },
        {
            field:'c5',
            headerName:'Custom Attribute 5',
            colId:'c5',
            // pivot:true,
            enablePivot:true,
            enableValue:true
        },

    ]

    if(isLoading){
        return <VFLoader/>
    }

    
    return(
        <>
            <VFTable
                ref={refGraph1}
                columnDefs={customColDefsGraph1}
                rowData={rowData}
                sideBar={true}
                enableCharts={true}
                enableRangeSelection={true}

            />
        </>
    )
    
}

export default OrderFulfillmentCustomCharts;