import {DayPicker} from 'react-day-picker'

import VFCapsule from "../../../../../components/VectorFLOW/commons/VFCapsule"
import VFRangeSlider from "../../../../../components/VectorFLOW/commons/VFRangeSlider"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"


import { AvailabilityTrendHeader,ResearchInsightsTableWrapper,ResearchInsightsTableTaskBar, AvailabilityTrendWrapper, ResearchInsightsLayout,AvailabilityTrendSection, HistoricalAvailabiltyHeader, HistoricalAvailabiltyContent, HistoricalAvailabiltyContentSection, HistoricalAvailabiltyContentSectionHeader, HistoricalAvailabiltyContentSectionData, HorizonHeader, ChartHeader, ChartHeaderText, CapsuleWrapper, CalenderWrapper, CalenderHeader, ChartWrapper, CalenderSummaryWrapper, CalenderSummaryCell, CalenderSummaryCellText, CalenderSummaryCellContentWrapper, CalenderSummaryCellContent, CalenderSummaryCellContentStick } from "./styles"

import CustomCalenderCaption from './CustomCalenderCaption'
import CustomCalenderDay from './CustomCalenderDay'
import useResearchInsights from './useResearchInsights'
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader'

import 'react-day-picker/dist/style.css';
import './styles.css'
import { AgChartsReact } from 'ag-charts-react'
import React from 'react'
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline'
import { useUserData } from '../../../../../context'
import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar'



