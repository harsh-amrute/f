import {useRef, useMemo} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../../styles.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider,SCDynamicContainer} from '../../../styles';
import VFInfoTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoTip";


interface ExpediteParentDispatchesProps{
    data:any
}


const ExpediteDispatches = ({data}:ExpediteParentDispatchesProps) => {

    const refGraph1 = useRef<GridRef>();
    const refGraph2 = useRef<GridRef>();
    // const refGraph3 = useRef<GridRef>();
    console.debug("dasfadsfasd")

    const coldefs:ColDef[] = [
        {
            field:'ln',
            headerName:'Location Name',
            colId:'ln',
        },
        {
            field:'trqa',
            headerName:'Count of SKUs',
            colId:'trqa',
        },
    ]

    const generateChart = () => {
        // const container1 = document.getElementById('LocationWiseGraph1') as HTMLElement
        refGraph1.current?.api.createRangeChart({
          chartType:'column',
          cellRange: {
            columns: ['ln','trqa'],
            rowStartIndex:0,
            rowEndIndex:9
          },
        //   chartContainer:container1
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
                            text:'Parent Location Name',
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
        'This graph highlights the top 10 parent locations with max SKUs in Eco Black/Red which have rationed qty available for receiving locations',
        'To improve availability, expedite dispatches from these parent locations.'
      ]

      const graph2 = [
        'This box plot graph displays the statistical distribution of delay days in transport for various locations. Each box represents the range of delay days as on today'
      ]

     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane preferredSize={1000}>
                        <SCChartContainer height={330}>
                            <SCChartHeaderContainer>
                                <SCChartHeader>Top 10 Parent Location: Max Eco Black/Red SKUs With Available Rationed Qty For Receiving Locations</SCChartHeader>
                            </SCChartHeaderContainer>
                            <SCHorizontalDivider/>
                            <div style={{height:'260px'}}>
                                <VFTable
                                    ref={refGraph1}
                                    columnDefs={coldefs}
                                    rowData={data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocations'] ? data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocations'] : []}
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
                                    disableZoomScaling={true}
                                />
                            </div>
                            {/* <div id="LocationWiseGraph1"></div> */}
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
                                        // rowData={data['delayDaysStatisticalBox']}
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
            </SCDynamicContainer>
        </>
    )
    
}

export default ExpediteDispatches;