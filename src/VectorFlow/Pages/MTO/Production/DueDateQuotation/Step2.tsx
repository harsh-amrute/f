import { AgChartsReact } from 'ag-charts-react';
import { GridReadyEvent } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-enterprise';
import { Allotment } from 'allotment';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { getColumnDefinations } from '../../../../../helpers/utils';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import BufferAssignment from '../../Common/RouteAssignment/BufferAssignment';
import RouteAssignment from '../../Common/RouteAssignment/RouteAssignment';
import { WarningBody, WarningContainer, WarningHeader, WarningText, Wrapper } from './DueDateQuotation.styled';
import { BlurCover, CardCover, DashedCard, MessageText } from '../EnquiryResponse/styles';
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline';
import { useGetRouteDetails, useUpdateBuffRouteCCREstDate } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import _ from 'lodash';
import { add, format, max } from 'date-fns';
import Tooltip from '../../../../../components/VectorFLOW/commons/MTO/Tooltip';
import { AgChartOptions } from 'ag-charts-community';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import * as globalStyles from "../../../../../styles/global";

const Step2 = forwardRef(({ gridOptions, columnData, selectedRows, theme, masters, getMastersData, rowsSelectedForAssignment, setRowsSelectedForAssignment, confirmedRows, setConfirmedRows, lineCCR, setDisabled }: any, ref) => {
    useEffect(() => {
        getMastersData();
        setRowsSelectedForAssignment(false);
    }, []);

    useEffect(() => {
        if (masters) {
            if (confirmedRows) {
                setRows(confirmedRows.map((row: any) => {
                    return row
                }))
            }
            else {
                const arr = Array.from(selectedRows.values()).map((node: any) => {
                    if (node.data.rid) {
                        routeLookup.current.set(node.data.rn, node.data.rid);
                    }
                    // calculate leadtime 
                    if (node.data.cdd) {
                        const marketLeadTime = masters.MarketLeadTimeMaster.find((item: any) => {
                            return item.mbot === node.data.mbot && item.itid === node.data.itid;
                        });

                        if (marketLeadTime) {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const newDate = add(today, {
                                years: 0,
                                months: 0,
                                weeks: 0,
                                days: marketLeadTime.lt || 0,
                                hours: 0,
                                minutes: 0,
                                seconds: 0,
                            });
                            const cdd = new Date(node.data.cdd);
                            node.data.isOptimalLeadTime = cdd <= newDate;
                        }
                    }
                    return { ...node.data }
                });

                arr.sort((a, b) => {
                    // Compare by 'crdd' first
                    const aCrdd = new Date(a.cedd);
                    const bCrdd = new Date(b.cedd);

                    if (aCrdd < bCrdd) return -1;
                    if (aCrdd > bCrdd) return 1;



                    const aOrderIdNum = parseInt(a.oid.replace(/\D/g, ''));
                    const bOrderIdNum = parseInt(b.oid.replace(/\D/g, ''));

                    // If 'crdd' is equal, compare by 'orderId'
                    if (aOrderIdNum < bOrderIdNum) return -1;
                    if (aOrderIdNum > bOrderIdNum) return 1;

                    return 0;  // equal values
                });
                setRows(arr);
            }
        }
    }, [masters])

    const routeDiv = useRef<any>();
    // const [routeDivHeight, setRouteDivHeight] = useState<any>();

    useEffect(() => {
        setTimeout(() => {
            allotment.current.reset();
            // if (routeDiv.current?.offsetHeight)
                // setRouteDivHeight(routeDiv.current.offsetHeight);
        }, 0);
        //RouteDiv Position Calculate and move it to state instead of ref
    }, [rowsSelectedForAssignment])

    //     useEffect(() => {
    //         allotment.current.reset();
    //     //RouteDiv Position Calculate and move it to state instead of ref
    //   }, [routeDivHeight])



    const customization = {
        Route: {
            pinned: "right",
            lockPosition: true,
            minWidth: 120,
            tooltipField: "rn",
            cellStyle: {
                // background: "#BC3D814F",
                // color: "#BC3D81",
                color: globalStyles.chooseThemeColor[theme]?.color4,
                fontWeight: "bold"
            }
        },
        ProductionBuffer: {
            pinned: "right",
            lockPosition: true,
            minWidth: 100,
            cellStyle: {
                // background: "#BC3D814F",
                // color: "#BC3D81",
                color: globalStyles.chooseThemeColor[theme]?.color4,
                fontWeight: "bold"
            }
        },
        ProcurementBuffer: {
            pinned: "right",
            lockPosition: true,
            minWidth: 100,
            cellStyle: {
                // background: "#BC3D814F",
                // color: "#BC3D81",
                color: globalStyles.chooseThemeColor[theme]?.color4,
                fontWeight: "bold"
            }
        },
        CRDD: {
            pinned: "right",
            lockPosition: true,
            minWidth: 120,
            cellStyle: {
                // background: "#BC3D814F",
                // color: "#BC3D81",
                color: globalStyles.chooseThemeColor[theme]?.color4,
                fontWeight: "bold"
            }
        },
        EstimatedDD: {
            pinned: "right",
            lockPosition: true,
            minWidth: 120,
            cellStyle: {
                // background: "#BC3D814F",
                // color: "#BC3D81",
                color: globalStyles.chooseThemeColor[theme]?.color4,
                fontWeight: "bold"
            }
        },
    }

    const extras: any = [
        {
            field: "",
            headerCheckboxSelection: true,
            checkboxSelection: true,
            suppressMenu: true,
            maxWidth: 50,
            position: 0,
            filter: false
        },
        {
            field: "",
            minWidth: 58,
            maxWidth: 58,
            cellRenderer: (params: any) => {
                if (params.data.isOptimalLeadTime == undefined) {
                    return
                }
                return (
                    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                        <Tooltip content={<div style={{ padding: "1rem", maxWidth: "180px", textAlign: "center" }}>{params.data.isOptimalLeadTime ? "Optimal Lead Time" : "Exceeding market operating leadtime"}</div>} zoom={false} style={{ display: "flex" }}>
                            {params.data.isOptimalLeadTime ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="17.326" height="16.976" viewBox="0 0 17.326 16.976">
                                    <g id="Component_237_99" data-name="Component 237 – 99" transform="translate(1.202 1.162)">
                                        <g id="Icon_feather-check-circle" data-name="Icon feather-check-circle" transform="translate(-3 -2.991)">
                                            <path id="Path_13420" data-name="Path 13420" d="M17.71,9.674v.677a7.355,7.355,0,1,1-4.362-6.722" transform="translate(0 0)" fill="none" stroke="#418d18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                            <path id="Path_13421" data-name="Path 13421" d="M23.061,6l-7.355,7.362L13.5,11.156" transform="translate(-5.352 -1.534)" fill="none" stroke="#418d18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                        </g>
                                    </g>
                                </svg>
                                : <svg id="Icon_metro-warning" data-name="Icon metro-warning" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path id="Icon_metro-warning-2" data-name="Icon metro-warning" d="M12.571,3.74l8.381,16.7H4.19l8.381-16.7Zm0-1.812a1.446,1.446,0,0,0-1.189.872L2.845,19.814c-.654,1.163-.1,2.114,1.236,2.114H21.06c1.334,0,1.89-.951,1.236-2.114h0L13.76,2.8A1.445,1.445,0,0,0,12.571,1.928Zm1.25,16.25a1.25,1.25,0,1,1-1.25-1.25A1.25,1.25,0,0,1,13.821,18.178Zm-1.25-2.5a1.25,1.25,0,0,1-1.25-1.25v-3.75a1.25,1.25,0,0,1,2.5,0v3.75A1.25,1.25,0,0,1,12.571,15.678Z" transform="translate(-2.571 -1.928)" fill="#ff3636" />
                                </svg>}
                        </Tooltip>
                    </div>

                )
            },
            suppressMenu: true,
            position: 1,
            filter: false
        },
    ]


    const columnDefs = useMemo(() => {
        return getColumnDefinations(columnData || [], customization, extras);
    }, []);

    const options: GridOptions = {
        ...gridOptions,
        columnDefs: columnDefs,
        // tooltipTrigger:"focus",
        // getRowStyle:(params: any) => null
    }

    const [chartData, setChartData] = useState<any>([])
    const chartOptions: AgChartOptions = {
        data: chartData,
        series: [
            {
                type: "bar",
                direction: "horizontal",
                xKey: "ccr_name",
                yKey: "ccrFolInDays",
                yName: "FOL",
                stacked: true,
                fill: "black",
                // tooltip: {
                //   renderer: TooltipRenderer,
                // },
            },
            {
                type: "bar",
                direction: "horizontal",
                xKey: "ccr_name",
                yKey: "orderLoad",
                yName: "SOL",
                stacked: true,
                fill: "#3874FF",
            },
        ],

        axes: [
            {
                type: "category",
                position: "left",
                label: {
                    fontSize: 10,
                    color: "black",
                    padding: 10,
                },
                gridLine: {
                    enabled: false,
                },
            },
            {
                type: "number",
                position: "bottom",
                line: { enabled: true },
                // interval: 1,
                tick: {
                    interval: 2,
                },
                label: {
                    fontSize: 10,
                    color: "black",
                    formatter: labelFormatter,
                    rotation: -45,
                    //   avoidCollisions: true
                },
                gridLine: {
                    enabled: false,
                },

            },
        ],

        legend: {
            position: 'right',
            item: {
                label: {
                    fontSize: 10,
                },
            },
        },
    };


    // const rows = useMemo(()=> selectedRows.values().map((node: any) => node.data), [])   
    const routeLookup = useRef(new Map());
    const [rows, setRows] = useState<any>(null);
    const [newSelectedRows, setNewSelectedRows] = useState<any>({ rows: null, isAssignmentPossible: false });
    const [selectedRoute, setSelectedRoute] = useState<any>([])

    const allotment = useRef<any>();
    const gridRef = useRef<any>();
    const [selectedBuffers, setSelectedBuffers] = useState<any[]>([]);
    const [isEditable, setIsEditable] = useState(false);

    const { mutateAsync: getRouteDetails, } = useGetRouteDetails();
    const { mutateAsync: updateBuffRouteCCREstDate, } = useUpdateBuffRouteCCREstDate();
    const routeCache = useRef<Record<number, any>>({});
    const [no, setNo] = useState(false);

    const getRoute = async (route: any) => {
        try {
            if (typeof route === "number") {
                if (routeCache.current[route]) {
                    return _.cloneDeep(routeCache.current[route])
                }
                const data = await getRouteDetails(route);
                const routeDetails = data.data.data;
                routeDetails.sort((a: any, b: any) => a.ps - b.ps)
                const newRoute: any = []
                routeDetails.forEach((routeDetail: any) => {
                    const obj = []
                    const ccrGroup = masters.ccrGroups.find((ccr: any) => ccr.value === routeDetail.ccrGrpId);
                    obj[0] = ccrGroup;
                    obj[1] = ccrGroup.ccrs.find((ccr: any) => ccr.value === routeDetail.ccrId)
                    newRoute[routeDetail.ps - 1] = obj
                })
                routeCache.current[route] = newRoute;
                return _.cloneDeep(newRoute)
            }
            return JSON.parse(route)
        }
        catch (err) {
            console.error(err);
            notifyError("Something Went Wrong!");
        }
    }

    const getBuffer = (prod_buffer: any, proc_buffer: any) => {
        try {
            const buffer = [null, null];
            if (prod_buffer.length == 1) {
                const prodBuff = masters.prodMaster.find((prod: any) => prod.value === prod_buffer[0]);
                buffer[0] = prodBuff
            }
            if (proc_buffer.length == 1) {
                const procBuff = masters.procMaster.find((proc: any) => proc.value === proc_buffer[0]);
                buffer[1] = procBuff
            }
            return buffer
        }
        catch (err) {
            console.error(err);
            notifyError("Something Went Wrong!");
        }
    }

    const calculateEstimatedDueDate = async (rowData: any) => {
        try {
            const ccr_prev_pending: any = {};
            const ordersForDDQ = [...rowData]
            // console.log("rowData", ordersForDDQ)
            const promises = ordersForDDQ.map(async (order: any) => {
                if (order.prodc && order.rn) {
                    const order_ccr_data: any = {};

                    const ccrIds: any = [];

                    //TODO: if the New Route Does not exist, use the rid --done
                    let route;

                    if (order.newRoute) {
                        route = order.newRoute
                    } else {
                        route = await getRoute(order.rid);
                    }

                    route.forEach((route: any) => {
                        if (route[1]?.value) {
                            ccrIds.push(route[1].value)
                        }
                    });

                    console.log(ccrIds)

                    //calculating order load
                    ccrIds.forEach((ccrId: any, index: number) => {
                        const ccr = masters.CCRMaster.find((ccr: any) => {
                            return ccr.ccr_id === ccrId
                        })
                        // const fol = masters.FOL[ccrId];
                        const ccrItem = masters?.CCRItemTypeMappingMaster.find((ccr: any) => ccr.ccrId === ccrId && ccr.it == order.itid)

                        let ccrWorkingHoursPerDay = ccr.working_hours_per_day || "0";
                        ccrWorkingHoursPerDay = parseInt(ccrWorkingHoursPerDay);
                        // console.log("ccritem", ccrItem)
                        // console.log("lineCCR[order.ok]?.[ccrId]?.pcqty", lineCCR[order.ok]?.[ccrId]?.pcqty)
                        // console.log("order.pcqty", order.pcQty)
                        const orderLoad = Math.ceil((ccrItem.tt * (lineCCR[order.ok]?.[ccrId]?.pcqty || order.pcqty))) || 0


                        if (!ccr_prev_pending[ccrId]) {
                            const ccr_fol_data = masters.FOL[ccrId];
                            const folInDays = ccr_fol_data.fol;
                            // console.log("ccr_fol_data",ccr_fol_data)
                            // console.log("ccrWorkingHoursPerDay", ccrWorkingHoursPerDay)
                            // console.log("folInDays", folInDays)
                            // console.log("prev pending",  Math.ceil((folInDays * ccrWorkingHoursPerDay * 60) + ccr_fol_data.ocm))

                            ccr_prev_pending[ccrId] = {
                                ccr_id: ccrId,
                                prevPend: Math.ceil((folInDays * ccrWorkingHoursPerDay * 60) + ccr_fol_data.ocm)
                            }
                            console.log("prev pending", Math.ceil((folInDays * ccrWorkingHoursPerDay * 60) + ccr_fol_data.ocm))
                        }
                        ccr_prev_pending[ccrId].prevPend = (ccr_prev_pending[ccrId].prevPend) + orderLoad;
                        order_ccr_data[ccrId] = {
                            ccr_id: ccrId,
                            ccrgrp: ccr?.ccr_group,
                            orderLoad: orderLoad || 0,
                            pos: index + 1,
                            pcQty: lineCCR[order.ok]?.[ccrId]?.pcqty || order.pcqty || 0,
                            folSpan: ((ccr_prev_pending[ccrId].prevPend)) / (ccrWorkingHoursPerDay * 60),
                        }

                        // console.log("ccr_prev_pending", ccr_prev_pending)
                        // console.log(ccrId, "orderLoad", order_ccr_data[ccrId].orderLoad, "folSpan" ,order_ccr_data[ccrId].folSpan, "order pending qty",row.pcqty, "ccr tt", ccrItem.tt, "ccrWorkingHoursPerDay" ,ccrWorkingHoursPerDay)                     
                    });

                    order.CCRData = _.cloneDeep(order_ccr_data);



                    console.log("order_ccr_data", order_ccr_data)


                    //DDIndex
                    const maxFol: any = Object.values(order_ccr_data).reduce((prev: any, current: any) => (current.folSpan > prev.folSpan) ? current : prev);

                    console.log(maxFol);
                    console.log(order.plid);
                    console.log(order);

                    // const formattedDate = format(new Date(), 'yyyy-MM-dd');
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    // console.log()

                    const latestWorkingDayLno = masters.WorkingCalender.find((data: any) => {
                        return new Date(data.wd) >= today && data.ccrId == maxFol.ccr_id && data.PlId == order.plid
                    })?.lno;

                    console.log("latestWorkingDayLno", latestWorkingDayLno)

                    const residualBuffer = parseFloat(masters?.CCRMaster.find((ccr: any) => ccr.ccr_id == maxFol.ccr_id)?.residual_buffer);

                    const prodBufferSize = order.prSz || 0;
                    const procBufferSize = order.pcSz || 0;

                    //optimise the logic
                    const folDDIndex = Math.ceil(latestWorkingDayLno + maxFol.folSpan + (residualBuffer * prodBufferSize)) - 1;
                    const folDD = masters.WorkingCalender.find((data: any) => {
                        return data.lno == folDDIndex && data.ccrId == maxFol.ccr_id && data.PlId == order.plid
                    })?.wd;

                    const bufferDDIndex = latestWorkingDayLno + procBufferSize + prodBufferSize;
                    const bufferDD = masters.WorkingCalender.find((data: any) => {
                        return data.lno == bufferDDIndex && data.ccrId == maxFol.ccr_id && data.PlId == order.plid
                    })?.wd;

                    console.log("prodBufferSize", prodBufferSize)
                    console.log("procBufferSize", procBufferSize)
                    console.log("residualBuffer", residualBuffer)
                    console.log("max fol span", maxFol.folSpan)
                    // console.log(folDDIndex, bufferDDIndex)

                    console.log(folDDIndex)
                    console.log(bufferDDIndex)

                    const crDD = order.crdd;
                    const crDDIndex = masters.WorkingCalender.find((data: any) => {
                        return data.ccrId == maxFol.ccr_id && data.PlId == order.plid && new Date(data.wd) >= new Date(crDD)
                    })?.lno || -Infinity;


                    const crddFlag = 0
                    let maxDate;

                    if (crddFlag) {
                        maxDate = max([folDD, bufferDD, crDD]);
                    } else {
                        maxDate = max([folDD, bufferDD]);
                    }

                    // console.log(maxDate);

                    order.cdd = format(maxDate, 'yyyy-MM-dd');
                    console.log(folDDIndex, bufferDDIndex, crDDIndex)
                    order.dueDateLno = Math.max(folDDIndex, bufferDDIndex, crDDIndex);
                    order.maxFol = maxFol;

                    // console.log("maxDate", format(maxDate, 'yyyy-MM-dd'));
                    const marketLeadTime = masters.MarketLeadTimeMaster.find((item: any) => {
                        return item.mbot === order.mbot && item.itid === order.itid;
                    });

                    if (marketLeadTime) {
                        // const optimalLeadTime = 
                        const newDate = add(today, {
                            days: marketLeadTime.lt || 0,
                        })
                        order.isOptimalLeadTime = maxDate <= newDate;
                        // console.log(marketLeadTime);
                    }
                }
                return order
            });

            await Promise.all(promises);

            return ordersForDDQ
        }
        catch (err) {
            console.error(err);
            notifyError("Something Went Wrong!");
        }
    }


    const onSave = () => {
        try {
            if (isEditable) {
                const selectedOrders = new Set(gridRef.current.api.getSelectedRows().map((row: any) => row.ok));
                const formattedRoute = formatRoute(selectedRoute);
                const prodBuffer = selectedBuffers[0];
                const procBuffer = selectedBuffers[1];

                const newRows = rows.map((row: any) => {
                    if (selectedOrders.has(row.ok)) {
                        //update the routes in all the orders
                        row.rn = formattedRoute;
                        row.newRoute = selectedRoute;
                        //update the buffers in all the orders
                        row.nprid = prodBuffer?.value
                        row.npcid = procBuffer?.value

                        row.prodc = prodBuffer?.label
                        row.procc = procBuffer?.label

                        row.prSz = prodBuffer?.size;
                        row.pcSz = procBuffer?.size;

                        row.updated = true;
                    }
                    return row
                });

                calculateEstimatedDueDate(newRows).then((data) => {
                    if(data){
                        setRows(data);
                        setSelectedBuffers([])
                        setSelectedRoute([])
                        setRowsSelectedForAssignment(false);
                    }
                })



            }
            setIsEditable(!isEditable);
        }
        catch (err) {
            console.error(err);
            notifyError("Something Went Wrong!");
        }
    }
    const onReset = async () => {
        try {
            const selectedOrders = new Set(gridRef.current.api.getSelectedRows().map((row: any) => row.ok));
            const newRows = [...rows];

            const promises = newRows.map(async (row) => {
                if (selectedOrders.has(row.ok)) {
                    // Unset the modified values
                    row.newRoute = undefined;
                    row.nprid = undefined;
                    row.npcid = undefined;

                    try {
                        // Retrieve route and format it
                        const route = await getRoute(row.rid);
                        row.rn = formatRoute(route);

                        // Retrieve buffer data
                        const buffer: any = await getBuffer([row.prid], [row.pcid]);
                        row.prodc = buffer[0]?.label || "";
                        row.procc = buffer[1]?.label || "";
                        row.prSz = buffer[0]?.size;
                        row.pcSz = buffer[1]?.size;

                        //TODO: reset Estimated Due Date too!
                        row.CCRData = undefined;


                        row.updated = false;
                    } catch (error) {
                        console.error(`Error fetching data for row ${row}:`, error);
                    }
                }
            });

            // Wait for all promises to resolve
            await Promise.all(promises);
            setRows(newRows);
            setSelectedBuffers([])
            setSelectedRoute([])
            setRowsSelectedForAssignment(false);
        }
        catch (err) {
            console.error(err);
            notifyError("Something Went Wrong!");
        }
    }


    const formatRoute = (route: any) => {
        try {
            let formattedRoute: any = []
            route.forEach((route: any) => {
                if (route[1]?.label) {
                    formattedRoute.push(route[1]?.label);
                }
            })
            formattedRoute = formattedRoute.join("/");
            return formattedRoute
        }
        catch (err) {
            console.error(err);
            notifyError("Something Went Wrong!");
        }

    }

    const loadGraph = (selectedRoute: any) => {
        try {
            const ccrIds: any = [];
            selectedRoute.forEach((route: any) => {
                if (route?.[1])
                    ccrIds.push(route[1]?.value);
            })

            const orderLoadOfCCRs: any = {}

            newSelectedRows?.rows?.forEach((order: any) => {
                ccrIds.forEach((ccrId: any) => {
                    const ccr = masters.CCRMaster.find((ccr: any) => {
                        return ccr.ccr_id === ccrId
                    })
                    let ccrWorkingHoursPerDay = ccr.working_hours_per_day || "1";
                    ccrWorkingHoursPerDay = parseInt(ccrWorkingHoursPerDay);

                    const ccrItemTypeMapping = masters?.CCRItemTypeMappingMaster.find((ccr: any) => ccr.ccrId === ccrId && ccr.it == order.itid)
                    // console.log(JSON.parse(JSON.stringify(orderLoadOfCcrs)))

                    const orderLoadInDays = ((orderLoadOfCCRs[ccrId]?.orderLoad || 0) * 1.0) + ((ccrItemTypeMapping?.tt || 1) * order.pcqty) / (ccrWorkingHoursPerDay * 60);

                    const ccrFolInDays = masters.FOL[ccrId]?.fol;

                    const today: any = new Date();
                    today.setHours(0, 0, 0, 0);

                    // TODO: Check if plant id is also to be matched
                    const latestWorkingDayLno = masters.WorkingCalender.find((data: any) => {
                        return new Date(data.wd) >= today && data.ccrId == ccrId
                    })?.lno;

                    const folIndex = latestWorkingDayLno + ccrFolInDays - 1;

                    const folDD: any = masters.WorkingCalender.find((data: any) => {
                        return data.lno == folIndex && data.ccrId == ccrId
                    })?.wd;



                    const diffDays: any = dateDiffInDays(today, new Date(folDD));

                    orderLoadOfCCRs[ccrId] = {
                        ccrId,
                        ccr_name: ccr.ccr_name,
                        orderLoad: orderLoadInDays,
                        ccrFolInDays: diffDays
                    }
                })
            });

            // console.log(JSON.parse(JSON.stringify(orderLoadOfCCRs)))


            setChartData(Object.values(orderLoadOfCCRs).map((order: any) => {
                return { ...order, orderLoad: Math.ceil(order.orderLoad) }
            }))
        }
        catch (err) {
            console.error(err);
            notifyError("Something Went Wrong!");
        }
    }

    // Label formatter function
    function labelFormatter(params: any) {
        try {
            const today = new Date();
            const value = parseInt(params.value);

            // console.log(today)

            if (value == 0) {
                return format(today, "dd MMM yy");  // Returns today's date
            } else if (value > 0) {
                // const futureDate = addDays(today, value);
                const futureDate = add(today, { days: value });
                // console.log(value,futureDate)
                return format(futureDate, "dd MMM yy");  // Returns future date
            }
        }
        catch (err) {
            console.error(err);
            notifyError("Something Went Wrong!");
        }
    }




    function dateDiffInDays(date1: any, date2: any) {
        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        const date1Ms = date1.getTime();
        const date2Ms = date2.getTime();

        // Calculate the difference in milliseconds
        const diffMs = Math.abs(date1Ms - date2Ms);

        // Convert back to days and return
        return Math.round(diffMs / oneDay);
    }

    useEffect(() => {
        loadGraph(selectedRoute)
    }, [selectedRoute])

    useEffect(() => {
        const filteredRows = rows?.filter((row: any) => {
            return row.cdd ? false : true
        }) || [];
        setDisabled(filteredRows.length != 0)
    }, [rows])

    const onConfirm = async () => {
        try {
            const bufferAssignmentObj: any = [];
            const routeAssignmentObj: any = []
            rows.forEach((row: any) => {
                if (row.updated) {
                    bufferAssignmentObj.push({
                        ok: row.ok,
                        proc_id: row.nprid,
                        prod_id: row.npcid,
                        estdd: row.cdd,
                    })
                    routeAssignmentObj.push({
                        route: row.rn,
                        ok: row.ok,
                        ccrdetails: Object.values(row.CCRData).map((ccr: any) => {
                            const temp = _.cloneDeep(ccr);
                            temp.ccrid = ccr.ccr_id;
                            temp.ol = ccr.orderLoad
                            delete temp["ccr_id"];
                            delete temp["folSpan"];
                            delete temp["orderLoad"];
                            return temp;
                        })
                    })
                }
            })
            console.log("bufferAssignmentObj", bufferAssignmentObj);
            console.log("routeAssignmentObj", routeAssignmentObj);
            if (bufferAssignmentObj.length != 0 || routeAssignmentObj.length != 0) {
                const data = await updateBuffRouteCCREstDate({ bufferData: { ordData: bufferAssignmentObj }, routeData: { orders: routeAssignmentObj } });
                notifySuccess(data.data.msg)
            }
        }
        catch (err) {
            console.log(err)
            notifyError("Something went wrong")
        }
        setConfirmedRows(rows);
    }

    useImperativeHandle(ref, () => ({
        onConfirm: onConfirm
    }));

    const [countOfExceedingLeadTime, countOfTotalExceedingLeadTime] = useMemo(() => {
        const current = rows?.filter((row: any) => {
            return row.isOptimalLeadTime === false
        }).length || 0;
        const total = rows?.length || 0;
        return [current, total]
    }, [rows, newSelectedRows?.rows])


    const isSaveDisabled = useMemo(() => {
        const isDisabled = selectedRoute.some((route: any) => {
            return !route[0] || !route[1];
        });
        return isDisabled;
    }, [selectedRoute, selectedBuffers])

    return (
        <>
            <Allotment vertical separator ref={allotment} snap={false} proportionalLayout={false}>
                <Allotment.Pane preferredSize={rowsSelectedForAssignment ? "30%" : '50%'} key={1}>
                    <Wrapper style={{ margin: 0 }}>
                        <VFTable
                            key="selectedRows"
                            ref={gridRef}
                            tooltipShowDelay={0}
                            gridOptions={options}
                            columnDefs={options.columnDefs}
                            rowData={rows}
                            onSelectionChanged={async (params: GridReadyEvent) => {
                                try {
                                    setIsEditable(false);
                                    setNo(false)
                                    const selected = params.api.getSelectedRows();
                                    if (selected.length) {
                                        setRowsSelectedForAssignment(true);
                                    } else {
                                        setSelectedBuffers([])
                                        setSelectedRoute([])
                                        setRowsSelectedForAssignment(false);
                                        return
                                    }
                                    const selectedRoutes: any = new Set();
                                    const selectedProdBuffer: any = new Set();
                                    const selectedProcBuffer: any = new Set();

                                    selected.forEach((row: any) => {
                                        if (row.newRoute) {
                                            const formattedRoute = formatRoute(row.newRoute);
                                            if (routeLookup.current.get(formattedRoute)) {
                                                selectedRoutes.add(routeLookup.current.get(formattedRoute));
                                            } else {
                                                selectedRoutes.add(JSON.stringify(row.newRoute));
                                            }
                                        }
                                        else if (row.rid) {
                                            selectedRoutes.add(row.rid);
                                        }
                                        else{
                                            selectedRoutes.add(null);
                                        }
                                        if (row.nprid) {
                                            selectedProdBuffer.add(row.nprid);
                                        }
                                        else if (row.prid) {
                                            selectedProdBuffer.add(row.prid);
                                        }
                                        else{
                                            selectedProdBuffer.add(null)
                                        }
                                        if (row.npcid) {
                                            selectedProcBuffer.add(row.npcid);
                                        }
                                        else if (row.pcid) {
                                            selectedProcBuffer.add(row.pcid);
                                        }
                                        else{
                                            selectedProcBuffer.add(null)
                                        }
                                    })
                                    let isAssignmentPossible = true; //if only one order is selected
                                    if (selected.length > 1){
                                        isAssignmentPossible = ([1].includes(selectedRoutes.size)) && ([1].includes(selectedProdBuffer.size)) && ([1].includes(selectedProcBuffer.size))
                                    }
                                    if (!isAssignmentPossible) {
                                        setSelectedBuffers([])
                                        setSelectedRoute([])
                                    }
                                    const routeId = [...selectedRoutes][0]
                                    if(selectedRoutes.size == 0){
                                        setSelectedRoute([])
                                    }
                                    else if (selectedRoutes.size == 1 && routeId != null) {
                                        const routeDetails = await getRoute(routeId);
                                        setSelectedRoute(routeDetails);
                                    }
                                    // TODO: check this condition -> check for null
                                    if (((selectedProdBuffer.size == 1) || (selectedProcBuffer.size == 1))) {
                                        const buffer: any = getBuffer([...selectedProdBuffer], [...selectedProcBuffer]);
                                        setSelectedBuffers(buffer)
                                    }
                                    setNewSelectedRows({ rows: selected, isAssignmentPossible });
                                }
                                catch (err) {
                                    console.error(err);
                                    notifyError("Something Went Wrong!");
                                }
                            }}
                            onColumnPinned={(params: GridReadyEvent) => {
                                params.columnApi.autoSizeAllColumns();
                            }}
                            onGridReady={(params: GridReadyEvent) => {
                                params.columnApi.autoSizeAllColumns();
                            }}

                        />
                    </Wrapper>
                </Allotment.Pane>
                {rowsSelectedForAssignment &&
                    <Allotment.Pane
                        // preferredSize={routeDivHeight - 50} 
                        preferredSize={210}
                        key={2}
                    >
                        {/* <Wrapper style={{ margin: 0, filter:"blur(3px)" }} > */}
                        <Wrapper style={{ margin: 0, filter: newSelectedRows.isAssignmentPossible ? "unset" : "blur(3px)" }} >
                            <div ref={routeDiv} style={{ height: "100%", background: "white", boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px", margin: "20px 10px", padding: "1rem", position: "relative", overflow: "auto" }}>
                                <div style={{ display: "flex", position: "absolute", right: "1rem", gap: "0.5rem" }}>
                                    <VFButton
                                        themeUi={theme}
                                        onClick={onSave}
                                        disabled={isEditable ? isSaveDisabled : false}
                                        style={{ fontSize: "10px", width: "60px", height: "20px", padding: "0 1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                                        {isEditable ? <> <img src="/assets/img/mto/dueDateQuotation/save-icon.svg" />Save</> : <> <img src="/assets/img/mto/dueDateQuotation/edit-icon.svg" /> Edit</>}
                                    </VFButton>
                                    <VFButtonOutline themeUi={theme} onClick={onReset} style={{ fontSize: "10px", width: "60px", height: "20px", padding: "0 1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}><img src="/assets/img/mto/dueDateQuotation/reset-icon.svg" /> Reset</VFButtonOutline>
                                </div>
                                <div style={{ display: "flex", gap: "2rem" }}>
                                    <div style={{ flex: "2" }}>
                                        <h3 style={{ margin: "1rem 0" }}>Route Assignment</h3>
                                        <RouteAssignment
                                            isEditable={isEditable}
                                            theme={theme}
                                            ccrGroupMaster={masters.ccrGroups}
                                            selectedRoutes={selectedRoute}
                                            setSelectedRoutes={setSelectedRoute}
                                        />
                                    </div>
                                    <div style={{ flex: "1" }}>
                                        <h3 style={{ margin: "1rem 0" }}>Buffer Assignment</h3>
                                        <BufferAssignment
                                            isEditable={isEditable}
                                            theme={theme}
                                            bufferMaster={masters}
                                            selectedBuffers={selectedBuffers}
                                            setSelectedBuffers={setSelectedBuffers}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                        {!newSelectedRows.isAssignmentPossible &&
                            <BlurCover style={{ borderRadius: "0", left: 0, width: "100%" }}>
                                <CardCover>
                                    <DashedCard style={{ width: "500px" }}>
                                        <MessageText style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "100%", gap: "2rem" }}>
                                            {!no ? <>
                                                <div>
                                                    Selected orders have different routes and buffer.<br />
                                                    Do you want to edit these orders together?
                                                </div>
                                                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                                                    <VFButtonOutline
                                                        themeUi={theme}
                                                        onClick={() => {
                                                            setNewSelectedRows({ ...newSelectedRows, isAssignmentPossible: true })
                                                            setSelectedBuffers([])
                                                            setSelectedRoute([])
                                                        }}
                                                    >
                                                        Yes
                                                    </VFButtonOutline>
                                                    <VFButtonOutline themeUi={theme} onClick={() => { setNo(true) }}>No</VFButtonOutline>
                                                </div></> :
                                                <div>Selected orders have different route and buffer.</div>
                                            }
                                        </MessageText>
                                    </DashedCard>
                                </CardCover>
                            </BlurCover>
                        }

                    </Allotment.Pane>
                }
                {rowsSelectedForAssignment &&
                    <Allotment.Pane preferredSize={'33%'} key={3}>
                        <Wrapper style={{ padding: "20px 0 10px 0", margin: 0 }}>
                            <div style={{ height: "100%", overflow: "hidden", display: "flex", width: "100%" }}>
                                <div style={{ display: 'flex', flexDirection: "column", width: countOfExceedingLeadTime != 0 ? "80%" : "100%", background: "white", boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px", margin: "0 1rem 1rem 1rem" }}>
                                    <h3 style={{ margin: "1rem", borderBottom: "1px dashed black" }}>CCR Load Chart</h3>
                                    <AgChartsReact options={chartOptions} containerStyle={{ height: "80%" }} />
                                </div>
                                {countOfExceedingLeadTime != 0 && <div style={{ width: "20%", margin: "0 1rem" }}>
                                    <WarningContainer>
                                        <WarningHeader >
                                            <img src="/assets/img/mto/dueDateQuotation/warning-outlined.svg" /> <h3 style={{ margin: 0, marginLeft: "1rem" }}>Warning!</h3>
                                        </WarningHeader>
                                        <WarningBody>
                                            <WarningText>
                                                Calculated due dates in {countOfExceedingLeadTime}/{countOfTotalExceedingLeadTime} are exceeding the market operating lead time
                                            </WarningText>
                                        </WarningBody>
                                    </WarningContainer>
                                </div>}

                            </div>
                        </Wrapper>
                    </Allotment.Pane>
                }
                {!rowsSelectedForAssignment &&
                    <Allotment.Pane preferredSize={"50%"} key={4}>
                        <Wrapper style={{ justifyContent: "center", alignItems: "center", background: "white", margin: "20px 10px", height: "calc(100% - 30px)", color: "grey", boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px" }}>
                            <div style={{ fontSize: "16px" }}>No Data to Display</div>
                            <div style={{ fontSize: "12px" }}>Please Select Orders to Process</div>
                        </Wrapper>
                    </Allotment.Pane>
                }
            </Allotment>
        </>
    )
})

export default Step2