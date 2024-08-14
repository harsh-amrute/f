import moment from 'moment'
import { useState } from 'react'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import { SCChartHeaderContainer, SCChartMainContainer } from '../../../../Common/SplitGraphContainer/styles'
import { useGetDate } from '../../../../../../Services/MTO/Production/InsightsAndTrends/RMPMExpediting'
import { createSeriesData, data, getMyColumnDefinitions, TooltipRenderer } from '../Data'
import { AgChartOptions } from 'ag-charts-community'
import BoxPlotContainer from '../../../../Common/BoxPlotContainer'

const DeptWiseGraph = () => {

    const graph1 = ['This Graph highlights the extent of delays experienced by OT Failed completed orders.']

    const [hideChart1, toggleChart1] = useState(false);


    const generateHeader = () => {
        return (
            <>
                <SCChartMainContainer style={{ zoom: 1, width: '100%' }}>

                    <SCChartHeaderContainer style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>

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
        { text: "1-2 days", color: "#F5B279", key: "1-2 days" },
        { text: "3-7 days", color: "#F09241", key: "3-7 days" },
        { text: "8-15 days", color: "#E36A00", key: "8-15 days" },
        { text: "16-30 days", color: "#AD5000", key: "16-30 days" },
    ];

    const colDef: any = getMyColumnDefinitions(labels);



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
                    fontSize: 10,
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


    const boxChartOptions: any = {
        chart: {
            type: 'boxPlot',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    customIcons: [],
                },
            },
        },
        grid: {
            show: false,

        },
        stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: ['#848484'],
            width: 1.5,
            dashArray: 0
        },
        xaxis: {
            crosshairs: {
                show: false
            },
            tooltip: {
                enabled: false,
            },

            labels: {
                rotateAlways: true,
                style: {
                    fontSize: '12px', // Font size of y-axis labels
                    fontFamily: 'Roboto', // Font family of y-axis labels
                    colors: '#717171',
                    fontWeight: 400
                },
            },
        },
        yaxis: {
            axisBorder: {
                show: true
            },
            title: {
                text: 'Elapsed Time (in Days)',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Roboto',
                    color: '#6d6d6d'
                },
            },
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: 'bold', // Font size of y-axis labels
                    fontFamily: 'Roboto', // Font family of y-axis labels
                    colors: '#717171'
                },
            },

        },
        plotOptions: {
            boxPlot: {
                colors: {
                    lower: '#D3D3D3',
                    upper: '#848484'
                }
            }
        }
    }
    const chartData: any = [
        { x: "P2-Dept 2", y: [2, 5, 8, 11, 14] },
        { x: "P3-Dept 3", y: [2, 3, 5, 6, 8] },
        { x: "P4-Dept 4", y: [1, 3, 4, 5, 9] },
        { x: "P5-Dept 5", y: [2, 4, 6, 8, 10] },
        { x: "P6-Dept 6", y: [3, 5, 7, 9, 11] },
        { x: "P9-Dept 9", y: [3, 6, 9, 12, 15] },
        { x: "P10-Dept 10", y: [4, 7, 10, 13, 16] }
    ];




    return (
        <div style={{ height: "100%", paddingBottom: '20px', display: 'flex', justifyContent: 'left', marginRight: '7px' }}>


            <BoxPlotContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                data={data}
                rowData={data}
                boxChartData={chartData}
                boxChartOptions={boxChartOptions}
                graphTitle={`Department-Wise Elapsed Time Distribution For Closed Orders`}
                tableTitle={`Department-Wise Elapsed Time Distribution For Closed Orders`}
                dateStr={`(${moment(date).format('D MMM YYYY')})`}
                options={options}
                colDef={colDef}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRenderer}
                graphType={11}
            />

        </div>
    )
}

export default DeptWiseGraph