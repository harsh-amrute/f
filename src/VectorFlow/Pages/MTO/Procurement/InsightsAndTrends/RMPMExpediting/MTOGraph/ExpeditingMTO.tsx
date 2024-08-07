import { AgChartOptions } from 'ag-charts-community'
import { useEffect, useState } from 'react'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import VFRangeSlider from '../../../../../../../VectorFlow/Pages/MTO/Common/VFRangeSlider'
import { SCChartHeaderContainer, SCChartMainContainer, SCChartSliderContainer } from '../../styles'

import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer';
import { useGetRMExpeditingData } from '../../../../../../Services/MTO/Production/InsightsAndTrends/RMPMExpediting/index';
import moment from 'moment'
const ExpeditingMTO = ({ isMTO, date }: { isMTO: boolean, date: string }) => {

    const { mutateAsync: getRMPMExpedition } = useGetRMExpeditingData()
    const [horizonDays, setHorizondays] = useState(14);
    const [numericData, setNumericData] = useState<any>();

    let RMPMExpeditionOBj = {}
    useEffect(() => {
        getOnLoadData();
    }, [])

    const getOnLoadData = async () => {
        RMPMExpeditionOBj = {
            'horizon': '14',
            'val': 'all'
        }
        const someData = await getRMPMExpedition(RMPMExpeditionOBj);
        setNumericData(someData.data?.data?.rm)
    }


    function TooltipRenderer({ datum }: any) {
        return ` 
        <div style="background:#000; border-radius:3px; color:#fff ;padding:8px">
            <div style="width: 100%; display: flex; justify-content: center">
              ${datum.rn}
            </div>
            <hr style="border: 1px dashed"/>
            <div>RM Desc : ${datum.rd}</div>
            <div>No. Of Orders : ${datum.rc}</div>
        </div>
        `;
    }


    const options: AgChartOptions = {
        //Porperties to set here for x and y axises
        axes: [
            {
                title: { text: 'Raw Material', fontSize: 10, spacing: 20 },
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
        //what series you want to show e.g. line, bar, etc with its properties
        series: [
            {
                type: "bar",
                xKey: "rn",
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
        'This graph highlights the raw materials in shortage, ranked by thier impact on the numbers of orders.'
    ]

    const getRMHorizonBasedData = async () => {
        //setNumericData(null)
        RMPMExpeditionOBj = {
            'horizon': horizonDays,
            'val': 'rm'
        }
        const someData = await getRMPMExpedition(RMPMExpeditionOBj);
        setNumericData(someData.data?.data?.rm)
    }

    const handleSubmitClick = () => {
        //setNumericData();
        getRMHorizonBasedData();
    }

    const handleSliderChange = (val: any) => {
        setHorizondays(val)
    }


    const [hideChart1, toggleChart1] = useState(false);

    const colDef =
        [
            {
                field: 'rn',
                colId: 'rn',
                headerName: 'RM Name',
                initialWidth: 200
            },
            {
                field: 'rc',
                colId: 'rc',
                headerName: 'Order Count',
                initialWidth: 200

            },
            {
                field: 'rd',
                colId: 'rd',
                headerName: 'RM Desc',
                initialWidth: 200

            }

        ]



    const [chartLoading, setChartLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);

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
                        > <b>Select Horizon (in days): </b></label>
                        <VFRangeSlider
                            style={{ paddingTop: '13px' }}
                            showTriangle={false}
                            min={1}
                            max={90}
                            milestones={[0, 30, 60, 90]}
                            strictMode={false}
                            width={200}
                            defaultValue={horizonDays}
                            handleChange={(e) => handleSliderChange(e)}
                            labelValueFormatter={(value: number) => value.toString()}
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
                        <div
                            onClick={() => { toggleChart1(!hideChart1) }} style={{ marginLeft: 10, marginBottom: '-5px', marginRight: '10px' }}>
                            <img src='/assets/img/VectorFLOW/BPR/minimize.svg' height={13} width={13} color={"#CCCCCC"} />
                        </div>
                    </SCChartHeaderContainer>
                </SCChartMainContainer>
            </>

        )
    }



    return (
        <div style={{ height: "75vh", display: 'flex', justifyContent: 'left', marginRight: '8px' }}>


            <SplitGraphContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                data={numericData}
                rowData={numericData}
                graphTitle={`Top 10 Raw Materials Impacting Orders With Release Date In Selected Horizon (${moment(date).format('D MMM YYYY')} - ${moment(date).add(horizonDays, 'days').format('D MMM YYYY')}) `}
                tableTitle={`Top 10 Raw Materials Impacting Orders With Release Date In Selected Horizon (${moment(date).format('Do MMMM YYYY')} - ${moment(date).add(horizonDays, 'days').format('Do MMMM YYYY')})`}
                options={options}
                colDef={colDef}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRenderer}
                graphType={2}
                chartHeight={55}
            />


        </div>

    )
}

export default ExpeditingMTO