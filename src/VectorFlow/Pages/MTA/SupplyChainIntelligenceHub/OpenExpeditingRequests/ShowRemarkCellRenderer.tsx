import {
  BPRRemarksCellRendererWrapper,
  BPRColorCellRendererIcon,
} from "../BPR/styles.css";

const ShowRemarkCellRenderer = (params: any) => {
  return (
    <div className={BPRRemarksCellRendererWrapper}>
      <img
        className={BPRColorCellRendererIcon}
        alt="history icon"
        src="/assets/img/VectorFLOW/BPR/history.svg"
        ref={(ref) => {
          if (!ref) return;

          ref.onclick = (e: any) => {
            params.onClick(e, params.data);
            e.stopPropagation();
          };
        }}
      />
    </div>
  );
};

export default ShowRemarkCellRenderer;
