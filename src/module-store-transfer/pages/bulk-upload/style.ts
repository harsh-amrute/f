import styled, { css } from 'styled-components'

export const UploadSectionWrapper = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    overflow: hidden;
`

export const NoData = styled.div`
    width: 50%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    
`

// Left section styles
export const LeftSectionWrapper = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6rem;
    margin-top: 5rem;
    padding-left: 5rem;
    padding-bottom: 10rem;
`


export const LeftCommonComWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1.2rem;
`

export const LeftStep = styled.div`
    display: inline-block;
  background-color: #870d48; /* Deep purple/pink */
  color: white;
  padding: 8px 25px 8px 15px;
  font-weight: bold;
  border-radius: 6px 0 0 6px;
  font-size: 0.8rem;
  clip-path: polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%, 0% 50%);
`

export const LeftCommonComUploadWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    background-color: #fff;
    border: 1.8px dashed rgba(249, 28, 28, 0.5);
    border-radius: 2px;
    padding: 1rem 3rem;
    height:8rem;
`
export const HeaderSection = styled.div`
    display: flex;
    flex-direction: column;
    text-align:center;
    align-items: start;
    vertical-align: middle;
`

type HeaderTextProps = {
    fontSize?: string;
    fontWeight?: string;
}

type SubTextProps = {
    fontSize?: string;
    fontWeight?: string;
}


export const HeaderText = styled.div<HeaderTextProps>`
    font-size: ${props => props.fontSize || '1.35rem'};
    font-weight: ${props => props.fontWeight || '600'};
`
export const SubText = styled.div<SubTextProps>`
    font-size: ${props => props.fontSize || '1.15rem'};
    font-weight:  ${props => props.fontWeight || '300'};
    color: #666;
`
// Right section styles
export const RightSectionWrapper = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

`

export const ProgressBoxWrapper = styled.div`
    width : 20rem;
    height: 20rem;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
`

export const Svg = styled.svg`
  display: block;
`;

export const Circle = styled.circle<{ strokeWidth?: number }>`
  transition: stroke-dashoffset 0.5s ease;
`;

export const Text = styled.text`
  font-size: 1.4rem;
  fill: #bd2c84;
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: middle;
`;

export const LabelText = styled.div`
  margin-top: 0.8rem;
  font-size: 1.4rem;
  color: #888;
`;


export const FilePanel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color:rgb(239, 239, 239);
    width:50rem;
    &:hover{
        background-color:rgb(215, 211, 211);
        cursor: pointer;
    }
`

export const FileName = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;


    `
