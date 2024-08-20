import moment from 'moment'
import { useState } from 'react'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import { SCChartHeaderContainer, SCChartMainContainer } from '../../../../Common/SplitGraphContainer/styles'
import { useGetDate } from '../../../../../../Services/MTO/Production/InsightsAndTrends/RMPMExpediting'
import BoxPlotContainer from '../../../../Common/BoxPlotContainer'


const ChartView = ({chartData, chartTableData}: any) => {

    const [tableLoading, setTableLoading] = useState(false);
    const [chartLoading, setChartLoading] = useState(false);
    const { data: apiResponseData, /*isLoading, refetch*/ } = useGetDate();
    const date = apiResponseData?.data?.data;
    const graph1 = ['This box plot graph displays statistical distribution of lead time of closed orders. Each box represents the various statistical measures around lead time of closed orders.']

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
                        <span style={{ fontWeight: 500 }}>Statistical Overview Of Lead Time Of Closed Orders &nbsp;</span>
                        <span style={{ fontWeight: 350 }}>{`(${moment(date).add(-90, 'days').format('D MMM YYYY')} - ${moment(date).format('D MMM YYYY')})`}</span>
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




    const boxChartOptions: any =
    {
        theme: {
            monochrome: {
                enabled: true,
                color: '#FF0000',
                shadeIntensity: 0
            },
            palette: 'palette4',
        },
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
        legend: {
            show: false

        }
        ,
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
        // colors: ['red'],

        plotOptions: {

            boxPlot: {
                colors: {
                    lower: '#de7e2c',
                    upper: '#AD5000',

                }
            }
        }
        ,
        tooltip: {
            followCursor: false,
            enabledOnSeries: [1]
        }
    }



    // const chartData: any = [
    //     { x: "Feb 2024", y: [2, 5, 8, 11, 14] },
    //     { x: "Mar 2024", y: [2, 3, 5, 6, 8] },
    //     { x: "May 2024", y: [1, 3, 4, 5, 9] },
    //     { x: "Jun 2024", y: [2, 4, 6, 8, 10] },
    //     { x: "July 2024-WK 1", y: [3, 5, 7, 9, 11] },
    //     { x: "July 2024-WK 2", y: [3, 5, 7, 9, 11] },
    //     { x: "July 2024-WK 3", y: [3, 5, 7, 9, 11] },
    //     { x: "July 2024-WK 4", y: [3, 5, 7, 9, 11] },
    //     { x: "Aug 2024-WK 1", y: [3, 6, 9, 12, 15] },

    // ];


    // const chartTableData = [
    //     { 'week': 'Jul2024-Wk1', 'LW': 1, 'Q1': 3, 'Q2': 4, 'Q3': 7, 'HW': 9 },
    //     { 'week': 'Jul2024-Wk2', 'LW': 2, 'Q1': 4, 'Q2': 5, 'Q3': 8, 'HW': 10 },
    //     { 'week': 'Jul2024-Wk3', 'LW': 3, 'Q1': 5, 'Q2': 6, 'Q3': 9, 'HW': 11 },
    //     { 'week': 'Jul2024-Wk4', 'LW': 4, 'Q1': 6, 'Q2': 7, 'Q3': 10, 'HW': 12 },
    //     { 'week': 'Aug2024-Wk1', 'LW': 5, 'Q1': 7, 'Q2': 8, 'Q3': 11, 'HW': 13 },
    //     { 'week': 'Aug2024-Wk2', 'LW': 6, 'Q1': 8, 'Q2': 9, 'Q3': 12, 'HW': 14 },
    //     { 'week': 'Aug2024-Wk3', 'LW': 7, 'Q1': 9, 'Q2': 10, 'Q3': 13, 'HW': 15 },
    // ]




    const columnDefinitions = [
        {
            headerName: 'Week',
            field: 'week',
            resizable: true,
        },
        {
            headerName: 'LW',
            field: 'lw',
            resizable: true,
        },
        {
            headerName: 'Q1',
            field: 'q1',
            resizable: true,
        },
        {
            headerName: 'Q2',
            field: 'q2',
            resizable: true,
        },
        {
            headerName: 'Q3',
            field: 'q3',
            resizable: true,
        },
        {
            headerName: 'HW',
            field: 'uw',
            resizable: true,
        },
    ];

    const boxSeries = [{
        name: 'elapsed time',
        type: 'boxPlot',
        data: chartData
    }]



    return (
        <div style={{ height: "85%", paddingBottom: '20px', marginLeft: '20px', marginTop: '10px', display: 'flex' }}>


            <BoxPlotContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                rowData={chartTableData}
                boxChartData={chartData}
                boxChartOptions={boxChartOptions}
                graphTitle={''}
                tableTitle={`Statistical Overview Of Lead Time Of Closed Orders`}
                colDef={columnDefinitions}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                graphType={11}
                boxChartSeries={boxSeries}
            />

        </div>
    )
}

export default ChartView