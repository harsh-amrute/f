import { ETACellRendererWrapper } from "./styles"
import { useState } from "react"
const ReasonCellRenderer = (params: any) => {

    console.log("render ke params: ", params)
    const [val, setVal] = useState(params.node.data.rs ? params.node.data.rs : "")

    return (
        <ETACellRendererWrapper  >

            {/* <ETACellValue> */}
            <input value={val} onChange={(e) => { params.data.rs = e.target.value, setVal(params.data.rs) }} placeholder="Enter your reason here..." type={'text'} style={{ fontSize: '14px', height: '28px', width: '180px' }} />
            {/* </ETACellValue> */}
        </ETACellRendererWrapper>
    )
}

export default ReasonCellRenderer