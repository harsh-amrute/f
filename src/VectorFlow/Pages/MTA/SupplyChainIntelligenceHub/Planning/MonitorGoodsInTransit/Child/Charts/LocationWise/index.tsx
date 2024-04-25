import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "./styles.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import { ColDef, ChartRef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../../../styles';
import VFInfoTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoTip";


interface MonitorGITChildLocationWiseProps{
    data:any
}


const MonitorGITChildLocationWiseCharts = ({data}:MonitorGITChildLocationWiseProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
    const [hideChart1,toggleChart1] = useState<boolean>(false);
    // const [hideChart2,toggleChart2] = useState<boolean>(false);
    const [grid1DisplayStatus,setGrid1DisplayStatus] = useState<string>('none');
    // const [grid2DisplayStatus,setGrid2DisplayStatus] = useState<string>('none');
    let chartRef1:ChartRef |undefined;
    // let chartRef2:ChartRef | undefined;

    const coldefs1:ColDef[] = [
        {
            field:'ln',
            headerName:'Location Name',
            colId:'ln',
        },
        {
            field:'d',
            headerName:'Delay',
            colId:'d',
        },
        {
            field:'spd',
            headerName:'Super Delay',
            colId:'spd',
        }
    ]

    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
       
        if(graphNo === 1){
            if(withOutContainer) {
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['ln','spd','d'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('LocationWiseG1') as HTMLElement
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['ln','spd','d'],
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
        chartRef1?.destroyChart()
        toggleChart1(true);
        setGrid1DisplayStatus('block')
    }
    // if(graphNo === 2){
    //     chartRef2?.destroyChart()
    //     toggleChart2(true);
    //     setGrid2DisplayStatus('block')
    // }
    }

      const getChartToolbarItems:any = () => ['chartDownload'];

      const chartThemeOverridesG1 = useMemo<any>(() => { 
        return {
              common: {
                  legend:{
                    position:'top'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Receiving Location Name',
                            position:'bottom',

                        }
                    },
                    number:{
                        title:{
                            enabled:true,
                            text:"Count of SKUs",
                            position:"left"
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
        'The graph illustrates the top 10 receiving locations having the maximum no. of SKUs in Tech Black/Red (shortage of on-hand inventory) experiencing high transport ageing (Transportation Time > Standard Lead Time)',
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
                    <Allotment.Pane preferredSize={'80%'}>
                        <SCChartContainer height={547}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Locations: Max Tech Black/Red SKUs Along With High Transport Ageing</SCChartHeader>
                                {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(1)}/>}
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <div style={{height:'460px',display:grid1DisplayStatus}}>
                                {
                                    hideChart1 &&
                                    (
                                        <VFTable
                                            ref={refGraph1}
                                            columnDefs={coldefs1}
                                            rowData={data['maxTechBlackRedColumn']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
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
                                        />
                                    )
                                }
                                {
                                    !hideChart1 &&
                                    (
                                        <div style={{display:'none'}}>
                                        <VFTable
                                            ref={refGraph1}
                                            columnDefs={coldefs1}
                                            rowData={data['maxTechBlackRedColumn']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(1)}
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
                                    )
                                }
                               
                                </div>
                                {!hideChart1 && <div id="LocationWiseG1" style={{height:'460px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                        </div>
                    </Allotment.Pane>
                    <Allotment.Pane>
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
                                <div id="LocationWiseGraph2"></div>
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph2}/>
                        </div>
                    </Allotment.Pane>
                </Allotment>
            </SCDynamicContainer>
        </>
    )
    
}

export default MonitorGITChildLocationWiseCharts;