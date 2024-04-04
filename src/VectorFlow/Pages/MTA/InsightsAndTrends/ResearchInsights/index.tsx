import {DayPicker} from 'react-day-picker'

import VFCapsule from "../../../../../components/VectorFLOW/commons/VFCapsule"
import VFRangeSlider from "../../../../../components/VectorFLOW/commons/VFRangeSlider"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"


import { AvailabilityTrendHeader,ChartHeaderRadioGroup,ResearchInsightsTableWrapper,ResearchInsightsTableTaskBar, AvailabilityTrendWrapper, ResearchInsightsLayout,AvailabilityTrendSection, HistoricalAvailabiltyHeader, HistoricalAvailabiltyContent, HistoricalAvailabiltyContentSection, HistoricalAvailabiltyContentSectionHeader, HistoricalAvailabiltyContentSectionData, HorizonHeader, ChartHeader, ChartHeaderText, CapsuleWrapper, CalenderWrapper, CalenderHeader, ChartWrapper, CalenderSummaryWrapper, CalenderSummaryCell, CalenderSummaryCellText, CalenderSummaryCellContentWrapper, CalenderSummaryCellContent, CalenderSummaryCellContentStick, ExpandChartIcon } from "./styles"

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
import ExpandedGraph from './ReseachInsightsExpandedGraph'



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
        handleOnUpdateGraph,
        redCount,
        blackCount,
        whiteCount,
        expandedGraphId,
        isGraphOneOpen,
        selfGraphData,
        locationGraphData,
        graphs,
        calenderType,
        expandedGraphAllFilterValues,
        toggleGraphModal,
        setIsGraphOneOpen,
        updateGraphState
    } = useResearchInsights()

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    
    if(isLoading){
        return <VFLoader/>
    }

    console.log("selfGraphData",selfGraphData)
    return(
        <ResearchInsightsLayout>
            <ResearchInsightsTableWrapper style={{zoom:0.8}}>
                <VFTable
                    height={800}
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
                                    activeBtn={{label:calenderType,value:calenderType}}
                                    capsules={[
                                        {
                                            label:"Tech",
                                            value:'Tech'
                                        },
                                        {
                                            label:"Eco",
                                            value:'Eco'
                                        }
                                    ]}
                                    handleClick={(e:any)=>setCalenderType(e.label)}
                                    
                                />
                            </CapsuleWrapper>
                        </ChartHeader>
                        <CalenderWrapper>
                            <CalenderHeader> Technical </CalenderHeader>
                            <DayPicker
                                style={{
                                    zoom:0.7
                                }}
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
                                activeBtn={graphs[0].pen}
                                capsules={[
                                    {
                                        label:"Tech",
                                        value:'Tech'
                                    },
                                    {
                                        label:"Eco",
                                        value:'Eco'
                                    }
                                ]}
                                handleClick={(value:any)=>updateGraphState(1,'pen',value)}
                                
                            />
                        </CapsuleWrapper>
                    </ChartHeader>
                    <ChartWrapper>
                        <ExpandChartIcon src='/assets/img/VectorFLOW/BPR/expand-graph.svg' onClick={()=>toggleGraphModal(true,1)}/>
                        <AgChartsReact options={{
                        height:200,
                        width:300,
                        data:selfGraphData,
                        axes:[
                            {
                                
                                type:"category",
                                position:'bottom',
                                label:{
                                    fontSize:8
                                }
                            },
                            {
                                type:"number",
                                position:'left',
                                label:{
                                    fontSize:8
                                }
                            }
                        ],
                        series: [
                            {
                                type: "line",
                                xKey: "date",
                                yKey: "Red",
                                yName: "Red",
                                
                                marker:{
                                    fill:'red'
                                },
                                stroke:'red'
                                
                            },
                            {
                                type: "line",
                                xKey: "date",
                                yKey: "Green",
                                yName: "Green",
                                marker:{
                                    fill:'green'
                                },
                                stroke:'green'
                            },
                            {
                                type: "line",
                                xKey: "date",
                                yKey: "Yellow",
                                yName: "Yellow",
                                marker:{
                                    fill:'yellow'
                                },
                                stroke:'yellow'
                            },
                            {
                                type: "line",
                                xKey: "date",
                                yKey: "Black",
                                yName: "Black",
                                marker:{
                                    fill:'black'
                                },
                                stroke:'black'
                            },
                            {
                                type: "line",
                                xKey: "date",
                                yKey: "Blue",
                                yName: "Blue",
                                marker:{
                                    fill:'blue'
                                },
                                stroke:'blue'
                            },
                            {
                                type: "line",
                                xKey: "date",
                                yKey: "White",
                                yName: "White",
                                marker:{
                                    fill:'gray'
                                },
                                stroke:'gray'
                            }
                            ],
                        legend:{
                            position:'top',
                            item:{
                                label:{
                                    fontSize:8,

                                },
                                marker:{
                                    size:10
                                },
                                line:{
                                    strokeWidth:1
                                }
                            }
                            
                        }
                    }}/>
                    </ChartWrapper>
                    </AvailabilityTrendSection>
                    <AvailabilityTrendSection style={{border:'none'}}>
                    <ChartHeader>
                        <ChartHeaderRadioGroup>
                            <input type="radio" value="parent" name="location" id="parent" defaultChecked onChange={()=>updateGraphState(2,'type',{label:"Parent",value:'Parent'})}/>
                            <label htmlFor="parent">Parent</label>
                        </ChartHeaderRadioGroup>
                        <ChartHeaderRadioGroup style={{marginLeft:'10px'}}>
                            <input type="radio" value="child" name="location" id="child" onChange={()=>updateGraphState(2,'type',{label:"Child",value:'Child'})}/>
                            <label htmlFor="child">Child</label>
                        </ChartHeaderRadioGroup>
                        <CapsuleWrapper>
                            <VFCapsule
                                activeBtn={graphs[1].pen}
                                capsules={[
                                    {
                                        label:"Tech",
                                        value:'Tech'
                                    },
                                    {
                                        label:"Eco",
                                        value:'Eco'
                                    }
                                ]}
                                handleClick={(value:any)=>updateGraphState(2,'pen',value)}
                                
                            />
                        </CapsuleWrapper>
                    </ChartHeader>
                    <ChartWrapper>
                        <ExpandChartIcon src='/assets/img/VectorFLOW/BPR/expand-graph.svg' onClick={()=>toggleGraphModal(true,2)}/>
                        <AgChartsReact options={{
                            height:150,
                            width:300,
                            data:locationGraphData,
                            axes:[
                                {
                                    
                                    type:"category",
                                    position:'bottom',
                                    label:{
                                        fontSize:8
                                    }
                                },
                                {
                                    type:"number",
                                    position:'left',
                                    label:{
                                        fontSize:8
                                    }
                                }
                            ],
                            series: [
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Red",
                                    yName: "Red",
                                    
                                    marker:{
                                        fill:'red'
                                    },
                                    stroke:'red'
                                    
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Green",
                                    yName: "Green",
                                    marker:{
                                        fill:'green'
                                    },
                                    stroke:'green'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Yellow",
                                    yName: "Yellow",
                                    marker:{
                                        fill:'yellow'
                                    },
                                    stroke:'yellow'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Black",
                                    yName: "Black",
                                    marker:{
                                        fill:'black'
                                    },
                                    stroke:'black'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Blue",
                                    yName: "Blue",
                                    marker:{
                                        fill:'blue'
                                    },
                                    stroke:'blue'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "White",
                                    yName: "White",
                                    marker:{
                                        fill:'gray'
                                    },
                                    stroke:'gray'
                                }
                                ],
                                legend:{
                                    position:'top'
                                }
                        }}/>
                    </ChartWrapper>
                    </AvailabilityTrendSection>
                    </React.Fragment>
                )}
            </AvailabilityTrendWrapper>
           
             <ExpandedGraph
                onUpdateGraphs={updateGraphState}
                options={expandedGraphAllFilterValues}
                graphs={graphs}
                id={expandedGraphId}
                onTogglePen={(e)=>updateGraphState(expandedGraphId,"pen",e)}
                data={expandedGraphId===1?selfGraphData:locationGraphData}
                isOpen={isGraphOneOpen}
                onClose={()=>setIsGraphOneOpen(false)}
            />
           
        </ResearchInsightsLayout>
    )
}

export default ResearchInsights