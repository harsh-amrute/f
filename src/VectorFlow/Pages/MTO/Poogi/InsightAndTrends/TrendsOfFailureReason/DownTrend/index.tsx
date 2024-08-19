import moment from 'moment'
import React, { useState } from 'react'
import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import { SCChartHeaderContainer, SCChartMainContainer } from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer/styles'
import { useGetDate } from '../../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/RMPMExpediting'
import { AgChartOptions } from 'ag-charts-community'
import { createSeriesDataIF, getMyColumnDefinitions, IFdata, TooltipRendererIF } from '../Data'

const DownTrend = () => {
    const infoTipData = ['This graph highlights the failure reasons that have experienced decrease in occurrence by more than 15% from the average of last 3 months.']
    const [hideChart1, toggleChart1] = useState(false);
    const generateHeader = () => {
        return (
            <>
                <SCChartMainContainer style={{ zoom: 1, width: '100%' }}>
                    <div
                        data-testid="otif-graph"
                        style={{
                            fontSize: "10.5px",
                            margin: "auto auto",
                            padding: '0 4px',
                            fontFamily: "Roboto",

                            textAlign: "center",
                        }}
                    >
                        <span style={{ fontWeight: 500 }}>Major-Minor Reasons Impacting OTIF But Showing A Downward Trend &nbsp;</span>
                        <span style={{ fontWeight: 350 }}>{`(${moment(date).format('D MMM YYYY')} - ${moment(date).add(90, 'days').format('D MMM YYYY')})`}</span>
                    </div>
                    <SCChartHeaderContainer>

                        <div style={{ marginLeft: 30, marginBottom: '-5px' }}>
                            <VFInfoToolTip infoList={infoTipData} />
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
    const labels = [
        { text: "Month", color: "#418D18", key: "month" },
        { text: "Sales", color: "#418D18", key: "Sales" },
        { text: "Line Overloaded", color: "#9D9797", key: "Line Overloaded" },
        { text: "Quality", color: "#EBBF2C", key: "Quality" },
        { text: "Packing", color: "#F04D4D", key: "Packing" },
        { text: "Coating Liquid Not Available", color: "#3876FF", key: "Coating Liquid Not Available" },
    ];

    const colDef: any = getMyColumnDefinitions(labels);
    const { data: apiResponseData, /*isLoading, refetch*/ } = useGetDate();
    const date = apiResponseData?.data?.data;
    const options: AgChartOptions = {
        series: createSeriesDataIF(),
        data: IFdata,
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
                    text: "Number Of Orders Impacted",
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
                marker: {
                    shape: 'square',
                },
                label: {
                    fontSize: 10
                },
            },
        },

    }

    return (
        <div style={{ height: "100%", paddingBottom: '20px', display: 'flex', justifyContent: 'left', marginLeft: '10px' }}>
            <SplitGraphContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                data={IFdata}
                rowData={IFdata}
                graphTitle={``}
                tableTitle={``}
                options={options}
                colDef={colDef}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRendererIF}
                graphType={12}
                downloadFileName={'Major-Minor Reasons Impacting OTIF But Showing A Downward Trend'}
            />
        </div>
    )
}

export default DownTrend