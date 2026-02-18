import { useUserData } from "../../../../../context";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import {
  ButtonWrapper,
  RemarkDate,
  RemarkModalContentWrapper,
  RemarkModalRemarkCelLRenderer,
  RemarkModalTable,
  RemarkModalTableCell,
  RemarkModalTableHeader,
  RemarkModalTableHeaderContainer,
  RemarkModalTableRow,
  RemarkModalTableRowContainer,
  RemarkText,
} from "../../Logistics/InTransitWhereAbouts/styles.css";
import UserIcon from "../../Logistics/InTransitWhereAbouts/UserIcon";

interface RemarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const RemarkModal = (props: RemarkModalProps) => {
  const { isOpen, onClose, data } = props;
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;

  const safeData = Array.isArray(data)
    ? data
    : typeof data === "string"
    ? JSON.parse(data)
    : data?.data && Array.isArray(data.data)
    ? data.data
    : [];

  return (
    <VFModalCard
      openModal={isOpen}
      headerIcon="/assets/img/VectorFLOW/BPR/remark.svg"
      headerText="Remarks"
      closeIcon="/assets/img/VectorFLOW/NMS/close-white.svg"
      closeModal={onClose}
    >
      <div className={RemarkModalContentWrapper}>
        <div className={`${RemarkModalTable} custom-scrollbar`}>
          <div className={RemarkModalTableHeaderContainer}>
            <p
              className={RemarkModalTableHeader}
              style={{ textAlign: "center", paddingRight: "5px" }}
            >
              Name
            </p>
            <p className={RemarkModalTableHeader}>Remarks</p>
            <p className={RemarkModalTableHeader}>ETA</p>
          </div>

          <div className={RemarkModalTableRowContainer}>
            {!safeData || safeData.length === 0 ? (
              <p style={{ textAlign: "center", height: 200 }}>
                No data to show
              </p>
            ) : (
              safeData.map((d: any, index: number) => (
                <div
                  className={RemarkModalTableRow}
                  key={index}
                  style={{
                    borderTop: index === 0 ? "none" : "dashed 1px gray",
                  }}
                >
                  {" "}
                  <UserIcon data={d.UserName || d.UserId} />
                  <div className={RemarkModalTableCell}>
                    <div className={RemarkModalRemarkCelLRenderer}>
                      <p className={RemarkText}> {d.r}</p>
                      <p className={RemarkDate}>{d.rd}</p>
                    </div>
                  </div>
                  <div className={RemarkModalTableCell}> {d.eta}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={ButtonWrapper}>
          <VFButton onClick={onClose} themeUi={theme_ui}>
            Go Back!
          </VFButton>
        </div>
      </div>
    </VFModalCard>
  );
};

export default RemarkModal;
