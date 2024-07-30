import { BPRRemarksCellRendererWrapper } from "../BPR/styles";
import { SubmitRemarkInputWrapper } from "./styles";

const SubmitRemarkCellRenderer = (params:any)=>{
    const isEven = (params.rowIndex%2)===1
    return(
        <BPRRemarksCellRendererWrapper>
            <SubmitRemarkInputWrapper 
            style={{backgroundColor:isEven?"#EFEFEF":'white'}}
            
            // ref={(ref) => {
            //     if (!ref) return;

            //     ref.onclick = (e:any) => {
            //         params.onClick(e,params.data)
            //         e.stopPropagation();
            //     };
            // }}
            >
                {params.value}
            </SubmitRemarkInputWrapper>
        </BPRRemarksCellRendererWrapper>
    )
}
export default SubmitRemarkCellRenderer