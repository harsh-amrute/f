import React, { Fragment, useState } from "react";
import "allotment/dist/style.css";
import {
    SCChartContainer, SCHorizontalDivider
} from '../styles';
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import procData from "../ProcurementData";
import { Order } from "../../../../../../types/MTO";

const GraphView = () => {

    // const [date, setDate] = useState("19 April 2024 - 18 July 2024")
    const [date] = useState("19 April 2024 - 18 July 2024")

    // const [rawData, setRawData] = useState(procData);
    const [rawData] = useState(procData);


    const calculateDaysDifference = (releaseDateStr: string) => {
        const releaseDate = new Date(releaseDateStr);
        const baseDate = new Date("2024-06-01");
        const diffInTime = releaseDate.getTime() - baseDate.getTime();
        const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
        return diffInDays;
    };

    function groupByWeek(data: Order[]) {
        const weekRanges = [
            { days_range: "0-7 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "8-14 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "15-21 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "22-28 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "29-35 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "36-42 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "43-49 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "50-56 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "57-63 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "64-70 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "71-77 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "78-84 days", sih: 0, sit: 0, opo: 0, rmSh: 0 },
            { days_range: "85-90 days", sih: 0, sit: 0, opo: 0, rmSh: 0 }
        ];

        data.forEach(order => {
            const releaseDate = new Date(order.rd);
            const daysDifference = calculateDaysDifference(releaseDate.toString());
            const weekIndex = Math.floor(daysDifference / 7);

            if (weekIndex >= 0 && weekIndex < weekRanges.length) {
                weekRanges[weekIndex].sih += order.sih;
                weekRanges[weekIndex].sit += order.sit;
                weekRanges[weekIndex].opo += order.opo;
                weekRanges[weekIndex].rmSh += order.rmSh;
            }
        });
        return weekRanges;
    }

    const updatedData = groupByWeek(rawData);

    const options: AgChartOptions = ({


        data: updatedData,

        series: [
            {
                type: "bar",
                xKey: "days_range",
                yKey: "sih",
                yName: "Orders with fullkit (On hand Stock)",
                stacked: true,
                strokeOpacity: 0,
                strokeWidth: 6,
                fill: "#F4BD8E",
                tooltip: {
                    renderer: function ({ datum, xKey }) {
                        console.log("datum", datum)
                        return `
                    <div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
                        ${datum[xKey]}
                    </div>
                    <div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">
                    
                    <div>
                        <div style="display: flex;">
                            <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F4BD8E">
                            </div>
                            <div style="display:flex ; width: 100%; justify-content: space-between">
                                <div>Orders with fullkit (On hand Stock)
                                </div>
                                <div> ${datum.sih}
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F09241"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With Full Kit (incl. In Transit Inventory + In QC)</div><div>${datum.sit}</div></div></div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With Full Kit (incl. In Open Orders )</div><div>${datum.opo}</div></div></div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With RM /PM Shortage</div><div> ${datum.rmSh}</div></div></div>
                    </div>
                    </div>`;
                    },
                },
            },
            {
                type: "bar",
                xKey: "days_range",
                yKey: "sit",
                yName: "Orders With Full Kit (incl. In Transit Inventory + In QC )",
                stacked: true,
                fill: '#F09241',
                strokeOpacity: 0,
                strokeWidth: 6,
                tooltip: {
                    renderer: function ({ datum, xKey }) {
                        console.log("datum", datum)
                        return `
                    <div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
                        ${datum[xKey]}
                    </div>
                    <div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">
                    
                    <div>
                        <div style="display: flex;">
                            <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F4BD8E">
                            </div>
                            <div style="display:flex ; width: 100%; justify-content: space-between">
                                <div>Orders with fullkit (On hand Stock)
                                </div>
                                <div> ${datum.sih}
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F09241"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With Full Kit (incl. In Transit Inventory + In QC)</div><div>${datum.sit}</div></div></div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With Full Kit (incl. In Open Orders )</div><div>${datum.opo}</div></div></div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With RM /PM Shortage</div><div> ${datum.rmSh}</div></div></div>
                    </div>
                    </div>`;
                    },
                },
            },
            {
                type: "bar",
                xKey: "days_range",
                yKey: "opo",
                yName: "Orders With Full Kit (incl. In Open Orders )",
                fill: "#AD5000",
                stacked: true,
                strokeOpacity: 0,
                strokeWidth: 6,
                tooltip: {
                    renderer: function ({ datum, xKey }) {
                        console.log("datum", datum)
                        return `
                    <div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
                        ${datum[xKey]}
                    </div>
                    <div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">
                    
                    <div>
                        <div style="display: flex;">
                            <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F4BD8E">
                            </div>
                            <div style="display:flex ; width: 100%; justify-content: space-between">
                                <div>Orders with fullkit (On hand Stock)
                                </div>
                                <div> ${datum.sih}
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F09241"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With Full Kit (incl. In Transit Inventory + In QC)</div><div>${datum.sit}</div></div></div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With Full Kit (incl. In Open Orders )</div><div>${datum.opo}</div></div></div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With RM /PM Shortage</div><div> ${datum.rmSh}</div></div></div>
                    </div>
                    </div>`;
                    },

                },
            },
            {
                type: "bar",
                xKey: "days_range",
                yKey: "rmSh",
                yName: "Orders With RM /PM Shortage",
                stacked: true,
                fill: "#6A3001",
                strokeOpacity: 0,
                strokeWidth: 6,
                tooltip: {
                    renderer: function ({ datum, xKey }) {
                        console.log("datum", datum)
                        return `
                    <div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
                        ${datum[xKey]}
                    </div>
                    <div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">
                    <div>
                        <div style="display: flex;">
                            <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F4BD8E">
                            </div>
                            <div style="display:flex ; width: 100%; justify-content: space-between">
                                <div>Orders with fullkit (On hand Stock)
                                </div>
                                <div> ${datum.sih}
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F09241"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With Full Kit (incl. In Transit Inventory + In QC)</div><div>${datum.sit}</div></div></div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With Full Kit (incl. In Open Orders )</div><div>${datum.opo}</div></div></div>
                        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Orders With RM /PM Shortage</div><div> ${datum.rmSh}</div></div></div>
                    </div>
                    </div>`;
                    },

                },
            },

        ],


    });

    return (


        <>
            <SCChartContainer height={"600px"}>

                <SCHorizontalDivider />
                <div style={{ height: '90%', width: '100%' }}>
                    <div className="title" style={{ backgroundColor: 'white', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontSize: '14px', fontWeight: 500, textAlign: 'center' }}>
                            RM / PM Orderwise Coverage {`(${date})`}
                        </div>
                    </div>
                    <SCHorizontalDivider />
                    <AgChartsReact options={options} />

                </div>

            </SCChartContainer>


        </>

    )
};

export default GraphView;
