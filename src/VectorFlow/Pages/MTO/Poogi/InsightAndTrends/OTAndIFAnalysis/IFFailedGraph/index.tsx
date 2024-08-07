import moment from 'moment'
import React, { useState } from 'react'
import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer'
import { InsightsAndTrendsString } from '../../../../../../../VectorFlow/Pages/MTO/Common/String'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import { SCChartHeaderContainer, SCChartMainContainer, SCChartSliderContainer } from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer/styles'
import { useGetDate } from '../../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/RMPMExpediting'
import { AgChartOptions } from 'ag-charts-community'
import { createSeriesData, createSeriesDataIF, data, getMyColumnDefinitions, IFdata, TooltipRendererIF } from '../Data'

const IFFailedGraph = () => {

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
                        <span style={{ fontWeight: 500 }}>Extend Of Shortages In IF Failed Orders &nbsp;</span>
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

    const labels = [
        { text: "0-20%", color: "#F5B279", key: "0-20%" },
        { text: "20%-40%", color: "#F09241", key: "20%-40%" },
        { text: "40%-60%", color: "#E36A00", key: "40%-60%" },
        { text: "60%-80%", color: "#AD5000", key: "60%-80%" },
        { text: "80%-100%", color: "#6A3000", key: "80%-100%" }
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

    console.log("Ifdatadd", IFdata)




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
                chartHeight={70}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRendererIF}
                graphType={10}
            />
        </div>
    )
}

export default IFFailedGraph