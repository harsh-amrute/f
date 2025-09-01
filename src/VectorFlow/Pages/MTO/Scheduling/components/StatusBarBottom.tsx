import React from 'react'
import styled from 'styled-components'
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton'
import { useUserData } from '../../../../../context'


const StatusBarWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: white;
    shadow: 0px -2px 6px rgba(0, 0, 0, 0.4);
    border-top: 1px solid #E0E0E0;
    

`

const LeftSection = styled.span`
    display: flex;
    align-items: center;
    gap: 24px;
    margin-left: 60px;
`

const StatusBarBottom = ({isRunEnabled=true, isGoToFinalResult=true, onGoToFinalResult}: any) => {
    const themeUi = useUserData().user.user.themeUi;
  return (
    <StatusBarWrapper>
        <LeftSection>

        <VFButton style={{fontSize: '1.1rem', height: '3.2rem', width: 'fit-content', padding: '4px 16px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent:'center'}} themeUi={themeUi} onClick={() => console.log('Back clicked')} disabled={!isRunEnabled}>
            <span>
                Run Now
            </span>
            <img src="/assets/img/scheduling/play.svg" alt="Run Now" style={{ width: '14px', height: '14px' }} />
        </VFButton>
        <VFButton style={{fontSize: '1.1rem', height: '3.2rem', width: 'fit-content', padding: '4px 16px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent:'center'}} themeUi={themeUi} onClick={onGoToFinalResult} disabled={!isRunEnabled}>
            <span>
                Go To Final Result
            </span>
        </VFButton>
        </LeftSection>
    </StatusBarWrapper>
  )
}

export default StatusBarBottom