const ResearchInsights = ()=>{

    const {
        ref,
        agGridProps,
        ResearchInsightsColumns,
        ResearchInsightsData,
        isLoading,
        horizon,
        graphState,
        setHorizon,
        getColor,
        setCalenderType,
        setGraphOneType,
        setGraphTwoType,
        handleOnUpdateGraph,
        redCount,
        blackCount,
        whiteCount
    } = useResearchInsights()

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    

    if(isLoading){
        return <VFLoader/>
    }

    return(
        <>
       <ActionToolBar view={'grid'} setCurrentTab={''} currCategory={'ResearchInsight'} currentTab={''} tabsList={[]} onFloatingTabChange={()=>console.log('')} onGoBack={()=>console.log('')} onViewChange={()=>console.log('')}/>
        <ResearchInsightsLayout>
            <ResearchInsightsTableWrapper>
                <VFTable
                    {...agGridProps}
                    ref={ref}
                    columnDefs={ResearchInsightsColumns}
                    rowData={ResearchInsightsData}
                />
                <ResearchInsightsTableTaskBar>
                    <VFButtonOutline
                        themeUi={themeUi}
                        onClick={handleOnUpdateGraph}
                        // disabled={graphState==='default'}
                    >
                        Update Graph
                    </VFButtonOutline>
                </ResearchInsightsTableTaskBar>
            </ResearchInsightsTableWrapper>
            <AvailabilityTrendWrapper>
                <AvailabilityTrendHeader>
                    Availability Trend
                </AvailabilityTrendHeader>
                <AvailabilityTrendSection>
                    <HistoricalAvailabiltyHeader>
                        Historical Availability
                    </HistoricalAvailabiltyHeader>
                    <HistoricalAvailabiltyContent>
                        <HistoricalAvailabiltyContentSection>
                            <HistoricalAvailabiltyContentSectionHeader>
                                90-60 Days
                            </HistoricalAvailabiltyContentSectionHeader>
                            <HistoricalAvailabiltyContentSectionData>
                                57.49%
                            </HistoricalAvailabiltyContentSectionData>
                        </HistoricalAvailabiltyContentSection>
                        <HistoricalAvailabiltyContentSection>
                            <HistoricalAvailabiltyContentSectionHeader>
                                60-30 Days
                            </HistoricalAvailabiltyContentSectionHeader>
                            <HistoricalAvailabiltyContentSectionData>
                                17.49%
                            </HistoricalAvailabiltyContentSectionData>
                        </HistoricalAvailabiltyContentSection>
                        <HistoricalAvailabiltyContentSection style={{border:"none"}}>
                            <HistoricalAvailabiltyContentSectionHeader>
                                30-0 Days
                            </HistoricalAvailabiltyContentSectionHeader>
                            <HistoricalAvailabiltyContentSectionData>
                                57.49%
                            </HistoricalAvailabiltyContentSectionData>
                        </HistoricalAvailabiltyContentSection>
                    </HistoricalAvailabiltyContent>
                </AvailabilityTrendSection>
                <AvailabilityTrendSection>
                    <HorizonHeader>
                        Select Horizon
                    </HorizonHeader>
                    <VFRangeSlider
                        showTriangle={false}
                        min={1}
                        max={90}
                        milestones={[0,1,90]}
                        strictMode={false}
                        width={250}
                        defaultValue={horizon}
                        handleChange={(e)=>setHorizon(e)}
                        labelValueFormatter={(value:number)=>value>1?`${value} Days`:`${value} Day`}
                    />
                </AvailabilityTrendSection>
                {graphState==='calender' && (
                    <React.Fragment>
                        <AvailabilityTrendSection>
                        <ChartHeader>
                            <ChartHeaderText>
                                Summary
                            </ChartHeaderText>
                            <CapsuleWrapper>
                                <VFCapsule
                                    defaultActive={0}
                                    capsules={[
                                        {
                                            label:"Tech",
                                            value:'tech'
                                        },
                                        {
                                            label:"Eco",
                                            value:'eco'
                                        }
                                    ]}
                                    handleClick={(e:any)=>setCalenderType(e.label)}
                                    
                                />
                            </CapsuleWrapper>
                        </ChartHeader>
                        <CalenderWrapper>
                            <CalenderHeader> Technical </CalenderHeader>
                            <DayPicker
                                mode='single'
                                components={{
                                    Caption:CustomCalenderCaption,
                                    Day:(props)=>{
                                        return <CustomCalenderDay {...props} color={getColor(props.date)}/>
                                    }
                                }}
                                styles={{
                                    cell:{
                                        padding:'5px',
                                    },

                                }}
                            />
                        </CalenderWrapper>
                    </AvailabilityTrendSection>
                    <AvailabilityTrendSection>
                        <CalenderSummaryWrapper>
                            <CalenderSummaryCell>
                                <CalenderSummaryCellText>Black Count</CalenderSummaryCellText>
                                <CalenderSummaryCellContentWrapper>
                                    <CalenderSummaryCellContent>
                                            {blackCount}%
                                    </CalenderSummaryCellContent>
                                    <CalenderSummaryCellContentStick style={{backgroundColor:'black'}}/>
                                </CalenderSummaryCellContentWrapper>
                            </CalenderSummaryCell>
                            <CalenderSummaryCell>
                                <CalenderSummaryCellText>Red Count</CalenderSummaryCellText>
                                <CalenderSummaryCellContentWrapper>
                                    <CalenderSummaryCellContent>
                                        {redCount}%
                                    </CalenderSummaryCellContent>
                                    <CalenderSummaryCellContentStick style={{backgroundColor:'#F04D4D'}}/>
                                </CalenderSummaryCellContentWrapper>
                            </CalenderSummaryCell>
                            <CalenderSummaryCell>
                                <CalenderSummaryCellText>White Count</CalenderSummaryCellText>
                                <CalenderSummaryCellContentWrapper>
                                    <CalenderSummaryCellContent>
                                            {whiteCount}%
                                    </CalenderSummaryCellContent>
                                    <CalenderSummaryCellContentStick style={{backgroundColor:'gray'}}/>
                                </CalenderSummaryCellContentWrapper>
                            </CalenderSummaryCell>
                        </CalenderSummaryWrapper>
                    </AvailabilityTrendSection>
                    <AvailabilityTrendSection>
                        <CalenderSummaryWrapper>
                            <CalenderSummaryCell>
                                <CalenderSummaryCellText>Contd. Black Ageing</CalenderSummaryCellText>
                                <CalenderSummaryCellContentWrapper>
                                    <CalenderSummaryCellContent>
                                        0
                                    </CalenderSummaryCellContent>
                                </CalenderSummaryCellContentWrapper>
                            </CalenderSummaryCell>
                            <CalenderSummaryCell>
                                <CalenderSummaryCellText>Contd. Black + Red Ageing</CalenderSummaryCellText>
                                <CalenderSummaryCellContentWrapper>
                                    <CalenderSummaryCellContent>
                                        30
                                    </CalenderSummaryCellContent>
                                </CalenderSummaryCellContentWrapper>
                            </CalenderSummaryCell>
                            <CalenderSummaryCell>
                                <CalenderSummaryCellText>Contd. White Ageing</CalenderSummaryCellText>
                                <CalenderSummaryCellContentWrapper>
                                    <CalenderSummaryCellContent>
                                        0
                                    </CalenderSummaryCellContent>
                                </CalenderSummaryCellContentWrapper>
                            </CalenderSummaryCell>
                        </CalenderSummaryWrapper>
                    </AvailabilityTrendSection>
                    </React.Fragment>
                )}
                {graphState==='graph' && (
                    <React.Fragment>
                        <AvailabilityTrendSection>
                    <ChartHeader>
                        <ChartHeaderText>
                            Current Location
                        </ChartHeaderText>
                        <CapsuleWrapper>
                            <VFCapsule
                                defaultActive={0}
                                capsules={[
                                    {
                                        label:"Tech",
                                        value:'tech'
                                    },
                                    {
                                        label:"Eco",
                                        value:'eco'
                                    }
                                ]}
                                handleClick={(value:any)=>setGraphOneType(value.label)}
                                
                            />
                        </CapsuleWrapper>
                    </ChartHeader>
                    <ChartWrapper>
                        <AgChartsReact options={{
                        height:200,
                        width:400,
                        data:[
                            {
                            date: "1",
                            red: 200,
                            diesel: 100,
                            },
                            {
                            date: "2",
                            petrol: 300,
                            diesel: 130,
                            },
                            {
                            date: "3",
                            green: 350,
                            diesel: 160,
                            },
                            {
                            date: "4",
                            green: 400,
                            red: 200,
                            },
                        ],
                        series: [
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "red",
                            yName: "Red",
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "green",
                            yName: "Green",
                        },
                        ],
                    }}/>
                    </ChartWrapper>
                    </AvailabilityTrendSection>
                    <AvailabilityTrendSection style={{border:'none'}}>
                    <ChartHeader>
                        <ChartHeaderText>
                           Parent Location
                        </ChartHeaderText>
                        <CapsuleWrapper>
                            <VFCapsule
                                defaultActive={0}
                                capsules={[
                                    {
                                        label:"Tech",
                                        value:'tech'
                                    },
                                    {
                                        label:"Eco",
                                        value:'eco'
                                    }
                                ]}
                                handleClick={(value:any)=>setGraphTwoType(value.label)}
                                
                            />
                        </CapsuleWrapper>
                    </ChartHeader>
                    <ChartWrapper>
                    <AgChartsReact options={{
                        height:200,
                        width:400,
                        data:[
                            {
                            quarter: "Q1",
                            petrol: 200,
                            diesel: 100,
                            },
                            {
                            quarter: "Q2",
                            petrol: 300,
                            diesel: 130,
                            },
                            {
                            quarter: "Q3",
                            petrol: 350,
                            diesel: 160,
                            },
                            {
                            quarter: "Q4",
                            petrol: 400,
                            diesel: 200,
                            },
                        ],
                        series: [
                        {
                            type: "line",
                            xKey: "quarter",
                            yKey: "petrol",
                            yName: "Petrol",
                        },
                        {
                            type: "line",
                            xKey: "quarter",
                            yKey: "diesel",
                            yName: "Diesel",
                        },
                        ],
                    }}/>
                    </ChartWrapper>
                    </AvailabilityTrendSection>
                    </React.Fragment>
                )}
            </AvailabilityTrendWrapper>
        </ResearchInsightsLayout>
        </>
    )
}

export default ResearchInsights