import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import { ColDef, ChartRef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../../styles';
import VFInfoTip from "../../../../../../../../components/VectorFLOW/commons/VFInfoTip";

interface ExcessInventoryProps{
    data:any
}


const ExcessInventory = ({data}:ExcessInventoryProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
    const refGraph3 = useRef<GridRef>();
    const refGraph4 = useRef<GridRef>();
    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);
    const [hideChart3,toggleChart3] = useState<boolean>(false);
    const [hideChart4,toggleChart4] = useState<boolean>(false);
    const [grid1DisplayStatus,setGrid1DisplayStatus] = useState<string>('none');
    const [grid2DisplayStatus,setGrid2DisplayStatus] = useState<string>('none');
    const [grid3DisplayStatus,setGrid3DisplayStatus] = useState<string>('none');
    const [grid4DisplayStatus,setGrid4DisplayStatus] = useState<string>('none');

    let chartRef1:ChartRef |undefined;
    let chartRef2:ChartRef | undefined;
    let chartRef3:ChartRef | undefined;
    let chartRef4:ChartRef | undefined;

    const colDefs1:ColDef[] = [
        {
            field:'ln',
            headerName:'Location Name',
            colId:'ln',
        },
        {
            field:'ev',
            headerName:'Count of SKUs',
            colId:'ev',
        },
    ]
    const colDefs2:ColDef[] = [
        {
            field:'product',
            headerName:'Product Name',
            colId:'product',
        },
        {
            field:'count',
            headerName:'Count of Locations',
            colId:'count',
        },
    ];
    const colDefs3:ColDef[] = [
        {
            field:'ln',
            headerName:'Location Name',
            colId:'ln',
        },
        {
            field:'eiv',
            headerName:'Value (In Lakhs)',
            colId:'eiv',
        },
    ];
    const colDefs4:ColDef[] = [
        {
            field:'product',
            headerName:'Product Name',
            colId:'product',
        },
        {
            field:'count',
            headerName:'Value In Lakhs',
            colId:'count',
        },
    ];

    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
       
        if(graphNo === 1){
            if(withOutContainer) {
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                    columns: ['ln','ev'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('ExcessInventoryG1') as HTMLElement
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                    columns: ['ln','ev'],
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
                        columns: ['product','count'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    }
                })
            }
            else{
                const container2 = document.getElementById('ExcessInventoryG2') as HTMLElement
                chartRef2 = refGraph2.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                        columns: ['product','count'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    },
                    chartContainer:container2
                })
            }
            
        }
        if(graphNo === 3){
            if(withOutContainer) {
                chartRef3 = refGraph3.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                        columns: ['ln','eiv'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    }
                })
            }
            else{
                const container3 = document.getElementById('ExcessInventoryG3') as HTMLElement
                chartRef3 = refGraph3.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                        columns: ['ln','eiv'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    },
                    chartContainer:container3
                })
            }
            
        }
        if(graphNo === 4){
            if(withOutContainer) {
                chartRef4 = refGraph4.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                        columns: ['product','count'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    }
                })
            }
            else{
                const container4 = document.getElementById('ExcessInventoryG4') as HTMLElement
                chartRef4 = refGraph4.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                        columns: ['product','count'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    },
                    chartContainer:container4
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
        if(graphNo === 3){
            chartRef3?.destroyChart()
            toggleChart3(true);
            setGrid3DisplayStatus('block')
        }
        if(graphNo === 4){
            chartRef4?.destroyChart()
            toggleChart4(true);
            setGrid4DisplayStatus('block')
        }
      }


      const getChartToolbarItems:any = () => ['chartDownload'];

      const chartThemeOverrides = useMemo<any>(() => { 
        return {
            // palette:{
            //     fills:['#848484','#848484']
            // },
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

      const myCustomTheme:any = {
        palette: {
            fills: ['#848484'],
            strokes: ['#ffffff', '#ffffff'],
          },
      }

      const graph1 = [
        'This graph highlights the top 10 locations with the highest excess inventory, measured in terms of the count of SKUs'
      ]

      const graph2 = [
        'This graph highlights the top 10 products with surplus inventory, in maximum number of locations',
      ]

      const graph3 = [
        'This graph highlights the top 10 locations with the highest excess inventory, assessed in terms of monetary value.'
      ]

      const graph4 = [
        'This graph highlights the top 10 products with the highest excess inventory, assessed in terms of monetary value.'
      ]

     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={330}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Locations with Excess Inventory: Count of SKUs</SCChartHeader>
                                {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(1)}/>}
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                                <div style={{height:'260px',display:grid1DisplayStatus}}>
                                {
                                    hideChart1 &&
                                    (
                                        <VFTable
                                            ref={refGraph1}
                                            columnDefs={colDefs1}
                                            rowData={data['topTenLocationsWithExcessInventorySkuCount']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(1,true)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides}
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
                                            columnDefs={colDefs1}
                                            rowData={data['topTenLocationsWithExcessInventorySkuCount']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(1)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides}
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
                                {!hideChart1 && <div id="ExcessInventoryG1" style={{height:'250px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                        </div>
                        <SCChartContainer height={330}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Products with Excess Inventory: Number of Locations</SCChartHeader>
                                {!hideChart2 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(2)}/>}
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                                <div style={{height:'260px',display:grid2DisplayStatus}}>
                                {
                                    hideChart2 &&
                                    (
                                        <VFTable
                                            ref={refGraph2}
                                            columnDefs={colDefs2}
                                            rowData={data['topTenProductsWithExcessInventoryNumberOfLocations']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(2,true)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides}
                                            chartThemes={['myCustomTheme']}
                                            customChartThemes={{
                                                'myCustomTheme':myCustomTheme
                                            }}
                                            disableZoomScaling={true}
                                        />
                                    )
                                }
                                {
                                    !hideChart2 &&
                                    (
                                        <div style={{display:'none'}}>
                                        <VFTable
                                            ref={refGraph2}
                                            columnDefs={colDefs2}
                                            rowData={data['topTenProductsWithExcessInventoryNumberOfLocations']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(2)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides}
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
                                {!hideChart2 && <div id="ExcessInventoryG2" style={{height:'250px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph2}/>
                        </div>
                    </Allotment.Pane>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={330}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Locations with Excess Inventory: In Value (Rupee Lakhs)</SCChartHeader>
                                {!hideChart3 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(3)}/>}
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                                <div style={{height:'260px',display:grid3DisplayStatus}}>
                                {
                                    hideChart3 &&
                                    (
                                        <VFTable
                                            ref={refGraph3}
                                            columnDefs={colDefs3}
                                            rowData={data['topTenLocationsWithExcessInventoryValue']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(3,true)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides}
                                            chartThemes={['myCustomTheme']}
                                            customChartThemes={{
                                                'myCustomTheme':myCustomTheme
                                            }}
                                            disableZoomScaling={true}
                                        />
                                    )
                                }
                                {
                                    !hideChart3 &&
                                    (
                                        <div style={{display:'none'}}>
                                        <VFTable
                                            ref={refGraph3}
                                            columnDefs={colDefs3}
                                            rowData={data['topTenLocationsWithExcessInventoryValue']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(3)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides}
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
                                {!hideChart3 && <div id="ExcessInventoryG3" style={{height:'250px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph3}/>
                        </div>
                        <SCChartContainer height={330}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Products with Excess Inventory: In Value (Rupee Lakhs)</SCChartHeader>
                                {!hideChart4 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(4)}/>}
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                                <div style={{height:'260px',display:grid4DisplayStatus}}>
                                {
                                    hideChart4 &&
                                    (
                                        <VFTable
                                            ref={refGraph4}
                                            columnDefs={colDefs4}
                                            rowData={data['topTenProductsWithExcessInventoryInValue']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(4,true)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides}
                                            chartThemes={['myCustomTheme']}
                                            customChartThemes={{
                                                'myCustomTheme':myCustomTheme
                                            }}
                                            disableZoomScaling={true}
                                        />
                                    )
                                }
                                {
                                    !hideChart4 &&
                                    (
                                        <div style={{display:'none'}}>
                                        <VFTable
                                            ref={refGraph4}
                                            columnDefs={colDefs4}
                                            rowData={data['topTenProductsWithExcessInventoryInValue']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(4)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverrides}
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
                                {!hideChart4 && <div id="ExcessInventoryG4" style={{height:'250px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph4}/>
                        </div>
                    </Allotment.Pane>
                  
                </Allotment>
            </SCDynamicContainer>
        </>
    )
    
}

export default ExcessInventory;