import moment from 'moment'
import React, { useState } from 'react'
import SplitGraphContainer from '../../../../Common/SplitGraphContainer'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import { SCChartHeaderContainer, SCChartMainContainer } from '../../../../Common/SplitGraphContainer/styles'
import { useGetDate } from '../../../../../../Services/MTO/Production/InsightsAndTrends/RMPMExpediting'
import { AgChartOptions } from 'ag-charts-community'
import BoxPlotContainer from '../../../../Common/BoxPlotContainer'
import Select from 'react-select'

const WeekWiseGraph = () => {

    const graph1 = ['This graph highlights the extent of Shortage in In-Full failed orders.']

    const [hideChart1, toggleChart1] = useState(false);

    const selectOptionsDep = [
        { value: 'Dep1', label: 'Dep1' },
        { value: 'Dep2', label: 'Dep2' },
        { value: 'Dep3', label: 'Dep3' }
    ]

    const selectOptionsPlnt = [
        { value: 'P1', label: 'P1' },
        { value: 'P2', label: 'P2' },
        { value: 'P3', label: 'P3' }
    ]




    const generateHeader = () => {
        return (
            <>
                <SCChartMainContainer style={{ zoom: 1, width: '100%' }}>
                    <div
                        data-testid="otif-graph"
                        style={{
                            fontSize: "12px",
                            margin: "auto auto auto 0",
                            fontFamily: "Roboto",
                            textAlign: "center",
                            display: 'flex',
                            gap: '10px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                            <p style={{ fontWeight: 'bold', paddingRight: '5px' }}>Plant </p>
                            <Select options={selectOptionsPlnt} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ fontWeight: 'bold', paddingRight: '5px' }}>Department: </p>
                            <Select options={selectOptionsDep} />
                        </div>


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



    const { data: apiResponseData, /*isLoading, refetch*/ } = useGetDate();

    const date = apiResponseData?.data?.data;

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
        { x: "Feb 2024", y: [2, 5, 8, 11, 14] },
        { x: "Mar 2024", y: [2, 3, 5, 6, 8] },
        { x: "May 2024", y: [1, 3, 4, 5, 9] },
        { x: "Jun 2024", y: [2, 4, 6, 8, 10] },
        { x: "July 2024-WK 1", y: [3, 5, 7, 9, 11] },
        { x: "July 2024-WK 2", y: [3, 5, 7, 9, 11] },
        { x: "July 2024-WK 3", y: [3, 5, 7, 9, 11] },
        { x: "July 2024-WK 4", y: [3, 5, 7, 9, 11] },
        { x: "Aug 2024-WK 1", y: [3, 6, 9, 12, 15] },

    ];


    const GraphTableData = [
        { 'week': 'Jul2024-Wk1', 'LW': 1, 'Q1': 3, 'Q2': 4, 'Q3': 7, 'HW': 9 },
        { 'week': 'Jul2024-Wk2', 'LW': 2, 'Q1': 4, 'Q2': 5, 'Q3': 8, 'HW': 10 },
        { 'week': 'Jul2024-Wk3', 'LW': 3, 'Q1': 5, 'Q2': 6, 'Q3': 9, 'HW': 11 },
        { 'week': 'Jul2024-Wk4', 'LW': 4, 'Q1': 6, 'Q2': 7, 'Q3': 10, 'HW': 12 },
        { 'week': 'Aug2024-Wk1', 'LW': 5, 'Q1': 7, 'Q2': 8, 'Q3': 11, 'HW': 13 },
        { 'week': 'Aug2024-Wk2', 'LW': 6, 'Q1': 8, 'Q2': 9, 'Q3': 12, 'HW': 14 },
        { 'week': 'Aug2024-Wk3', 'LW': 7, 'Q1': 9, 'Q2': 10, 'Q3': 13, 'HW': 15 },
    ]


    const columnDefinitions = [
        {
            headerName: 'Week',
            field: 'week',
            resizable: true,
        },
        {
            headerName: 'LW',
            field: 'LW',
            resizable: true,
        },
        {
            headerName: 'Q1',
            field: 'Q1',
            resizable: true,
        },
        {
            headerName: 'Q2',
            field: 'Q2',
            resizable: true,
        },
        {
            headerName: 'Q3',
            field: 'Q3',
            resizable: true,
        },
        {
            headerName: 'HW',
            field: 'HW',
            resizable: true,
        },
    ];

    return (
        <div style={{ height: "100%", paddingBottom: '20px', display: 'flex', justifyContent: 'left', marginLeft: '10px' }}>


            <BoxPlotContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                boxChartData={chartData}
                boxChartOptions={boxChartOptions}
                rowData={GraphTableData}
                graphTitle={`Department-Wise Elapsed Time Distribution For Closed Orders`}
                tableTitle={`Department-Wise Elapsed Time Distribution For Closed Orders`}
                dateStr={`(${moment(date).subtract(90, 'days').format('D MMM YYYY')} - ${moment(date).format('D MMM YYYY')})`}
                colDef={columnDefinitions}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                graphType={10}
            />
        </div>
    )
}

export default WeekWiseGraph