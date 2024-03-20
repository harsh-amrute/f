import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../../styles.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import { ColDef, ChartRef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../../../styles';
import VFInfoTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoTip";

interface ExpediteParentDispatchesProps{
    data:any
}


const ExpediteDispatches = ({data}:ExpediteParentDispatchesProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);
    // const [hideChart3,toggleChart3] = useState<boolean>(false);
    const [grid1DisplayStatus,setGrid1DisplayStatus] = useState<string>('none');
    const [grid2DisplayStatus,setGrid2DisplayStatus] = useState<string>('none');
    // const [grid3DisplayStatus,setGrid3DisplayStatus] = useState<string>('none');

    let chartRef1:ChartRef |undefined;
    let chartRef2:ChartRef | undefined;

    // const refGraph3 = useRef<GridRef>();

    const colDefs1:ColDef[] = [
        {
            field:'ln',
            headerName:'Location Name',
            colId:'ln',
        },
        {
            field:'trqa',
            headerName:'Count of SKUs',
            colId:'trqa',
        },
    ]
    const colDefs2:ColDef[] = [];

    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
       
        if(graphNo === 1){
            if(withOutContainer) {
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                    columns: ['ln','trqa'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('ExpediteDispatchesG1') as HTMLElement
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                    columns: ['ln','trqa'],
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
        if(graphNo === 2){
            chartRef2?.destroyChart()
            toggleChart2(true);
            setGrid2DisplayStatus('block')
        }
      }


      const getChartToolbarItems:any = () => ['chartDownload'];

      const chartThemeOverrides = useMemo<any>(() => { 
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
                            text:'Parent Location Name',
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
            fills: ['#9A0101', '#F02424'],
            strokes: ['#ffffff', '#ffffff'],
          },
      }

      const graph1 = [
        'This graph highlights the top 10 parent locations with max SKUs in Eco Black/Red which have rationed qty available for receiving locations',
        'To improve availability, expedite dispatches from these parent locations.'
      ]

      const graph2 = [
        'This graph highlights the top 10 receiving locations with max SKUs in Eco Black/Red which have rationed qty available at parent',
        'To improve availability, expedite dispatches to these locations.'
      ]

      const graph3 = [
        'This graph shows the potential improvement in eco availability assuming the entire rationed qty would become goods in transit.'
      ]

     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane preferredSize={'70%'}>
                        <SCChartContainer height={330}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Parent Location: Max Eco Black/Red SKUs With Available Rationed Qty For Receiving Locations</SCChartHeader>
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
                                            rowData={data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocations']}
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
                                            rowData={data=[]}
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
                                {!hideChart1 && <div id="ExpediteDispatchesG1" style={{height:'260px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                        </div>
                        <SCChartContainer height={330}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Receiving Locations: Max Eco Black/Red SKUs With Rationed Quantity Available At Parent</SCChartHeader>
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
                                            rowData={data['maxEcoBlackRedWithRationedQtyAvailableAtParent']}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            // onGridReady={()=>generateChart(2,true)}
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
                                            rowData={data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocations']}
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
                                {!hideChart2 && <div id="ExpediteDispatchesG2" style={{height:'260px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph2}/>
                        </div>
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <SCChartContainer height={547}>
                                <SCChartHeaderContainer>
                                    <SCChartHeader>Comparision of Availability: Pre Rationing vs Post Rationing</SCChartHeader>
                                    {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(1)}/>}
                                </SCChartHeaderContainer>
                                <SCHorizontalDivider/>
                                <div style={{display:'none'}}>
                                    <VFTable
                                        ref={refGraph2}
                                        columnDefs={colDefs2}
                                        // rowData={data['delayDaysStatisticalBox']}
                                        enableCharts={true}
                                        enableRangeSelection={true}
                                        // onGridReady={generateChart}
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
                                    />
                                </div>
                                <div id="ExpediteDispatchesG3"></div>
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph3}/>
                        </div>
                    </Allotment.Pane>
                </Allotment>
            </SCDynamicContainer>
        </>
    )
    
}

export default ExpediteDispatches;