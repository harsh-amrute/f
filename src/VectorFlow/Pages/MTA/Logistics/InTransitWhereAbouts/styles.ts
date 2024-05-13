import styled from "styled-components"

export const CurrentLocationCellRendererWrapper = styled.input`
    border: 0.5px solid #C6C6C6;
    border-radius: 2px;
    height:30px;
    width:90%;
`

export const ColorGroupCellRendererWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    height:100%;
`
export const ColorGroupColorCell = styled.div`
    position:relative;
    height: 31px;
`

export const ColorGroupColorCellToolTip = styled.div<{triangleColor:string}>`
    font-weight:500;
    display:flex;
    justify-content:center;
    align-items:center;
    height: 60px;
    width:150px;
    position:fixed;
    z-index:2000;
    border-radius:8px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    &::after {
        content: '';
        position: absolute;
        top: 100%; /* Position it below the tooltip */
        left: 50%;
        margin-left: -5px; /* Adjust to center the triangle */
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent ${(props)=>props.triangleColor} transparent; /* Triangle color */
        transform:rotate(180deg);
    }
`

export const MasterDetailWrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding:10px 0px;
`

export const MasterDetailHeaderWrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0px 20px;
`

export const  MasterDetailHeader = styled.p`
    font-size:20px;
    line-height:21px;
    font-weight:500;
`

export const ContactModalContentWrapper = styled.div`
    display:flex;
    flex-direction:column;
`

export const ContactModalContentHeader = styled.p`
    font-family:Roboto;
    font-size:16px;
    font-weight:300;
    opacity:0.7;
    margin-bottom:3px;
`

export const ContactModalContentValue = styled.p`
    font-family:Roboto;
    font-size:20px;
    font-weight:500;
    margin-bottom:10px;
`

export const RemarkModalContentWrapper = styled.div`
    display:flex;
    flex-direction:column;
    margin:0 -74px;
`

export const RemarkModalTable = styled.div`
    display:flex;
    flex-direction:column;
    // padding:0px 10px;
`

export const RemarkModalTableHeaderContainer = styled.div`
    display:grid;
    grid-template-columns:60px 300px 90px 90px;
    border-bottom:solid 1px #707070;
    padding:0 10px;
`

export const RemarkModalTableHeader = styled.p`
    font-family:Roboto;
    font-size:12px;
    font-weight:500;
    // padding:0px 5px;
    white-space: nowrap;
`

export const RemarkModalTableRowContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:10px;
    padding:0 10px;
    max-height:300px;
    overflow-y:auto;
`
export const RemarkModalTableRow = styled.div`
    display:grid;
    grid-template-columns:60px 300px 90px 90px;
    width:100%;
    margin-bottom:10px;
    padding-top:5px;
`

export const RemarkModalTableCell = styled.div`
    font-family:Roboto;
    font-size:10px;
    font-weight:500;
`

export const RemarkModalUserIcon = styled.div`
    width: 50px;
    height: 50px;
    background: #CCCCCC 0% 0% no-repeat padding-box;
    border-radius:50%;
    font-family:Roboto;
    font-size:16px;
    font-weight:500;
    display:flex;
    align-items:center;
    justify-content:center;
`

export const RemarkModalRemarkCelLRenderer = styled.div`
    display:flex;
    flex-direction:column;
`

export const RemarkText = styled.p`
    font-family:Roboto;
    font-size:10px;
    font-weight:500;
`

export const RemarkDate = styled.p`
    font-family:Roboto;
    font-size:10px;
    font-weight:500;
    opacity:0.7;
`

export const ButtonWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
    padding:10px 10px 0px 0px;
    border-top:solid 1px #707070;
    zoom:0.8;
`

export const ETACellRendererCellValue = styled.input`
    justify-content:center;
    align-items:center;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #77777729;
    border: 0.4000000059604645px solid #707070;
    border-radius: 2px;
    height:30px;
    width:100%;
    padding:4px;
    `