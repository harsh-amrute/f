import {useRef, useMemo } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "./styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider} from '../../styles';
import VFInfoTip from "../../../../../../../../components/VectorFLOW/commons/VFInfoTip";


interface MonitorGITChildLocationWiseProps{
    data:any
}


const MonitorGITChildLocationWise = ({data}:MonitorGITChildLocationWiseProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();

    const coldefs:ColDef[] = [
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

    const generateChart = () => {
        const container1 = document.getElementById('LocationWiseGraph1') as HTMLElement
        refGraph1.current?.api.createRangeChart({
          chartType:'stackedColumn',
          cellRange: {
            columns: ['ln','spd', 'd'],
            rowStartIndex:0,
            rowEndIndex:9
          },
          chartContainer:container1
        })

        // const container2 = document.getElementById('LocationWiseGraph2') as HTMLElement
        // refGraph2.current?.api.createRangeChart({
        //   chartType:'stackedColumn',
        //   cellRange: {
        //     columns: ['ln', 'spd', 'd'],
        //     rowStartIndex:0,
        //     rowEndIndex:9
        //   },
        //   chartContainer:container2
        // })
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
                            text:'Receiving Location Name',
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
            <Allotment>
                <Allotment.Pane preferredSize={1000}>
                    <SCChartContainer height={547}>
                        <SCChartHeaderContainer>
                            <SCChartHeader>Top 10 Locations: Max Tech Black/Red SKUs Along With High Transport Ageing</SCChartHeader>
                        </SCChartHeaderContainer>
                        <SCHorizontalDivider/>
                        <div style={{display:'none'}}>
                            <VFTable
                                ref={refGraph1}
                                columnDefs={coldefs}
                                rowData={data['maxTechBlackRedColumn']}
                                enableCharts={true}
                                enableRangeSelection={true}
                                onGridReady={generateChart}
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
                        <div id="LocationWiseGraph1"></div>
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
                                    columnDefs={coldefs}
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
                                    chartThemeOverrides={chartThemeOverrides}
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
        </>
    )
    
}

export default MonitorGITChildLocationWise;