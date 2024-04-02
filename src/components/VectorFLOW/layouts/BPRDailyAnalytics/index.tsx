
import { ColDef } from 'ag-grid-enterprise'
import React, { useMemo } from 'react'
import {
    BPRDailyAnalyticsHeader,
    BPRDailyAnalyticsContainer,
    BPRDailyAnalyticsTableCell,
    BPRDailyAnalyticsTableContainer,
    BPRDailyAnalyticsTableHeader,
    BPRDailyAnalyticsTableHeaderContainer,
    BPRDailyAnalyticsTableRow,
    BPRDailyAnalyticsTableRowContainer,
    BPRDailyAnalyticStatusBar,
    BPRDailyAnalyticsWrapper,
    BPRDailyAnalyticsTableChangeIcon,
    BPRDailyAnalyticsTableNoChangeWrapper,
    BPRDailyAnalyticStatusBarSection,
    BPRDailyAnalyticsTableCellHeader,
    BPRDailyAnalyticsTableCellText
} from './styles'

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
                Analytics (SKU Locations)
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
                                            <BPRDailyAnalyticsTableCell style={{backgroundColor:row[key],width:60,boxShadow: "0px 3px 12px #AFAFAF"}}/>
                                        )
                                   }
                                  if(key=='techCount'){
                                    return(
                                        <React.Fragment>
                                            <BPRDailyAnalyticsTableCell>
                                                <BPRDailyAnalyticsTableCellHeader>{getCellText(row[key],key)}</BPRDailyAnalyticsTableCellHeader>
                                                <BPRDailyAnalyticsTableCellText>{getCellText(row.techChange,'techChange')}</BPRDailyAnalyticsTableCellText>
                                            </BPRDailyAnalyticsTableCell>
                                            <BPRDailyAnalyticsTableCell>
                                                {getCellIcons(row.techChange,'techChange')}
                                            </BPRDailyAnalyticsTableCell>
                                        </React.Fragment>
                                    )
                                  }
                                  if( key==='ecoCount'){
                                    return(
                                        <React.Fragment>
                                            <BPRDailyAnalyticsTableCell>
                                                <BPRDailyAnalyticsTableCellHeader>{getCellText(row[key],key)}</BPRDailyAnalyticsTableCellHeader>
                                                <BPRDailyAnalyticsTableCellText>{getCellText(row.ecoChange,'ecoChange')}</BPRDailyAnalyticsTableCellText>
                                            </BPRDailyAnalyticsTableCell>
                                           <BPRDailyAnalyticsTableCell>
                                                {getCellIcons(row.ecoChange,'ecoChange')}
                                           </BPRDailyAnalyticsTableCell>
                                        </React.Fragment>
                                    )
                                  }
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