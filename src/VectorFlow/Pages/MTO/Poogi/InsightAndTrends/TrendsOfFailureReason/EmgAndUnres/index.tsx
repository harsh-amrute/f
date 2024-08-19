import moment from 'moment'
import React, { useState } from 'react'
import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import { SCChartHeaderContainer, SCChartMainContainer } from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer/styles'
import { useGetDate } from '../../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/RMPMExpediting'
import { AgChartOptions } from 'ag-charts-community'
import { createSeriesData, getMyColumnDefinitions, IFdata, OFdata, TooltipRenderer, TooltipRendererIF } from '../Data'

const EmgAndUnres = () => {

    const graph1 = ['This graph highlights failure reasons that have remained in the top 10 contributing reasons in last 3 months and experienced an increase in occurrence by more than 15% compared to the average of the last 3 months.']

    const [hideChart1, toggleChart1] = useState(false);




    const generateHeader = () => {
        return (
            <>
                <SCChartMainContainer style={{ zoom: 1, width: '100%' }}>
                    <div
                        data-testid="otif-graph"
                        style={{
                            fontSize: "10.5px",
                            padding: '0 4px',
                            margin: "auto auto",
                            fontFamily: "Roboto",

                            textAlign: "center",
                        }}
                    >
                        <span style={{ fontWeight: 500 }}>Emergent & Unresolved Major-Minor Reasons Impacting OTIF &nbsp;</span>
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
    const labels = [
        { text: "Month", color: "#418D18", key: "month" },
        { text: "Annealing-Rolling", color: "#418D18", key: "Annealing-Rolling" },
        { text: "Planning", color: "#9D9797", key: "Planning" },
        { text: "Annealing", color: "#EBBF2C", key: "Annealing" },
        { text: "Annealing-Furnace", color: "#F04D4D", key: "Annealing-Furnace" },
    ];
    const colDef: any = getMyColumnDefinitions(labels);


    const { data: apiResponseData, /*isLoading, refetch*/ } = useGetDate();

    const date = apiResponseData?.data?.data;
    const options: AgChartOptions = {
        series: createSeriesData(),
        data: OFdata,
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
        <div style={{ height: "100%", paddingBottom: '20px', display: 'flex', justifyContent: 'left', marginRight: '6px' }}>


            <SplitGraphContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                data={OFdata}
                rowData={OFdata}
                graphTitle={``}
                tableTitle={``}
                options={options}
                colDef={colDef}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRenderer}
                graphType={13}
            />
        </div>
    )
}

export default EmgAndUnres