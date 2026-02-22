import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import { SubmitDataTextContainer, SubmitDataButtonWrapper } from "./styles.css";
import { useUserData } from "../../../../../context";

interface SubmitDataModalProps {
  count: number;
  onFailure: () => void;
  onSuccess: () => void;
  onCloseModal: () => void;
}
const SubmitDataModal = (props: SubmitDataModalProps) => {
  const { count, onFailure, onSuccess, onCloseModal } = props;

  const { user } = useUserData();

  return (
    <VFModalCard
      headerText="Submit Data"
      openModal={true}
      closeModal={onCloseModal}
      headerIcon={""}
      closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
    >
      <div className={SubmitDataTextContainer}>
        Are you sure you want to submit {count} records
      </div>
      <div className={SubmitDataButtonWrapper}>
        <VFButtonOutline
          themeUi={user.user.theme_ui}
          onClick={onFailure}
          onHoverChild={<>No</>}
        >
          No
        </VFButtonOutline>
        <VFButton themeUi={user.user.theme_ui} onClick={onSuccess}>
          Yes
        </VFButton>
      </div>
    </VFModalCard>
  );
};

export default SubmitDataModal;
