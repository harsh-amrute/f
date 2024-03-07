
import { BPRSubmitRemarkToolTipProps } from "../../../../../VectorFlow/types/BPR"
import Portal from "../../../../../components/VectorFLOW/layouts/Portal"

import {
    BPRRemarksToolTipWrapper, 
    BPRRemarksToolTipContent,
    BPRRemarkToolTipTextArea,
    BPRRemarkToolTipButtonGroup,
    BPRRemarkToolTipButton
} from "./styles"



const BPRSubmiRemarkToolTip = (props:BPRSubmitRemarkToolTipProps)=>{

    const {
        style,
        remark,
        setRemark,
        onClose,
        onSuccess
    } = props

    return(
        <Portal wrapperId="tooltip">
            <BPRRemarksToolTipWrapper style={{...style}}>
                <BPRRemarksToolTipContent  className="custom-scrollbar">
                    <BPRRemarkToolTipTextArea placeholder="Type your remark here" onChange={setRemark} value={remark}/>
                    <BPRRemarkToolTipButtonGroup>
                        <BPRRemarkToolTipButton style={{marginRight:10,backgroundColor:'rgb(188, 61, 129)',color:'white'}} onClick={onSuccess} >
                            Submit
                        </BPRRemarkToolTipButton>
                        <BPRRemarkToolTipButton style={{border:'1px solid rgb(130, 15, 76)'}} onClick={onClose} >
                            Cancel
                        </BPRRemarkToolTipButton>
                    </BPRRemarkToolTipButtonGroup>
                </BPRRemarksToolTipContent>
            </BPRRemarksToolTipWrapper>
        </Portal>
    )
}

export default BPRSubmiRemarkToolTip