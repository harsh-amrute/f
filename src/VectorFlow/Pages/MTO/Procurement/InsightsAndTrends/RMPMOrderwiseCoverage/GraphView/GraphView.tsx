import React, { useRef, useState } from "react";
import "allotment/dist/style.css";
import {
    SCChartContainer, SCHorizontalDivider
} from '../styles';
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions, AgCharts } from "ag-charts-community";
import procData from "../ProcurementData";
import { Order } from "../../../../../../types/MTO";
import { InsightsAndTrendsString } from "../../../../Common/String";
import { ProcurementSeriesDataFill, ProcurementSeriesDataYKey, ProcurementSeriesDataYName } from "../../../../Common/Enum";
import VFInfoToolTip from "../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import VFModalCard from "../../../../../../../components/VectorFLOW/commons/VFModalCard";
import VFTable from "../../../../../../../components/VectorFLOW/commons/VFTable";


interface GridProps {
    agGridProps: any
    ShortageColumns: any
    ShortageDatas: any
}

const GraphView = ({ agGridProps, ShortageColumns, ShortageDatas }: GridProps) => {

    // const [date, setDate] = useState("19 April 2024 - 18 July 2024")
    const [date] = useState("01 July 2024 - 28 Sept 2024")

    // const [rawData, setRawData] = useState(procData);
    const [rawData] = useState(procData);

    function TooltipRenderer({ datum, xKey }: any) {
        return `
    <div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
        ${datum[xKey]}
    </div>
    <div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">
    
    <div>
        <div style="display: flex;">
            <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F4BD8E">
            </div>
            <div style="display:flex ; width: 100%; justify-content: space-between">
                <div>${InsightsAndTrendsString.ordersWithFullkitOHS}
                </div>
                <div> ${datum['soh']}
                </div>
            </div>
        </div>
        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F09241"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>${InsightsAndTrendsString.ordersWithFullkitOPO}</div><div>${datum["sit"]}</div></div></div>
        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>${InsightsAndTrendsString.ordersWithFullkitSIT}</div><div>${datum["po"]}</div></div></div>
        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>${InsightsAndTrendsString.ordersWithRMPM}</div><div> ${datum["or"]}</div></div></div>
    </div>`
    }

    const calculateDaysDifference = (releaseDateStr: string) => {
        const releaseDate = new Date(releaseDateStr);
        const baseDate = new Date("2024-06-01");
        const diffInTime = releaseDate.getTime() - baseDate.getTime();
        const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
        return diffInDays;
    };

    function createSeriesData(val: number) {
        const seriesData: any = [];
        for (let i = 0; i < val; i++) {
            seriesData.push(
                {
                    "type": "bar",
                    "xKey": "days_range",
                    "yKey": ProcurementSeriesDataYKey[i],
                    "yName": ProcurementSeriesDataYName[i],
                    "stacked": true,
                    "strokeOpacity": 0,
                    "strokeWidth": 2,
                    "fill": ProcurementSeriesDataFill[i],
                    "tooltip": {
                        renderer: TooltipRenderer
                    }
                }
            )
        }

        return seriesData;
    }

    function groupByWeek(data: Order[], daysOfGap: number, totalDataDays: number) {
        type WeekRange = {
            days_range: string;
            soh: number;
            sit: number;
            po: number;
            or: number;
        };
        const weekRanges: WeekRange[] = [];
        let startDay = 1;

        while (startDay < totalDataDays) {
            const endDay = startDay + daysOfGap - 1;
            weekRanges.push({
                days_range: `${(startDay === 1) ? 0 : startDay}-${(endDay > 90) ? 90 : endDay} days`,
                soh: 0,
                sit: 0,
                po: 0,
                or: 0,
            });
            startDay += daysOfGap;
        }

        data.forEach(order => {
            const releaseDate = new Date(order.rd);
            const daysDifference = calculateDaysDifference(releaseDate.toString());
            const weekIndex = Math.floor(daysDifference / daysOfGap);

            if (weekIndex >= 0 && weekIndex < weekRanges.length) {
                weekRanges[weekIndex].soh += order.soh;
                weekRanges[weekIndex].sit += order.sit;
                weekRanges[weekIndex].po += order.po;
                weekRanges[weekIndex].or += order.or;
            }
        });

        return weekRanges;
    }

    const numberOfSeriesData = 4;

    const updatedData = groupByWeek(rawData, 7, 90);
    const seriesData = createSeriesData(numberOfSeriesData);

    const options: AgChartOptions = ({


        data: updatedData,

        series: seriesData,

        axes: [
            {
                type: "category",
                position: 'bottom',
                title: { text: "Timeline For Upcoming Order Releases", fontSize: 10, fontWeight: "bold" },
                label: {

                    fontSize: 8,
                    fontWeight: 'bold',
                    color: 'black'
                },
                gridLine: {
                    enabled: false
                }
            },
            {
                title: { text: "Count of Orders", fontSize: 10, fontWeight: "bold", spacing: 3 },
                type: "number",
                line: { enabled: true },
                position: 'left',
                label: {
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: 'black'
                },
                gridLine: {
                    enabled: false
                }
            }
        ],

        legend: {
            item: {
                label: {
                    fontSize: 10
                }
            }
        }



    });

    const chartRef = useRef<AgChartsReact>(null);
    const [hideChart1, toggleChart1] = useState(false);
    const [gridLoading, setGridLoading] = useState(false);

    return (


        <>
            <SCChartContainer height={"450px"} style={{ zoom: 1.3, border: "1px solid #CCCCCC" }}>
                <div style={{ height: '85%', width: '100%' }}>
                    <div className="title" style={{ backgroundColor: 'white', height: '40px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                        <div style={{ fontSize: '12px', margin: '0 auto', fontWeight: 500, textAlign: 'center' }}>
                            {`${InsightsAndTrendsString.rmpmOrderwiseCoverage}  (${date})`}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginLeft: 30, marginBottom: '-5px' }}>
                                <VFInfoToolTip infoList={['The graph highlights the Full kit position of Raw material and Packing material of unreleased orders.']} />
                            </div>
                            <div onClick={() => { toggleChart1(!hideChart1) }} style={{ marginLeft: 10, marginBottom: '-5px', marginRight: '10px' }}>
                                <img src='/assets/img/VectorFLOW/BPR/minimize.svg' height={13} width={13} color={"#CCCCCC"} />
                            </div>
                        </div>
                    </div>
                    <SCHorizontalDivider />
                    <div style={{ display: 'flex', justifyContent: "right" }}>

                        <div style={{ paddingRight: '10px' }} onClick={() => {

                            (chartRef && chartRef.current && chartRef.current.chart) && AgCharts.download(chartRef.current.chart);
                        }}> <img height={12} width={12} src="/assets/img/VectorFLOW/BPR/download.svg" /></div>
                    </div>
                    <VFModalCard openModal={hideChart1} closeModal={() => toggleChart1(false)} headerIcon='' headerText="Top 10 Locations: Max On-Hand Black/Red SKUs Along With High Transport Ageing" headerBgColor="" headerTextColor="#00000" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                        <div className="ag-theme-planning" style={{ width: '1000px' }}>
                            <VFTable
                                ref={chartRef}
                                columnDefs={ShortageColumns}
                                // rowData={sortData(convertToInt(data['maxTechBlackRedColumn']['data']))}
                                rowData={ShortageDatas}
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
                                }} onGridReady={() => { setGridLoading(false) }}
                                // getChartToolbarItems={getChartToolbarItems}
                                chartToolPanelsDef={
                                    {
                                        panels: []
                                    }
                                }
                                // chartThemeOverrides={chartThemeOverridesG1}
                                // chartThemes={['myCustomTheme']}
                                // customChartThemes={{
                                //     'myCustomTheme':myCustomTheme
                                // }}
                                disableZoomScaling={true}
                                defaultColDef={{
                                    floatingFilter: true,
                                    filter: "agMultiColumnFilter",
                                }}
                                height={'480px'}
                            />
                        </div>
                    </VFModalCard>
                    <AgChartsReact ref={chartRef} options={options} />

                </div>

            </SCChartContainer>


        </>

    )
};

export default GraphView;
