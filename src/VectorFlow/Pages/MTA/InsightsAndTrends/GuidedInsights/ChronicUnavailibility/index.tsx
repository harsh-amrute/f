import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../types/MDM";
import { ColDef, ChartRef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../style';
import VFInfoTip from "../../../../../../components/VectorFLOW/commons/VFInfoTip";
import { useGetChronicUnavailabilityLoc,useGetChronicUnavailabilitySku} from "../../../../../Services/MTA/InsightsAndTrends";
 


const ChronicUnavailabilityCharts = () => {

    const {data:ChronicUnavailabilityLoc}=useGetChronicUnavailabilityLoc();
    const {data:ChronicUnavailabilitySku}=useGetChronicUnavailabilitySku();

    const ChronicUnavailabilityLocData=ChronicUnavailabilityLoc?.data?.data;
    const ChronicUnavailabilitySkuData=ChronicUnavailabilitySku?.data?.data;

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();

    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);

    const [grid1DisplayStatus,setGrid1DisplayStatus] = useState<string>('none');
    const [grid2DisplayStatus,setGrid2DisplayStatus] = useState<string>('none');

    let chartRef1:ChartRef |undefined;   
    let chartRef2:ChartRef | undefined;

    const coldefs1:ColDef[] = [
        {
            field:'location',
            headerName:'Location Name',
            colId:'location',
        },
        {
            field:'countSku',
            headerName:'Count Of Skus',
            colId:'countSku',
        }
    ]
     const coldefs2:ColDef[] = [
        {
            field:'sku',
            headerName:'SKU Code',
            colId:'sku',
        },
        {
            field:'countloc',
            headerName:'Count Of Locations',
            colId:'countloc',
        }
    ]

    const generateChart = (graphNo:number,withOutContainer?:boolean) => {

        if(graphNo === 1){
            if(withOutContainer) {
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                    columns: ['location','countSku'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('LocationWiseG1') as HTMLElement
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                    columns: ['location','countSku'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    },
                  chartContainer: container1 
                })    
            }
            
        }
        if(graphNo === 2){
            if(withOutContainer) {
                chartRef2 = refGraph2.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                        columns: ['sku','countloc'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    }
                })
            }
            else{
                const container2 = document.getElementById('SKUWiseG2') as HTMLElement
                chartRef2 = refGraph2.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                        columns: ['sku','countloc'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    },
                    chartContainer:container2
                })
            }
            
        }
    }

    const handleChartClose = (graphNo:number) => {
    if(graphNo === 1){
        chartRef1?.destroyChart()
        toggleChart1(true);
        setGrid1DisplayStatus('block')
    }
    if(graphNo === 2){
        chartRef2?.destroyChart()
        toggleChart2(true);
        setGrid2DisplayStatus('block')
    }
    }

      const getChartToolbarItems:any = () => ['chartDownload'];

      const chartThemeOverrides1 = useMemo<any>(() => { 
        return {
            palette:{
                fills:['#0c7528','#570dbf']
            },
              common: {
                  legend:{
                    position:'top'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Location Name',
                            position:'bottom',

                        }
                    },
                    series:{
                        title:{
                            enabled:true,
                            text:"Count of SKUs",
                            position:"left"
                        }
                      }
                  },
                  
              },
          };
      }, []);
const chartThemeOverrides2 = useMemo<any>(() => { 
        return {
            palette:{
                fills:['#0c7528','#570dbf']
            },
              common: {
                  legend:{
                    position:'top'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'SKU Code',
                            position:'bottom',

                        }
                    },
                    series:{
                        title:{
                            enabled:true,
                            text:"Count of Locations",
                            position:"left"
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
        'This graph highlights the top 10 locations with the highest number of SKUs continuously in eco black, red or combination of black and red, surpassing the RLT'
      ]

      const graph2 = [
    'This graph highlights the top 10 products based on the number of locations where the SKU remains in continuous eco black, red or combination of black and red, surpassing the RLT'   
    ]

     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={547}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Locations: Max SKUs in Continuous Eco Black or Red Ageing greater than RLT</SCChartHeader>
                                {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt=""  data-testid="minimizechart1"onClick={()=>handleChartClose(1)}/>}
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <div style={{height:'460px',display:grid1DisplayStatus}}>
                                {
                                    hideChart1 &&
                                    (
                                        <VFTable
                                            ref={refGraph1}
                                            columnDefs={coldefs1}
                                            rowData={ChronicUnavailabilityLocData}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onRowDataUpdated={()=>generateChart(1, true)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides1}
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
                                            rowData={ChronicUnavailabilityLocData}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onRowDataUpdated={()=>generateChart(1)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides1}
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
                                    <SCChartHeader>Top 10 Skus: Max Number Of Locations Where The SKU has Eco Black/Red Ageing Greater Than Rlt</SCChartHeader>
                                     {!hideChart2 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" data-testid="minimizechart2" onClick={()=>handleChartClose(2)}/>}
                      
                                </SCChartHeaderContainer>
                                <SCHorizontalDivider/>
                                <div style={{height:'460px',display:grid2DisplayStatus}}>
                                    {
                                     hideChart2 &&
                                     (
                                    <VFTable
                                        ref={refGraph2}
                                        columnDefs={coldefs2}
                                        rowData={ChronicUnavailabilitySkuData}
                                        enableCharts={true}
                                        enableRangeSelection={true}
                                        onRowDataUpdated={()=>generateChart(2,true)}
                                        getChartToolbarItems={getChartToolbarItems}
                                        chartToolPanelsDef={
                                            {
                                                panels:[]
                                            }
                                        }
                                        chartThemeOverrides={chartThemeOverrides2}
                                        chartThemes={['myCustomTheme']}
                                        customChartThemes={{
                                            'myCustomTheme':myCustomTheme
                                        }}
                                    />
                                     )
                                    }
                                    {
                                    !hideChart2 &&
                                    (
                                        <div style={{display:'none'}}>
                                        <VFTable
                                            ref={refGraph2}
                                            columnDefs={coldefs2}
                                            rowData={ChronicUnavailabilitySkuData}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onRowDataUpdated={()=>generateChart(2)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides2}
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
                                  {!hideChart2 && <div id="SKUWiseG2" style={{height:'460px'}}></div>}
                                <div id="SKUWiseGraph2"></div>
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

export default ChronicUnavailabilityCharts;