import React from "react";
import { useUserData } from "../../../../../context";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  ModalWrapper,
  ImageWrapper,
  ProgressWrapper,
  ProgressContainer,
  ProgressFill,
  progressWidthVar,
  ProgressMessage,
  FooterWrapper,
  DateTimeWrapper,
  ModalHeader,
  CloseButton
} from "./styles.css";

const RunStatusModal = ({
  closeModal,
  progress = 50,
  message = "Run Failed",
  startTime = "8:00 am",
  endTime = "9:00 am",
  openAbortModal,
  goTofinalResult,
  goBack,
}: any) => {
  const themeUi = useUserData().user.user.themeUi;

  const progressModal = () => {
    return (
      <div className={ModalWrapper}>
        <img
          className={ImageWrapper}
          src="/assets/img/scheduling/run-in-progress.svg"
        />
        <div className={ProgressWrapper}>
          <div className={ProgressContainer}>
            <div
              className={ProgressFill}
              style={assignInlineVars({ [progressWidthVar]: `${progress}%` })}
            >
              {progress} %
            </div>
          </div>
          <div className={ProgressMessage}>{message}</div>
        </div>

        <div className={FooterWrapper}>
          <span className={DateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: 16, height: 16 }}
            />
            <p>Run Start Time: {startTime}</p>
          </span>

          <VFButton
            style={{
              display: "flex",
              gap: "8px",
              fontSize: "1.2rem",
              justifyContent: "center",
              alignItems: "center",
              height: "fit-content",
              padding: "8px 18px",
              width: "fit-content",
            }}
            onClick={openAbortModal}
            themeUi={themeUi}
          >
            <img
              src="/assets/img/scheduling/Abort.svg"
              alt="Abort Icon"
              style={{ width: 16, height: 16 }}
            />
            <p>Abort</p>
          </VFButton>
        </div>
      </div>
    );
  };

  const progressCompletedModal = () => {
    return (
      <div className={ModalWrapper}>
        <div className={ModalHeader}>
          <button className={CloseButton} onClick={closeModal}>
            ✕
          </button>
        </div>
        <img
          className={ImageWrapper}
          src="/assets/img/scheduling/run-complete.svg"
        />
        <div
          className={ProgressMessage}
          style={{ fontSize: "1.3rem", paddingBottom: 15 }}
        >
          {message}
        </div>
        <div className={FooterWrapper}>
          <span className={DateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: 16, height: 16 }}
            />
            <p>Run Start Time: {startTime}</p>
          </span>
          <span className={DateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: 16, height: 16 }}
            />
            <p>Run End Time: {endTime}</p>
          </span>
          <VFButton
            style={{
              display: "flex",
              gap: "8px",
              fontSize: "1.2rem",
              justifyContent: "center",
              alignItems: "center",
              height: "fit-content",
              padding: "8px 18px",
              width: "fit-content",
            }}
            onClick={goTofinalResult}
            themeUi={themeUi}
          >
            <p>Go To Final Result</p>
          </VFButton>
        </div>
      </div>
    );
  };

  const progressAbortedModal = () => {
    return (
      <div className={ModalWrapper}>
        <div className={ModalHeader}>
          <button className={CloseButton} onClick={closeModal}>
            ✕
          </button>
        </div>
        <img
          className={ImageWrapper}
          src="/assets/img/scheduling/run-aborted.svg"
        />
        <div
          className={ProgressMessage}
          style={{ fontSize: "1.3rem", paddingBottom: 15 }}
        >
          {message}
        </div>
        <div className={FooterWrapper}>
          <span className={DateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: 16, height: 16 }}
            />
            <p>Run Start Time: {startTime}</p>
          </span>
          <span className={DateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: 16, height: 16 }}
            />
            <p>Run Abort Time: {endTime}</p>
          </span>
          <VFButton
            style={{
              display: "flex",
              gap: "8px",
              fontSize: "1.2rem",
              justifyContent: "center",
              alignItems: "center",
              height: "fit-content",
              padding: "8px 18px",
              width: "fit-content",
            }}
            onClick={goBack}
            themeUi={themeUi}
          >
            <p>Go Back</p>
          </VFButton>
        </div>
      </div>
    );
  };
  const progressFailedModal = () => {
    return (
      <div className={ModalWrapper}>
        <div className={ModalHeader}>
          <button className={CloseButton} onClick={closeModal}>
            ✕
          </button>
        </div>
        <img
          className={ImageWrapper}
          src="/assets/img/scheduling/run-failed.svg"
        />
        <div
          className={ProgressMessage}
          style={{ fontSize: "1.3rem", paddingBottom: 15 }}
        >
          {message}
        </div>
        <div className={FooterWrapper}>
          <span className={DateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: 16, height: 16 }}
            />
          </span>
          <span className={DateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: 16, height: 16 }}
            />
            <p>Run Failed Time: {endTime}</p>
          </span>

          <VFButtonOutline
            style={{
              display: "flex",
              gap: "8px",
              fontSize: "1.2rem",
              justifyContent: "center",
              alignItems: "center",
              height: "fit-content",
              padding: "8px 18px",
              width: "fit-content",
              borderColor: "#b52670",
              color: "#b52670",
            }}
            onClick={goTofinalResult}
            themeUi={themeUi}
          >
            Download Error File
          </VFButtonOutline>

          <VFButton
            style={{
              display: "flex",
              gap: "8px",
              fontSize: "1.2rem",
              justifyContent: "center",
              alignItems: "center",
              height: "fit-content",
              padding: "8px 18px",
              width: "fit-content",
            }}
            onClick={goBack}
            themeUi={themeUi}
          >
            <p>Go Back</p>
          </VFButton>
        </div>
      </div>
    );
  };

  return <>{progressFailedModal()}</>;
};

export default RunStatusModal;
