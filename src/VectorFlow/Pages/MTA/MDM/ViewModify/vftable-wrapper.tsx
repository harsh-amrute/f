import { forwardRef } from "react"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { VFtableProps } from "../../../../types/MDM"


export default  forwardRef((props:VFtableProps,ref)=>{
    return(
        <VFTable {...props} ref={ref}/>
    )
})