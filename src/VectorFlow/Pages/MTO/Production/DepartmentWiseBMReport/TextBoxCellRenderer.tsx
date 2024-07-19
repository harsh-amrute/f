import { ETACellRendererWrapper } from "./styles"

const TextBoxCellRenderer = (params: any) => {
    console.log('TextBoxCellRenderer', params)
    return (
        <ETACellRendererWrapper  >

            {/* <ETACellValue> */}
            {params.data.flag ?
                <input
                    onChange={(e) => { params.data.rs = e.target.value }}
                    placeholder="Enter your reason here..."
                    type={'text'}
                    style={{ fontSize: '14px', height: '28px', width: '90%' }}
                />
                :
                <input
                    onChange={(e) => { params.data.rs = e.target.value }}
                    placeholder="Enter your reason here..."
                    type={'text'}
                    style={{ fontSize: '14px', height: '28px', width: '90%' }}
                    disabled={true}
                />
            }
            {/* </ETACellValue> */}
        </ETACellRendererWrapper>
    )
}

export default TextBoxCellRenderer