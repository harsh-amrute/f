import React from 'react'
import { LabelText, ProgressBoxWrapper } from './style'
import CircularProgress from './CircularProgress'

interface ProgressBoxProps {
    label : string;
}

function ProgressBox({label} : ProgressBoxProps) {
  return (
    <ProgressBoxWrapper>
        <CircularProgress size={130} progress={75} />
        <LabelText>{label}</LabelText>
    </ProgressBoxWrapper>
  )
}

export default ProgressBox