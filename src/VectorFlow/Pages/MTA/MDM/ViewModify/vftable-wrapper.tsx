import React,{ forwardRef,useRef } from "react"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { VFtableProps } from "../../../../types/MDM"


export default  forwardRef((props:VFtableProps,ref)=>{

    const gridRef = useRef();

    
    return(
        <VFTable {...props} ref={gridRef}/>
    )
})