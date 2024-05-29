import styled from "styled-components";


export const BTRLayoutWrapper = styled.div`
    display:flex;
    flex-direction:column;
`

export const BTRLayoutTabsWrapper = styled.div`
    display:flex;
    justify-content:center;
    margin-top:25px;
`

export const ToggleViewBtnWrapper = styled.div`
    position:absolute;
    right:35px;
    zoom:0.6;
    z-index:0;
    margin-top:-10px;
`

export const BTRTableWrapper = styled.div`
    display:flex;
    flex-direction:column;
    height:100vh;
    width:100%;
    margin-top:20px;
    margin-bottom:20px;
`

export const BTRAllomentSection = styled.div`
    display:flex;
    flex-direction:column;
    max-height:100%;
`

export const BTRTableHeader = styled.p`
    font-size:13px;
    font-weight:500;
    margin:0px 25px;
`

export const BTRAvailabiltyCellRendererWrapper = styled.div`
    height:100%;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`

export const BTRAvailabiltyCellRenderer = styled.div<{ value: number }>`
    position:relative;
    height:100%;
    max-height:15px;
    width:45px;
    background: #DEDEDE 0% 0% no-repeat padding-box;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom:0;
        width:${(props) => props.value}%;
        background: transparent linear-gradient(270deg, #EB73B3 0%, #820F4C 100%) 0% 0% no-repeat padding-box;
      }
`
interface ColorValues {
    B: number;
    R: number;
    Y: number;
    G: number;
}
export const ColorPriorityCellRenderer = styled.div<ColorValues>`
    position: relative;
    height: 20px;
    width: 70px;
    background: #000000 0% 0% no-repeat padding-box;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: ${(props) => `
            linear-gradient(
                to right,
                #000000 ${props.B}%,
                #E53F3F ${props.B}% ${props.B + props.R}%,
                #EBBF2C ${props.B + props.R}% 100%

                //#EBBF2C ${props.B + props.R}% ${props.B + props.R + props.Y}%,   //yellow
              //  #0b3817 ${props.B + props.R + props.Y}% 100%  //green
               
            )
        `};
    }
`;

export const CategoryCellRendererWrapper = styled.div`
height: 100 %;
width: 100 %;
display: flex;
align - items: center;
justify - content: center;
`

export const CategoryCellRendererChip = styled.div`
    width: 18px;
    height: 18px;
    display:flex;
    font-size:8px;
    font-family:Roboto;
    align-items:center;
    justify-content:center;
    margin-left:5px;
    background-color: #355FD3;
    border-radius:4px;
    box-shadow: 0px 4px 5px #00000043;
`

export const AvailabilityToolTipWrapper = styled.div`
    height: 27px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color: black;
    color:white;
    padding:15px;
    border-radius: 4px;
    font-size:9px;
`

export const CategoryToolTipWrapper = styled.div`
    display:flex;
    flex-direction:column;
    width: 150px;
    border-radius:4px;
    overflow:hidden;
`

export const CategoryToolTipSection = styled.div`
width: 100 %;
padding: 10px;
display: flex;
flex - direction: column;
`

export const CategoryToolTipSectionHeader = styled.p`
    font-weight:500;
    width:100%;
    font-size:10px;
    text-align:center;
    font-family:Roboto;
`

export const CategoryToolTipSectionDescription = styled.div`
    font-weight:300;
    font-size:9px;
    text-align:center;
    font-family:Roboto;
    margin-top:5px;
`
export const ProcPlanningChildrenColor = styled.div`
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
`
const determineColor = (value: any) => {
    if (value === "Red") return 'Red';
    if (value === "Yellow") return 'Yellow';
    if (value === "Black") return 'Black';
    if (value === "Green") return 'Green';
};
export const ChildrenColorCellRenderer = styled.div<{ value: string }>`
display: flex;
align-items: center;
justify-content: center;
width: 15px;
height: 15px;
border-radius: 50%;
margin-top: 14px;
background-color: ${(props) => determineColor(props.value)};
`;