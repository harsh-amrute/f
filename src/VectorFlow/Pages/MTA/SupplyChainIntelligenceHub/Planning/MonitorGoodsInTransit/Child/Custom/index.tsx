import {useRef, useMemo } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
// import "./styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider, SCChartLayout} from '../../styles';
import _ from "lodash";
import '../../styles.css';


interface MonitorGITChildCustomProps{
    data:any
}


const MonitorGITChildCustom = ({data}:MonitorGITChildCustomProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
    const refGraph3 = useRef<GridRef>();
    const refGraph4 = useRef<GridRef>();
    // console.log("MAXkhsdkljfh",data['maxTechBlackRedColumn']);
    // console.log(data);

    // const coldefs:ColDef[] = [
    //     {
    //         field:'ln',
    //         headerName:'Location Name',
    //         colId:'ln'
    //     },
    //     {
    //         field:'d',
    //         headerName:'Delay',
    //         colId:'d'
    //     },
    //     {
    //         field:'spd',
    //         headerName:'Super Delay',
    //         colId:'spd'
    //     }
    // ]

    const customColDefsGraph1:ColDef[] = [
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
            headerName:' Super Delay',
            colId:'spd'
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

    const customColDefsGraph2:ColDef[] = [
        {
            field:'ln',
            headerName:'Location Name',
            colId:'ln'
        },
        {
            field:'maxd',
            headerName:'Maximum Delay',
            colId:'maxd'
        },
        {
            field:'mind',
            headerName:'Minimum Delay',
            colId:'mind'
        },
        {
            field:'mean',
            headerName:'Mean Delay',
            colId:'mean'
        },
        {
            field:'median',
            headerName:'Median Delay',
            colId:'median'
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

    const customColDefsGraph3:ColDef[] = [
        {
            field:'tn',
            headerName:'Transporter Name',
            colId:'tn'
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

    const customColDefsGraph4:ColDef[] = [
        {
            field:'tn',
            headerName:'Transporter Name',
            colId:'tn'
        },
        {
            field:'maxd',
            headerName:'Maximum Delay',
            colId:'maxd'
        },
        {
            field:'mind',
            headerName:'Minimum Delay',
            colId:'mind'
        },
        {
            field:'mean',
            headerName:'Mean Delay',
            colId:'mean'
        },
        {
            field:'median',
            headerName:'Median Delay',
            colId:'median'
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
        refGraph1.current?.api.createRangeChart({
          chartType:'stackedColumn',
          cellRange: {
            columns: ['ln', 'spd', 'd'],
            rowStartIndex:0,
            rowEndIndex:9
          },
        })

        refGraph3.current?.api.createRangeChart({
            chartType:'stackedColumn',
            cellRange: {
              columns: ['tn', 'spd', 'd'],
              rowStartIndex:0,
              rowEndIndex:9
            },
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

      const combinedGridData = (graphData:any,customData:any,key:string) => {
        const combinedData:any[] = [];
        console.log(customData)
        graphData.forEach((row:any) => {
            const customRow = customData.find((data:any)=>data[key] === row[key]);
            if(customRow) combinedData.push({...row,..._.omit(customRow,[key])});
        });
        // console.log(combinedData)
        return combinedData;
        

      }
    

    
    return(
        <>
            <Allotment>
                <Allotment.Pane>
                    <SCChartLayout className="custom-scrollbar" style={{marginRight:'5px'}}>
                        <SCChartContainer>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Locations: Max Tech Black/Red SKUs Along With High Transport Ageing</SCChartHeader>
                            </SCChartHeaderContainer>
                        <SCHorizontalDivider/>
                        <div>
                            <VFTable
                                ref={refGraph1}
                                columnDefs={customColDefsGraph1}
                                rowData={combinedGridData(data['locationWise']['maxTechBlackRedColumn'],data['customScreens'],'ln')}
                                enableCharts={true}
                                enableRangeSelection={true}
                                onGridReady={generateChart}
                                getChartToolbarItems={getChartToolbarItems}
                                chartThemeOverrides={chartThemeOverrides}
                                chartThemes={['myCustomTheme']}
                                customChartThemes={{
                                    'myCustomTheme':myCustomTheme
                                }}
                            />
                        </div>
                        </SCChartContainer>
                        <SCChartContainer>
                        <SCChartHeaderContainer>
                            <SCChartHeader>Top 10 Transporters: Max LRs With Tech Black/Red SKUs Along With High Transport Ageing</SCChartHeader>
                        </SCChartHeaderContainer>
                        <SCHorizontalDivider/>
                        <div>
                            <VFTable
                                ref={refGraph3}
                                columnDefs={customColDefsGraph3}
                                rowData={data['transporterWise']['maxTechBlackRedColumn']}
                                enableCharts={true}
                                enableRangeSelection={true}
                                onGridReady={generateChart}
                                getChartToolbarItems={getChartToolbarItems}
                                chartThemeOverrides={chartThemeOverrides}
                                chartThemes={['myCustomTheme']}
                                customChartThemes={{
                                    'myCustomTheme':myCustomTheme
                                }}
                            />
                        </div>
                        </SCChartContainer>
                    </SCChartLayout>
                    
                </Allotment.Pane>
                <Allotment.Pane>
                    <SCChartLayout className="custom-scrollbar" style={{direction:'rtl',marginLeft:'5px'}}>
                        <SCChartContainer>
                                <SCChartHeaderContainer>
                                    <SCChartHeader>Statistical Overview of Delay Days in Transport at Receiving Locations</SCChartHeader>
                                </SCChartHeaderContainer>
                                <SCHorizontalDivider/>
                                <div>
                                    <VFTable
                                        ref={refGraph2}
                                        columnDefs={customColDefsGraph2}
                                        rowData={combinedGridData(data['locationWise']['delayDaysStatisticalBox'],data['customScreens'],'ln')}
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
                        </SCChartContainer>
                        <SCChartContainer>
                                <SCChartHeaderContainer>
                                    <SCChartHeader>Statistical Overview of Delay Days in Transport at Receiving Locations</SCChartHeader>
                                </SCChartHeaderContainer>
                                <SCHorizontalDivider/>
                                <div>
                                    <VFTable
                                        ref={refGraph4}
                                        columnDefs={customColDefsGraph4}
                                        rowData={data['transporterWise']['delayDaysStatisticalBox']}
                                        enableCharts={true}
                                        enableRangeSelection={true}
                                        // onGridReady={generateChart}
                                        getChartToolbarItems={getChartToolbarItems}
                                        chartThemeOverrides={chartThemeOverrides}
                                        chartThemes={['myCustomTheme']}
                                        customChartThemes={{
                                            'myCustomTheme':myCustomTheme
                                        }}
                                    />
                                </div>
                        </SCChartContainer>
                    </SCChartLayout>
                </Allotment.Pane>
            </Allotment>
        </>
    )
    
}

export default MonitorGITChildCustom;