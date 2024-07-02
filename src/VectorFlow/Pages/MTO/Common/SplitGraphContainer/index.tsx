import { AgCharts } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import { useRef } from 'react'
import { SCChartContainer, SCChartMainContainer, SCHorizontalDivider, ChartWrapper } from './styles'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable'





const SplitGraphContainer = ({ colDef, options, data, rowData, header, graphTitle, tableTitle, tableLoading, chartLoading, setTableLoading, setChartLoading, hideChart, toggleChart }: any) => {
    const chartRef = useRef<AgChartsReact>(null);



    return (
        <div style={{ width: "100%" }}>


            <SCChartContainer style={{ height: "68vh", border: '1px solid #CCCCCC' }}>
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
                            ref={chartRef}
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
                            }} onGridReady={() => { setTableLoading(false) }}
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