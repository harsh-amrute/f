import React, { useState } from 'react'
import styled from 'styled-components'
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton'
import { useUserData } from '../../../../../context'
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline'
import VFOverlayModal from '../../../../../components/VectorFLOW/commons/VFOverlayModal'


const StatusBarWrapper = styled.div`
    position: sticky;
    bottom: 0;
    width: calc(100% + 24px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 12px 24px 12px 12px;
    background: white;
    shadow: 0px -2px 6px rgba(0, 0, 0, 0.4);
    border-top: 1px solid #E0E0E0;
`

const LeftSection = styled.span`
    display: flex;
    align-items: center;
    gap: 24px;
    margin-left: 20px;
`
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
  gap: 12px;
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
  width: 40vw;
  margin: 0 auto;
  height: 14px;
  //   background-color:rgba(124, 123, 123, 0.56);
  border-radius: 50px;
  border: 1.5px solid rgba(124, 123, 123, 0.56);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ value: number }>`
  height: 100%;
  width: ${({ value }) => value}%;
  background: linear-gradient(
    90deg, /* left → right */
    #b52670,
    #ff69b4,
    #b52670
  );
  background-size: 200% 200%;
  animation: gradientFlow 3s linear infinite;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  transition: width 0.3s ease-in-out;

  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%; /* move rightward */
    }
  }
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


const StatusBarBottom = ({status,isRunEnabled=true, isGoToFinalResult,last_success_run, onGoToFinalResult, StartRun}: any) => {
    const themeUi = useUserData().user.user.theme_ui;
    const [isRunConfirm, setIsRunConfirm] = useState(false);
  return (
    <StatusBarWrapper>
        <VFOverlayModal parentSelector="#main-content" openModal={isRunConfirm}  >

            <ModalWrapper style={{ width: "40vw" }}>
            <ModalHeader>
              <CloseButton
                onClick={() => {
                  setIsRunConfirm(false);
                }}
              >
                ✕
              </CloseButton>
            </ModalHeader>
            <p style={{ padding: "20px 20px 40px 20px", margin: '0 auto', fontSize: "1.4rem" }}>
              Are you sure you want to start the run?
            </p>
            <FooterWrapper style={{justifyContent: 'center', gap: '12px'}}>
              <VFButtonOutline
                style={{
                    height: "3.2rem",
                    fontSize: "1.25rem",
                    borderColor: "#b52670",
                    color: "#b52670"
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
            </FooterWrapper>
          </ModalWrapper>
        </VFOverlayModal>
        

        <LeftSection>
        <VFButton style={{fontSize: '1.1rem', height: '3.2rem', width: 'fit-content', padding: '4px 16px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent:'center'}} themeUi={themeUi} onClick={() => {setIsRunConfirm(true)}} disabled={!isRunEnabled}>
            <span>
                Run Now
            </span>
            <img src="/assets/img/scheduling/play.svg" alt="Run Now" style={{ width: '14px', height: '14px' }} />
        </VFButton>
        <VFButton style={{fontSize: '1.1rem', height: '3.2rem', width: 'fit-content', padding: '4px 16px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent:'center'}} themeUi={themeUi} onClick={onGoToFinalResult} disabled={!isGoToFinalResult}>
            <span>
                Go To Final Result
            </span>
        </VFButton>
        {
            last_success_run &&

        <p style={{fontSize: '1rem', color: 'rgb(96, 93, 93)'}}>
            Last success run: {new Date().toLocaleString()}
        </p>
        }
        </LeftSection>
        {
            status === "FAILED" &&

            <VFButtonOutline style={{fontSize: '1.1rem', height: '3.2rem', width: 'fit-content', padding: '4px 16px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent:'center'}} themeUi={themeUi} onClick={onGoToFinalResult}>
            <span>
                Download Error File
            </span>
        </VFButtonOutline>
        }
        
    </StatusBarWrapper>
  )
}

export default StatusBarBottom