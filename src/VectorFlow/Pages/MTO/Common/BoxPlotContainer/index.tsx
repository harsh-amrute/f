import { AgChartOptions, AgCharts } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import { Dispatch, SetStateAction, useMemo, useRef } from 'react'
import { SCChartContainer, SCChartMainContainer, SCHorizontalDivider, ChartWrapper } from './styles'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable'
import { GridRef } from '../../../../../VectorFlow/types/MDM'
import Chart from 'react-apexcharts';

interface BoxPlotContainerProps {
    colDef: any,
    options?: AgChartOptions,
    data?: any,
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
    TooltipRenderer?: (param: any) => string,
    graphType: number,
    date?: string,
    boxChartData?: any,
    boxChartOptions?: any
    dateStr?: string
}

const BoxPlotContainer = ({
    colDef,
    data,
    rowData,
    header,
    graphTitle,
    tableTitle,
    setTableLoading,
    hideChart,
    dateStr,
    toggleChart,
    boxChartData,
    boxChartOptions
}: BoxPlotContainerProps) => {
    const chartRef = useRef<AgChartsReact>(null);
    const refGraph1 = useRef<GridRef>(null);

    const chartData = boxChartData;


    const seriesData = useMemo(() => {

        return chartData.map((item: any) => ({
            x: item.name,
            y: [parseFloat(item.mind), parseFloat(item.Q1), parseFloat(item.median), parseFloat(item.Q3), parseFloat(item.maxd)],

        }))
    }, [data]);

    const series = [
        {

            name: 'boxplot',
            data: chartData
        }
    ];






    return (
        <div style={{ width: "100%" }}>


            <SCChartContainer style={{ border: '1px solid #CCCCCC', margin: '2px', height: '100%', display: 'flex', flexDirection: 'column', paddingBottom: '20px' }} height={'100%'}>
                <SCChartMainContainer style={{ zoom: 1 }}>
                    {header()}
                </SCChartMainContainer>

                <SCHorizontalDivider />
                <ChartWrapper>
                    <div style={{ height: '100%', width: '100%' }}>
                        <div className="title" style={{ backgroundColor: 'white', height: '40px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                            <div style={{ fontSize: '10px', fontWeight: 500, textAlign: 'center', margin: '0 auto', display: 'flex' }}>
                                <p>
                                    {graphTitle}
                                </p>
                                <p style={{ paddingLeft: '4px', fontWeight: 350 }}>{dateStr}</p>
                            </div>
                            <div style={{ marginLeft: '0 10px -5px', marginBottom: '-5px' }} onClick={() => {

                                (chartRef && chartRef.current && chartRef.current.chart) && AgCharts.download(chartRef.current.chart, { fileName: graphTitle });

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
                            }} onGridReady={() => { setTableLoading(false); }}
                            chartToolPanelsDef={
                                {
                                    panels: []
                                }
                            }
                            disableZoomScaling={true}
                            defaultColDef={{
                                floatingFilter: true,
                                filter: "agMultiColumnFilter",
                                flex: 1,
                            }}
                            chartThemes={['myCustomTheme']}
                            height={'480px'}
                        />
                    </div>
                </VFModalCard>
                <div style={{ flex: 1, width: '100%' }}>
                    <Chart
                        options={boxChartOptions}
                        // series={series} // Make sure you have defined the series data
                        type="boxPlot"
                        height={350}
                        series={series}
                    />
                </div>
            </SCChartContainer>
        </div>

    )
}

export default BoxPlotContainer