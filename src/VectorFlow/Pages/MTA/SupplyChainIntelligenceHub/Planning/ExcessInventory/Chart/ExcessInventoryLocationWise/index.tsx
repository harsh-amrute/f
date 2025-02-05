import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../types/MDM";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../../styles';
import VFModalCard from "../../../../../../../../components/VectorFLOW/commons/VFModalCard";

import {GraphSeriesOverrides} from '../../../../../../../../helpers/BPRConstants'
import VFInfoToolTip from "../../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import {convertToInt, getProductAndLocationHeirarchiesFromEnv, downloadBase64Image} from '../../../../../../../../helpers/utils';
interface ExcessInventoryProps{
    data:any
}



const ExcessInventoryLocationWise = ({data}:ExcessInventoryProps) => {
    
    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
  
    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);

    const [isHovered, setIsHovered] = useState(false);
    const imgSrc = isHovered
    ? '/assets/img/downlod-icon-hover.svg'
    : '/assets/img/downlod-icon.svg';

    const [chartId1, setChartId1] = useState<any>("");
    const [chartId2, setChartId2] = useState<any>("");


    const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'WHDescription',
                colId:'WHDescription',
                headerName:'Location Name'
            },
            {
                field:'SKUCounts',
                colId:'SKUCounts',
                headerName:'Count Of SKUs'
            }
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

    const colDefs1 = mapUIConfigToColdefs1(data['topTenLocationsWithExcessInventorySkuCount']['uiconfig']);

    const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'WHDescription',
                colId:'WHDescription',
                headerName:'Location Name'
            },
            {
                field:'SumOfAmount',
                colId:'SumOfAmount',
                headerName:'Value in (Lakhs)'
            }
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

    const colDefs2 = mapUIConfigToColdefs2(data['topTenLocationsWithExcessInventoryValue']['uiconfig']);

    const sortData = (data:any,key:string) => {
        data.sort((row1:any,row2:any)=>{
            return (row2[key]) - (row1[key])
        })
        return [...data];
    }
    
   
    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
       
        if(graphNo === 1){
            if(withOutContainer) {
                refGraph1.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                    columns: ['WHDescription','SKUCounts'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('ExcessInventoryLocationG1') as HTMLElement
                const chart1 = refGraph1.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                    columns: ['WHDescription','SKUCounts'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    },
                  chartContainer: container1 
                })  
                setChartId1(chart1?.chartId);  
            }
            
        }
      
        if(graphNo === 2){
            if(withOutContainer) {
                refGraph2.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                        columns: ['WHDescription','SumOfAmount'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    }
                })
            }
            else{
                const container2 = document.getElementById('ExcessInventoryLocationG2') as HTMLElement
                const chart2 = refGraph2.current?.api.createRangeChart({
                    chartType:'column',
                    cellRange: {
                        columns: ['WHDescription','SumOfAmount'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    },
                    chartContainer:container2
                })
                setChartId2(chart2?.chartId);
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


      const getChartToolbarItems:any = () => [''];

      const chartThemeOverridesG1 = useMemo<any>(() => { 
        return {
            // palette:{
            //     fills:['#848484','#848484']
            // },
            ...GraphSeriesOverrides,
              common: {
                  legend:{
                    position:'bottom'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Location Name',
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
                            text:"Count Of SKUs",
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
                                content: `${datum.WHDescription.value}: ${datum.SKUCounts}`,
                            }
                        },
                    }
                }
              }
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
                    position:'bottom'
                  },
                  axes:{
                    category:{
                        title:{
                            enabled:true,
                            text:'Location Name',
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
                            text:"Value In Lakhs",
                            position:"left",
                            fontSize:10,
                            fontFamily:'Roboto'
                        }
                      }
                  },
                  
              },
              // need_work
            //   bar:{
            //     series:{
            //         tooltip:{
            //             enabled:true,
            //             renderer:(params:any)=>{
            //                 const datum = params.datum
            //                 console.log(datum)
            //                 return {
            //                     title: `${params.yName}`,
            //                     content: `${datum.WHDescription.value}: ${datum.SKUCounts}`,
            //                 }
            //             },
            //         }
            //     }
            //   }
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
        'This graph highlights the top 10 locations with the highest excess inventory, assessed in terms of monetary value.'
      ]

      const scaleDown = (data:any,key:string,divisor:number)=>{
        return data.map((row:any)=>{
            const temp = {...row};
            temp[key] = parseInt(row[key],10)/divisor;
            return temp;
        })
      }
     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={"95%"} style={{marginRight:'10px'}}>
                            <SCChartHeaderContainer>
                                <div style={{display:'flex',width:'100%',justifyContent:'center' , overflow:"hidden"}}><SCChartHeader style={{marginRight:10}}>Top 10 Locations With Excess Inventory: Count Of SKUs</SCChartHeader></div>
                                <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                                    <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph1}/></div>
                                    {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" width={15} height={15} alt="" onClick={()=>handleChartClose(1)}/>}
                                </div>
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <div style={{display:'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight:'20px' , overflow:"hidden"}}>
                            <img 
                                src={imgSrc}  
                                height={13} 
                                width={13} 
                                onClick={() => {
                                    downloadBase64Image(refGraph1.current?.api.getChartImageDataURL({chartId: chartId1, fileFormat: 'image/jpg'}), "Top 10 Parent Location");
                                }}
                                style={{cursor:'pointer'}} 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} ></img>                    </div>

                            <VFModalCard openModal={hideChart1} closeModal={()=>toggleChart1(false)} headerIcon='' headerText="Top 10 Locations With Excess Inventory: Count Of SKUs" headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                                <div className="ag-theme-planning" style={{width:'1000px'}}>
                                    <VFTable
                                        ref={refGraph1}
                                        columnDefs={colDefs1}
                                        rowData={sortData(convertToInt(data['topTenLocationsWithExcessInventorySkuCount']['data'],['SKUCounts']),'SKUCounts')}
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
                                            'myCustomTheme':myCustomTheme
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
                                    rowData={sortData(convertToInt(data['topTenLocationsWithExcessInventorySkuCount']['data'],['SKUCounts']),'SKUCounts')}
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
                                        'myCustomTheme':myCustomTheme
                                    }}
                                    disableZoomScaling={true}
                                />
                            </div>
                            <div id="ExcessInventoryLocationG1" style={{height:'80%'}}></div>
                        </SCChartContainer>
                        {/* <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                        </div> */}
                    </Allotment.Pane>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={"95%"} style={{marginLeft:'18px'}}>
                            <SCChartHeaderContainer>
                                <div style={{display:'flex',width:'100%',justifyContent:'center' , overflow:"hidden"}}><SCChartHeader style={{marginRight:10}}>Top 10 Locations with Excess Inventory: In Value (Rupee Lakhs)</SCChartHeader></div>
                                <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                                    <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph2}/></div>
                                    {!hideChart2 && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" width={15} height={15} alt="" onClick={()=>handleChartClose(2)}/>}
                                </div>
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>

                            <div style={{display:'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight:'20px' , overflow:"hidden"}}>
                            <img 
                                src={imgSrc}  
                                height={13} 
                                width={13} 
                                onClick={() => {
                                    downloadBase64Image(refGraph2.current?.api.getChartImageDataURL({chartId: chartId2, fileFormat: 'image/jpg'}), "Top 10 Receiving Location");
                                }}
                                style={{cursor:'pointer'}} 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} ></img>                    </div>

                            <VFModalCard openModal={hideChart2} closeModal={()=>toggleChart2(false)} headerIcon='' headerText="Top 10 Locations with Excess Inventory: In Value (Rupee Lakhs)" headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                                <div className="ag-theme-planning" style={{width:'1000px'}}>
                                    <VFTable
                                        ref={refGraph2}
                                        columnDefs={colDefs2}
                                        rowData={scaleDown(sortData(convertToInt(data['topTenLocationsWithExcessInventoryValue']['data'],['SumOfAmount']),'SumOfAmount'),'SumOfAmount',100000)}
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
                                            'myCustomTheme':myCustomTheme
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
                                        rowData={scaleDown(sortData(convertToInt(data['topTenLocationsWithExcessInventoryValue']['data'],['SumOfAmount']),'SumOfAmount'),'SumOfAmount',100000)}
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
                                          }}                                        onGridReady={()=>generateChart(2)}
                                        getChartToolbarItems={getChartToolbarItems}
                                        chartToolPanelsDef={
                                            {
                                                panels:[]
                                            }
                                        }
                                        chartThemeOverrides={chartThemeOverridesG2}
                                        chartThemes={['myCustomTheme']}
                                        customChartThemes={{
                                            'myCustomTheme':myCustomTheme
                                        }}
                                        disableZoomScaling={true}
                                        height={'480px'}
                                    />
                                </div>
                                <div id="ExcessInventoryLocationG2" style={{height:'80%'}}></div>
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

export default ExcessInventoryLocationWise;