import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import { ColDef, ChartRef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../../styles';
import VFInfoTip from "../../../../../../../../components/VectorFLOW/commons/VFInfoTip";


import {GraphSeriesOverrides} from '../../../../../../../../helpers/BPRConstants'

interface OrderFulfillmentProps{
    data:any
}


const OrderFulfillmentLocationWise = ({data}:OrderFulfillmentProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
  
    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);

    const [grid1DisplayStatus,setGrid1DisplayStatus] = useState<string>('none');
    const [grid2DisplayStatus,setGrid2DisplayStatus] = useState<string>('none');
    

    let chartRef1:ChartRef |undefined;
    let chartRef2:ChartRef | undefined;

    const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs:ColDef[] = [
            {
                field:'location',
                headerName:'Location Name',
                colId:'location',
            },
            {
                field:'overdue',
                headerName:'Overdue',
                colId:'overdue',
            },
            {
                field:'due',
                headerName:'Due',
                colId:'due',
            },
            {
                field:'others',
                headerName:'Others',
                colId:'others',
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

    const colDefs1 = mapUIConfigToColdefs1(data['maximumOverdueOrders']['uiconfig']);

    const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs:ColDef[] = [
            {
                field:'location',
                headerName:'Location Name',
                colId:'location',
            },
            {
                field:'greater',
                headerName:'Gap > 67%',
                colId:'greater',
            },
            {
                field:'between',
                headerName:'33% <= Gap <= 67%',
                colId:'between',
            },
            {
                field:'smaller',
                headerName:'Gap < 33%',
                colId:'smaller',
            },
        ];
        
        colDefs = columns.map((column:{header:string,colCode:string})=>{
            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header']
            }
        })
        return [...customColdefs,...colDefs];
    }

    const colDefs2 = mapUIConfigToColdefs2(data['maxNumberOfLocationsWithGap']['uiconfig']);

    const convertToInt = (data:any)=>{
        return data.map((row:any)=>{
            const tempObj:any = {};
            Object.keys(row).forEach((key:string)=>{
                const value = parseFloat(row[key])
                if(!isNaN(value)){
                    tempObj[key] = value
                }
                else{
                    tempObj[key] = row[key];
                }
            })
            return {...tempObj}
        })
    }

    const sortData = (data:any,key1:string,key2:string,key3:string) => {
        data.sort((row1:any,row2:any)=>{
            return (row2[key1]+row2[key2]+row2[key3]) - (row1[key1]+row1[key2]+row1[key3])
        })
        return [...data];
    }

   
    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
       
        if(graphNo === 1){
            if(withOutContainer) {
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['location','overdue','due','others'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('OrderFulfillmentG1') as HTMLElement
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['location','overdue','due','others'],
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
                    chartType:'stackedColumn',
                    cellRange: {
                        columns: ['location','greater','between','smaller'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    }
                })
            }
            else{
                const container2 = document.getElementById('OrderFulfillmentG2') as HTMLElement
                chartRef2 = refGraph2.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                        columns: ['location','greater','between','smaller'],
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

      const chartThemeOverridesG1 = useMemo<any>(() => { 
        return {
            // palette:{
            //     fills:['#848484','#848484']
            // },
            ...GraphSeriesOverrides,
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
                    number:{
                        title:{
                            enabled:true,
                            text:"No of Orders",
                            position:"left"
                        }
                      }
                  },
                  
              },
          };
      }, []);

      const chartThemeOverridesG2 = useMemo<any>(() => { 
        return {
            // palette:{
            //     fills:['#848484','#848484']
            // },
            ...GraphSeriesOverrides,
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
                    number:{
                        title:{
                            enabled:true,
                            text:"No of SKUs",
                            position:"left"
                        }
                      }
                  },
                  
              },
          };
      }, []);

      const myCustomThemeG1:any = {
        palette: {
            fills: ['#ED1C24','#E3812D','#355FD3'],
            strokes: ['#ffffff', '#ffffff'],
          },
      }

      const myCustomThemeG2:any = {
        palette: {
            fills: ['#F02424','#E3812D','#418D18'],
            strokes: ['#ffffff', '#ffffff'],
          },
      }

      const graph1 = [
        'This graph highlights the top 10 locations with max number of over due orders. It also captures the status of due & other orders from pending orders file.',
        'Overdue orders - Due date crossed | Due Orders - Due dates of today or in the future | Other Orders - PSO Quantity'
      ]

      const graph2 = [
        'This Graph highlights the top 10 locations with max no of SKUs with Gap > 67% of requirement.',
        'Gap = Requirement - Stock - GIT - Rationed Qty',
        'Requirement = Norm Requirement + Spike Requirement + Relevant PSO & CNR Requirement'
      ]

     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={547}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Locations: Maximum Overdue Orders</SCChartHeader>
                                {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(1)}/>}
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                                <div style={{display:grid1DisplayStatus, height:'90%'}}>
                                {
                                    hideChart1 &&
                                    (
                                        <VFTable
                                            ref={refGraph1}
                                            columnDefs={colDefs1}
                                            rowData={sortData(convertToInt(data['maximumOverdueOrders']['data']),'overdue','due','others')}
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
                                                'myCustomTheme':myCustomThemeG1
                                            }}
                                            disableZoomScaling={true}
                                            defaultColDef={{
                                                floatingFilter:true,
                                                filter: "agMultiColumnFilter",
                                              }}
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
                                            rowData={sortData(convertToInt(data['maximumOverdueOrders']['data']),'overdue','due','others')}
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
                                                'myCustomTheme':myCustomThemeG1
                                            }}
                                            disableZoomScaling={true}
                                        />
                                        </div>
                                    )
                                }
                               
                                </div>
                                {!hideChart1 && <div id="OrderFulfillmentG1" style={{height:'460px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                        </div>
                    </Allotment.Pane>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={547}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Locations: Max SKUs With Gap &gt; 67% of Requirement</SCChartHeader>
                                {!hideChart2 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(2)}/>}
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                                <div style={{display:grid2DisplayStatus, height:'90%'}}>
                                {
                                    hideChart2 &&
                                    (
                                        <VFTable
                                            ref={refGraph2}
                                            columnDefs={colDefs2}
                                            rowData={sortData(convertToInt(data['maxSkuWithGap']['data']),'greater','between','smaller')}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(2,true)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverridesG2}
                                            chartThemes={['myCustomTheme']}
                                            customChartThemes={{
                                                'myCustomTheme':myCustomThemeG2
                                            }}
                                            disableZoomScaling={true}
                                            defaultColDef={{
                                                floatingFilter:true,
                                                filter: "agMultiColumnFilter",
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
                                            columnDefs={colDefs2}
                                            rowData={sortData(convertToInt(data['maxSkuWithGap']['data']),'greater','between','smaller')}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(2)}
                                            getChartToolbarItems={getChartToolbarItems}
                                            chartToolPanelsDef={
                                                {
                                                    panels:[]
                                                }
                                            }
                                            chartThemeOverrides={chartThemeOverridesG2}
                                            chartThemes={['myCustomTheme']}
                                            customChartThemes={{
                                                'myCustomTheme':myCustomThemeG2
                                            }}
                                            disableZoomScaling={true}
                                        />
                                        </div>
                                    )
                                }
                               
                                </div>
                                {!hideChart2 && <div id="OrderFulfillmentG2" style={{height:'460px'}}></div>}
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

export default OrderFulfillmentLocationWise;