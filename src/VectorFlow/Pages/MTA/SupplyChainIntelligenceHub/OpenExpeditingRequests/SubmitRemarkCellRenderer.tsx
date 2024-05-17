import { BPRRemarksCellRendererWrapper ,BPRSubmitRemarkInput} from "../BPR/styles";

const SubmitRemarkCellRenderer = (params:any)=>{
    return(
        <BPRRemarksCellRendererWrapper>
            <BPRSubmitRemarkInput placeholder="Type Remark" ref={(ref) => {
                if (!ref) return;

                ref.onclick = (e:any) => {
                    params.onClick(e,params.data)
                    e.stopPropagation();
                };
            }}/>
        </BPRRemarksCellRendererWrapper>
    )
}
export default SubmitRemarkCellRenderer