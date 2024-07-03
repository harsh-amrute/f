import { AgCharts } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import { useRef } from 'react'
import { SCChartContainer, SCChartMainContainer, SCHorizontalDivider, ChartWrapper } from './styles'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable'
import { GridRef } from '../../../../../VectorFlow/types/MDM'





const SplitGraphContainer = ({ colDef, options, data, rowData, header, graphTitle, tableTitle, tableLoading, chartLoading, setTableLoading, setChartLoading, hideChart, toggleChart, TooltipRenderer }: any) => {
    const chartRef = useRef<AgChartsReact>(null);
    const refGraph1 = useRef<GridRef>(null);

    const myCustomTheme: any = {
        palette: {
            fills: ['black', 'red', 'green', 'yellow', 'grey'],
            strokes: ['black', 'red', 'green', 'yellow', 'grey'],
        },
    }


    const generateChart = (graphNo: number, withOutContainer?: boolean) => {

        if (graphNo === 1) {
            if (withOutContainer) {
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
            }
            else {
                const container1 = document.getElementById('LocationWiseG1') as HTMLElement
                refGraph1.current?.api.createRangeChart({
                    chartType: 'stackedColumn',
                    cellRange: {
                        columns: ['name', 'superdelay', 'delay'],
                        rowStartIndex: 0,
                        rowEndIndex: 9
                    },
                    chartContainer: container1
                })
            }

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
                                <img src='/assets/img/VectorFLOW/BPR/download.svg' style={{ color: "#CCCCCC", paddingBottom: '5px' }} height={15} width={15} color={"#CCCCCC"} />
                            </div>

                        </div>
                    </div>
                </ChartWrapper>

                <VFModalCard openModal={hideChart} closeModal={() => toggleChart(false)} headerIcon='' headerText={tableTitle} headerBgColor="" headerTextColor="#00000" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
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
                            }} onGridReady={() => { setTableLoading(false); generateChart(1, true) }}
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
                                'myCustomTheme': myCustomTheme
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