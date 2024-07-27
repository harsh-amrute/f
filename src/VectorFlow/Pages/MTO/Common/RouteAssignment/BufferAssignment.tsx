import React from 'react'
import RadioSelect from '../../../../../components/VectorFLOW/commons/MTO/RadioSelect'
import { StepGroup, StepLabel, StepperWrapper } from './RouteAssignment.styled'

const BufferAssignment = ({theme, bufferMaster, selectedBuffers ,setSelectedBuffers, isEditable}: any) => {

  const onValueChange = (newValue: any, type: any) => {
    const buffers = [...selectedBuffers]
    if(type==="prod"){
      buffers[0] = newValue
    }
    else if(type==="proc"){
      buffers[1] = newValue
    }
    setSelectedBuffers(buffers)
  }

  return (
    <StepperWrapper>
        <StepGroup $step={false}>
            <StepLabel>Production Buffer</StepLabel>
            <RadioSelect 
              isDisabled={!isEditable}
              theme={theme} 
              options={bufferMaster?.prodMaster}
              selected={selectedBuffers[0]}
              onChange={(newValue: any) => onValueChange(newValue, "prod")}
            />
        </StepGroup>
        <StepGroup $step={false}>
            <StepLabel>Procurement Buffer</StepLabel>
            <RadioSelect 
              isDisabled={!isEditable}
              theme={theme} 
              options={bufferMaster?.procMaster}
              selected={selectedBuffers[1]}
              onChange={(newValue: any) => onValueChange(newValue, "proc")}
            />
        </StepGroup>
    </StepperWrapper>
  )
}

export default BufferAssignment