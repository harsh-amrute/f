import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { useUserData } from "../../../../../context";
import { TaskBarContainer, VFTaskBarButtonGroup } from "./styles.css";

export interface VFTaskBarProps {
  onBack: () => void;
  onExportData: () => void;
  onClearAndExportErrors: (skipClear?: boolean) => void;
  onMTOSaveData?: () => void;
  isMTOSaveDataDisabled?: boolean;
  onMTOSaveAsDraft?: () => void;
  isMTODraftDisabled?: boolean;
  isMTOExcludeButton?: boolean;
}

const VFTaskBar = (props: VFTaskBarProps) => {
  const {
    onBack,
    onExportData,
    onClearAndExportErrors,
    onMTOSaveData,
    isMTOSaveDataDisabled,
    onMTOSaveAsDraft,
    isMTODraftDisabled,
    isMTOExcludeButton,
  } = props;

  const { user, isSideBarOpen } = useUserData();
  const themeUi = user.user.theme_ui;

  const width = isSideBarOpen ? "77%" : "97%";

  const BackButton = () => {
    const { user } = useUserData();
    const themeUi = user.user.theme_ui;

    return (
      <VFButtonOutline
        onClick={onBack}
        themeUi={themeUi}
        width={50}
        onHoverChild={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={"/assets/img/VectorFLOW/NMS/back-btn-white.svg"}
              data-testid="back-btn"
            />
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={
              themeUi === "REGALBLAZE"
                ? "/assets/img/VectorFLOW/NMS/back-btn-regal.svg"
                : "/assets/img/VectorFLOW/NMS/back-btn.svg"
            }
            data-testid="back-btn"
          />
        </div>
      </VFButtonOutline>
    );
  };

  return (
    <div style={{ zoom: 0.8 }}>
      <div className={TaskBarContainer} data-testid="taskbar" style={{ width }}>
        <div className={VFTaskBarButtonGroup}>
          <BackButton />
          <VFButtonOutline
            onClick={onExportData}
            themeUi={themeUi}
            disabled={false}
            width={139}
          >
            Export Data
          </VFButtonOutline>
          {isMTOExcludeButton && (
            <VFButton
              onClick={() => onClearAndExportErrors(false)}
              themeUi={themeUi}
              disabled={false}
              width={183}
            >
              Clear & Export Errors
            </VFButton>
          )}
          <VFButtonOutline
            style={{ display: "none" }}
            onClick={
              onMTOSaveAsDraft
                ? onMTOSaveAsDraft
                : () => {
                    return null;
                  }
            }
            themeUi={themeUi}
            disabled={isMTODraftDisabled}
            width={139}
          >
            Save As Draft
          </VFButtonOutline>
          <VFButtonOutline
            onClick={
              onMTOSaveData && !isMTOSaveDataDisabled
                ? onMTOSaveData
                : () => {
                    return null;
                  }
            }
            themeUi={themeUi}
            disabled={isMTOSaveDataDisabled}
            width={139}
          >
            Save As Tasks
          </VFButtonOutline>
        </div>
      </div>
    </div>
  );
};

export default VFTaskBar;
