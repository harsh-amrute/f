import styled from "styled-components";


export const ResearchInsightsLayout = styled.div`
    margin-top:10px;
    min-height:100vh;
    display:grid;
    grid-template-columns:3fr 1fr;
    padding-bottom:50px;
    
`

export const AvailabilityTrendWrapper = styled.div`
    width:100%;
    min-width:300px;
    background-color:white;
    border-radius:12px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    overflow:hidden;
`
export const AvailabilityTrendHeader = styled.div`
    background-color:black;
    padding:5px;
    color:white;
    width:100%;
    text-align:center;
    font-size:16px;
    font-weight:500;
    font-family:Roboto;
`

export const AvailabilityTrendSection = styled.div`
    margin-bottom:10px;
    padding:5px 10px 15px 10px;
    width:100%;
    border-bottom:dashed 2px #B2B2B2;
`

export const HistoricalAvailabiltyHeader = styled.p`
    font-weight:500;
    font-size:12px;
    margin-bottom:5px;
`

export const HistoricalAvailabiltyContent = styled.div`
    width:100%;
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    padding:4px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius:4px;
`

export const HistoricalAvailabiltyContentSection = styled.span`
    display:flex;
    flex-direction:column;
    align-items:center;
   border-right:1px solid black;
`

export const HistoricalAvailabiltyContentSectionHeader = styled.p`
    display:inline;
    font-weight:500;
    font-size:11px;
    line-height:10px;
    color:#383737;
`

export const HistoricalAvailabiltyContentSectionData = styled.p`
    display:inline;
    font-weight:500;
    font-size:14px;
    color:black;
`

export const HorizonHeader = styled.p`
    text-align:center;
    font-weight:500;
    font-size:12px;
`

export const ChartHeader = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center:
    
`

export const ChartHeaderText = styled.p`
    font-size:15px;
    font-weight:400;
    display:flex;
    align-items:center;
`

export const CapsuleWrapper = styled.div`
    width:100%;
    max-width:120px;
`

export const CalenderWrapper = styled.div`
    width:100%;
    background-color:#F4F4F4;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:10px;
    border-radius:4px;
    zoom:0.9;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`
export const CalenderHeader = styled.p`
    width:100%;
    text-align:center;
    font-weight:500;
    font-size:13px;
    border-bottom:solid 1px #D0CCCC;
    padding:5px;
   
`
export const CustomCalenderCaptionWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
`

export const CustomCalenderCaptionArrow = styled.img`
    width: 14px;
    height: 14px;
    cursor:pointer;
`

export const CustomCalenderCaptionHeader = styled.p`
    font-size:13px;
    font-weight:500;
`

export const CustomCalenderDayWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:4px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    height:100%;
    width:100%;
    cursor:pointer;
`

export const ChartWrapper = styled.div`
    width:100%;
    padding-top:10px;
    display:flex;
    justify-content:center;
    align-items:center;
`