import {useRef, useMemo, useState} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import { ChartRef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../../../styles';
import VFInfoTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoTip";
import {GraphSeriesOverrides} from '../../../../../../../../../helpers/BPRConstants'


interface CreateAvailabilityAtParentProps{
    data:any
}


const CreateAvailabilityAtParent = ({data}:CreateAvailabilityAtParentProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
    const [hideChart1,toggleChart1] = useState<boolean>(false);
    const [hideChart2,toggleChart2] = useState<boolean>(false);
    const [grid1DisplayStatus,setGrid1DisplayStatus] = useState<string>('none');
    const [grid2DisplayStatus,setGrid2DisplayStatus] = useState<string>('none');

    const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'WHDescription',
                colId:'WHDescription',
                headerName:'Parent Location Name'
            },
            {
                field:'Counts',
                colId:'Counts',
                headerName:'Count of SKU Locations'
            },
            {
                field:'black',
                colId:'black',
                headerName:'Black'
            },
            {
                field:'red',
                colId:'red',
                headerName:'Red'
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

    const colDefs1 = mapUIConfigToColdefs1(data['maxEcoBlackRedWithNilRationedStockForRecievingLocations']['uiconfig']);

    const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];


        const customColdefs = [
            {
                field:'WHDescription',
                colId:'WHDescription',
                headerName:'Parent Location Name'
            },
            {
                field:'SKUCounts',
                colId:'SKUCounts',
                headerName:'Count of SKU Locations'
            },
            {
                field:'black',
                colId:'black',
                headerName:'Black'
            },
            {
                field:'red',
                colId:'red',
                headerName:'Red'
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

    const colDefs2 = mapUIConfigToColdefs2(data['maxContinousEcoBlackRedWithNilRationedStockAvailableForRecievingLocations']['uiconfig']);

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

    const sortData = (data:any,key:string) => {
        data.sort((row1:any,row2:any)=>{
            return (row2[key]) - (row1[key])
        })
        return [...data];
    }



    let chartRef1:ChartRef |undefined;
    let chartRef2:ChartRef | undefined;

    const generateChart = (graphNo:number,withOutContainer?:boolean) => {
        console.log(graphNo)
       
        if(graphNo === 1){
            if(withOutContainer) {
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['WHDescription','black','red'],
                    rowStartIndex:0,
                    rowEndIndex:9
                    }
                })
            }
            else{
                const container1 = document.getElementById('CreateAvailabilityAtParentG1') as HTMLElement
                chartRef1 = refGraph1.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                    columns: ['WHDescription','black','red'],
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
                        columns: ['WHDescription','black','red'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    }
                })
            }
            else{
                const container2 = document.getElementById('CreateAvailabilityAtParentG2') as HTMLElement
                chartRef2 = refGraph2.current?.api.createRangeChart({
                    chartType:'stackedColumn',
                    cellRange: {
                        columns: ['WHDescription','black','red'],
                        rowStartIndex:0,
                        rowEndIndex:9
                    },
                    chartContainer:container2
                })
            }
            
        }
      }

      const getChartToolbarItems:any = () => ['chartDownload'];

      const chartThemeOverrides = useMemo<any>(() => { 
        return {
            ...GraphSeriesOverrides,
            palette:{
                fills:['#000000','#DA3535']
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

                        },
                        label:{
                            formatter:(params:any)=>{
                                if(params.value.length > 15) return params.value.toString().slice(0,15) + '...';
                                return params.value;
                            },
                            fontSize:8,
                            fontFamily:'Roboto'
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
            fills: ['#000000', '#DA3535'],
            strokes: ['#ffffff', '#ffffff'],
          },
      }

      const graph1 = [
        'This graph highlights the top 10 parent locations with max SKUs in Pipeline black/red with insufficient/nil rationed stock available for receiving locations',
        'To improve availability, expedite production/sourcing at these parent locations.'
      ]

      const graph2 = [
        'This graph highlights the top 10 parent locations with max number of SKUs in continuous Pipeline Black/Red > RLT and have nil rationed stock available for receiving locations.',
        'To improve availability, expedite production/sourcing at these parent locations.'
      ]

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

      const splitDataIntoRandomPercentage = (data:any,key:string) => {
        return data.map((row:any)=>{
            const redPercentage = Math.random() * 100;
            const blackPercentage = 100 - redPercentage;

            const red = (parseFloat(row[key]) * redPercentage) / 100;
            const black = (parseFloat(row[key]) * blackPercentage) / 100;
            return {...row,red:Math.round(red),black:Math.round(black)};
            
        })
      }


     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane>
                        <SCChartContainer height={410}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Parent Locations : Max Pipeline Black/Red SKUs With Nil Rationed Stock for Receiving Locations</SCChartHeader>
                                {!hideChart1 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(1)}/>}
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <div style={{height:'380px',display:grid1DisplayStatus}}>
                                {
                                    hideChart1 &&
                                    (
                                        <VFTable
                                            ref={refGraph1}
                                            columnDefs={colDefs1}
                                            rowData={splitDataIntoRandomPercentage(sortData(convertToInt(data['maxEcoBlackRedWithNilRationedStockForRecievingLocations']['data']),'Counts'),'Counts')}
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
                                            rowData={splitDataIntoRandomPercentage(sortData(convertToInt(data['maxEcoBlackRedWithNilRationedStockForRecievingLocations']['data']),'Counts'),'Counts')}
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
                            {!hideChart1 && <div id="CreateAvailabilityAtParentG1" style={{height:'340px'}}></div>}
                        </SCChartContainer>
                        <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                        </div>
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <SCChartContainer height={410}>
                                <SCChartHeaderContainer>
                                    <SCChartHeader>Top 10 Parent Location: Max Continuous Pipeline Black/Red SKUs With Nil Rationed Stock Available For Receiving Location</SCChartHeader>
                                    {!hideChart2 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" onClick={()=>handleChartClose(2)}/>}
                                </SCChartHeaderContainer>
                                <SCHorizontalDivider/>
                                <div style={{height:'380px',display:grid2DisplayStatus}}>
                                {
                                    hideChart2 &&
                                    (
                                        <VFTable
                                            ref={refGraph2}
                                            columnDefs={colDefs2}
                                            rowData={splitDataIntoRandomPercentage(sortData(convertToInt(data['maxContinousEcoBlackRedWithNilRationedStockAvailableForRecievingLocations']['data']),'SKUCounts'),'SKUCounts')}
                                            enableCharts={true}
                                            enableRangeSelection={true}
                                            onGridReady={()=>generateChart(2,true)}
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
                                            rowData={splitDataIntoRandomPercentage(sortData(convertToInt(data['maxContinousEcoBlackRedWithNilRationedStockAvailableForRecievingLocations']['data']),'SKUCounts'),'SKUCounts')}
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
                                {!hideChart2 && <div id="CreateAvailabilityAtParentG2" style={{height:'340px'}}></div>}
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

export default CreateAvailabilityAtParent;