import { ETACellRendererWrapper } from "./styles"
import { BPRRemarksCellRendererWrapper, BPRSubmitRemarkInput } from '../../../MTA/SupplyChainIntelligenceHub/BPR/styles'
const TextBoxCellRenderer = (params: any) => {
    console.log('TextBoxCellRenderer', params.column.colDef.cellRendererParams.visible.flag)
    return (
        <ETACellRendererWrapper  >

            {/* <ETACellValue> */}
            {
                params.column.colDef.cellRendererParams.visible.flag ?
                    <BPRRemarksCellRendererWrapper>
                        <BPRSubmitRemarkInput
                            placeholder="Type Remark"
                            type={'text'}
                        // ref={(ref) => {
                        //     if (!ref) return;

                        // ref.onclick = (e: any) => {
                        //     params.onClick(e, { skucode: params.data.SKUCode, whcode: params.data.WHCode })
                        //     e.stopPropagation();
                        // };
                        //}} 
                        />
                    </BPRRemarksCellRendererWrapper>
                    :
                    <BPRSubmitRemarkInput
                        onChange={(e) => { params.data.rs = e.target.value }}
                        placeholder="Enter your reason here..."
                        type={'text'}
                        style={{ fontSize: '14px', height: '28px', width: '90%' }}
                        disabled

                    />

            }
            {/* </ETACellValue> */}
        </ETACellRendererWrapper>
    )
}

export default TextBoxCellRenderer