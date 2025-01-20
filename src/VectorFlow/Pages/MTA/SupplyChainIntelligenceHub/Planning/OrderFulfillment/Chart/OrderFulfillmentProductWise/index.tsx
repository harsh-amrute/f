import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../../styles';
import VFModalCard from "../../../../../../../../components/VectorFLOW/commons/VFModalCard";

import {GraphSeriesOverrides} from '../../../../../../../../helpers/BPRConstants'
import VFInfoToolTip from "../../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import {convertToInt, getProductAndLocationHeirarchiesFromEnv} from '../../../../../../../../helpers/utils';

interface OrderFulfillmentProps{
    data:any
}


const OrderFulfillmentProductWise = ({data}:OrderFulfillmentProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
    
    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);
 
    const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs:ColDef[] = [
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
        
        colDefs = columns.map((column:{header:string,colCode:string})=>{
            const customColdef = getProductAndLocationHeirarchiesFromEnv(column,{}); 
            if(customColdef) return customColdef;
            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header']
            }
        })
        return [...customColdefs,...colDefs];
    }

    const colDefs1 = mapUIConfigToColdefs1(data['categorizationOfPendingQuantity']['uiconfig']);

    const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs:ColDef[] = [
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
        
        colDefs = columns.map((column:{header:string,colCode:string})=>{
            const customColdef = getProductAndLocationHeirarchiesFromEnv(column,{}); 
            if(customColdef) return customColdef;
            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header']
            }
        })
        return [...customColdefs,...colDefs];
    }

    const colDefs2 = mapUIConfigToColdefs2(data['maxNumberOfLocationsWithGap']['uiconfig']);

    const sortData = (data:any,key1:string,key2:string,key3:string) => {
        data.sort((row1:any,row2:any)=>{
            return (row2[key1]+row2[key2]+row2[key3]) - (row1[key1]+row1[key2]+row1[key3])
        })
        return [...data];
    }
      

    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
       
        if(graphNo === 1){
            if(withOutContainer) {
                refGraph1.current?.api.createRangeChart({
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
                refGraph1.current?.api.createRangeChart({
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
                refGraph2.current?.api.createRangeChart({
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
                refGraph2.current?.api.createRangeChart({
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
            // chartRef1?.destroyChart()
            toggleChart1(true);
            // setGrid1DisplayStatus('block')
        }
        if(graphNo === 2){
            // chartRef2?.destroyChart()
            toggleChart2(true);
            // setGrid2DisplayStatus('block')
        }
      }


      const getChartToolbarItems:any = () => ['chartDownload'];

      const chartThemeOverridesG1 = useMemo<any>(() => { 
        return {
            ...GraphSeriesOverrides,
              common: {
                  legend:{
                    position:'bottom'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Product Name',
                            position:'bottom',
                            fontSize:10,
                            fontFamily:'Roboto'

                        },
                        label:{
                            formatter:(params:any)=>{
                                if(params.value.value.length > 10) return params.value.toString().slice(0,10) + '...';
                                return params.value;
                            },
                            fontSize:8,
                            fontFamily:'Roboto'
                        }
                    },
                    number:{
                        title:{
                            enabled:true,
                            text:"Pending Quantity",
                            position:"left",
                            fontSize:10,
                            fontFamily:'Roboto'
                        }
                      }
                  },
                  
              },
            //   bar:{
            //     series:{
            //         tooltip:{
            //             enabled:true,
            //             renderer:(params:any)=>{
            //                 const datum = params.datum
            //                 return {
            //                     title: `${params.yName}`,
            //                     content: `${datum[params.xKey].value}: ${datum[params.yKey]}`,
            //                 }
            //             },
            //         }
            //     }
            //   }
          };
      }, []);

      const chartThemeOverridesG2 = useMemo<any>(() => { 
        return {
                ...GraphSeriesOverrides,
              common: {
                  legend:{
                    position:'bottom'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Product Name',
                            position:'bottom',
                            fontSize:10,
                            fontFamily:'Roboto'

                        },
                        label:{
                            formatter:(params:any)=>{
                                if(params.value.value.length > 10) return params.value.toString().slice(0,10) + '...';
                                return params.value;
                            },
                            fontSize:8,
                            fontFamily:'Roboto'
                        }
                    },
                    number:{
                        title:{
                            enabled:true,
                            text:"No. Of Locations",
                            position:"left",
                            fontSize:10,
                            fontFamily:'Roboto'
                        }
                      }
                  },
                  
              },
              bar:{
                series:{
                    tooltip:{
                        enabled:true,
                        renderer:(params:any)=>{
                            const datum = params.datum
                            return {
                                title: `${params.yName}`,
                                content: `${datum[params.xKey].value}: ${datum[params.yKey]}`,
                            }
                        },
                    }
                }
              }
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
                        <SCChartContainer height={'95%'} style={{marginRight:'10px'}}>
                            <SCChartHeaderContainer>
                                <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}><SCChartHeader style={{marginRight:10}}>Top 10 Products: Categorization Of Pending Quantity</SCChartHeader></div>
                                <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                                    <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph1}/></div>
                                    {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" width={15} height={15} alt="" onClick={()=>handleChartClose(1)}/>}
                                </div>
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <VFModalCard openModal={hideChart1} closeModal={()=>toggleChart1(false)} headerIcon='' headerText="Top 10 Products: Categorization of Pending Quantity" headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                                <div className="ag-theme-planning" style={{width:'1000px'}}>
                                    <VFTable
                                        ref={refGraph1}
                                        columnDefs={colDefs1}
                                        rowData={sortData(convertToInt(data['categorizationOfPendingQuantity']['data'],['overdue','due','others']),'overdue','due','others')}
                                        enableCharts={true}
                                        enableRangeSelection={true} 
                                        rowSelection="multiple"
                                        statusBar = {{
                                            statusPanels: [
                                              { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                                              { statusPanel: 'agTotalRowCountComponent', align:'left' },
                                              { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                                              { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                                              { statusPanel: 'agAggregationComponent', align:'left' },
                                            ],
                                          }}                                        onGridReady={()=>generateChart(1,true)}
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
                                        height={'480px'}
                                    />
                                </div>
                            </VFModalCard>                                   
                            <div style={{display:'none'}}>
                                <VFTable
                                    ref={refGraph1}
                                    columnDefs={colDefs1}
                                    rowData={sortData(convertToInt(data['categorizationOfPendingQuantity']['data'],['overdue','due','others']),'overdue','due','others')}
                                    enableCharts={true}
                                    enableRangeSelection={true} 
                                    rowSelection="multiple"
                                    statusBar = {{
                                        statusPanels: [
                                          { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                                          { statusPanel: 'agTotalRowCountComponent', align:'left' },
                                          { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                                          { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                                          { statusPanel: 'agAggregationComponent', align:'left' },
                                        ],
                                      }}                                    onGridReady={()=>generateChart(1)}
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
                            <div id="OrderFulfillmentProductG1" style={{height:'80%'}}></div>
                        </SCChartContainer>
                        {/* <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                        </div> */}
                    </Allotment.Pane>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={"95%"} style={{marginLeft:'18px'}}>
                            <SCChartHeaderContainer>
                                <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center',marginRight:7}}><SCChartHeader style={{marginRight:3}}>Top 10 Products: Max No Of Locations With Gap &gt; 67% of Requirement</SCChartHeader></div>
                                <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                                    <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph2}/></div>
                                    {!hideChart2 && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" width={15} height={15} alt="" onClick={()=>handleChartClose(2)}/>}
                                </div>
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <VFModalCard openModal={hideChart2} closeModal={()=>toggleChart2(false)} headerIcon='' headerText="Top 10 Products: Max No Of Locations with Gap &gt; 67% of Requirement" headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                                <div className="ag-theme-planning" style={{width:'1000px'}}>
                                    <VFTable
                                        ref={refGraph2}
                                        columnDefs={colDefs2}
                                        rowData={sortData(convertToInt(data['maxNumberOfLocationsWithGap']['data'],['greater','between','smaller']),'greater','between','smaller')}
                                        enableCharts={true}
                                        enableRangeSelection={true} 
                                        rowSelection="multiple"
                                        statusBar = {{
                                            statusPanels: [
                                              { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                                              { statusPanel: 'agTotalRowCountComponent', align:'left' },
                                              { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                                              { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                                              { statusPanel: 'agAggregationComponent', align:'left' },
                                            ],
                                          }}                                        onGridReady={()=>generateChart(2,true)}
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
                                        height={'480px'}
                                    />
                                </div>
                            </VFModalCard> 
                            <div style={{display:'none'}}>
                                <VFTable
                                    ref={refGraph2}
                                    columnDefs={colDefs2}
                                    rowData={sortData(convertToInt(data['maxNumberOfLocationsWithGap']['data'],['greater','between','smaller']),'greater','between','smaller')}
                                    enableCharts={true}
                                    enableRangeSelection={true} 
                                    rowSelection="multiple"
                                    statusBar = {{
                                        statusPanels: [
                                          { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                                          { statusPanel: 'agTotalRowCountComponent', align:'left' },
                                          { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                                          { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                                          { statusPanel: 'agAggregationComponent', align:'left' },
                                        ],
                                      }}                                    onGridReady={()=>generateChart(2)}
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
                            <div id="OrderFulfillmentProductG2" style={{height:'80%'}}></div>
                        </SCChartContainer>
                        {/* <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph2}/>
                        </div> */}
                    </Allotment.Pane>
                  
                </Allotment>
            </SCDynamicContainer>
        </>
    )
    
}

export default OrderFulfillmentProductWise;