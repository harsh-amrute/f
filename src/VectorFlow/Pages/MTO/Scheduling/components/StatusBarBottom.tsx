import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../context";
import {statusBarWrapper, leftSection} from './styles.css';

const StatusBarBottom = ({
  isRunEnabled = true,
  isGoToFinalResult = true,
  onGoToFinalResult,
}: any) => {
  const themeUi = useUserData().user.user.themeUi;
  return (
    <div className={statusBarWrapper}>
      <span className={leftSection}>
        <VFButton
          style={{
            fontSize: "1.1rem",
            height: "3.2rem",
            width: "fit-content",
            padding: "4px 16px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyContent: "center",
          }}
          themeUi={themeUi}
          onClick={() => console.log("Back clicked")}
          disabled={!isRunEnabled}
        >
          <span>Run Now</span>
          <img
            src="/assets/img/scheduling/play.svg"
            alt="Run Now"
            style={{ width: "14px", height: "14px" }}
          />
        </VFButton>

        <VFButton
          style={{
            fontSize: "1.1rem",
            height: "3.2rem",
            width: "fit-content",
            padding: "4px 16px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyContent: "center",
          }}
          themeUi={themeUi}
          onClick={onGoToFinalResult}
          disabled={!isRunEnabled}
        >
          <span>Go To Final Result</span>
        </VFButton>
      </span>
    </div>
  );
};

export default StatusBarBottom;
