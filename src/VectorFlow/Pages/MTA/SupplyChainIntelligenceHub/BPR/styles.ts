import styled from "styled-components";

export const BPRLayout = styled.div`
   margin-top:25px;
 //   margin-bottom:40px;
`

export const BPRTaskBar  = styled.div`
    position:fixed;
    width:97%;
    right:0;
    top:13vh;
    height:70px;
    background-color:white;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
    gap:20px;
    padding:16px;
    z-index:2;
    transition:0.3s ease 0s;
`
export const BPRViewTableWrapper = styled.div`
    width:100%;
    display:flex;
    margin-top:20px;
`

export const BPRViewTablePrefix = styled.img`
    width: 52px;
    height: 150px;
    transform:translateX(11px);
`

export const BPRViewTableGrid = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #9B9B9B29;
    border-radius:8px;
    overflow-y:scroll;
    scrollbar-gutter: stable both-edges;
    &::-webkit-scrollbar{
        width: 7px;       
    }
    
    &::-webkit-scrollbar-track{
        border-radius: 30px;
        opacity: 1;
    }
    
    &::-webkit-scrollbar-thumb{
        width: 7px;
    /* UI Properties */
    background: #313131 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 9px #41414129;
    border-radius: 30px;
    opacity: 1;
    }
`

export const BPRViewTableHeaderContainer = styled.div`
    display:flex;
    flex-direction:row;
    position:sticky;
    top:0;
    background-color: white;
    z-index:100;
`

export const BPRViewTableHeader = styled.div`
    position:relative;
    width:100%;
    height:45px;
    padding:10px;
    font-style:normal;
    font-variant:normal;
    font-weight:500;
    font-size:13px;
    line-height:21px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #000000;
    text-align:center;
    &::after{
        content:'';
        position:absolute;
        right:0;
        top:4px;
        bottom:4px;
        background-color:#898585;
        width:1px;
    }
    &:last-child::after {
        display: none;
    }
`

export const BPRViewTableRowContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    max-height:250px;
    margin-top:20px;
`

export const BPRViewTableRow = styled.div`
    width:100%;
    display:flex;

`

export const BPRViewTableRowCell = styled.span`
    width:100%;
    height:50px;
    padding:6px;
    text-align:center;
    font-style:normal;
    font-variant:normal;
    font-weight:medium;
    font-size:14px;
    line-height:24px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #000000;
    white-space:nowrap;
    text-overflow:ellipsis;

`

export const ReadMoreToolTip = styled.div`
    position:absolute;
    top:0;
`

export const BPRColorCellRendererWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width: 97px;
    height: 34px;
    box-shadow: 0px 6px 12px #8D8D8D29;
    border-radius: 4px;
    position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const BPRTagsCellRendererWrapper = styled.div`
    display:block;
    padding:4px 5px;
    width: 55px;
    height: 25px;
    background: #8E8E8E 0% 0% no-repeat padding-box;
    color: #FFFFFF;
    box-shadow: 0px 6px 12px #8D8D8D29;
    border-radius: 2px;
    font-style:normal;
    font-variant:normal;
    font-weight:medium;
    font-size:14px;
    line-height:19px;
    font-family:Roboto;
    letter-spacing: 0px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow:hidden;

`


export const BPRRemarksCellRendererWrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`

export const BPRSubmitRemarkInput = styled.input`
    height:30px;
    width:90%;
`

export const BPRRemarkToolTipTextArea = styled.textarea`
    min-width:240px;
    max-width:240px;
    min-height:100px;
    max-height:100px;
`

export const BPRRemarkToolTipButtonGroup = styled.div`
    display:flex;
    justify-content:flex-end;
    width:100%;
    margin-top:5px;
`

export const  BPRRemarkToolTipButton = styled.button`
    height:25px;
    border-radius:4px;
    padding:2px 7px;
    background-color:white;
    font-size:11px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
`

export const BPRRemarksToolTipWrapper = styled.div`

    position:fixed;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #77777729;
    border: 0.4000000059604645px solid #707070;
    border-radius: 2px;
    padding:10px;
    z-index:100000;
    transition:0.2s ease-in-out;
`

export const BPRRemarksToolTipContent = styled.div`
    height:100%;
    width:100%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #77777729;
    border: 0.4000000059604645px solid #707070;
    border-radius: 2px;
    padding:10px;
    
`

export const BPRRemarksToolTipContentHeaderContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:5px;
`
export const BPRRemarkHistoryCloseIcon = styled.img`
    height:10px;
    width:10px;
    cursor:pointer;
`

export const BPRRemarksToolTipContentHeader = styled.div`
    font-weight:500;
    font-size:11px;
    line-height:19px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #464646;
`
export const BPRRemarksToolTipContentColumnContainer = styled.div`
    border-top:solid gray 1px;
    border-bottom:solid gray 1px;
    display:flex;
`

export const BPRRemarksToolTipContentColumn = styled.div`
    margin-right:10px;
    text-align:left;
    font-weight:300;
    font-size:10px;
    line-height:19px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #464646;
`

export const BPRRemarksToolTipContentRowContainer = styled.div`
    display:flex;
    flex-direction:column;
    height:270px;
   
`

export const BPRRemarksToolTipContentRow = styled.div`
    display:flex;
    flex-direction:row;
    gap:10px;
    border-bottom:dotted gray 3px;
    &:last-child {
        border-bottom:none;
    }

`

export const BPRRemarksToolTipContentRowCell = styled.p`
    width:100%;
    white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word; 
  text-align:left;
  font-weight:400;
    font-size:10px;
    font-family:Roboto;
    color: #464646;
  display:flex;
  flex-direction:column;
  
`

export const BPRColorCellRendererIcon = styled.img`
    height:20px;
    width:20px;
    cursor:pointer;
`

export const BPRRemarksToolTipContentRowNameCellSection = styled.div`
    margin-bottom:5px;
    color:gray;
`

export const BPRRemarksToolTipContentRowDataCellSection = styled.div`
    margin-bottom:5px;
`
export const BPRViewTableToolTip = styled.div`
    position:fixed;
    color:white;
    background: #4E4E4E 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #38383829;
    border-radius:4px;
    font-weight:500;
    font-size:10px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #FFFFFF;
    max-width:200px;
    padding:5px;
    z-index:10000;
`

export const BPRGraphCellRendererWrapper = styled.img`
    height:20px;
    width:20px;
    cursor:pointer;
`

export const TableHeader = styled.p`
    text-align: left;
    font-weight:500;
    font-size:20px;
    line-height:26px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #000000;
    margin-left:40px;
    padding:10px;
`

export const BPRViewTableRequestCellRendererWrapper = styled.div`
    width:100%;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    height:30px;
`

export const BPRViewTableRequestCellRendererImg = styled.img`
    height:20px;
    width:20px;
`

export const BPRViewTableRequestCellRendererText = styled.p`
    height:20px;
    width:20px;
    font-size:12px;
    font-weight:500;
    font-family:Roboto;
    color:rgb(188, 61, 129);
    margin-left:5px;
`

export const RequestExpeditingModalContent = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
`

export const RequestExpeditingModalInput = styled.textarea`
    max-height:150px;
    width:600px;
    min-height:150px;
    max-width:600px;
    min-width:600px;
    font: normal normal 300 18px/26px Roboto;
    letter-spacing: 0px;
    color: #7E7E7E;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border:none;
    outline:none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    border-radius: 6px;
    margin:10px;
`

export const RequestExpeditingModalButtonGroup = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:center;
    gap:10px;
    margin-top:10px;
    padding:10px;
    border-top:2px dashed #A0A0A0;
`