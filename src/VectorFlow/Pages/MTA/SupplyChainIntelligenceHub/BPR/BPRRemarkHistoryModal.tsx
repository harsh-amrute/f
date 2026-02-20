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
import { FormatDateFunction } from "../../../../../helpers/utils";

interface RemarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Array<any>;
}

const BPRRemarkHistoryModal = (props: RemarkModalProps) => {
  const { isOpen, onClose, data } = props;

  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;

  return (
    <VFModalCard
      openModal={isOpen}
      headerIcon="/assets/img/VectorFLOW/BPR/remark.svg"
      headerText="Remark History"
      closeIcon="/assets/img/VectorFLOW/NMS/close-white.svg"
      closeModal={onClose}
    >
      <div className={RemarkModalContentWrapper}>
        <div className={`${RemarkModalTable} custom-scrollbar`}>
          <div className={RemarkModalTableHeaderContainer}>
            <p
              className={RemarkModalTableHeader}
              style={{ textAlign: "center", paddingRight: "10px" }}
            >
              Name
            </p>
            <p className={RemarkModalTableHeader}>Remarks</p>
          </div>
          <div className={RemarkModalTableRowContainer}>
            {!data || data.length === 0 ? (
              <p style={{ textAlign: "center", height: 200 }}>
                No data to show
              </p>
            ) : (
              data.map((d: any, index: number) => {
                return (
                  <div
                    className={RemarkModalTableRow}
                    key={index}
                    style={{
                      borderTop: index === 0 ? "none" : "dashed 1px gray",
                    }}
                  >
                    <UserIcon data={d.un} />
                    <div
                      className={RemarkModalTableCell}
                      style={{ paddingLeft: "5px" }}
                    >
                      <div className={RemarkModalRemarkCelLRenderer}>
                        <p className={RemarkText}>{d.r}</p>
                        <p className={RemarkDate}>{FormatDateFunction(d.rd)}</p>
                      </div>
                    </div>
                  </div>
                );
              })
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

export default BPRRemarkHistoryModal;
