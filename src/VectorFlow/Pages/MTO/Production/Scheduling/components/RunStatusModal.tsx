import React, { useState } from "react";
import { useUserData } from "../../../../../../context";
import VFButton from "../../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { format } from "date-fns";
import {
  closeButton,
  dateTimeWrapper,
  footerWrapper,
  imageWrapper,
  modalHeader,
  modalWrapper,
  progressContainer,
  progressFill,
  progressMessage,
  progressWrapper,
  progressWidthVar,
} from "./RunStatusModalStyles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const RunStatusModal = ({
  runStatus,
  closeModal,
  message = "Run Failed",
  goTofinalResult,
}: any) => {
  const themeUi = useUserData().user.user.themeUi;

  const [isAbortConfirm, setIsAbortConfirm] = useState(false);
  const progressModal = () => {
    if (isAbortConfirm) {
      return (
        <div className={modalWrapper} style={{ width: "40vw" }}>
          <div className={modalHeader}>
            <button
              className={closeButton}
              onClick={() => {
                setIsAbortConfirm(false);
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ padding: "30px 20px 30px 20px", fontSize: "1.4rem" }}>
            Are you sure you want to abort the process? The run process will
            stop and the file execution will be terminated.
          </p>
          <div
            className={footerWrapper}
            style={{ justifyContent: "center", gap: "12px" }}
          >
            <VFButtonOutline
              style={{
                height: "3.2rem",
                fontSize: "1.25rem",
                borderColor: "#b52670",
                color: "#b52670",
              }}
              themeUi={themeUi}
              onClick={() => {
                setIsAbortConfirm(false);
              }}
            >
              No
            </VFButtonOutline>
            <VFButton
              style={{ height: "3.2rem", fontSize: "1.25rem" }}
              themeUi={themeUi}
              onClick={() => {
                setIsAbortConfirm(false);
                closeModal(true);
              }}
            >
              Yes
            </VFButton>
          </div>
        </div>
      );
    }

    const raw = runStatus.progress?.split("%")[0] ?? "0";
    const numeric = isNaN(Number(raw)) ? 0 : Number(raw);

    // enforce minimum 8%
    const width = Math.max(numeric, 8);

    return (
      <div className={modalWrapper} style={{ width: "58vw" }}>
        <img
          className={imageWrapper}
          src={"/assets/img/scheduling/run-in-progress.svg"}
        />
        <div className={progressWrapper}>
          <div className={progressContainer}>
            <div
              className={progressFill}
              style={assignInlineVars({
                [progressWidthVar]: `${width}%`,
              })}
            >
              {runStatus.progress}
            </div>
          </div>
          <div className={progressMessage}>{runStatus.current_step}...</div>
        </div>
        <div className={footerWrapper}>
          <span className={dateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>
              <strong>Run Start Time: </strong>
              {format(
                new Date(runStatus.started_at).toString(),
                "dd MMM yyyy, hh:mm a"
              )}{" "}
              by {runStatus.triggered_by_username}
            </p>
          </span>

          {/* Todo: uncomment after abort implementation on backend  */}
          {/* <VFButton
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
            onClick={() => {
              setIsAbortConfirm(true);
            }}
            themeUi={themeUi}
          >
            <img
              src="/assets/img/scheduling/Abort.svg"
              alt="Abort Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>Abort</p>
          </VFButton> */}
        </div>
      </div>
    );
  };

  const progressCompletedModal = () => {
    const width = isNaN(runStatus.progress.split("%")[0])
      ? 0
      : Math.max(+runStatus.progress.split("%")[0], 8);

    return (
      <div className={modalWrapper} style={{ width: "58vw" }}>
        <div className={modalHeader}>
          <button className={closeButton} onClick={closeModal}>
            ✕
          </button>
        </div>
        <img
          className={imageWrapper}
          style={{ height: "38vh" }}
          src={"/assets/img/scheduling/run-complete.svg"}
        />
        <div className={progressContainer}>
          <div
            className={progressFill}
            style={assignInlineVars({
              [progressWidthVar]: `${width}%`,
            })}
          >
            {runStatus.progress}
          </div>
        </div>
        <div className={progressMessage} style={{ paddingBottom: "10px" }}>
          {"Run Completed Successfully"}
        </div>
        <div className={footerWrapper}>
          <span className={dateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>
              <strong>Run Start Time: &nbsp;</strong>
              {format(
                new Date(runStatus.started_at),
                "dd MMM yyyy, hh:mm a"
              )}{" "}
              by {runStatus.triggered_by_username}
            </p>
          </span>
          <span className={dateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>
              <strong>Run End Time: &nbsp;</strong>
              {format(new Date(runStatus.ended_at), "dd MMM yyyy, hh:mm a")}
            </p>
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
            onClick={() => {
              goTofinalResult();
              closeModal();
            }}
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
      <div className={modalWrapper} style={{ width: "55vw" }}>
        <div className={modalHeader}>
          <button className={closeButton} onClick={closeModal}>
            ✕
          </button>
        </div>
        <img
          className={imageWrapper}
          src={"/assets/img/scheduling/run-aborted.svg"}
        />
        <div
          className={progressMessage}
          style={{ fontSize: "1.3rem", paddingBottom: "15px" }}
        >
          {message}
        </div>
        <div className={footerWrapper}>
          <span className={dateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>
              <strong>Run Start Time: &nbsp;</strong>
              {format(new Date(runStatus.started_at), "dd MMM yyyy, hh:mm a")}
            </p>
          </span>
          <span className={dateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>
              <strong>Run Abort Time: &nbsp;</strong>
              {format(
                new Date(runStatus.ended_at),
                "dd MMM yyyy, hh:mm a"
              )} by {runStatus.triggered_by_username}
            </p>
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
            onClick={() => {
              closeModal();
            }}
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
      <div className={modalWrapper} style={{ width: "65vw" }}>
        <div className={modalHeader}>
          <button className={closeButton} onClick={closeModal}>
            ✕
          </button>
        </div>
        <img
          className={imageWrapper}
          src={"/assets/img/scheduling/run-failed.svg"}
        />

        <div
          className={progressMessage}
          style={{ fontSize: "1.3rem", paddingBottom: "15px" }}
        >
          {message}
        </div>
        <div className={footerWrapper}>
          <span className={dateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>
              <strong>Run Start Time:</strong>&nbsp;
              {format(
                new Date(runStatus.started_at),
                "dd MMM yyyy, hh:mm a"
              )}{" "}
              by {runStatus.triggered_by_username}
            </p>
          </span>
          <span className={dateTimeWrapper}>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>
              <strong>Run Failed Time: &nbsp;</strong>
              {format(new Date(runStatus.ended_at), "dd MMM yyyy, hh:mm a")}
            </p>
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
            onClick={() => {
              closeModal();
            }}
            themeUi={themeUi}
          >
            <p>Go Back</p>
          </VFButton>
        </div>
      </div>
    );
  };
  const progressFailedToFetch = () => {
    return (
      <div className={modalWrapper} style={{ width: "50vw" }}>
        <img
          className={imageWrapper}
          src={"/assets/img/scheduling/run-failed.svg"}
        />
        <div
          className={progressMessage}
          style={{ fontSize: "1.3rem", paddingBottom: "15px" }}
        >
          {"Failed to fetch the run status. Please refresh to try again."}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingBottom: "20px",
          }}
        >
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
            onClick={() => {
              window.location.reload();
            }}
            themeUi={themeUi}
          >
            <p>Refresh</p>
          </VFButton>
        </div>
      </div>
    );
  };

  switch (runStatus?.status) {
    case "RUNNING":
      return progressModal();
    case "SUCCESS":
      return progressCompletedModal();
    case "FAILED":
      return progressFailedModal();
    case "ABORT":
      return progressAbortedModal();
    case "PENDING":
      return null;
    case "FAILED_TO_FETCH":
      return progressFailedToFetch();
    default:
      return null;
  }
};

export default RunStatusModal;
