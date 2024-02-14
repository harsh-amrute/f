import React, { useEffect,useRef, useMemo } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "./styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider} from './styles';


interface MonitorGITChildLocationWiseProps{
    data:any
}


const MonitorGITChildLocationWise = ({data}:MonitorGITChildLocationWiseProps) => {

    const ref = useRef<GridRef>();
    console.log(data['maxTechBlackRedColumn']);

    const coldefs:ColDef[] = [
        {
            field:'ln',
            headerName:'Location Name',
            colId:'ln'
        },
        {
            field:'d',
            headerName:'Delay',
            colId:'d'
        },
        {
            field:'spd',
            headerName:'Super Delay',
            colId:'spd'
        }
    ]

    const generateChart = () => {
        const container = document.getElementById('LocationWiseGraph1') as HTMLElement
        ref.current?.api.createRangeChart({
          chartType:'stackedColumn',
          cellRange: {
            columns: ['ln', 'spd', 'd'],
            rowStartIndex:0,
            rowEndIndex:9
          },
          chartContainer:container
        })
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
                    number:{
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
    
    
    return(
        <>
            <Allotment>
                <Allotment.Pane>
                    <SCChartContainer>
                        <SCChartHeaderContainer>
                            <SCChartHeader>Top 10 Locations: Max Tech Black/Red SKUs Along With High Transport Ageing</SCChartHeader>
                        </SCChartHeaderContainer>
                        <SCHorizontalDivider/>
                        <div style={{display:'none'}}>
                            <VFTable
                                ref={ref}
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
                    
                </Allotment.Pane>
                <Allotment.Pane>
                    Rohan
                </Allotment.Pane>
            </Allotment>
        </>
    )
    
}

export default MonitorGITChildLocationWise;