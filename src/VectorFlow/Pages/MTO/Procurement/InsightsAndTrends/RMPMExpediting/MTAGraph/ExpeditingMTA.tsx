import { AgChartOptions } from 'ag-charts-community'
import { useEffect, useState } from 'react'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import VFRangeSlider from '../../../../../../../components/VectorFLOW/commons/VFRangeSlider'
import { SCChartHeaderContainer, SCChartMainContainer, SCChartSliderContainer } from '../../styles'
// import { RMPMExpiditingDataMTO } from '../RMPMExpeditingData'
import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer';
import { useGetRMExpeditingData } from '../../../../../../Services/MTO/Production/InsightsAndTrends/RMPMExpediting/index';
import moment from 'moment'

const ExpeditingMTA = ({ isMTO, date }: { isMTO: boolean, date: string }) => {
    let RMPMExpeditionOBj = {}
    const [chartLoading, setChartLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [horizonDays, setHorizondays] = useState(14);

    const { mutateAsync: getRMPMExpedition } = useGetRMExpeditingData()
    const [numericData, setNumericData] = useState<any>();

    useEffect(() => {
        getOnLoadData();
    }, [])

    const getOnLoadData = async () => {
        RMPMExpeditionOBj = {
            'horizon': '14',
            'val': 'all'
        }
        const someData = await getRMPMExpedition(RMPMExpeditionOBj);
        setNumericData(someData.data?.data?.supplier)
    }



    const TooltipRenderer = ({ datum, xKey }: any) => {
        console.log(datum)
        return `
        <div style="background:#000; border-radius:3px; color:#fff ;padding:8px">
            <div style="width: 100%; display: flex; justify-content: center">
                AE1234Ffre
            </div>
            <hr style="border: 1px dashed"/>
            <div>No. Of Orders : ${datum}</div>
        </div>
        `;
    }


    const options: AgChartOptions = {
        axes: [
            {
                title: { text: 'Supplier Name', fontSize: 10, spacing: 3 },
                type: "category",
                position: 'bottom',
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
                title: { text: "No. Of Impacted Orders", fontSize: 10, spacing: 3 },
                type: "number",
                line: { enabled: true },
                position: 'left',
                label: {
                    formatter: function (params) {
                        return (params.value);
                    },
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: 'black'
                },
                gridLine: {
                    enabled: false
                }

            }
        ],
        series: [
            {
                type: 'bar',
                xKey: "sn",
                yKey: "rc",
                fill: 'Grey',
                yName: "No of Impacted Orders",
                tooltip: {
                    renderer: TooltipRenderer
                }

            }

        ],
        legend: {
            position: 'bottom',
            item: {
                label: {
                    fontSize: 10,
                    fontFamily: 'Roboto',
                    fontWeight: 'normal'

                },
                marker: {
                    size: 14,
                    shape: 'square'
                },
                line: {
                    strokeWidth: 12
                }
            }

        }
    };

    const graph1 = [
        'The graph highlights the suppliers based on their impact on timely release of orders'
    ]

    const handleSubmitClick = () => {
        //setNumericData();
    }


    const [hideChart1, toggleChart1] = useState(false);

    const colDef =
        [
            {
                field: 'sn',
                colId: 'sn',
                headerName: 'Suplier Name',
                initialWidth: 200
            },
            {
                field: 'rc',
                colId: 'rc',
                headerName: 'Impacted Order',
                initialWidth: 200

            },

        ]
    // const [rowData, setRowData] = useState(data)
    const rowData = numericData;


    const generateHeader = () => {
        return (
            <>
                <SCChartMainContainer style={{ zoom: 1, width: '100%' }}>
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
    return (
        <div style={{ height: "70vh", display: 'flex', justifyContent: 'left' }}>

            {
                (isMTO) && (<div style={{ width: "14px", resize: "none", height: "100%", display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <div style={{ width: '8px', background: '#E8E8E8', height: '88%', borderRadius: "0 4px 4px 0", display: "flex", alignItems: "center" }}>
                        <img src='/assets/img/mto/RMPMBufferTrend/slider-icon-right.svg' />
                    </div>
                </div>)
            }

            <SplitGraphContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                data={numericData}
                rowData={rowData}
                graphTitle={`Top 10 Suppliers Impacting Orders With Release Date In Selected Horizon ( ${moment(date).format('D MMM YYYY')} - ${moment(date).add(horizonDays, 'days').format('D MMM YYYY')})`}
                tableTitle={`Top 10 Suppliers Impacting Orders With Release Date In Selected Horizon ( ${moment(date).format('D MMM YYYY')} - ${moment(date).add(horizonDays, 'days').format('D MMM YYYY')})`}
                options={options}
                colDef={colDef}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRenderer}
                graphType={2}
            />
        </div>
    )
}

export default ExpeditingMTA