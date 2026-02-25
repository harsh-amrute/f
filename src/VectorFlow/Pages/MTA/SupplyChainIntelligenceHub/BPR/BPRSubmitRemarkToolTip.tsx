import { BPRSubmitRemarkToolTipProps } from "../../../../../VectorFlow/types/BPR";
import Portal from "../../../../../components/VectorFLOW/layouts/Portal";

import * as globalStyles from "../../../../../styles/global";
import {
  BPRRemarksToolTipWrapper,
  BPRRemarksToolTipContent,
  BPRRemarkToolTipTextArea,
  BPRRemarkToolTipButtonGroup,
  BPRRemarkToolTipButton,
} from "./styles.css";

const BPRSubmiRemarkToolTip = (props: BPRSubmitRemarkToolTipProps) => {
  const { style, remark, setRemark, onClose, onSuccess, isDate, themeUi } =
    props;

  const currBgColor = globalStyles.chooseThemeColor[themeUi].color5;

  return (
    <Portal wrapperId="tooltip">
      <div className={BPRRemarksToolTipWrapper} style={{ ...style }}>
        <div className={`${BPRRemarksToolTipContent} custom-scrollbar`}>
          {isDate ? (
            <input
              style={{ width: "147px", marginBottom: "5px" }}
              type={"date"}
              onChange={setRemark}
              value={remark}
              autoFocus
            />
          ) : (
            <input className={BPRRemarkToolTipTextArea}
              placeholder="Type your remark here"
              onChange={setRemark}
              value={remark}
              autoFocus
            />
          )}
          <div className={BPRRemarkToolTipButtonGroup}>
            <button
              className={BPRRemarkToolTipButton}
              style={{
                marginRight: 10,
                backgroundColor: currBgColor,
                color: "white",
              }}
              onClick={onSuccess}
            >
              Submit
            </button>
            <button
              className={BPRRemarkToolTipButton}
              style={{ border: `1px solid ${currBgColor}` }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default BPRSubmiRemarkToolTip;
