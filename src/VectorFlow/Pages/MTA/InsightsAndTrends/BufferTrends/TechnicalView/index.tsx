
import "allotment/dist/style.css";
import { CapsuleWrapper, ChartWrapper } from "./styles";
import {
    SCChartHeaderContainer, SCChartContainer, SCHorizontalDivider
    , SCChartSliderContainer, SCChartMainContainer
} from '../styles';
import { BufferTrendsGraphState } from '../../../../../types/BPR'
import VFCapsule from "../../../../../../components/VectorFLOW/commons/VFCapsule";
import VFRangeSlider from "../../../../../../components/VectorFLOW/commons/VFRangeSlider";


import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import VFInfoToolTip from ".././../../../../../components/VectorFLOW/commons/VFInfoToolTip";



interface TechnicalWiseProps {
    data: any
    currentPageTab: string
    handleClick?: (value: any, index: any) => void
    isLoading: boolean
    graphs: BufferTrendsGraphState[]
    updateGraphState: (id: number, property: string, value: any) => void
    setHorizondays: any
    handleSubmitClick: () => void
    horizonDays: number
    themeUi:string
}


const TechnicalWise = ({ data, isLoading, graphs, updateGraphState, setHorizondays, handleSubmitClick, horizonDays,themeUi }: TechnicalWiseProps) => {


    const numericData = data.map((item: any) => ({
        ...item,
        b: parseFloat(item.b),
        bu: parseFloat(item.bu),
        y: parseFloat(item.y),
        g: parseFloat(item.g),
        w: parseFloat(item.w)
        // Parse the string to a floating-point number
    }));

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
                type: "number",
                position: 'left',
                label: {
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
                marker: {
                    fill: "Black",
                    stroke: "Black"
                }
            },
            {
                type: "line",
                xKey: "dt",
                xName: "Date",
                yKey: "bu",
                yName: "Blue",
                stroke: "Blue",
                marker: {
                    fill: "Blue",
                    stroke: "Blue"
                }
            },
            {
                type: "line",
                xKey: "dt",
                xName: "Date",
                yKey: "r",
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
                xName: "Date",
                yKey: "g",
                yName: "Green",
                stroke: "Green",
                marker: {
                    fill: "Green",
                    stroke: "Green"
                }
            }
            ,
            {
                type: "line",
                xKey: "dt",
                xName: "Date",
                yKey: "w",
                yName: "White",
                stroke: "Grey",
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
                    fontSize: 8,

                },
                marker: {
                    size: 8
                },
                line: {
                    strokeWidth: 1
                }
            }

        }
    };

    const graph1 = [
        'This graph shows the trend of number of SKU Locations in Black, Red, Green, Yellow, and White.'
    ]


    return (
        <>
            <SCChartContainer height={"75%"}>
                <SCChartMainContainer>
                    <SCChartSliderContainer>
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
                            milestones={[0, 1, 90]}
                            strictMode={false}
                            width={250}
                            defaultValue={horizonDays}
                            handleChange={(e) => setHorizondays(e)}
                            labelValueFormatter={(value: number) => value > 1 ? `${value} Days` : `${value} Day`}
                        />
                        <div style={{ zoom: 0.8 }}>
                            {/* <VFButtonOutline themeUi={user.user.theme_ui} onClick={handleSubmitClick} width={120} disabled={false} style={{fontSize:'15px',height:'42px',fontWeight:500}}>
                                        Submit
                                    </VFButtonOutline> */}
                            <img
                                style={{ cursor: 'pointer' }}
                                src={themeUi==="REGALBLAZE"?"/assets/img/Group 627-regal.svg":"/assets/img/Group 627.svg"}
                                height={50}
                                width={60}
                                onClick={() => handleSubmitClick()}
                            />
                        </div>


                    </SCChartSliderContainer>
                    <SCChartHeaderContainer>
                        <CapsuleWrapper>
                            <VFCapsule
                                activeBtn={graphs[0].pen}
                                capsules={[

                                    {
                                        label: "Percentage",
                                        value: 'Percentage'
                                    },
                                    {
                                        label: "Absolute Value",
                                        value: 'Absolute'
                                    }
                                ]}
                                handleClick={(value: any) => updateGraphState(1, "pen", value)}

                            />
                        </CapsuleWrapper>
                    </SCChartHeaderContainer>
                </SCChartMainContainer>

                <SCHorizontalDivider />
                <ChartWrapper>
                    <div style={{ height: '100%', width: '100%' }}>
                        <div className="title" style={{ backgroundColor: 'white', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '14px', fontWeight: 500, textAlign: 'center' }}>
                                Buffer Trend Graph
                            </div>
                            <div style={{ marginLeft: 10,marginBottom:'-5px' }}>
                                <VFInfoToolTip infoList={graph1} />
                            </div>
                        </div>
                        <AgChartsReact options={{ ...options, data: numericData }} />
                    </div>
                </ChartWrapper>
            </SCChartContainer>
            {!isLoading && (<div style={{ marginLeft: '10px', marginRight: '10px' }}>
                {/* <VFInfoTip text={graph1}/> */}
            </div>)}
        </>
    )

}

export default TechnicalWise;