import { ETACellRendererWrapper } from "./styles"
import { useState } from "react"
const ReasonCellRenderer = (params: any) => {

    const [val, setVal] = useState(params.node.data.rs ? params.node.data.rs : "")

    const selects = params.api.getSelectedRows();
    let disabled = true;

    if (selects) {
        const myoid = params.data.oid;

        selects.forEach((element: any) => {
            if (element.oid === myoid) {
                disabled = false;
            }
        });
    }

    return (
        <ETACellRendererWrapper  >

            {/* <ETACellValue> */}
            <input disabled={disabled} value={val} onChange={(e) => { params.data.rs = e.target.value, setVal(params.data.rs) }} placeholder="Enter your reason here..." type={'text'} style={{ fontSize: '12px', height: '18px', width: '160px' }} />
            {/* </ETACellValue> */}
        </ETACellRendererWrapper>
    )
}

export default ReasonCellRenderer