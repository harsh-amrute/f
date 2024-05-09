import styled from "styled-components";


export const BTRLayoutWrapper = styled.div`
    display:flex;
    flex-direction:column;
`

export const BTRLayoutTabsWrapper = styled.div`
    display:flex;
    justify-content:center;
`

export const ToggleViewBtnWrapper = styled.div`
    position:absolute;
    right:10px;
`

export const BTRTableWrapper = styled.div`
    display:flex;
    flex-direction:column;
    aspect-ratio:2.5;
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
    font-size:16px;
    font-weight:500;
    margin:10px 25px;
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
    height:20px;
    width:70px;
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
export const ColorPriorityCellRenderer = styled.div<{ value: number }>`
    position:relative;
    height:20px;
    width:70px;
    background: #000000 0% 0% no-repeat padding-box;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom:0;
        width:${(props) => props.value}%;
        background: transparent linear-gradient(270deg, #E53F3F 50% , #EBBF2C 80%,  #000000 100%) 0% 0% no-repeat padding-box;
      }
`

export const CategoryCellRendererWrapper = styled.div`
height: 100 %;
width: 100 %;
display: flex;
align - items: center;
justify - content: center;
`

export const CategoryCellRendererChip = styled.div`
width: 30px;
height: 30px;
display: flex;
font - size: 12px;
font - family: Roboto;
align - items: center;
justify - content: center;
margin - left: 5px;
background - color: #355FD3;
border - radius: 4px;
box - shadow: 0px 4px 5px #00000043;
`

export const AvailabilityToolTipWrapper = styled.div`
height: 27px;
display: flex;
align - items: center;
justify - content: center;
background - color: black;
color: white;
padding: 15px;
border - radius: 4px;
`

export const CategoryToolTipWrapper = styled.div`
display: flex;
flex - direction: column;
width: 215px;
border - radius: 4px;
overflow: hidden;
`

export const CategoryToolTipSection = styled.div`
width: 100 %;
padding: 10px;
display: flex;
flex - direction: column;
`

export const CategoryToolTipSectionHeader = styled.p`
font - weight: 500;
font - size: 16px;
line - height: 24px;
text - align: center;
font - family: Roboto;
`

export const CategoryToolTipSectionDescription = styled.div`
font - weight: 300;
font - size: 12px;
line - height: 19px;
text - align: center;
font - family: Roboto;
`