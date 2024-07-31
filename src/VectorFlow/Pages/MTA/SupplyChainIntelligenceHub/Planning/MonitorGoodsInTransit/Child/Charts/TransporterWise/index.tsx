import { useRef, useMemo, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider, SCDynamicContainer, GlobalStyle, Xaxislegend} from '../../../styles';

import {GraphSeriesOverrides} from '../../../../../../../../../helpers/BPRConstants'
import VFModalCard from "../../../../../../../../../components/VectorFLOW/commons/VFModalCard";
import VFInfoToolTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";

import Chart from 'react-apexcharts';
import {convertToInt} from '../../../../../../../../../helpers/utils';

interface MonitorGITChildTransporterWiseProps{
    data:any
}


const MonitorGITChildTransporterWiseCharts = ({data}:MonitorGITChildTransporterWiseProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();

    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);
    // let chartRef2:ChartRef | undefined; 


    const seriesData = useMemo(()=>{
        if(!data)return []
        return data['delayDaysStatisticalBox']['data'].map((item:any) => ({
            x: item.name,
            y: [parseFloat(item.mind), parseFloat(item.Q1), parseFloat(item.median),parseFloat(item.Q3), parseFloat(item.maxd)],

          }))
    },[data]);

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
                headerName:'Transporter Name'
            },
            {
                field:'delay',
                colId:'delay',
                headerName:'Delay'
            },
            {
                field:'superdelay',
                colId:'superdelay',
                headerName:'Super Delay'
            }
        ]
        
        colDefs = columns.map((column:{header:string,colCode:string})=>{
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
        console.log(data);
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
                const container1 = document.getElementById('TransporterWiseG1') as HTMLElement
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
        // if(graphNo === 2){
        //     if(withOutContainer) {
        //         chartRef2 = refGraph2.current?.api.createRangeChart({
        //             chartType:'column',
        //             cellRange: {
        //                 columns: ['ln','trqcn'],
        //                 rowStartIndex:0,
        //                 rowEndIndex:9
        //             }
        //         })
        //     }
        //     else{
        //         const container2 = document.getElementById('CreateAvailabilityAtParentG2') as HTMLElement
        //         chartRef2 = refGraph2.current?.api.createRangeChart({
        //             chartType:'column',
        //             cellRange: {
        //                 columns: ['ln','trqcn'],
        //                 rowStartIndex:0,
        //                 rowEndIndex:9
        //             },
        //             chartContainer:container2
        //         })
        //     }
            
        // }
    }

    const handleChartClose = (graphNo:number) => {
    if(graphNo === 1){
        toggleChart1(true);
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
            palette:{
                fills:['#0c7528','#570dbf']
            },
              common: {
                
                  legend:{
                    position:'bottom'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Transporter Name',
                            position:'bottom',
                            fontSize:10,
                            fontFamily:'Roboto'

                        },
                        label:{
                            formatter:(params:any)=>{
                                if(params.value.length > 10) return params.value.toString().slice(0,10) + '...';
                                return params.value;
                            },
                        }
                    },
                    number:{
                        title:{
                            enabled:true,
                            text:"Count Of LRs",
                            position:"left",
                            fontSize:10,
                            fontFamily:'Roboto'
                        }
                      }
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
        'The graph illustrates the top 10 transporters having the maximum no. of LRs with SKUs in On-Hand Black/Red (shortage of on-handinventory) experiencing high transport ageing (Transportation Time > Standard Lead Time)',
        'Care needs to be taken to reduce the transportation time of LRs corresponding to above transporters',
        'Super Delay : Transportation Lead Time >= 1.5 x Standard Lead Time',
        'Delay : Transportation Lead Time > Standard Lead Time'
      ]

      const graph2 = [
        'This box plot graph displays the statistical distribution of delay days in transport for various transporters. Each box represents the range of delayed LRs as on today'
      ]
    
    
    return(
        <>
        <SCDynamicContainer>
            <Allotment>
                <Allotment.Pane preferredSize={'80%'}>
                    <SCChartContainer height={"95%"}>
                        <SCChartHeaderContainer>
                            <div style={{display:'flex',width:'100%',justifyContent:'center'}}><SCChartHeader style={{marginRight:10}}>Top 10 Transporters: Max LRs With On-Hand Black/Red SKUs Along With High Transport Ageing</SCChartHeader></div>
                            <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                                <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph1}/></div>
                                {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" width={15} height={15} alt="" onClick={()=>handleChartClose(1)}/>}
                            </div>
                        </SCChartHeaderContainer>
                        <SCHorizontalDivider/>
                        <VFModalCard openModal={hideChart1} closeModal={()=>toggleChart1(false)} headerIcon='' headerText="Top 10 Locations: Max On-Hand Black/Red SKUs Along With High Transport Ageing" headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
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
                                  }}                                onGridReady={()=>generateChart(1)}
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
                                defaultColDef={{
                                    floatingFilter:true,
                                    filter: "agMultiColumnFilter",
                                }}
                                disableZoomScaling={true}
                            />
                        </div>
                        <div id="TransporterWiseG1" style={{height:'80%'}}></div>
                    </SCChartContainer>
                   
                </Allotment.Pane>
                {/* <Allotment.Pane>
                    <SCChartContainer height={547}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Statistical Overview of Delay Days in Transport at Receiving Locations</SCChartHeader>
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <div style={{display:'none'}}>
                                <VFTable
                                    ref={refGraph2}
                                    columnDefs={coldefs1}
                                    rowData={data['delayDaysStatisticalBox']}
                                    enableCharts={true}
                                    enableRangeSelection={true}
                                    // onGridReady={generateChart}
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
                                />
                            </div>
                            <div id="TransporterWiseGraph2"></div>
                    </SCChartContainer>
                    <div style={{marginLeft:'10px',marginRight:'10px'}}>
                        <VFInfoTip text={graph2}/>
                    </div>
                </Allotment.Pane> */}



                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={"95%"}>
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
                                        zoom: {
                                        enabled: false,
                                        },
                                        toolbar: {
                                            show: true,
                                            tools: {
                                              download: true,
                                              customIcons: [],
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
                                        bar: {
                                            columnWidth: "40%"
                                            // columnWidth: "70%"
                                          },
                                        boxPlot: {
                                        colors: {
                                            lower: '#D3D3D3', // Color for Q1 (1st quartile)
                                            upper: '#848484',
                                        }, 
                                        }
                                    }
                                    }}
                                    series={series} // Make sure you have defined the series data
                                    type="boxPlot"
                                    height={290}

                                />
                                <Xaxislegend style={{marginTop:'-20px'}}>Transporter Name</Xaxislegend>
                                </div>

                                <VFModalCard openModal={hideChart2} closeModal={()=>toggleChart2(false)} headerIcon='' headerText="Statistical Overview of Delay Days in Transport at Receiving Locations" headerBgColor="" headerTextColor="#00000" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                                <div className="ag-theme-planning" style={{width:'1000px'}}>
                                    <VFTable
                                        ref={refGraph2}
                                        columnDefs={colDefs2}
                                        rowData={sortData(convertToInt(data['delayDaysStatisticalBox']['data']))}
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

export default MonitorGITChildTransporterWiseCharts;