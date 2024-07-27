import { AgChartOptions } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import React, { useEffect,} from 'react'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import RouteAssignment from '../../Common/RouteAssignment/RouteAssignment'
import { StepperWrapper, StepGroup, StepLabel, ContentWrapper, Text } from './FullKitAssignment.styled'
import { Rectangle } from './RectangleMarker'
import CustomSelect from './Select'

const EditRouteModal = ({ showModal, setShowModal, graphData, theme }: any) => {

    // useEffect(() => {
    //     // let animationFrameId: any;
    //     const animate = () => {
    //         const stepGroups = document.querySelectorAll('.step-group');
    //         const svg: any = document.querySelector('.line');
    //         if (svg?.innerHTML) {
    //             svg.innerHTML = "";
    //         }
    //         for (let i = 0; i < stepGroups?.length - 1; i++) {
    //             const start: any = stepGroups[i].getBoundingClientRect();
    //             const end: any = stepGroups[i + 1].getBoundingClientRect();
    //             if (stepGroups[i + 1].id == "inactive") {
    //                 const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    //                 polyline.setAttribute('points', `${end.left - 8},${end.top + end.height / 2 - 2.5} ${end.left - 8},${end.top - 10} ${end.left + 8 + end.width},${end.top - 10} ${end.left + 8 + end.width},${end.top + end.height / 2 - 2.5}`);
    //                 svg.appendChild(polyline);
    //                 polyline.setAttribute('stroke', '#82104C');
    //                 polyline.setAttribute('fill', 'none');
    //                 svg.appendChild(polyline);
    //             }
    //             const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    //             let leftOffset = 0
    //             let rightOffset = 0
    //             if (stepGroups[i].id == "inactive") {
    //                 rightOffset = 5
    //             }
    //             if (stepGroups[i + 1].id == "inactive") {
    //                 leftOffset = 5
    //             }
    //             line.setAttribute('x1', (start.right + 6 + rightOffset).toString());
    //             line.setAttribute('y1', start.top + start.height / 2);
    //             line.setAttribute('x2', (end.left - 6 - leftOffset).toString());
    //             line.setAttribute('y2', end.top + end.height / 2);
    //             line.setAttribute('stroke', '#82104C');
    //             svg.appendChild(line);
    //         }
    //         // animationFrameId = 
    //         requestAnimationFrame(animate);
    //     };
    //     // animationFrameId = 
    //     requestAnimationFrame(animate);

    //     // return cancelAnimationFrame(animationFrameId);
    // }, []);

    const chartoptions: AgChartOptions = {
        data: graphData,
        series: [
            {
                type: 'bar',
                xKey: 'category',
                yKey: "value",
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
                yKey: "value2",
                stacked: true,
                strokeWidth: 0,
                fill: "#EBBF2C",
                formatter: (params) => {
                    return {
                        fill: params.datum.selected ? params.fill : "#A8A8A8"
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
                yKey: 'target',
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
            <ContentWrapper>
                <Text>
                    You can change route by selecting CCR from drop-down
                </Text>
                {/* <StepperWrapper>
                    <StepGroup>
                        <StepLabel>Dispensing</StepLabel>
                        <CustomSelect theme={theme} selected={{ label: "M1", value: "M1" }} />
                    </StepGroup>
                    <StepGroup>
                        <StepLabel>Granulation</StepLabel>
                        <CustomSelect theme={theme} selected={{ label: "M2", value: "M2" }} />
                    </StepGroup>
                    <StepGroup id="inactive">
                        <StepLabel>Shaft</StepLabel>
                        <CustomSelect theme={theme} selected={{ label: "M3", value: "M3" }} />
                    </StepGroup>
                    <StepGroup id="inactive">
                        <StepLabel>Inactive</StepLabel>
                        <CustomSelect theme={theme}/>
                    </StepGroup>
                    <StepGroup>
                        <StepLabel>Final Product</StepLabel>
                    </StepGroup>
                    <svg className="line" style={{ position: "absolute", width: "100%", height: "100%", top: "0", left: "0", pointerEvents: "none" }}>
                    </svg>
                </StepperWrapper> */}
                <RouteAssignment theme={theme}/>
                <strong style={{ fontSize: "14px" }}>Route Load</strong>
                <div style={{ height: "300px" }}>
                    <AgChartsReact options={chartoptions} />
                </div>
            </ContentWrapper>
        </VFModalCard>
    )
}

export default EditRouteModal