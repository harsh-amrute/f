import { useRef, useMemo, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider, SCDynamicContainer} from '../../../styles';

import {GraphSeriesOverrides} from '../../../../../../../../../helpers/BPRConstants'
import VFModalCard from "../../../../../../../../../components/VectorFLOW/commons/VFModalCard";
import VFInfoToolTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
interface MonitorGITChildTransporterWiseProps{
    data:any
}


const MonitorGITChildTransporterWiseCharts = ({data}:MonitorGITChildTransporterWiseProps) => {

    const refGraph1 = useRef<GridRef>();
    // const refGraph2 = useRef<GridRef>();

    const [hideChart1,toggleChart1] = useState<boolean>(false);
    // const [hideChart2,toggleChart2] = useState<boolean>(false);
    // const [grid2DisplayStatus,setGrid2DisplayStatus] = useState<string>('none');
    // let chartRef2:ChartRef | undefined; 

    const mapUIConfigToColdefs = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'name',
                colId:'name',
                headerName:'Transporter Name'
            },
            {
                field:'delay',
                colId:'delay',
                headerName:'Delay'
            },
            {
                field:'superdelay',
                colId:'superdelay',
                headerName:'Super Delay'
            }
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

    const colDefs1 = mapUIConfigToColdefs(data['maxTechBlackRedColumn']['uiconfig'])

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

    const sortData = (data:any) => {
        data.sort((row1:any,row2:any)=>{
            return (row2['superdelay']+row2['delay']) - (row1['superdelay']+row1['delay'])
        })
        console.log(data);
        return data;
    }

    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
       
        if(graphNo === 1){
            if(withOutContainer) {
                refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['name','superdelay','delay'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('TransporterWiseG1') as HTMLElement
                refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['name','superdelay','delay'],
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
        toggleChart1(true);
    }
    // if(graphNo === 2){
    //     chartRef2?.destroyChart()
    //     toggleChart2(true);
    //     setGrid2DisplayStatus('block')
    // }
    }

      const getChartToolbarItems:any = () => ['chartDownload'];

      const chartThemeOverridesG1 = useMemo<any>(() => { 
        return {
            ...GraphSeriesOverrides,
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
                            text:'Transporter Name',
                            position:'bottom',

                        }
                    },
                    number:{
                        title:{
                            enabled:true,
                            text:"Count of LRs",
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
        'The graph illustrates the top 10 transporters having the maximum no. of LRs with SKUs in On-Hand Black/Red (shortage of on-handinventory) experiencing high transport ageing (Transportation Time > Standard Lead Time)',
        'Care needs to be taken to reduce the transportation time of LRs corresponding to above transporters',
        'Super Delay : Transportation Lead Time >= 1.5 x Standard Lead Time',
        'Delay : Transportation Lead Time > Standard Lead Time'
      ]

    //   const graph2 = [
    //     'This box plot graph displays the statistical distribution of delay days in transport for various transporters. Each box represents the range of delayed LRs as on today'
    //   ]
    
    
    return(
        <>
        <SCDynamicContainer>
            <Allotment>
                <Allotment.Pane preferredSize={1000}>
                    <SCChartContainer height={430}>
                        <SCChartHeaderContainer>
                            <div style={{display:'flex',width:'100%',justifyContent:'center'}}><SCChartHeader style={{marginRight:10}}>Top 10 Transporters: Max LRs With On-Hand Black/Red SKUs Along With High Transport Ageing</SCChartHeader><VFInfoToolTip infoList={graph1}/></div>
                            <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>{!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" alt="" onClick={()=>handleChartClose(1)}/>}</div>
                        </SCChartHeaderContainer>
                        <SCHorizontalDivider/>
                        <VFModalCard openModal={hideChart1} closeModal={()=>toggleChart1(false)} headerIcon='' headerText="Top 10 Locations: Max On-Hand Black/Red SKUs Along With High Transport Ageing" headerBgColor="#000000" headerTextColor="#FFFFFF" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-white.svg"}>
                                <div style={{width:'1000px'}}>
                                <VFTable
                                            ref={refGraph1}
                                            columnDefs={colDefs1}
                                            rowData={sortData(convertToInt(data['maxTechBlackRedColumn']['data']))}
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
                                              }}                                            onGridReady={()=>generateChart(1,true)}
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
                                            height={480}
                                        />
                                        
                                </div>
                                
                        </VFModalCard>
                        <div style={{display:'none'}}>
                            <VFTable
                                ref={refGraph1}
                                columnDefs={colDefs1}
                                rowData={sortData(convertToInt(data['maxTechBlackRedColumn']['data']))}
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
                                  }}                                onGridReady={()=>generateChart(1)}
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
                                defaultColDef={{
                                    floatingFilter:true,
                                    filter: "agMultiColumnFilter",
                                }}
                                disableZoomScaling={true}
                            />
                        </div>
                        <div id="TransporterWiseG1" style={{height:'350px'}}></div>
                    </SCChartContainer>
                    {/* <div style={{marginLeft:'10px',marginRight:'10px'}}>
                        <VFInfoTip text={graph1}/>
                    </div> */}
                </Allotment.Pane>
                {/* <Allotment.Pane>
                    <SCChartContainer height={547}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Statistical Overview of Delay Days in Transport at Receiving Locations</SCChartHeader>
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <div style={{display:'none'}}>
                                <VFTable
                                    ref={refGraph2}
                                    columnDefs={coldefs1}
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
                                    chartThemeOverrides={chartThemeOverridesG1}
                                    chartThemes={['myCustomTheme']}
                                    customChartThemes={{
                                        'myCustomTheme':myCustomTheme
                                    }}
                                />
                            </div>
                            <div id="TransporterWiseGraph2"></div>
                    </SCChartContainer>
                    <div style={{marginLeft:'10px',marginRight:'10px'}}>
                        <VFInfoTip text={graph2}/>
                    </div>
                </Allotment.Pane> */}
            </Allotment>
        </SCDynamicContainer>
        </>
    )
    
}

export default MonitorGITChildTransporterWiseCharts;