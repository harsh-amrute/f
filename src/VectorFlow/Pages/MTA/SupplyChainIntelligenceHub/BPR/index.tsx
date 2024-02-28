import { useState } from "react";
import VFMultiFilter from "../../../../../components/VectorFLOW/commons/VFMultiFilter";


const BPR=()=>{

    const initialFilter={
        supplyChain:[
            
           
        ],
        LocationFilter:[],
        ProductFilter:[],
        AvailabiltyFilter:[],
        ColorFilter:[],
        CoverageFilter:[],
    }

const [filters, setFilters]=useState(initialFilter)

    return(
        <>
                <VFMultiFilter onApplyFilter={()=>console.log("")} onGoBack={()=>console.log("")} options={['']} onClick={()=>setFilters(filters['supplyChain'].push)} ></VFMultiFilter>
        </>
    )

}

export default BPR;