import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import {
  ButtonSeperator,
  RadioButtonGroup,
  RadioContainer,
  SubmitButtonWrapper,
  radioAccentVar,
} from "./styles.css";
import { useUserData } from "../../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../styles/global";

interface RejectAllModalProps {
  onSuccess: () => void;
  onClose: () => void;
  setSelectionType: any;
}

const RejectAllModal = (props: RejectAllModalProps) => {
  const { onSuccess, onClose, setSelectionType } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  return (
    <VFModalCard
      headerText={"Reject All"}
      closeModal={onClose}
      openModal={true}
      headerIcon={"/assets/img/VectorFLOW/NMS/Rejectall.svg"}
      closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
    >
      <div
        className={RadioContainer}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          marginTop: "10px",
        }}
      >
        <div
          className={RadioButtonGroup}
          style={assignInlineVars({
            [radioAccentVar]: globalStyles.chooseThemeColor[themeUi].color5,
          })}
        >
          <input
            type="radio"
            value="option1"
            onChange={() => setSelectionType("All")}
            name="Approve"
            id="ApproveAll"
          />
          <label
            htmlFor="ApproveAll"
            style={{ fontSize: "15px", fontWeight: "300px" }}
          >
            Reject across all pages
          </label>
        </div>
        <div className={ButtonSeperator} />
        <div
          className={RadioButtonGroup}
          style={assignInlineVars({
            [radioAccentVar]: globalStyles.chooseThemeColor[themeUi].color5,
          })}
        >
          <input
            type="radio"
            value="option2"
            onChange={() => setSelectionType("Current")}
            name="Approve"
            id="ApproveCurrent"
          />
          <label
            htmlFor="ApproveCurrent"
            style={{ fontSize: "15px", fontWeight: "300px" }}
          >
            Reject all only current page
          </label>
        </div>
      </div>
      <div className={SubmitButtonWrapper}>
        <VFButton themeUi={user.user.theme_ui} onClick={onSuccess}>
          Ok
        </VFButton>
      </div>
    </VFModalCard>
  );
};

export default RejectAllModal;
