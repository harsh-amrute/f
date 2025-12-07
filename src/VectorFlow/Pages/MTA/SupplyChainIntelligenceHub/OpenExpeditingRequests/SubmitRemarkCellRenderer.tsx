import { BPRRemarksCellRendererWrapper } from "../BPR/styles.css";
import {submitRemarkBase, SubmitRemarkInput } from "./styles.css";

const SubmitRemarkCellRenderer = (params: any) => {
  return (
    <div className={BPRRemarksCellRendererWrapper}>
      <div className={submitRemarkBase}>
        {params.value ? params.value : params.data.remarks}
      </div>
    </div>
  );
};
export default SubmitRemarkCellRenderer;
