import React, { useEffect,useRef, useMemo } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
// import "./styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider} from '../../styles';
import VFInfoTip from "../../../../../../../../components/VectorFLOW/commons/VFInfoTip";
import _ from "lodash";


interface MonitorGITChildCustomProps{
    data:any
}


const MonitorGITChildCustom = ({data}:MonitorGITChildCustomProps) => {

    const ref = useRef<GridRef>();
    const refNew = useRef<GridRef>();
    // console.log("MAXkhsdkljfh",data['maxTechBlackRedColumn']);
    console.log(data);

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

    const customColDefs:ColDef[] = [
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
            field:'LL1',
            headerName:'Location Level 1',
            colId:'LL1'
        },
        {
            field:'LL2',
            headerName:'Location Level 2',
            colId:'LL2'
        },
        {
            field:'LL3',
            headerName:'Location Level 3',
            colId:'LL3'
        },
        {
            field:'LL4',
            headerName:'Location Level 4',
            colId:'LL4'
        },
        {
            field:'c1',
            headerName:'Custom Attribute 1',
            colId:'c1'
        },
        {
            field:'c2',
            headerName:'Custom Attribute 2',
            colId:'c2'
        },
        {
            field:'c3',
            headerName:'Custom Attribute 3',
            colId:'c3'
        },
        {
            field:'c4',
            headerName:'Custom Attribute 4',
            colId:'c4'
        },
        {
            field:'c5',
            headerName:'Custom Attribute 5',
            colId:'c5'
        },

    ]

    const generateChart = () => {
        // const container = document.getElementById('LocationWiseGraph1') as HTMLElement
        ref.current?.api.createRangeChart({
          chartType:'stackedColumn',
          cellRange: {
            columns: ['ln', 'spd', 'd'],
            rowStartIndex:0,
            rowEndIndex:9
          },
        //   chartContainer:container
        })

        // refNew.current?.api.createRangeChart({
        //     chartType:'stackedColumn',
        //     cellRange: {
        //       columns: ['ln', 'spd', 'd'],
        //       rowStartIndex:0,
        //       rowEndIndex:9
        //     },
        //   //   chartContainer:container
        //   })
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

      const combinedGridData = () => {
        const maxTechRedBlack = data['locationWise']['maxTechBlackRedColumn'];
        const customData = data['customScreens'];
        const combinedData:any[] = [];
        maxTechRedBlack.forEach((row:any) => {
            const customRow = customData.find((data:any)=>data.ln === row.ln);
            if(customRow) combinedData.push({...row,..._.omit(customRow,'ln')});
        });
        console.log(combinedData)
        return combinedData;
        

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
                        <div>
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
                        {/* <div id="LocationWiseGraph1"></div> */}
                    </SCChartContainer>
                    {/* <VFInfoTip text={graph1}/> */}
                    
                </Allotment.Pane>
                <Allotment.Pane>
                    <VFTable
                        ref={refNew}
                        columnDefs={customColDefs}
                        rowData={combinedGridData()}
                        enableCharts={true}
                        enableRangeSelection={true}
                        onGridReady={generateChart}
                        // getChartToolbarItems={getChartToolbarItems}
                        // chartToolPanelsDef={
                        //     {
                        //         panels:[]
                        //     }
                        // }
                        // chartThemeOverrides={chartThemeOverrides}
                        // chartThemes={['myCustomTheme']}
                        // customChartThemes={{
                        //     'myCustomTheme':myCustomTheme
                        // }}
                    />
                </Allotment.Pane>
            </Allotment>
        </>
    )
    
}

export default MonitorGITChildCustom;