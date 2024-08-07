import moment from 'moment'
import React, { useState } from 'react'
import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer'
import { InsightsAndTrendsString } from '../../../../../../../VectorFlow/Pages/MTO/Common/String'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import { SCChartHeaderContainer, SCChartMainContainer, SCChartSliderContainer } from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer/styles'
import { useGetDate } from '../../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/RMPMExpediting'
import { createSeriesData, data } from '../Data'
import { AgChartOptions } from 'ag-charts-community'

const OTFailedGraph = () => {

    const graph1 = ['sfsdfdsfff']

    const [hideChart1, toggleChart1] = useState(false);




    const generateHeader = () => {
        return (
            <>
                <SCChartMainContainer style={{ zoom: 1, width: '100%' }}>
                    <div
                        data-testid="otif-graph"
                        style={{
                            fontSize: "12px",
                            margin: "auto auto",
                            fontFamily: "Roboto",

                            textAlign: "center",
                        }}
                    >
                        <span style={{ fontWeight: 500 }}>Extend Of Delay For OT Failed Orders &nbsp;</span>
                        <span style={{ fontWeight: 350 }}>{`(${moment(date).format('D MMM YYYY')} - ${moment(date).add(90, 'days').format('D MMM YYYY')})`}</span>
                    </div>

                    <SCChartHeaderContainer>

                        <div style={{ marginLeft: 30, marginBottom: '-5px' }}>
                            <VFInfoToolTip infoList={graph1} />
                        </div>
                        <div onClick={() => { toggleChart1(!hideChart1) }} style={{ marginLeft: 10, marginBottom: '-5px', marginRight: '10px' }}>
                            <img src='/assets/img/VectorFLOW/BPR/minimize.svg' height={13} width={13} color={"#CCCCCC"} />
                        </div>
                    </SCChartHeaderContainer>
                </SCChartMainContainer>
            </>

        )
    }

    const [tableLoading, setTableLoading] = useState(false);
    const [chartLoading, setChartLoading] = useState(false);
    const numericData: any = []
    const rowData: any = []

    const colDef: any = []



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

    const { data: apiResponseData, /*isLoading, refetch*/ } = useGetDate();

    const date = apiResponseData?.data?.data;
    const options: AgChartOptions = {
        series: createSeriesData(),
        data: data,
        axes: [
            {
                type: "category",
                position: "bottom",
                label: {
                    fontSize: 7,
                    fontWeight: "bold",
                    color: "black",
                },
                gridLine: {
                    enabled: false,
                },
            },
            {
                title: {
                    text: "Count Of Orders",
                    fontFamily: "Roboto",
                    fontSize: 10,
                    fontWeight: 600,
                    fontStyle: 'normal',
                    spacing: 9
                },
                type: "number",
                line: { enabled: true },
                position: "left",
                label: {
                    fontSize: 8,
                    fontWeight: "bold",
                    color: "black",
                },
                gridLine: {
                    enabled: false,
                },
            },

        ],

        legend: {
            item: {
                label: {
                    fontSize: 10
                },
            },
        },

    }



    return (
        <div style={{ height: "100%", paddingBottom: '20px', display: 'flex', justifyContent: 'left', marginRight: '7px' }}>


            <SplitGraphContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                data={data}
                rowData={rowData}
                graphTitle={``}
                tableTitle={``}
                options={options}
                colDef={colDef}
                header={generateHeader}
                hideChart={hideChart1}
                chartHeight={70}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRenderer}
                graphType={1}
            />

        </div>
    )
}

export default OTFailedGraph