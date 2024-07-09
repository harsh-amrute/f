import { AgChartOptions } from 'ag-charts-community'
import { useState } from 'react'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import VFRangeSlider from '../../../../../../../components/VectorFLOW/commons/VFRangeSlider'
import { SCChartHeaderContainer, SCChartMainContainer, SCChartSliderContainer } from '../../styles'
import { RMPMExpiditingData } from '../../RMPMExpediting/RMPMExpeditingData';
import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer'
import moment from 'moment'
const ExpeditingMTO = ({ isMTO, date }: { isMTO: boolean, date: string }) => {
    const [horizonDays, setHorizondays] = useState(90);

    const [numericData] = useState<any>(RMPMExpiditingData);


    function TooltipRenderer({ datum, xKey }: any) {
        return ` 
        <div style="background:#000; border-radius:3px; color:#fff ;padding:8px">
            <div style="width: 100%; display: flex; justify-content: center">
                AE1234Ffre
            </div>
            <hr style="border: 1px dashed"/>
            <div>RM Desc : ${datum['dt']}</div>
            <div>No. Of Orders : ${datum['b']}</div>
        </div>
        `;
    }


    const options: AgChartOptions = {
        //Porperties to set here for x and y axises
        axes: [
            {
                title: { text: 'Raw Material', fontSize: 10, spacing: 3 },
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
                xKey: "rmNam",
                yKey: "ordCnt",
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

    const handleSubmitClick = () => {
        //setNumericData();
        console.log("this is the converted numeric dat, ", numericData);
    }

    const handleSliderChange = (val: any) => {
        setHorizondays(val)
    }


    const [hideChart1, toggleChart1] = useState(false);

    const colDef =
        [
            {
                field: 'rmNam',
                colId: 'rmNam',
                headerName: 'RM Name',
                initialWidth: 200
            },
            {
                field: 'ordCnt',
                colId: 'ordCnt',
                headerName: 'Order Count',
                initialWidth: 200

            },
            {
                field: 'rmDes',
                colId: 'rmDes',
                headerName: 'RM Desc',
                initialWidth: 200

            }

        ]
    const [rowData] = useState(
        numericData
    )

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
                        > <b>Select Horizon: </b></label>
                        <VFRangeSlider
                            showTriangle={false}
                            min={1}
                            max={90}
                            milestones={[0, 30, 60, 90]}
                            strictMode={false}
                            width={200}
                            defaultValue={horizonDays}
                            handleChange={(e) => handleSliderChange(e)}
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


            <SplitGraphContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                data={numericData}
                rowData={rowData}
                graphTitle={`Top 10 Raw Materials Impacting Orders With Release Date In Selected Horizon (${moment(date).format('D MMM YYYY')} - ${moment(date).add(horizonDays, 'days').format('D MMM YYYY')}) `}
                tableTitle={`Top 10 Raw Materials Impacting Orders With Release Date In Selected Horizon (${moment(date).format('Do MMMM YYYY')} - ${moment(date).format('Do MMMM YYYY')})`}
                options={options}
                colDef={colDef}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRenderer}
                graphType={2}
            />

            {
                (isMTO) && (<div style={{ width: "14px", resize: "none", height: "100%", display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <div style={{ width: '8px', background: '#E8E8E8', height: '88%', borderRadius: "4px 0 0 4px", display: "flex", alignItems: "center", paddingRight: "1px" }}>
                        <img src='/assets/img/mto/RMPMBufferTrend/slider-icon-left.svg' />
                    </div>
                </div>)
            }

        </div>

    )
}

export default ExpeditingMTO