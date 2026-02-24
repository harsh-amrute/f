import {
  BPRColorCellRendererIcon,
  BPRRemarksCellRendererWrapper,
} from "../BPR/styles.css";

export const BORRemarksCellRenderer = (params: any) => {
  return (
    <div className={BPRRemarksCellRendererWrapper}>
      <img
        className={BPRColorCellRendererIcon}
        alt="eye icon"
        src="/assets/img/VectorFLOW/BPR/history.svg"
        ref={(ref) => {
          if (!ref) return;

          ref.onclick = (e: any) => {
            params.onClick(e, {
              skucode: params.data.SKUCode,
              whcode: params.data.WHCode || params.data.WhCode,
              spc: params.data.SupplierCode,
            });
            e.stopPropagation();
          };
        }}
      />
    </div>
  );
};
