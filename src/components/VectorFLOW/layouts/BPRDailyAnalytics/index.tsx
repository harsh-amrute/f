
import { ColDef } from 'ag-grid-enterprise'
import { useMemo } from 'react'
import {BPRDailyAnalyticsHeader,BPRDailyAnalyticsContainer, BPRDailyAnalyticsTableCell, BPRDailyAnalyticsTableContainer, BPRDailyAnalyticsTableHeader, BPRDailyAnalyticsTableHeaderContainer, BPRDailyAnalyticsTableRow, BPRDailyAnalyticsTableRowContainer, BPRDailyAnalyticStatusBar, BPRDailyAnalyticsWrapper, BPRDailyAnalyticsTableChangeIcon,BPRDailyAnalyticsTableNoChangeWrapper, BPRDailyAnalyticStatusBarSection} from './styles'

interface BPRDailyAnalyticsProps{
    colDefs:ColDef[]
    rowData:any[]
}

const BPRDailyAnalytics = (props:BPRDailyAnalyticsProps)=>{

    const {
        colDefs,
        rowData
    } = props

    let summation = 0

    useMemo(()=>{
        rowData.forEach((row:any)=>{
            summation +=row.techCount
        })
    },[])

    const getCellText = (text:any,colKey:string)=>{

        if(colKey==='techChange' || colKey==='ecoChange'){
            text = String(text)
            if(text.startsWith('-')){
                return `${text.slice(1)}%`
            }
            return `${text}%`
            
        }
        return text

    }

    const getCellIcons = (value:number,colKey:string)=>{
        if(colKey==='techChange' || colKey==='ecoChange'){
            if(value>0){
                return <BPRDailyAnalyticsTableChangeIcon src='/assets/img/VectorFLOW/BPR/analytics-increase.svg'/>
            }
            if(value<0){
                return <BPRDailyAnalyticsTableChangeIcon src='/assets/img/VectorFLOW/BPR/analytics-decrease.svg' style={{transform:'rotate(90deg)'}}/>
            }
            return (
                <BPRDailyAnalyticsTableNoChangeWrapper>
                    <BPRDailyAnalyticsTableChangeIcon src='/assets/img/VectorFLOW/BPR/analytics-increase.svg'/>
                    <BPRDailyAnalyticsTableChangeIcon src='/assets/img/VectorFLOW/BPR/analytics-decrease.svg' style={{transform:'rotate(90deg)'}}/>
                </BPRDailyAnalyticsTableNoChangeWrapper>
            )
        }
    }

    return(
        <BPRDailyAnalyticsWrapper>
            <BPRDailyAnalyticsContainer>
            <BPRDailyAnalyticsHeader>
                Analytics (Today)
            </BPRDailyAnalyticsHeader>
            <BPRDailyAnalyticsTableContainer>
                <BPRDailyAnalyticsTableHeaderContainer>
                    {
                        colDefs.map((colDef:ColDef)=>{
                            if(colDef.colId==='color'){
                                return(
                                    <BPRDailyAnalyticsTableHeader style={{width:25}}/>
                                )
                            }
                            return(
                                <BPRDailyAnalyticsTableHeader>
                                    {colDef.headerName}
                                </BPRDailyAnalyticsTableHeader>
                            )
                        })
                    }
                </BPRDailyAnalyticsTableHeaderContainer>
                <BPRDailyAnalyticsTableRowContainer>
                    {rowData.map((row:any)=>{
                        return(
                            <BPRDailyAnalyticsTableRow>
                               {Object.keys(row).map((key:string)=>{
                                   if(key==='color'){
                                        return(
                                            <BPRDailyAnalyticsTableCell style={{backgroundColor:row[key],width:25,boxShadow: "0px 3px 12px #AFAFAF"}}/>
                                        )
                                   }
                                   return(
                                        <BPRDailyAnalyticsTableCell>
                                           {getCellText(row[key],key)}
                                           {getCellIcons(row[key],key)}
                                        </BPRDailyAnalyticsTableCell>
                                    )
                               })}
                            </BPRDailyAnalyticsTableRow>
                        )
                    })}
                </BPRDailyAnalyticsTableRowContainer>
            </BPRDailyAnalyticsTableContainer>
            <BPRDailyAnalyticStatusBar>
                <BPRDailyAnalyticStatusBarSection>
                    Total
                </BPRDailyAnalyticStatusBarSection>
                <BPRDailyAnalyticStatusBarSection>
                    {summation}
                </BPRDailyAnalyticStatusBarSection>
            </BPRDailyAnalyticStatusBar>
        </BPRDailyAnalyticsContainer>
        </BPRDailyAnalyticsWrapper>
    )
}

export default BPRDailyAnalytics