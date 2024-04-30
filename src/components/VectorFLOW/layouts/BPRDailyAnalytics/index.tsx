
import { ColDef } from 'ag-grid-enterprise'
import React, { useMemo,useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { RootState } from '../../../../redux/store/store'
import { routerToAnalyticsStringMap } from '../../../../helpers/BPRConstants'
import { useGetAnalyticsData } from '../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR'

import {isBefore} from 'date-fns'
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
import { notifyError } from '../../../../helpers/notify'

interface BPRDailyAnalyticsProps{
    colDefs:ColDef[]
}

const BPRDailyAnalytics = (props:BPRDailyAnalyticsProps)=>{

    const {
        colDefs
    } =props
    const [rowData,setRowData] = useState<Array<any>>([])

    const location = useLocation()
    const {currentCategory,currentTab,currentView} = useSelector((state:RootState)=>state.mta.planning)
    const {mutateAsync:getAnalyticsData,isLoading} = useGetAnalyticsData()




    
    const summation = useMemo(()=>{
        let temp = 0
         rowData.forEach((row:any)=>{
            temp +=row.techCount
        })
        return temp
    },[rowData])

    function calculatePercentIncrease(data:Array<any>) {
        if (data.length < 2) {
          notifyError("Insufficient data to calculate percent increase")
        }
        
        const todaysDateIndex = isBefore(data[0].ReportDate,data[1].ReportDate)?1:0
        const yesterdayDateIndex = (todaysDateIndex - 1 + data.length) % data.length;

        const today = data[todaysDateIndex];
        const yesterday = data[yesterdayDateIndex];

        const percentIncrease:any = {};

        const colors = ["Black", "Red", "Yellow", "Green", "White"]

        for (const color of colors) {
            const onHandToday = today[`OnHand${color}`];
            const onHandYesterday = yesterday[`OnHand${color}`];
            const pipelineToday = today[`Pipeline${color}`];
            const pipelineYesterday = yesterday[`Pipeline${color}`];
        
            percentIncrease[`OnHand${color}`] = (onHandYesterday !== undefined && onHandYesterday !== 0) ? parseFloat((((onHandToday - onHandYesterday) / onHandYesterday) * 100).toFixed(2)) : null;
            percentIncrease[`Pipeline${color}`] = (pipelineYesterday !== undefined && pipelineYesterday !== 0) ? parseFloat((((pipelineToday - pipelineYesterday) / pipelineYesterday) * 100).toFixed(2)) : null;
          }
          const result = []
          for (const color of colors) {
            
            const obj ={
                color:color,
                techCount:today[`OnHand${color}`],
                techChange:percentIncrease[`OnHand${color}`],
                ecoCount:today[`Pipeline${color}`],
                ecoChange:percentIncrease[`Pipeline${color}`]
            }
            result.push(obj)
          }
        return result;
      }
      


    const onGetAnalyticsData = async()=>{
        const pathname:string = location.pathname
        let payloadString = ""
        if(location.pathname==='/supply-chain-intelligence-hub/planning'){
            if(currentCategory!==""){
                
                switch(currentCategory){
                    case "GITFromParent":
                        payloadString = "gitparent"
                        break
                    case "GITToChild":
                        if(currentTab==="locationWise")payloadString = "gitchildlocation"
                        else payloadString = "gitchildtransporter"
                        break
                    case "ExpediteFromParent":
                        payloadString = "expediteparent"
                        break
                    case "ExpediteToChild":
                        payloadString = "expeditechild"
                        break
                    case "ExcessInventory":
                        payloadString = "excessinventory"
                        break
                    case "OrderFulfillment":
                        payloadString = "orderfulfillment"
                        break
                    default:
                        return 
                }
            }
            else{
                return 
            }
            
        }
        else payloadString = routerToAnalyticsStringMap[pathname]
        try{
            const data = await getAnalyticsData(payloadString)
        setRowData(calculatePercentIncrease(data.data.data))
        }catch(err:any){
            setRowData([])
        }

    }

    useEffect(()=>{
        onGetAnalyticsData()
    },[location.pathname,currentCategory,currentView,currentTab])

    const getCellText = (text:any,colKey:string)=>{
        console.log(text)
        if(colKey==='techChange' || colKey==='ecoChange'){
            if(!text)return "N/A"
            text = String(text)
            if(text.startsWith('-')){
                return `${text.slice(1)}%`
            }
            return `${text}%`
            
        }
        return text

    }

    const getCellIcons = (value:number)=>{
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

    
    
    
    if(isLoading){
        return(
            <BPRDailyAnalyticsWrapper>
                <BPRDailyAnalyticsContainer style={{aspectRatio:'0.9',width:'90%'}}>
                    <BPRDailyAnalyticsHeader>
                        Analytics (SKU Locations)
                    </BPRDailyAnalyticsHeader>
                    <div style={{width:'100%',height:'100%',display:'grid',placeItems:'center'}}>
                    <p style={{color:'white'}}>________</p>
                    </div>
                </BPRDailyAnalyticsContainer>
            </BPRDailyAnalyticsWrapper>
        )
    }
    
    if(rowData.length===0){
        <BPRDailyAnalyticsWrapper>
                <BPRDailyAnalyticsContainer style={{aspectRatio:'0.9',width:'90%'}}>
                    <BPRDailyAnalyticsHeader>
                        Analytics (SKU Locations)
                    </BPRDailyAnalyticsHeader>
                    <div style={{width:'100%',height:'100%',display:'grid',placeItems:'center'}}>
                    <p style={{color:'white'}}>No data</p>
                    </div>
                </BPRDailyAnalyticsContainer>
            </BPRDailyAnalyticsWrapper>
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
                                                {getCellIcons(row.techChange)}
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
                                                {getCellIcons(row.ecoChange)}
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