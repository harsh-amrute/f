import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import {
  RadioContainer,
  SubmitButtonWrapper,
  RadioButtonGroup,
  ButtonSeperator,
  radioAccentVar,
} from "./styles.css";
import { useUserData } from "../../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../styles/global";

interface ApproveAllModalProps {
  onSuccess: (status: string) => void;
  onClose: () => void;
  setSelectionType: any;
  approveButtonLabel:any;
  isAllDataVisible:any;
}

const ApproveAllModal = (props: ApproveAllModalProps) => {
  const { onSuccess, onClose, setSelectionType, approveButtonLabel, isAllDataVisible } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  return (
    <VFModalCard
      headerText={"Approve All"}
      closeModal={onClose}
      openModal={true}
      headerIcon={"/assets/img/VectorFLOW/NMS/approveall.svg"}
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
      {
       isAllDataVisible ?
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
            Approve across all the pages
          </label>
        </div>
        :
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
            Approve only the current page
          </label>
        </div>
        }
      </div>
      <div className={SubmitButtonWrapper}>
        <VFButton
          themeUi={user.user.theme_ui}
          onClick={() => onSuccess("Approved")}
        >{approveButtonLabel}</VFButton>
      </div>
    </VFModalCard>
  );
};

export default ApproveAllModal;
