import { useUserData } from "../../../../../context";
import {
  BPRViewTableRequestCellRendererImg,
  BPRViewTableRequestCellRendererText,
  BPRViewTableRequestCellRendererWrapper,
} from "./styles.css";

interface BPRViewTableRequestCellRendererProps {
  onClick: () => void;
}

const BPRViewTableRequestCellRenderer = (
  props: BPRViewTableRequestCellRendererProps
) => {
  const { onClick } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  return (
    <div className={BPRViewTableRequestCellRendererWrapper} onClick={onClick}>
      <img
        className={BPRViewTableRequestCellRendererImg}
        src={
          themeUi === "REGALBLAZE"
            ? "/assets/img/VectorFlow/BPR/add-circle-regal.svg"
            : "/assets/img/VectorFlow/BPR/add-circle.svg"
        }
      />
      <p
        className={BPRViewTableRequestCellRendererText}
        style={{
          color: themeUi === "REGALBLAZE" ? "#FCA311" : "rgb(188, 61, 129)",
        }}
      >
        Request
      </p>
    </div>
  );
};

export default BPRViewTableRequestCellRenderer;
