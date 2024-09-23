import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "./styles.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer,Xaxislegend,GlobalStyle} from '../../../styles';

import {GraphSeriesOverrides} from '../../../../../../../../../helpers/BPRConstants';
import VFModalCard from "../../../../../../../../../components/VectorFLOW/commons/VFModalCard";
import VFInfoToolTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import {convertToInt, getProductAndLocationHeirarchiesFromEnv} from '../../../../../../../../../helpers/utils';

import Chart from 'react-apexcharts';

interface MonitorGITChildLocationWiseProps{
    data:any
}


const MonitorGITChildLocationWiseCharts = ({data}:MonitorGITChildLocationWiseProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);


    

    const seriesData = useMemo(()=>{
        if(!data)return []
        return data['delayDaysStatisticalBox']['data'].map((item:any) => ({
            x: item.name,
            y: [parseFloat(item.mind), parseFloat(item.Q1), parseFloat(item.median),parseFloat(item.Q3), parseFloat(item.maxd)],

          }))
    },[data]);

    console.log(seriesData)

    const series = [           
        {
          name: 'boxplot',
          data: seriesData
        }
      ];

    const mapUIConfigToColdefs = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'name',
                colId:'name',
                headerName:'Location Name'
            },
            {
                field:'delay',
                colId:'delay',
                headerName:'Delay'
                
            },
            {
                field:'superdelay',
                colId:'superdelay',
                headerName:'Super Delay',
            
            }
        ]
        
        colDefs = columns.map((column:{header:string,colCode:string})=>{
            const customColdef = getProductAndLocationHeirarchiesFromEnv(column,{}); 

            if(customColdef) return customColdef

            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header']
            }
        })
        return [...customColdefs,...colDefs];
    }


    const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'name',
                colId:'name',
                headerName:'Name'
            },
            {
                field:'LogisticsLocation',
                colId:'LogisticsLocation',
                headerName:'Logistics Location'
                
            },
            {
                field:'Q1',
                colId:'Q1',
                headerName:'Q1'
            },
            {
                field:'Q3',
                colId:'Q3',
                headerName:'Q3'
            },
            {
                field:'maxd',
                colId:'maxd',
                headerName:'Maximum'
            },
            {
                field:'mean',
                colId:'mean',
                headerName:'Mean'
            },
            {
                field:'median',
                colId:'median',
                headerName:'Median'
            },
           
            {
                field:'mind',
                colId:'mind',
                headerName:'Minimum'
            },
               
        ]
        
        colDefs = columns.map((column:{header:string,colCode:string})=>{
            const customColdef = getProductAndLocationHeirarchiesFromEnv(column,{}); 

            if(customColdef) return customColdef

            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header']
            }
        })
        return [...customColdefs,...colDefs];
    }

    const colDefs1 = mapUIConfigToColdefs(data['maxTechBlackRedColumn']['uiconfig'])

    const colDefs2 = mapUIConfigToColdefs2(data['delayDaysStatisticalBox']['uiconfig'])

    const sortData = (data:any) => {
        data.sort((row1:any,row2:any)=>{
            return (row2['superdelay']+row2['delay']) - (row1['superdelay']+row1['delay'])
        })
        return data;
    }

    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
       
        if(graphNo === 1){
            if(withOutContainer) {
                refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['name','superdelay','delay'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('LocationWiseG1') as HTMLElement
                refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['name','superdelay','delay'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    },
                  chartContainer: container1 
                })    
            }
        }
     
    }

    const handleChartClose = (graphNo:number) => {
    if(graphNo === 1){
        // chartRef1?.destroyChart()
        toggleChart1(true);
        // setGrid1DisplayStatus('block')
    }
    if(graphNo === 2){
        // chartRef2?.destroyChart()
        toggleChart2(true);
        // setGrid2DisplayStatus('block')
    }
    }

      const getChartToolbarItems:any = () => ['chartDownload'];

      const chartThemeOverridesG1 = useMemo<any>(() => { 
        return {
            ...GraphSeriesOverrides,
              common: {
                  legend:{
                    position:'bottom'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Receiving Location Name',
                            position:'bottom',
                            fontSize:10,
                            fontFamily:'Roboto'

                        },
                        label:{
                            formatter:(params:any)=>{
                                if(params.value.value.length > 10) return params.value.toString().slice(0,10) + '...';
                                return params.value;
                            },
                        }
                    },
                    number:{
                        title:{
                            enabled:true,
                            text:"Count Of SKUs",
                            position:"left",
                            fontSize:10,
                            fontFamily:'Roboto'
                        }
                      }
                  },
             
                  highlight:{
                    range:'node'
                  }, 
                                  
              },
          };
      }, []);

      const myCustomTheme:any = {
        palette: {
            fills: ['#9A0101', '#F02424'],
            strokes: ['#ffffff', '#ffffff'],
          },
      }

      const graph1 = [
        'The graph illustrates the top 10 receiving locations having the maximum no. of SKUs in On-Hand Black/Red (shortage of on-hand inventory) experiencing high transport ageing (Transportation Time > Standard Lead Time)',
        'Care needs to be taken to reduce the transportation time in these locations or adjust the RLTs for Norm calculation',
        'Super Delay : Transportation Lead Time >= 1.5 x Standard Lead Time',
        'Delay : Transportation Lead Time > Standard Lead Time'
      ]

      const graph2 = [
        'This box plot graph displays the statistical distribution of delay days in transport for various locations. Each box represents the range of delay days as on today'
      ]
     

    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={"95%"} style={{marginRight:'15px'}}>
                            <SCChartHeaderContainer> 
                                <div style={{display:'flex',width:'100%',justifyContent:'center'}}><SCChartHeader style={{marginRight:10}}>Top 10 Locations: Max On-Hand Black/Red SKUs Along With High Transport Ageing</SCChartHeader></div>
                                <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                                    <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph1}/></div>
                                    {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" width={15} height={15} alt="" onClick={()=>handleChartClose(1)}/>}
                                </div>
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <VFModalCard openModal={hideChart1} closeModal={()=>toggleChart1(false)} headerIcon='' headerText="Top 10 Locations: Max On-Hand Black/Red SKUs Along With High Transport Ageing" headerBgColor="" headerTextColor="#00000" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                                <div className="ag-theme-planning" style={{width:'1000px'}}>
                                    <VFTable
                                        ref={refGraph1}
                                        columnDefs={colDefs1}
                                        rowData={sortData(convertToInt(data['maxTechBlackRedColumn']['data'],['delay','superdelay']))}
                                        enableCharts={true}
                                        enableRangeSelection={true} 
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
                                         onGridReady={()=>generateChart(1,true)}
                                        getChartToolbarItems={getChartToolbarItems}
                                        chartToolPanelsDef={
                                            {
                                                panels:[]
                                            }
                                        }
                                        chartThemeOverrides={chartThemeOverridesG1}
                                        chartThemes={['myCustomTheme']}
                                        customChartThemes={{
                                            'myCustomTheme':myCustomTheme
                                        }}
                                        disableZoomScaling={true}
                                        defaultColDef={{
                                            floatingFilter:true,
                                            filter: "agMultiColumnFilter",
                                        }}
                                        height={'480px'}
                                    />
                                </div>
                            </VFModalCard>
                                <div style={{display:'none'}}>
                                    <VFTable
                                        ref={refGraph1}
                                        columnDefs={colDefs1}
                                        rowData={sortData(convertToInt(data['maxTechBlackRedColumn']['data'],['delay','superdelay']))}
                                        enableCharts={true}
                                        enableRangeSelection={true} 
                                        rowSelection="multiple"
                                        statusBar = {{
                                            statusPanels: [
                                              { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                                              { statusPanel: 'agTotalRowCountComponent', align:'left' },
                                              { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                                              { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                                              { statusPanel: 'agAggregationComponent', align:'left' },
                                            ],
                                          }}                                        onGridReady={()=>generateChart(1)}
                                        getChartToolbarItems={getChartToolbarItems}
                                        chartToolPanelsDef={
                                            {
                                                panels:[]
                                            }
                                        }
                                        chartThemeOverrides={chartThemeOverridesG1}
                                        chartThemes={['myCustomTheme']}
                                        customChartThemes={{
                                            'myCustomTheme':myCustomTheme
                                        }}
                                        disableZoomScaling={true}
                                    />
                                    </div>

                            {<div id="LocationWiseG1" style={{height:'80%'}}></div>}
                        </SCChartContainer>
                    </Allotment.Pane>


                <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={"95%"} style={{marginLeft:'20px'}}>
                            <SCChartHeaderContainer>
                                <div style={{display:'flex',width:'100%',justifyContent:'center'}}><SCChartHeader style={{marginRight:10}}>Statistical Overview Of Delay Days In Transport At Receiving Locations</SCChartHeader></div>
                                <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                                    <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph2}/></div>
                                    {!hideChart2 && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" width={15} height={15} alt="" onClick={()=>handleChartClose(2)}/>}
                                </div>
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <div className="boxplot-chart">
                                <GlobalStyle/>
                                 <Chart
                                    options={{
                                    chart: {
                                        type: 'boxPlot',
                                        animations: {
                                            enabled: false,
                                            easing: 'easeinout',
                                            speed: 800,
                                            animateGradually: {
                                                enabled: false,
                                                delay: 150
                                            },
                                            dynamicAnimation: {
                                                enabled: false,
                                                speed: 350
                                            }
                                        },
                                        zoom: {
                                        enabled: false,
                                        },
                                        toolbar: {
                                            show: true,
                                            tools: {
                                              download: '<img src ="/assets/img/downlod-icon.svg" width=16 height=16 class="download-icon" />',
                                            },
                                          },
                                    },
                                    grid: {
                                        show: true,
                                        strokeDashArray: 4, // Length of dashes
                                    },
                                    stroke: {
                                        show: true,
                                        curve: 'smooth',
                                        lineCap: 'butt',
                                        colors:['#848484'],
                                        width: 1.5,
                                        dashArray: 0
                                    },
                                    // xaxis: {
                                    //     crosshairs: {
                                    //         show: false
                                    //     },
                                    //     tooltip:{
                                    //         enabled:false,
                                    //     },
                                       
                                    //     labels: {
                                    //         style: {
                                    //           fontSize: '12px', // Font size of y-axis labels
                                    //           fontFamily: 'Roboto', // Font family of y-axis labels
                                    //             colors:'#717171',
                                    //             fontWeight:400                    
                                    //         },
                                    //       },
                                    // },
                                    xaxis: {
                                        crosshairs: {
                                          show: false
                                        },
                                        tooltip:{
                                          enabled:false,
                                        },
                                        labels: {
                                          style: {
                                            fontSize: '12px', // Font size of y-axis labels
                                            fontFamily: 'Roboto', // Font family of y-axis labels
                                            colors:'#717171',
                                            fontWeight:400                    
                                          },
                                        //   formatter: (params:any) => {
                                        //     if (params !== undefined && params.value !== undefined) {
                                        //       const stringValue = params.value.toString();
                                        //       if(stringValue.length > 10) return stringValue.slice(0,10) + '...';
                                        //       return params.value;
                                        //     }
                                        //     return ''; 
                                        //   },
                                        },
                                      },
                                    yaxis: {
                                        title: {
                                            text: 'Delay Days',
                                            style: {
                                                fontSize: '10px', 
                                                fontFamily: 'Roboto', 
                                                color:'#6d6d6d'
                                            },
                                        },
                                        labels: {
                                            style: {
                                              fontSize: '14px', // Font size of y-axis labels
                                              fontFamily: 'Roboto', // Font family of y-axis labels
                                                colors:'#717171'                    
                                            },
                                          },
                                         
                                    },
                                   
                                    plotOptions: {
                                        boxPlot: {
                                        colors: {
                                            lower: '#D3D3D3', // Color for Q1 (1st quartile)
                                            upper: '#848484'  // Color for Q3 (3rd quartile)
                                        }
                                        }
                                    }
                                    }}
                                    series={series} // Make sure you have defined the series data
                                    type="boxPlot"
                                    height={265}

                                />
                                <Xaxislegend>Receiving Location Name</Xaxislegend>
                                </div>

                                <VFModalCard openModal={hideChart2} closeModal={()=>toggleChart2(false)} headerIcon='' headerText="Statistical Overview of Delay Days in Transport at Receiving Locations" headerBgColor="" headerTextColor="#00000" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                                <div className="ag-theme-planning" style={{width:'1000px'}}>
                                    <VFTable
                                        ref={refGraph2}
                                        columnDefs={colDefs2}
                                        rowData={sortData(convertToInt(data['delayDaysStatisticalBox']['data'],['Q1','Q3','maxd','mind','mean','median']))}
                                        enableCharts={true}
                                        enableRangeSelection={true} 
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
                                         onGridReady={()=>generateChart(2,true)}
                                        getChartToolbarItems={getChartToolbarItems}
                                        chartToolPanelsDef={
                                            {
                                                panels:[]
                                            }
                                        }
                                        chartThemeOverrides={chartThemeOverridesG1}
                                        chartThemes={['myCustomTheme']}
                                        customChartThemes={{
                                            'myCustomTheme':myCustomTheme
                                        }}
                                        disableZoomScaling={true}
                                        defaultColDef={{
                                            floatingFilter:true,
                                            filter: "agMultiColumnFilter",
                                        }}
                                        height={'480px'}
                                    />
                                </div>
                            </VFModalCard>         
                        </SCChartContainer>
                    </Allotment.Pane>
                 </Allotment>
            </SCDynamicContainer>
        </>
    )
    
}

export default MonitorGITChildLocationWiseCharts;