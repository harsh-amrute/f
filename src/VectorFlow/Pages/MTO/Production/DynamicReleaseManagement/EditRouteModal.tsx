import { AgCharts } from 'ag-charts-react'
import React, { useEffect, } from 'react'
import { useSaveRouteData } from '../../../../../VectorFlow/Services/MTO/Production/DynamicReleaseManagement'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import RouteAssignment from '../../Common/RouteAssignment/RouteAssignment'
import { RouteContentWrapper, Text } from './DynamicReleaseManagement.styled'
import OverlayLoader from '../../Common/Loader'
import { notifyError, notifySuccess } from '../../../../../helpers/notify'


const EditRouteModal = ({ chartoptions, dataUpdated, setDataUpdated, setRouteNum, lineCCRDetails, master, setRoute, route, showModal, setShowModal, themeUi, orderKey }: any) => {
    
    const { mutateAsync: saveRouteData, isLoading, isSuccess, isError } = useSaveRouteData();

    type Route = {
        ccrId: number;
        routeId: number;
        ccrGrpId: number;
        ps: number;
    };

    useEffect(() => {
        if (isSuccess) {
            notifySuccess("Route updated successfully!")
        }
        if (isError) {
            notifyError("Failed to update route data")
        }
    }, [isSuccess, isError])

    type LineCcr = {
        [order: string]: {
            [ccrId: string]: {
                load: number;
                pcqty: number;
                rid: number;
            };
        };
    };

    function convertToRequiredFormat(routes: Route[], lineCcr: LineCcr): any {

        const myCCRDetails: any = [];

        routes.forEach((e: any, i) => {
            const perCCRDetail = {
                "ccrid": e[1].value,
                "ccrgrp": e[0].value,
                "pcQty": lineCcr[e[1].value]?.pcqty ? lineCcr[e[1].value]?.pcqty : 0,
                "pos": (i + 1).toString(),
                "ol": lineCcr[e[1].value]?.load ? lineCcr[e[1].value]?.load : 0,
            }

            myCCRDetails.push(perCCRDetail);

        })

        let routeName = '';
        routes.forEach((e: any) => {
            routeName = routeName + (e[1].label) + '/'
        })
        if (routeName.length >= 1) {
            routeName = routeName.substring(0, routeName.length - 1);
        }

        const finalData = {
            "routeData": {
                "orders": [
                    {
                        "route": routeName,
                        "ok": orderKey,
                        "ccrdetails": myCCRDetails
                    }
                ]
            }
        }

        return finalData;


    }
    useEffect(() => {
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
        requestAnimationFrame(animate);

    }, []);



    const SaveRoute = async () => {
        const data = convertToRequiredFormat(route, lineCCRDetails);
        try {
            const response = await saveRouteData({body : JSON.parse(JSON.stringify(data)) , update_order_wip : 1})
            if (response.status === 200) {
                setRouteNum('');
                setDataUpdated(!dataUpdated)
                setShowModal(false);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setShowModal(false);
        }
    }, [isSuccess])


    return (
        <VFModalCard openModal={showModal} closeModal={() => { setRouteNum(''), setShowModal((false)) }} headerText={'Edit Route'} headerIcon={''} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"} paddingLeftAndRight={0} headerTextColor={'black'} backgroundColor={'f4f4f4'} data-testid="vfmultifilter-img" >
            {isLoading && <OverlayLoader message='Saving route data' />}
            <RouteContentWrapper>
                <Text>
                    You can change route by selecting CCR from drop-down
                </Text>
                {
                    master && master?.ccrGroups &&

                    (<RouteAssignment
                        isEditable={true}
                        theme={themeUi}
                        ccrGroupMaster={master.ccrGroups}
                        selectedRoutes={route}
                        setSelectedRoutes={setRoute}
                    />)
                }
                <strong style={{ fontSize: "14px" }}>Route Load</strong>
                <div style={{ height: "220px" }}>
                    <AgCharts options={chartoptions} />
                </div>
            </RouteContentWrapper>
            <div style={{ zoom: '0.7', marginTop: '10px' }}>
                <div key={'1'} style={{ display: 'flex', justifyContent: 'right', gap: '8px', borderTop: '2px dashed #A0A0A0', padding: '20px 20px 20px 0' }}>

                    <div>
                        <div onClick={() => { setRouteNum(''), setShowModal(false) }} style={{
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
                            background: `${themeUi ? '#820F4C' : '#820F4C'}`,
                            boxShadow: '0px 6px 25px #00000029'

                        }}
                            onClick={() => { SaveRoute() }}
                        >
                            Save Routes
                        </div>
                    </div>
                </div>
            </div>
        </VFModalCard>
    )
}

export default React.memo(EditRouteModal);