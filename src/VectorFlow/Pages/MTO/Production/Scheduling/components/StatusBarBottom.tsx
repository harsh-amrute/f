import React, { useState } from "react";
import VFButton from "../../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../../context";
import VFButtonOutline from "../../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFOverlayModal from "../../../../../../components/VectorFLOW/commons/VFOverlayModal";
import { leftSection, statusBarWrapper } from "../SchedulingStyles.css";
import {
  closeButton,
  footerWrapper,
  modalHeader,
  modalWrapper,
} from "./RunStatusModalStyles.css";

const StatusBarBottom = ({
  status,
  isRunEnabled = true,
  isGoToFinalResult,
  last_success_run,
  onGoToFinalResult,
  StartRun,
}: any) => {
  const themeUi = useUserData().user.user.theme_ui;
  const [isRunConfirm, setIsRunConfirm] = useState(false);
  return (
    <div className={statusBarWrapper}>
      <VFOverlayModal parentSelector="#main-content" openModal={isRunConfirm}>
        <div className={modalWrapper} style={{ width: "40vw" }}>
          <div className={modalHeader}>
            <button className={closeButton}
              onClick={() => {
                setIsRunConfirm(false);
              }}
            >
              ✕
            </button>
          </div>
          <p
            style={{
              padding: "20px 20px 40px 20px",
              margin: "0 auto",
              fontSize: "1.4rem",
            }}
          >
            Are you sure you want to start the run?
          </p>
          <div className={footerWrapper} style={{ justifyContent: "center", gap: "12px" }}>
            <VFButtonOutline
              style={{
                height: "3.2rem",
                fontSize: "1.25rem",
                borderColor: "#b52670",
                color: "#b52670",
              }}
              themeUi={themeUi}
              onClick={() => {
                setIsRunConfirm(false);
              }}
            >
              No
            </VFButtonOutline>
            <VFButton
              style={{ height: "3.2rem", fontSize: "1.25rem" }}
              themeUi={themeUi}
              onClick={() => {
                StartRun();
                setIsRunConfirm(false);
              }}
            >
              Yes
            </VFButton>
          </div>
        </div>
      </VFOverlayModal>

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
          onClick={() => {
            setIsRunConfirm(true);
          }}
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
          disabled={!isGoToFinalResult}
        >
          <span>Go To Final Result</span>
        </VFButton>
        {last_success_run && (
          <p style={{ fontSize: "1rem", color: "rgb(96, 93, 93)" }}>
            Last success run: {new Date().toLocaleString()}
          </p>
        )}
      </span>
      {status === "FAILED" && (
        <VFButtonOutline
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
        >
          <span>Download Error File</span>
        </VFButtonOutline>
      )}
    </div>
  );
};

export default StatusBarBottom;
