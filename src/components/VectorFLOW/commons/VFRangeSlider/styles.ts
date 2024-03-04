// RangeSliderStyles.ts
import styled from 'styled-components';

export const RangeSliderContainer = styled.div`
  position: relative;
  width: 300px;
  margin: 20px auto;
`;

export const RangeSliderInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 11px;
box-shadow: 0px 3px 12px #7C7C7C29;
border-radius: 30px;
  background: transparent;
  outline: none;
  cursor:pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 50%;
    background: #BC3D81;
    border:4px solid white;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
    cursor: pointer;
  }

  &:hover {
    opacity: 1;
  }
`;

export const ValueLabel = styled.div<{ left: number }>`
  position: absolute;
  width:30px;
  height:20px;
  text-align:center;
  border-radius:50%;
  background-color:white;
  top:32px;
  left: ${(props) => props.left}px;
//   transform: translateX(-50%);
  font-size: 12px;
  font-weight:500;
  z-index:10;
`;

export const MilestonesContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  position:relative;
`;

export const MilestoneLabel = styled.span`
  font-size: 12px;
  position:absolute;
  top:5px;
  font-weight:500;
  letter-spacing: 0px;
  color: #000000;
`;

export const ToolTipTriangle = styled.div`
    position:absolute;
    width: 0px;
    height: 0px;
    top:20px;
    border-style: solid;
    border-width: 0 5.5px 9.0px 5.5px;
    border-color: transparent transparent black transparent;
    transform: rotate(180deg);
` 
export const RangeProgressBackground = styled.div`
position:absolute;
left:0;
right:0;
top:1px;
height: 10px;
border-radius: 5px;
z-index:-2;
`

export const RangeProgress = styled.div`
  position:absolute;
  top:1px;
  height:10px;
  border-radius: 5px;
  background-color: black;
  z-index:-1;
`

export const CustomThumb = styled.div`
position:absolute;
top:-4px;
width: 20px;
height: 20px;
display:flex;
justify-content:center;
align-items:center;
border-radius: 50%;
background: red;
border:4px solid white;
box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
cursor: pointer;
`