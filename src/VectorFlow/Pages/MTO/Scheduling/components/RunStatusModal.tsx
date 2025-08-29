import React from "react";
import { useUserData } from "../../../../../context";
import styled from "styled-components";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";

const ModalWrapper = styled.div`
  height: fit-content;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 10px 10px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ImageWrapper = styled.img`
  height: 40vh;
  margin: 20px 0;
`;

const FooterWrapper = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
`;
const ProgressWrapper = styled.div`
  width: 80%;
  margin: 8px auto;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 14px;
  //   background-color:rgba(124, 123, 123, 0.56);
  border-radius: 50px;
  border: 1.5px solid rgba(124, 123, 123, 0.56);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ value: number }>`
  height: 100%;
  width: ${({ value }) => value}%;
  background-color: #b52670;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  transition: width 0.3s ease-in-out;
`;

const ProgressMessage = styled.div`
  margin: 0 auto;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgb(56, 54, 54);
`;

const DateTimeWrapper = styled.span`
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
`;

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
      <ModalWrapper>
        <ImageWrapper src={"/assets/img/scheduling/run-in-progress.svg"} />
        <ProgressWrapper>
          <ProgressContainer>
            <ProgressFill value={progress}>{progress} %</ProgressFill>
          </ProgressContainer>
          <ProgressMessage>{message}</ProgressMessage>
        </ProgressWrapper>
        <FooterWrapper>
          <DateTimeWrapper>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>Run Start Time: {startTime}</p>
          </DateTimeWrapper>

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
              style={{ width: "16px", height: "16px" }}
            />
            <p>Abort</p>
          </VFButton>
        </FooterWrapper>
      </ModalWrapper>
    );
  };

  const progressCompletedModal = () => {
    return (
      <ModalWrapper>
        <ModalHeader>
          <CloseButton onClick={closeModal}>✕</CloseButton>
        </ModalHeader>
        <ImageWrapper src={"/assets/img/scheduling/run-complete.svg"} />
        <ProgressMessage style={{ fontSize: "1.3rem", paddingBottom: "15px" }}>
          {message}
        </ProgressMessage>
        <FooterWrapper>
          <DateTimeWrapper>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>Run Start Time: {startTime}</p>
          </DateTimeWrapper>
          <DateTimeWrapper>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>Run End Time: {endTime}</p>
          </DateTimeWrapper>
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
        </FooterWrapper>
      </ModalWrapper>
    );
  };

  const progressAbortedModal = () => {
    return (
      <ModalWrapper>
        <ModalHeader>
          <CloseButton onClick={closeModal}>✕</CloseButton>
        </ModalHeader>
        <ImageWrapper src={"/assets/img/scheduling/run-aborted.svg"} />
        <ProgressMessage style={{ fontSize: "1.3rem", paddingBottom: "15px" }}>
          {message}
        </ProgressMessage>
        <FooterWrapper>
          <DateTimeWrapper>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>Run Start Time: {startTime}</p>
          </DateTimeWrapper>
          <DateTimeWrapper>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>Run Abort Time: {endTime}</p>
          </DateTimeWrapper>
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
        </FooterWrapper>
      </ModalWrapper>
    );
  };
  const progressFailedModal = () => {
    return (
      <ModalWrapper>
        <ModalHeader>
          <CloseButton onClick={closeModal}>✕</CloseButton>
        </ModalHeader>
        <ImageWrapper src={"/assets/img/scheduling/run-failed.svg"} />
        <ProgressMessage style={{ fontSize: "1.3rem", paddingBottom: "15px" }}>
          {message}
        </ProgressMessage>
        <FooterWrapper>
          <DateTimeWrapper>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>Run Start Time: {startTime}</p>
          </DateTimeWrapper>
          <DateTimeWrapper>
            <img
              src="/assets/img/scheduling/calendar-date.svg"
              alt="Calendar Icon"
              style={{ width: "16px", height: "16px" }}
            />
            <p>Run Failed Time: {endTime}</p>
          </DateTimeWrapper>
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
              borderColor: '#b52670',
              color: '#b52670',
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
        </FooterWrapper>
      </ModalWrapper>
    );
  };

  return <>{progressFailedModal()}</>;
};

export default RunStatusModal;
