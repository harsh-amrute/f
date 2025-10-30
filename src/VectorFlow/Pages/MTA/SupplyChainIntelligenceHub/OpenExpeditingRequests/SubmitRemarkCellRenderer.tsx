import { BPRRemarksCellRendererWrapper } from "../BPR/styles.css";
import { SubmitRemarkInput } from "./styles.css";

const SubmitRemarkCellRenderer = (params: any) => {
  const isEven = params.rowIndex % 2 === 1;
  return (
    <div className={BPRRemarksCellRendererWrapper}>
      <div className={SubmitRemarkInput[isEven ? "even" : "odd"]}>
        {params.value}
      </div>

      {/* <SubmitRemarkInputWrapper 
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
            </SubmitRemarkInputWrapper> */}
    </div>
  );
};
export default SubmitRemarkCellRenderer;
