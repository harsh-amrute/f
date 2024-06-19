<<<<<<< HEAD
import React, { Fragment, useState } from "react";
import "allotment/dist/style.css";
import { AgChartOptions } from "ag-charts-community";
import ActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import GridView from "./GridView";
import GraphView from "./GraphView";

const RMPM = () => {

    const [isGridView, setIsGridView] = useState(false)


    const options: AgChartOptions = ({
        title: {
            text: "Apple's Revenue by Product Category",
        },
        subtitle: {
            text: "In Billion U.S. Dollars",
        },
        data: [
            {
                quarter: "Q1'18",

                mac: 16,
                ipad: 14,
                wearables: 12,
                services: 20,
            },
            {
                quarter: "Q1444'18",

                mac: 16,
                ipad: 14,
                wearables: 12,
                services: 20,
            },
            {
                quarter: "Q14'18",

                mac: 16,
                ipad: 14,
                wearables: 12,
                services: 20,
            },
            {
                quarter: "Q144'18",

                mac: 16,
                ipad: 14,
                wearables: 12,
                services: 20,
            },
            {
                quarter: "Q1333'18",

                mac: 16,
                ipad: 14,
                wearables: 12,
                services: 20,
            },
            {
                quarter: "Q33'18",

                mac: 16,
                ipad: 14,
                wearables: 12,
                services: 20,
            },
            {
                quarter: "Q2'18",

                mac: 20,
                ipad: 14,
                wearables: 12,
                services: 30,
            },
            {
                quarter: "Q3'18",

                mac: 20,
                ipad: 18,
                wearables: 14,
                services: 36,
            },
            {
                quarter: "Q4'18",

                mac: 24,
                ipad: 14,
                wearables: 14,
                services: 36,
            },
            {
                quarter: "Q1'19",

                mac: 18,
                ipad: 16,
                wearables: 18,
                services: 26,
            },
            {
                quarter: "Q2'19",

                mac: 20,
                ipad: 16,
                wearables: 18,
                services: 40,

            },
            {
                quarter: "Q3'19",

                mac: 22,
                ipad: 18,
                wearables: 24,
                services: 42,
            },
            {
                quarter: "Q4'19",

                mac: 22,
                ipad: 14,
                wearables: 20,
                services: 40,
            },
        ],


        series: [
            {
                lineDash: [20, 30, 40],
                type: "bar",
                xKey: "quarter",
                yKey: "mac",
                yName: "Mac",
                stacked: true,
                strokeOpacity: 0,
                strokeWidth: 4,
            },
            {
                type: "bar",
                xKey: "quarter",
                yKey: "ipad",
                yName: "iPad",
                stacked: true,
                fill: '#F09241',
                strokeOpacity: 0,
                strokeWidth: 4

            },
            {
                type: "bar",
                xKey: "quarter",
                yKey: "wearables",
                yName: "Wearables",
                fill: "#F4BD8E",
                stacked: true,
                strokeOpacity: 0,
                strokeWidth: 4,



            },
            {
                type: "bar",
                xKey: "quarter",
                yKey: "services",
                yName: "Services",
                stacked: true,
                fill: "#6A3001",
                strokeOpacity: 0,
                strokeWidth: 4,


            },

        ],


    });



    return (


        <>
            <ActionToolBar
                comp={"rmpm"}
                setIsGridView={setIsGridView}
                isGridView={isGridView}
            />


            {
                (isGridView) ? <GridView /> : <GraphView />

            }

        </>

    )
};

export default RMPM;
=======
import { useState } from 'react'
import ActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import GridView from './GridView/GridView'
import GraphView from './GraphView/GraphView';

const RMPM = () => {

    const [isGridView, setIsGridView] = useState(false);
    return (
        <>
            Graph View
            <ActionToolBar comp={"rmpm"} isGridView={isGridView} setIsGridView={setIsGridView} />
            {(isGridView) ? <GridView /> : <GraphView />}
        </>
    )
}
export default RMPM
>>>>>>> T_1901_Procurement_RM_PM_1
