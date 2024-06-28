import { AgCartesianSeriesOptions, AgChartOptions, AgCharts, AgTopologyChartOptions } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import React, { useState, useRef } from 'react'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import VFCapsule from '../../../../../../../components/VectorFLOW/commons/VFCapsule'
import VFRangeSlider from '../../../../../../../components/VectorFLOW/commons/VFRangeSlider'
import GraphView from '../../RMPMOrderwiseCoverage/GraphView/GraphView'
import { CapsuleWrapper, ChartWrapper } from '../../RMPMOrderwiseCoverage/GraphView/styles'
import { SCChartContainer, SCChartHeaderContainer, SCChartMainContainer, SCChartSliderContainer, SCHorizontalDivider } from '../../styles'
import dummyData from './BufferTrendData'
import VFModalCard from '../../../../../../../components/VectorFLOW/commons/VFModalCard'
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable'





const BTMTA = ({ isMTO }: { isMTO: boolean }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [horizonDays, setHorizondays] = useState(90);

    const [data, setData] = useState(dummyData)
    const [numericData, setNumericData] = useState<BufferTrendData[]>(filterDataByDaysGap(data, horizonDays / 5, horizonDays, false));

    type BufferTrendData = {
        dt: string;
        b: number;
        r: number;
        g: number;
        y: number;
        w: number;
    };

    function filterDataByDaysGap(buffData: BufferTrendData[], numberOfDaysGap: number, horizonDays: number, isPer: boolean): BufferTrendData[] {
        const filteredData: (BufferTrendData[]) = [];
        const data = (isPer) ? convertToPercentage(buffData) : buffData;
        let currentDate = new Date(data[0].dt.split('-').reverse().join('-')); // Convert dd-mm-yyyy to yyyy-mm-dd

        filteredData.push(data[0]);

        for (let i = 1; i < ((horizonDays < data.length) ? horizonDays : data.length); i++) {
            const nextDate = new Date(data[i].dt.split('-').reverse().join('-'));

            const diffInDays = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diffInDays >= numberOfDaysGap) {
                filteredData.push(data[i]);
                currentDate = nextDate;
            }
        }

        return filteredData;
    }


    function convertToPercentage(data: BufferTrendData[]): BufferTrendData[] {
        return data.map(entry => {
            const total = entry.b + entry.r + entry.g + entry.y + entry.w;


            if (total === 0) {
                return entry
            }

            return {
                dt: entry.dt,
                b: ((entry.b / total) * 100),
                r: ((entry.r / total) * 100),
                g: ((entry.g / total) * 100),
                y: ((entry.y / total) * 100),
                w: ((entry.w / total) * 100),
            };
        });

    }


    const [actBtn, setActBtn] = useState({
        label: "Absolute Value",
        value: 'Absolute Value'
    })




    const options: AgChartOptions = {
        axes: [
            {

                type: "category",
                position: 'bottom',
                label: {
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: 'black'
                }
            },
            {
                title: { text: "Percentage of Total Procurement Orders", fontSize: 10, spacing: 3 },
                type: "number",
                line: { enabled: true },
                position: 'left',
                label: {
                    formatter: function (params) {
                        return (params.value) + ((actBtn.label === 'Percentage') ? '%' : '');
                    },
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: 'black'
                }
            }
        ],
        series: [
            {
                type: "line",
                xKey: "dt",
                yKey: "b",
                yName: "Black",
                stroke: "black",
                strokeWidth: 3,
                marker: {
                    fill: "Black",
                    stroke: "Black"
                }
            },
            {
                type: "line",
                xKey: "dt",
                xName: "Date",
                yKey: "r",
                strokeWidth: 3,
                yName: "Red",
                stroke: "Red",
                marker: {
                    fill: "Red",
                    stroke: "Red"
                }
            },
            {
                type: "line",
                xKey: "dt",
                strokeWidth: 3,
                xName: "Date",
                yKey: "y",
                yName: "Yellow",
                stroke: "Yellow",
                marker: {
                    fill: "#FFBF00",
                    stroke: "#FFBF00"
                }
            },
            {
                type: "line",
                xKey: "dt",
                strokeWidth: 3,
                xName: "Date",
                yKey: "g",
                yName: "Green",
                stroke: "Green",
                marker: {
                    fill: "Green",
                    stroke: "Green"
                },

            }
            ,
            {
                type: "line",
                xKey: "dt",
                xName: "Date",
                yKey: "w",
                yName: "White",
                stroke: "Grey",
                strokeWidth: 3,
                marker: {
                    fill: "grey",
                    stroke: "grey",

                }
            }

        ],
        legend: {
            position: 'bottom',
            item: {
                label: {
                    fontSize: 14,

                },
                marker: {
                    size: 8,
                    shape: 'square'
                },
                line: {
                    strokeWidth: 12
                }
            }

        }
    };

    const graph1 = [
        'This graph shows the trend of procurement orders buffer penetration in Black, Red, Green, Yellow, and White.'
    ]

    const handleSubmitClick = () => {
        setNumericData(filterDataByDaysGap(data, horizonDays / 5, horizonDays, (actBtn.label === 'Percentage')));
        console.log("this is the converted numeric dat, ", numericData);
    }

    const updateGraphState = async () => {
        console.log("button clicked", actBtn)
        if (actBtn.label === 'Percentage') {

            setActBtn({
                label: "Absolute Value",
                value: 'Absolute Value'
            })
            setNumericData(data);
            setNumericData(filterDataByDaysGap(numericData, horizonDays / 5, horizonDays, true));
            setNumericData(filterDataByDaysGap(data, horizonDays / 5, horizonDays, (actBtn.label !== 'Percentage')));
            console.log("absolute data", numericData)
        }
        else {
            setActBtn({
                label: "Percentage",
                value: 'Percentage'
            })
            setNumericData(convertToPercentage(data))
            setNumericData(filterDataByDaysGap(numericData, horizonDays / 5, horizonDays, false));

            setNumericData(filterDataByDaysGap(data, horizonDays / 5, horizonDays, (actBtn.label !== 'Percentage')));

            console.log("percentage data", numericData)
        }

    }

    const chartRef = useRef<AgChartsReact>(null);
    const [hideChart1, toggleChart1] = useState(false);

    const colDef =
        [
            {
                field: 'dt',
                colId: 'dt',
                headerName: 'Date',
                initialWidth: 200
            },
            {
                field: 'b',
                colId: 'b',
                headerName: 'Black',
                initialWidth: 200

            },
            {
                field: 'r',
                colId: 'r',
                headerName: 'Red',
                initialWidth: 200

            }
            ,
            {
                field: 'g',
                colId: 'g',
                headerName: 'Green',
                initialWidth: 200

            }
            ,
            {
                field: 'y',
                colId: 'y',
                headerName: 'Yellow',
                initialWidth: 200

            }
            ,
            {
                field: 'w',
                colId: 'w',
                headerName: 'White',
                initialWidth: 200

            }
        ]
    const [rowData, setRowData] = useState(
        data
    )

    const [gridLoading, setGridLoading] = useState(true);
    return (
        <div style={{ height: "76vh", display: 'flex', justifyContent: 'left' }}>

            {
                (isMTO) && (<div style={{ width: "14px", resize: "none", height: "100%", display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <div style={{ width: '8px', background: '#E8E8E8', height: '70%', borderRadius: "0 4px 4px 0", display: "flex", alignItems: "center" }}>
                        <img src='/assets/img/VectorFLOW/BPR/slider-icon-right.svg' />
                    </div>
                </div>)
            }

            <div style={{ width: "100%" }}>


                <SCChartContainer style={{ height: "74vh", border: '1px solid #CCCCCC' }}>
                    <SCChartMainContainer style={{ zoom: 1 }}>
                        <SCChartSliderContainer style={{ zoom: 0.75, marginTop: '6px' }}>
                            <label style={{
                                fontStyle: "normal",
                                fontVariant: "normal",
                                fontWeight: 400,
                                fontSize: 15,
                                fontFamily: "Roboto",
                                paddingLeft: '10px'
                            }}
                            > <b>Select Horizon: </b></label>
                            <VFRangeSlider
                                showTriangle={false}
                                min={1}
                                max={90}
                                milestones={[0, 30, 60, 90]}
                                strictMode={false}
                                width={200}
                                defaultValue={horizonDays}
                                handleChange={(e) => setHorizondays(e)}
                                labelValueFormatter={(value: number) => value > 1 ? `${value} Days` : `${value} Day`}
                            />
                            <div>
                                {/* <VFButtonOutline themeUi={user.user.theme_ui} onClick={handleSubmitClick} width={120} disabled={false} style={{fontSize:'15px',height:'42px',fontWeight:500}}>
                                        Submit
                                    </VFButtonOutline> */}
                                <img

                                    style={{ cursor: 'pointer' }}
                                    src="/assets/img/Group 627.svg"
                                    height={40}
                                    width={50}
                                    onClick={() => handleSubmitClick()}
                                />
                            </div>


                        </SCChartSliderContainer>
                        <SCChartHeaderContainer>
                            <CapsuleWrapper style={{ zoom: 0.8, padding: '4px' }}>
                                <VFCapsule
                                    activeBtn={actBtn}
                                    capsules={[

                                        {
                                            label: "Percentage",
                                            value: 'Percentage'
                                        },
                                        {
                                            label: "Absolute Value",
                                            value: 'Absolute Value'
                                        }
                                    ]}
                                    handleClick={() => updateGraphState()}


                                />
                            </CapsuleWrapper>
                            <div style={{ marginLeft: 30, marginBottom: '-5px' }}>
                                <VFInfoToolTip infoList={graph1} />
                            </div>
                            <div onClick={() => { toggleChart1(!hideChart1) }} style={{ marginLeft: 10, marginBottom: '-5px', marginRight: '10px' }}>
                                <img src='/assets/img/VectorFLOW/BPR/minimize.svg' height={13} width={13} color={"#CCCCCC"} />
                            </div>
                        </SCChartHeaderContainer>
                    </SCChartMainContainer>

                    <SCHorizontalDivider />
                    <ChartWrapper>
                        <div style={{ height: '100%', width: '100%' }}>
                            <div className="title" style={{ backgroundColor: 'white', height: '40px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                                <div style={{ fontSize: '10px', fontWeight: 500, textAlign: 'center', margin: '0 auto' }}>
                                    RM / PM Buffer Trend - MTO ( 14 Feb 2023 - 02 Mar 2024 )
                                </div>
                                <div style={{ marginLeft: '0 10px -5px', marginBottom: '-5px' }} onClick={() => {

                                    (chartRef && chartRef.current && chartRef.current.chart) && AgCharts.download(chartRef.current.chart);

                                }}>
                                    <img src='/assets/img/VectorFLOW/BPR/download.svg' style={{ color: "#CCCCCC", paddingBottom: '5px' }} height={15} width={15} color={"#CCCCCC"} />
                                </div>

                            </div>
                        </div>
                    </ChartWrapper>

                    <VFModalCard openModal={hideChart1} closeModal={() => toggleChart1(false)} headerIcon='' headerText="Top 10 Locations: Max On-Hand Black/Red SKUs Along With High Transport Ageing" headerBgColor="" headerTextColor="#00000" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                        <div className="ag-theme-planning" style={{ width: '1000px' }}>
                            <VFTable
                                ref={chartRef}
                                columnDefs={colDef}
                                // rowData={sortData(convertToInt(data['maxTechBlackRedColumn']['data']))}
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
                    <div style={{ height: "50vh" }}>
                        <AgChartsReact suppressDragLeaveHidesColumns={true} ref={chartRef} options={{ ...options, data: numericData }} />
                    </div>
                </SCChartContainer>
                {!isLoading && (<div style={{ marginLeft: '10px', marginRight: '10px' }}>
                </div>)}
            </div>


        </div>

    )
}

export default BTMTA