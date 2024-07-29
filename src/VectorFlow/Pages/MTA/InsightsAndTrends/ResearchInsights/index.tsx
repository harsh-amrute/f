import {DayPicker} from 'react-day-picker'
import { Player } from '@lottiefiles/react-lottie-player'

import VFCapsule from "../../../../../components/VectorFLOW/commons/VFCapsule"
import VFRangeSlider from "../../../../../components/VectorFLOW/commons/VFRangeSlider"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"


import { AvailabilityTrendHeader,ChartHeaderRadioGroup,ResearchInsightsTableWrapper, AvailabilityTrendWrapper, ResearchInsightsLayout,AvailabilityTrendSection, HistoricalAvailabiltyHeader, HistoricalAvailabiltyContent, HistoricalAvailabiltyContentSection, HistoricalAvailabiltyContentSectionHeader, HistoricalAvailabiltyContentSectionData, HorizonHeader, ChartHeader, ChartHeaderText, CapsuleWrapper, CalenderWrapper, CalenderHeader, ChartWrapper, CalenderSummaryWrapper, CalenderSummaryCell, CalenderSummaryCellText, CalenderSummaryCellContentWrapper, CalenderSummaryCellContent, CalenderSummaryCellContentStick, ExpandChartIcon, RadioGroup, DefaultViewRendererWrapper, DefaultViewRendererHeader, DefaultViewRendererText } from "./styles"

import CustomCalenderCaption from './CustomCalenderCaption'
import CustomCalenderDay from './CustomCalenderDay'
import useResearchInsights from './useResearchInsights'
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader'

import 'react-day-picker/dist/style.css';
import './styles.css'
import { AgChartsReact } from 'ag-charts-react'
import React from 'react'
import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar'
import ExpandedGraph from './ReseachInsightsExpandedGraph'
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'
import { GridStateContext } from '../../../../../context/GridStateContext'
import DailyDataGraphModal from "../../../../../components/VectorFLOW/commons/DailyDataGraphModal"
import NormChangeHistoryTable from "../../../../../components/VectorFLOW/commons/NormChangeHistoryTable"
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton'
import { useUserData } from '../../../../../context'


