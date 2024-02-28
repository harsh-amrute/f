// VFRangeSlider.tsx
import React, { useState } from 'react';
import { RangeSliderContainer, RangeSliderInput, ValueLabel, MilestonesContainer, MilestoneLabel, ToolTipTriangle,RangeProgress, RangeProgressBackground } from './styles';

interface VFRangeSliderProps {
  milestones?: number[];
  min:number
  max:number
  strictMode:boolean
  width:number
  defaultValue:number
  handleChange:(number:number)=>void
}


const VFRangeSlider: React.FC<VFRangeSliderProps> = ({ milestones,min,max,strictMode,width,defaultValue,handleChange }) => {
  const [value, setValue] = useState<number>(defaultValue);
  const [currMileStoneIndex,setCurrMileStoneIndex] = useState<number>(0)


  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currValue = parseInt(event.target.value)
    if(strictMode && milestones){
        if(currValue<milestones[currMileStoneIndex] && currMileStoneIndex>0 && currValue<(milestones[currMileStoneIndex] + milestones[currMileStoneIndex-1])/2){
            setCurrMileStoneIndex(currMileStoneIndex-1)
            setValue(milestones[currMileStoneIndex-1])
            handleChange(milestones[currMileStoneIndex-1])
            return
        }
        if(currValue>milestones[currMileStoneIndex] && currMileStoneIndex<milestones.length && currValue>(milestones[currMileStoneIndex + 1] + milestones[currMileStoneIndex])/2){
            setCurrMileStoneIndex(currMileStoneIndex+1)
            setValue(milestones[currMileStoneIndex+1])
            handleChange(milestones[currMileStoneIndex+1])
            return
        }
        
       
    }
    else{
        setValue(currValue);
        handleChange(currValue)
    }
  };

  const range  = max - min
  const multiplier = width -20


  return (
    <RangeSliderContainer style={{width:width}}>
        <RangeSliderInput
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleSliderChange}
        />
        <RangeProgress 
            style={{width:value===0?0:((value / range) * multiplier) + 6}}
        />
        <RangeProgressBackground/>
        <ValueLabel left={((value / range) * multiplier) -3}>{value}</ValueLabel>
        <ToolTipTriangle 
            style={{left:((value / range) * multiplier) + 6.5}}
        />
        {milestones && (
            <MilestonesContainer>
                {milestones.map((milestone:number,index:number)=>{
                    if(milestone!==milestones[currMileStoneIndex]){
                        return <MilestoneLabel style={{left:((milestone / range) * multiplier) + 6.5}} key={index}>{milestone}</MilestoneLabel>
                    }
                })}
        </MilestonesContainer>
        )}
    </RangeSliderContainer>
  );
};

export default VFRangeSlider;
