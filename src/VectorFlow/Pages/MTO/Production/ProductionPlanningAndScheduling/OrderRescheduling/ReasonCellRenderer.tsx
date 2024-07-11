import { ETACellRendererWrapper, ETACellValue } from "./styles"

const ReasonCellRenderer = (params: any) => {

    return (
        <ETACellRendererWrapper  >

            {/* <ETACellValue> */}
            <input onChange={(e) => { params.data.rs = e.target.value }} placeholder="Enter your reason here..." type={'text'} style={{ fontSize: '14px', height: '28px', width: '180px' }} />
            {/* </ETACellValue> */}
        </ETACellRendererWrapper>
    )
}

export default ReasonCellRenderer