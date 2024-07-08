import { ETACellRendererWrapper, ETACellValue } from "./styles"

const ReasonCellRenderer = (params: any) => {

    return (
        <ETACellRendererWrapper  >

            {/* <ETACellValue> */}
            <input placeholder="Enter your reason here..." type={'text'} style={{ fontSize: '14px', height: '28px', width: '180px' }} />
            {/* </ETACellValue> */}
        </ETACellRendererWrapper>
    )
}

export default ReasonCellRenderer