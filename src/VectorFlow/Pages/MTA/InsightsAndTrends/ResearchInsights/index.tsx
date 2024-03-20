import {DayPicker} from 'react-day-picker'

import VFCapsule from "../../../../../components/VectorFLOW/commons/VFCapsule"
import VFRangeSlider from "../../../../../components/VectorFLOW/commons/VFRangeSlider"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"


import { AvailabilityTrendHeader, AvailabilityTrendWrapper, ResearchInsightsLayout,AvailabilityTrendSection, HistoricalAvailabiltyHeader, HistoricalAvailabiltyContent, HistoricalAvailabiltyContentSection, HistoricalAvailabiltyContentSectionHeader, HistoricalAvailabiltyContentSectionData, HorizonHeader, ChartHeader, ChartHeaderText, CapsuleWrapper, CalenderWrapper, CalenderHeader, ChartWrapper } from "./styles"

import CustomCalenderCaption from './CustomCalenderCaption'
import CustomCalenderDay from './CustomCalenderDay'
import useResearchInsights from './useResearchInsights'
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader'

import 'react-day-picker/dist/style.css';
import './styles.css'
import { AgChartsReact } from 'ag-charts-react'
import React from 'react'



const ResearchInsights = ()=>{

    const {
        ref,
        agGridProps,
        ResearchInsightsColumns,
        ResearchInsightsData,
        isLoading,
        horizon,
        selectedRows,
        setHorizon,
        getColor
    } = useResearchInsights()

    

    if(isLoading){
        return <VFLoader/>
    }

    return(
        <ResearchInsightsLayout>
            <VFTable
                {...agGridProps}
                ref={ref}
                columnDefs={ResearchInsightsColumns}
                rowData={ResearchInsightsData}
            />
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
                {selectedRows?.length===1 && (
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
                                    handleClick={(value)=>console.log(value)}
                                    
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
                )}
                {selectedRows?.length>1 && (
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
                                handleClick={(value)=>console.log(value)}
                                
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
                                handleClick={(value)=>console.log(value)}
                                
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
    )
}

export default ResearchInsights