const ResearchInsights = ()=>{

    const {
        ref,
        agGridProps,
        ResearchInsightsColumns,
        ResearchInsightsData,
        isLoading,
        isUpdatedGraphDataLoading,
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
        updateGraphState,
        recordCount,
        rowsPerPage,
        currGridPage,
        isSavedDataLoading,
        columnState,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        onExportToExcelCallBack,
        showDailyDataGraphModal,
        showNormChangeHistoryTable,
        dailyData,
        handlePageChange,
        onApplyFilter,
        onDelete,
        currentFilter,
        setCurrentFilter
    } = useResearchInsights()

    const {user} = useUserData()
    const themeUi = user.user.theme_ui

    return(
        <GridStateContext.Provider value={{
            ref:ref,
            exportExcelColumns:exportExcelColumns,
            setExportExcelColumns:setExportExcelColumns,
            tempDownloadData:tempDownloadData,
            setTempDownloadData:setTempDownloadData,
            exportExcelRowData:exportExcelRowData,
            setExportExcelRowData:setExportExcelRowData

        }}>
            <div style={{zoom:0.8, paddingLeft:'20px'}}>
       <ActionToolBar 
            view={'grid'} 
            setCurrentTab={''} 
            currCategory={'ResearchInsight'} 
            currentTab={''} 
            tabsList={[]} 
            onFloatingTabChange={()=>console.log('')} 
            onGoBack={()=>console.log('')} 
            onViewChange={()=>console.log('')}
            genericRecordCount={recordCount || 0}
            onExportToExcelCallBack={onExportToExcelCallBack}
            onApplyFilter={onApplyFilter}
            multiFilter={currentFilter}
            setMultiFilter={setCurrentFilter}
            onDelete={onDelete}
            onUpdateInsight={handleOnUpdateGraph}
            hideUpdateInsightsBtn={graphState==='default'}
        />
        </div>
        
        
            <ResearchInsightsLayout>
            {
                showDailyDataGraphModal && <DailyDataGraphModal rowData={dailyData.rowData} chartData={dailyData.chartData} normChangeData={dailyData.normChangeData} masterData={dailyData.masterData} isModalOpen={showDailyDataGraphModal} suggestionData={dailyData.suggestionData} monitoringData={dailyData.monitoringData} skuKey={'SKUCode'} whKey={'WHName'} />
            }
            {
                showNormChangeHistoryTable && <NormChangeHistoryTable data={dailyData.normChangeData} />
            }
            <ResearchInsightsTableWrapper style={{zoom:0.8, marginTop:'-15px'}}>
                {(isLoading || isSavedDataLoading)?(
                    <VFLoader/>
                ):(
                    <React.Fragment>
                        <VFTable
                            height={"100%"}
                            {...agGridProps}
                            ref={ref}
                            columnDefs={ResearchInsightsColumns}
                            rowData={ResearchInsightsData}
                            onGridReady={(params)=>{
                                if(columnState)params.columnApi.applyColumnState({state:columnState})
                            }}
                            enableRangeSelection={true} // Added property
                            rowSelection="multiple"
                            statusBar = {{
                                statusPanels: [
                                { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                                { statusPanel: 'agTotalRowCountComponent', align:'left' },
                                { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                                { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                                { statusPanel: 'agAggregationComponent', align:'left' },
                                ],
                            }}
                        />
                        <VFPagination
                            selectedRows={0}
                            totalRows={recordCount || 0}
                            currentPage={currGridPage}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={handlePageChange}
                        />
                    </React.Fragment>
                )}
                
                {/* <ResearchInsightsTableTaskBar>
                    <VFButton
                        themeUi={themeUi}
                        onClick={handleOnUpdateGraph}
                        // disabled={graphState==='default'}
                    >
                        Update Graph
                    </VFButton>

                </ResearchInsightsTableTaskBar> */}
            </ResearchInsightsTableWrapper>
            {
                isUpdatedGraphDataLoading
                ?
                <AvailabilityTrendWrapper>
                    <VFLoader/>
                </AvailabilityTrendWrapper>
                :
                <AvailabilityTrendWrapper>
                <AvailabilityTrendHeader>
                    Availability Trend
                </AvailabilityTrendHeader>
                <AvailabilityTrendSection style={{borderBottom:'dashed 2px #B2B2B2'}}>
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
                {(graphState==='default')?(
                    <AvailabilityTrendSection style={{display:'flex',flexDirection:'row',marginBottom:'5px',zoom:0.7,alignItems:'center',padding:0}}>
                        <DefaultViewRendererWrapper>
                            <Player src={themeUi==="REGALBLAZE"?'/assets/img/VectorFLOW/BPR/swipe pointer regal.json':'/assets/img/VectorFLOW/BPR/swipe pointer.json'} loop autoplay style={{transform:'rotate(-90deg)',height:70,width:70}}/>
                            <DefaultViewRendererHeader>
                                No Data To Show
                            </DefaultViewRendererHeader>
                            <DefaultViewRendererText>
                                Please select data from the grid on left to view more insights
                            </DefaultViewRendererText>
                            <VFButton themeUi={themeUi} onClick={handleOnUpdateGraph}>Load Insights</VFButton>
                        </DefaultViewRendererWrapper>
                    </AvailabilityTrendSection>
                ):(
                    <AvailabilityTrendSection style={{display:'flex',flexDirection:'row',marginBottom:'5px',marginTop:'-5px',zoom:0.7,alignItems:'center',padding:0,borderBottom:'dashed 3px #B2B2B2'}}>
                    <HorizonHeader style={{margin:'0px 0px 0px 30px'}}>
                        Horizon
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
                        style={{marginTop:0}}
                        labelValueFormatter={(value:number)=>value>1?`${value} Days`:`${value} Day`}
                    />
                </AvailabilityTrendSection>
                )}
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
                                            label:"On-Hand Inventory",
                                            value:'Tech'
                                        },
                                        {
                                            label:"Pipeline Inventory",
                                            value:'Eco'
                                        }
                                    ]}
                                    handleClick={(e:any)=>setCalenderType(e.value)}
                                    
                                />
                            </CapsuleWrapper>
                        </ChartHeader>
                        <CalenderWrapper>
                            <CalenderHeader> {calenderType === 'Tech' ? 'On-Hand' : 'Pipeline'}  </CalenderHeader>
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
                    <AvailabilityTrendSection style={{borderBottom:'none'}}>
                        <CalenderSummaryWrapper>
                            <CalenderSummaryCell>
                                <CalenderSummaryCellText style={{height:27}}>Contd. Black Ageing</CalenderSummaryCellText>
                                <CalenderSummaryCellContentWrapper>
                                    <CalenderSummaryCellContent>
                                        0
                                    </CalenderSummaryCellContent>
                                </CalenderSummaryCellContentWrapper>
                            </CalenderSummaryCell>
                            <CalenderSummaryCell>
                                <CalenderSummaryCellText style={{height:27}}>Contd. Black + Red Ageing</CalenderSummaryCellText>
                                <CalenderSummaryCellContentWrapper>
                                    <CalenderSummaryCellContent>
                                        30
                                    </CalenderSummaryCellContent>
                                </CalenderSummaryCellContentWrapper>
                            </CalenderSummaryCell>
                            <CalenderSummaryCell>
                                <CalenderSummaryCellText style={{height:27}}>Contd. White Ageing</CalenderSummaryCellText>
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
                        <AvailabilityTrendSection style={{paddingBottom:'0'}}>
                    <ChartHeader>
                        <ChartHeaderText>
                            Current Location
                        </ChartHeaderText>
                        <CapsuleWrapper>
                            <VFCapsule
                                activeBtn={graphs[0].pen}
                                capsules={[
                                    {
                                        label:"On-Hand Inv.",
                                        value:'Tech'
                                    },
                                    {
                                        label:"Pipeline Inv.",
                                        value:'Eco'
                                    }
                                ]}
                                handleClick={(value:any)=>updateGraphState(1,'pen',value)}
                                
                            />
                        </CapsuleWrapper>
                    </ChartHeader>
                    <ChartWrapper>
                        <ExpandChartIcon src='/assets/img/VectorFLOW/BPR/expand-graph.svg' onClick={()=>toggleGraphModal(true,1)}/>
                        <AgChartsReact 
                        options={{
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
                                        fill:'red',
                                        size:2,
                                        shape:'square',
                                        stroke:"red"
                                    },
                                    stroke:'red'
                                    
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Green",
                                    yName: "Green",
                                    marker:{
                                        fill:'green',
                                        size:2,
                                        shape:'square',
                                        stroke:'green'
                                    },
                                    stroke:'green'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Yellow",
                                    yName: "Yellow",
                                    marker:{
                                        fill:'#FFBF00',
                                        size:2,
                                        shape:'square',
                                        stroke:'#FFBF00'
                                    },
                                    stroke:'#FFBF00'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Black",
                                    yName: "Black",
                                    marker:{
                                        fill:'black',
                                        size:2,
                                        shape:'square',
                                        stroke:"black"
                                    },
                                    stroke:'black'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Blue",
                                    yName: "Blue",
                                    marker:{
                                        fill:'blue',
                                        size:2,
                                        shape:'square',
                                        stroke:"blue"
                                    },
                                    stroke:'blue'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "White",
                                    yName: "White",
                                    marker:{
                                        fill:'gray',
                                        size:2,
                                        shape:'square',
                                        stroke:"gray"
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
                        <RadioGroup>
                            <ChartHeaderRadioGroup style={{gap:'2px'}} theme={themeUi}>
                                <input type="radio" value="parent" name="location" id="parent" defaultChecked onChange={()=>updateGraphState(2,'type',{label:"Parent",value:'Parent'})} style={{margin:0}}/>
                                <label htmlFor="parent" style={{fontSize:10}}>Parent</label>
                            </ChartHeaderRadioGroup>
                            <ChartHeaderRadioGroup style={{marginLeft:'10px',gap:'2px'}} theme={themeUi}>
                                <input type="radio" value="child" name="location" id="child" onChange={()=>updateGraphState(2,'type',{label:"Child",value:'Child'})} style={{margin:0}}/>
                                <label htmlFor="child"  style={{fontSize:10}}>Child</label>
                            </ChartHeaderRadioGroup>
                        </RadioGroup>

                        <CapsuleWrapper>
                            <VFCapsule
                                activeBtn={graphs[1].pen}
                                capsules={[
                                    {
                                        label:"On-Hand Inv.",
                                        value:'Tech'
                                    },
                                    {
                                        label:"Pipeline Inv.",
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
                                        fill:'red',
                                        size:2,
                                        shape:'square',
                                        stroke:"red"
                                    },
                                    stroke:'red'
                                    
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Green",
                                    yName: "Green",
                                    marker:{
                                        fill:'green',
                                        size:2,
                                        shape:'square',
                                        stroke:"green"
                                    },
                                    stroke:'green'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Yellow",
                                    yName: "Yellow",
                                    marker:{
                                        fill:'#FFBF00',
                                        size:2,
                                        shape:'square',
                                        stroke:"#FFBF00"
                                    },
                                    stroke:'#FFBF00'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Black",
                                    yName: "Black",
                                    marker:{
                                        fill:'black',
                                        size:2,
                                        shape:'square',
                                        stroke:"black"
                                    },
                                    stroke:'black',
                                    
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "Blue",
                                    yName: "Blue",
                                    marker:{
                                        fill:'blue',
                                        size:2,
                                        shape:'square',
                                        stroke:"blue"
                                    },
                                    stroke:'blue'
                                },
                                {
                                    type: "line",
                                    xKey: "date",
                                    yKey: "White",
                                    yName: "White",
                                    marker:{
                                        fill:'gray',
                                        size:2,
                                        shape:'square',
                                        stroke:"gray"
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
                    </React.Fragment>
                )}
            </AvailabilityTrendWrapper>
            }
            
           
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
           <div style={{display:'none'}}>                
                  <VFTable
                    ref={tempRef}
                    columnDefs={ResearchInsightsColumns}
                    rowData={exportExcelRowData}
                    {...tempAgGridProps}
                  />
                </div>
        </ResearchInsightsLayout>
        
        </GridStateContext.Provider>
    )
}

export default ResearchInsights