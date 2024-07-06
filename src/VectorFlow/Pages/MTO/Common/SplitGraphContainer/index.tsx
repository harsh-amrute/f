import { AgChartOptions, AgCharts } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import { Dispatch, SetStateAction, useRef } from 'react'
import { SCChartContainer, SCChartMainContainer, SCHorizontalDivider, ChartWrapper } from './styles'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable'
import { GridRef } from '../../../../../VectorFlow/types/MDM'

interface SplitGrpahContainerProps {
    colDef: any,
    options: AgChartOptions,
    data: any,
    rowData: any,
    header: () => JSX.Element,
    graphTitle: string,
    tableTitle: string,
    tableLoading?: boolean,
    chartLoading?: boolean,
    setTableLoading: Dispatch<SetStateAction<boolean>>,
    setChartLoading: Dispatch<SetStateAction<boolean>>,
    hideChart: boolean,
    toggleChart: Dispatch<SetStateAction<boolean>>,
    TooltipRenderer: (param: any) => string,
    graphType: number,
    date?: string
}



const SplitGraphContainer = ({
    colDef,
    options,
    data,
    rowData,
    header,
    graphTitle,
    tableTitle,
    tableLoading,
    chartLoading,
    setTableLoading,
    setChartLoading,
    hideChart,
    toggleChart,
    TooltipRenderer,
    graphType
}: SplitGrpahContainerProps) => {
    const chartRef = useRef<AgChartsReact>(null);
    const refGraph1 = useRef<GridRef>(null);



    const myCustomTheme = () => {
        switch (graphType) {
            case 1:
                return {
                    palette: {
                        fills: ['black', 'red', 'green', 'yellow', 'grey'],
                        strokes: ['black', 'red', 'green', 'yellow', 'grey'],
                    },
                }

            default:
                return {
                    palette: {
                        fills: ['black', 'red', 'green', 'yellow', 'grey'],
                        strokes: ['black', 'red', 'green', 'yellow', 'grey'],
                    },
                }
        }


    }


    const generateChart = (graphNo: number) => {

        switch (graphNo) {
            case 1:
                refGraph1.current?.api.createRangeChart({
                    chartType: 'line',
                    cellRange: {
                        columns: ['dt', 'b', 'r', 'y', 'g', 'w'],
                    },

                    chartThemeOverrides: {
                        line: {
                            series: {
                                tooltip: {
                                    renderer: TooltipRenderer
                                },
                                strokeWidth: 3

                            },
                            legend: {
                                item: {
                                    marker: {
                                        shape: 'square'
                                    }
                                }
                            }


                        }
                    }

                })
                break;
            case 2:
                refGraph1.current?.api.createRangeChart({
                    chartType: 'column',
                    cellRange: {
                        columns: ['rmNam', 'ordCnt'],
                    },

                    chartThemeOverrides: {
                        line: {
                            series: {
                                tooltip: {
                                    renderer: TooltipRenderer
                                },
                                strokeWidth: 3

                            },
                            legend: {
                                item: {
                                    marker: {
                                        shape: 'square'
                                    }
                                }
                            }

                        }
                    }
                })
                break;
            default:
                <></>
        }


    }

    return (
        <div style={{ width: "100%" }}>


            <SCChartContainer style={{ height: "68vh", border: '1px solid #CCCCCC', margin: '2px' }}>
                <SCChartMainContainer style={{ zoom: 1 }}>
                    {header()}
                </SCChartMainContainer>

                <SCHorizontalDivider />
                <ChartWrapper>
                    <div style={{ height: '100%', width: '100%' }}>
                        <div className="title" style={{ backgroundColor: 'white', height: '40px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                            <div style={{ fontSize: '10px', fontWeight: 500, textAlign: 'center', margin: '0 auto' }}>
                                {graphTitle}
                            </div>
                            <div style={{ marginLeft: '0 10px -5px', marginBottom: '-5px' }} onClick={() => {

                                (chartRef && chartRef.current && chartRef.current.chart) && AgCharts.download(chartRef.current.chart);

                            }}>
                                <img src='/assets/img/mto/RMPMBufferTrend/download.svg' style={{ color: "#CCCCCC", paddingBottom: '5px' }} height={15} width={15} color={"#CCCCCC"} />
                            </div>

                        </div>
                    </div>
                </ChartWrapper>

                <VFModalCard
                    openModal={hideChart}
                    closeModal={() => toggleChart(false)}
                    headerIcon=''
                    headerText={tableTitle}
                    headerBgColor=""
                    headerTextColor="#00000"
                    paddingLeftAndRight={27}
                    closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                    <div className="ag-theme-planning" style={{ width: '1000px' }}>
                        <VFTable
                            ref={refGraph1}
                            columnDefs={colDef}
                            rowData={rowData}
                            enableCharts={true}
                            enableRangeSelection={true}
                            rowSelection="multiple"
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                    { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                                    { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                                    { statusPanel: 'agAggregationComponent', align: 'left' },
                                ],
                            }} onGridReady={() => { setTableLoading(false); generateChart(graphType) }}
                            chartToolPanelsDef={
                                {
                                    panels: []
                                }
                            }
                            disableZoomScaling={true}
                            defaultColDef={{
                                floatingFilter: true,
                                filter: "agMultiColumnFilter",
                            }}
                            chartThemes={['myCustomTheme']}
                            customChartThemes={{
                                'myCustomTheme': myCustomTheme()
                            }}
                            height={'480px'}
                        />
                    </div>
                </VFModalCard>
                <div style={{ height: "50vh" }}>
                    <AgChartsReact suppressDragLeaveHidesColumns={true} ref={chartRef} options={{ ...options, data: data }} onChartReady={() => { setChartLoading(false) }} />
                </div>
            </SCChartContainer>
        </div>

    )
}

export default SplitGraphContainer