import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import { ColDef, ChartRef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../../styles';
import VFInfoTip from "../../../../../../../../components/VectorFLOW/commons/VFInfoTip";

interface OrderFulfillmentProps{
    data:any
}


const OrderFulfillmentProductWise = ({data}:OrderFulfillmentProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
    
    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);
 
    const [grid1DisplayStatus,setGrid1DisplayStatus] = useState<string>('none');
    const [grid2DisplayStatus,setGrid2DisplayStatus] = useState<string>('none');
   
    let chartRef1:ChartRef |undefined;
    let chartRef2:ChartRef | undefined;
  
    
    const colDefs1:ColDef[] = [
        {
            field:'product',
            headerName:'Product Name',
            colId:'product',
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
  
    const colDefs2:ColDef[] = [
        {
            field:'product',
            headerName:'Product Name',
            colId:'product',
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

    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
       
        if(graphNo === 1){
            if(withOutContainer) {
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                        columns: ['product','overdue','due','others'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('OrderFulfillmentProductG1') as HTMLElement
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                        columns: ['product','overdue','due','others'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    },
                    chartContainer:container1
                })
            }
            
        }
      
        if(graphNo === 2){
            if(withOutContainer) {
                chartRef2 = refGraph2.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                        columns: ['product','greater','between','smaller'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    }
                })
            }
            else{
                const container2 = document.getElementById('OrderFulfillmentProductG2') as HTMLElement
                chartRef2 = refGraph2.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                        columns: ['product','greater','between','smaller'],
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
              common: {
                  legend:{
                    position:'top'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Product Name',
                            position:'bottom',

                        }
                    },
                    number:{
                        title:{
                            enabled:true,
                            text:"Pending Quantity",
                            position:"left"
                        }
                      }
                  },
                  
              },
          };
      }, []);

      const chartThemeOverridesG2 = useMemo<any>(() => { 
        return {
              common: {
                  legend:{
                    position:'top'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Product Name',
                            position:'bottom',

                        }
                    },
                    number:{
                        title:{
                            enabled:true,
                            text:"No. Of Locations",
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
        'This graph highlights the top 10 products with maximum number of over due quantities and distribution of due and other quantities from pending orders file.',
        'Overdue qty indicate those with past due dates, due represents qty with due dates of today in the future, while others include qty without due dates.'
      ]

      const graph2 = [
        'This Graph highlights the top 10 products with max no of locations where Gap in the product > 67% of requirement.',
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
                                <SCChartHeader>Top 10 Products: Categorization of Pending Quantity</SCChartHeader>
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
                                            rowData={data['categorizationOfPendingQuantity']}
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
                                            rowData={data['categorizationOfPendingQuantity']}
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
                                {!hideChart1 && <div id="OrderFulfillmentProductG1" style={{height:'460px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                        </div>
                    </Allotment.Pane>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={547}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Products: Max No Of Locations with Gap &gt; 67% of Requirement</SCChartHeader>
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
                                            rowData={data['maxNumberOfLocationsWithGap']}
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
                                            rowData={data['maxNumberOfLocationsWithGap']}
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
                                {!hideChart2 && <div id="OrderFulfillmentProductG2" style={{height:'460px'}}></div>}
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

export default OrderFulfillmentProductWise;