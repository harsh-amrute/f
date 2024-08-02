import { AgChartOptions } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import { useEffect, } from 'react'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import { StepperWrapper, StepGroup, StepLabel, RouteContentWrapper, Text } from './DynamicReleaseManagement.styled'
import { Rectangle } from './RectangleMarker'
import CustomSelect from './Select'

const EditRouteModal = ({ showModal, setShowModal, graphData, themeUi }: any) => {

    useEffect(() => {
        // let animationFrameId: any;
        const animate = () => {
            const stepGroups = document.querySelectorAll('.step-group');
            const svg: any = document.querySelector('.line');
            if (svg?.innerHTML) {
                svg.innerHTML = "";
            }
            for (let i = 0; i < stepGroups?.length - 1; i++) {
                const start: any = stepGroups[i].getBoundingClientRect();
                const end: any = stepGroups[i + 1].getBoundingClientRect();
                if (stepGroups[i + 1].id == "inactive") {
                    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                    polyline.setAttribute('points', `${end.left - 8},${end.top + end.height / 2 - 2.5} ${end.left - 8},${end.top - 10} ${end.left + 8 + end.width},${end.top - 10} ${end.left + 8 + end.width},${end.top + end.height / 2 - 2.5}`);
                    svg.appendChild(polyline);
                    polyline.setAttribute('stroke', '#82104C');
                    polyline.setAttribute('fill', 'none');
                    svg.appendChild(polyline);
                }
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                let leftOffset = 0
                let rightOffset = 0
                if (stepGroups[i].id == "inactive") {
                    rightOffset = 5
                }
                if (stepGroups[i + 1].id == "inactive") {
                    leftOffset = 5
                }
                line.setAttribute('x1', (start.right + 6 + rightOffset).toString());
                line.setAttribute('y1', start.top + start.height / 2);
                line.setAttribute('x2', (end.left - 6 - leftOffset).toString());
                line.setAttribute('y2', end.top + end.height / 2);
                line.setAttribute('stroke', '#82104C');
                svg.appendChild(line);
            }
            // animationFrameId = 
            requestAnimationFrame(animate);
        };
        // animationFrameId = 
        requestAnimationFrame(animate);

        // return cancelAnimationFrame(animationFrameId);
    }, []);

    const chartoptions: AgChartOptions = {
        data: graphData,
        series: [
            {
                type: 'bar',
                xKey: 'category',
                yKey: "Released wip",
                stacked: true,
                strokeWidth: 0,
                fill: "#191919",
                formatter: (params) => {
                    return {
                        fillOpacity: params.datum.selected ? 1 : 0.5,
                        fill: params.datum.selected ? params.fill : "#191919"
                    }
                }
            },
            {
                type: 'bar',
                xKey: 'category',
                yKey: "incremental wip",
                stacked: true,
                strokeWidth: 0,
                fill: "#4BAAF7",
                formatter: (params) => {
                    return {
                        fill: params.datum.selected ? params.fill : "#4BAA66"
                    }
                },
                // label: {
                //     enabled: true,
                //     formatter: (params: any) => {
                //         return params.datum.groupName
                //     },
                //     placement: "outside",
                //     color: "black",
                // }
            },
            {
                type: 'scatter',
                xKey: 'category',
                yKey: 'limit',
                marker: {
                    size: 10,
                    fill: '#E53F3F',
                    shape: Rectangle,
                    strokeWidth: 0
                },

            },
        ],
        axes: [
            {
                type: 'category',
                position: 'bottom',
                gridLine: {
                    enabled: false
                }
            },
            {
                type: 'number',
                position: 'left',
                title: {
                    text: "Days"
                },
                gridLine: {
                    enabled: false
                }
            },

        ],
        legend: {
            position: "top",

            item: {
                showSeriesStroke: true,
                marker: {
                    size: 15,
                    strokeWidth: 0,
                    shape: 'square', // 'circle', 'square', 'cross', 'plus', 'triangle'
                },
            },
        },

    }

    return (
        <VFModalCard openModal={showModal} closeModal={() => { setShowModal((false)) }} headerText={'Edit Route'} headerIcon={''} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"} paddingLeftAndRight={0} headerTextColor={'black'} backgroundColor={'f4f4f4'} data-testid="vfmultifilter-img" >
            <RouteContentWrapper>
                <Text>
                    You can change route by selecting CCR from drop-down
                </Text>
                <StepperWrapper>
                    <StepGroup>
                        <StepLabel>Dispensing</StepLabel>
                        <CustomSelect selected={{ label: "M1", value: "M1" }} />
                    </StepGroup>
                    <StepGroup>
                        <StepLabel>Granulation</StepLabel>
                        <CustomSelect selected={{ label: "M2", value: "M2" }} />
                    </StepGroup>
                    <StepGroup id="inactive">
                        <StepLabel>Shaft</StepLabel>
                        <CustomSelect selected={{ label: "M3", value: "M3" }} />
                    </StepGroup>
                    <StepGroup id="inactive">
                        <StepLabel>Inactive</StepLabel>
                        <CustomSelect />
                    </StepGroup>
                    <StepGroup>
                        <StepLabel>Final Product</StepLabel>
                    </StepGroup>
                    <svg className="line" style={{ position: "absolute", width: "100%", height: "100%", top: "0", left: "0", pointerEvents: "none" }}>
                    </svg>
                </StepperWrapper>
                <strong style={{ fontSize: "14px" }}>Route Load</strong>
                <div style={{ height: "300px" }}>
                    <AgChartsReact options={chartoptions} />
                </div>
                <div style={{ zoom: '0.7', marginTop: '10px' }}>
                    <div key={'1'} style={{ display: 'flex', justifyContent: 'right', gap: '8px', borderTop: '2px dashed #A0A0A0', padding: '20px 10px 0 0' }}>

                        <div>
                            <div onClick={() => { setShowModal(false) }} style={{
                                background: 'white', color: 'grey', font: 'normal normal 300 16px/24px Roboto',
                                padding: '10px 20px',
                                fontWeight: '400',
                                borderRadius: '6px',
                                border: '1px solid grey',

                                boxShadow: '0px 6px 25px #00000029'
                            }} >
                                Cancel
                            </div>
                        </div>
                        <div>

                            <div style={{
                                font: 'normal normal 300 16px/24px Roboto',
                                fontWeight: '400',
                                padding: '10px 20px',
                                color: 'white',
                                borderRadius: '6px',
                                background: `${themeUi ? '#820F4C' : 'purple'}`,
                                boxShadow: '0px 6px 25px #00000029'
                            }}>
                                Save Routes
                            </div>
                        </div>
                    </div>
                </div>
            </RouteContentWrapper>
        </VFModalCard>
    )
}

export default EditRouteModal