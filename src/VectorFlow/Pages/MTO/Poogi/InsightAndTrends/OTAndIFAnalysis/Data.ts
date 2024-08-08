import { ColDef } from "ag-grid-enterprise";

export function TooltipRenderer({ datum, xKey }: any) {
    return `
<div style="width: 180px">
<div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
    ${datum[xKey]}
</div>
<div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">

<div>
    <div style="display: flex;">
        <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F4BD8E">
        </div>
        <div style="display:flex ; width: 100%; justify-content: space-between">
            <div>1-2 days
            </div>
            <div> ${datum['1-2 days']}
            </div>
        </div>
    </div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F09241"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>3-7 days</div><div>${datum["3-7 days"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>8-15 days</div><div>${datum["8-15 days"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>16-30 days</div><div> ${datum["16-30 days"]}</div></div></div>
</div>
</div>
`
}
export function TooltipRendererIF({ datum, xKey }: any) {
    return `
<div style="width: 180px">
<div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
    ${datum[xKey]}
</div>
<div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">

<div>
    <div style="display: flex;">
        <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F4BD8E">
        </div>
        <div style="display:flex ; width: 100%; justify-content: space-between">
            <div>0-20%
            </div>
            <div> ${datum['0-20%']}
            </div>
        </div>
    </div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F09241"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>20%-40%</div><div>${datum["20%-40%"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>40%-60%</div><div>${datum["40%-60%"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>60%-80%</div><div> ${datum["60%-80%"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>80%-100%</div><div> ${datum["80%-100%"]}</div></div></div>
</div>
</div>
`
}

export const data: any = [
    { "week": 'Feb 2024-WK 3', "1-2 days": 12, "3-7 days": 8, "8-15 days": 5, "16-30 days": 3 },
    { "week": 'Feb 2024-WK 4', "1-2 days": 10, "3-7 days": 7, "8-15 days": 4, "16-30 days": 2 },
    { "week": 'Mar 2024-WK 1', "1-2 days": 18, "3-7 days": 11, "8-15 days": 8, "16-30 days": 6 },
    { "week": 'Mar 2024-WK 2', "1-2 days": 14, "3-7 days": 9, "8-15 days": 6, "16-30 days": 4 },
    { "week": 'Mar 2024-WK 3', "1-2 days": 20, "3-7 days": 12, "8-15 days": 9, "16-30 days": 7 },
    { "week": 'Mar 2024-WK 4', "1-2 days": 16, "3-7 days": 10, "8-15 days": 7, "16-30 days": 5 },
]
export const IFdata: any = [
    { "week": 'Feb 2024-WK 3', "0-20%": 12, "20%-40%": 8, "40%-60%": 5, "60%-80%": 3, "80%-100%": 2 },
    { "week": 'Feb 2024-WK 4', "0-20%": 10, "20%-40%": 7, "40%-60%": 4, "60%-80%": 2, "80%-100%": 1 },
    { "week": 'Mar 2024-WK 1', "0-20%": 18, "20%-40%": 11, "40%-60%": 8, "60%-80%": 6, "80%-100%": 0 },
    { "week": 'Mar 2024-WK 2', "0-20%": 14, "20%-40%": 9, "40%-60%": 6, "60%-80%": 4, "80%-100%": 4 },
    { "week": 'Mar 2024-WK 3', "0-20%": 20, "20%-40%": 12, "40%-60%": 9, "60%-80%": 7, "80%-100%": 0 },
    { "week": 'Mar 2024-WK 4', "0-20%": 16, "20%-40%": 10, "40%-60%": 7, "60%-80%": 5, "80%-100%": 2 },
]

export function createSeriesDataIF() {
    const seriesData: any = [];
    const labels = [
        { text: "0-20%", color: "#F5B279", key: "0-20%" },
        { text: "20%-40%", color: "#F09241", key: "20%-40%" },
        { text: "40%-60%", color: "#E36A00", key: "40%-60%" },
        { text: "60%-80%", color: "#AD5000", key: "60%-80%" },
        { text: "80%-100%", color: "#6A3000", key: "80%-100%" }
    ];

    for (let i = 0; i < labels.length; i++) {
        seriesData.push({
            type: "bar",
            xKey: "week",
            yKey: labels[i].key,
            yName: labels[i].text,
            strokeOpacity: 0,
            fill: labels[i].color,
            strokeWidth: 0.5,
            stacked: true,
            tooltip: {
                renderer: TooltipRendererIF,
            },
        });
    }

    return seriesData;
}
export function createSeriesData() {
    const seriesData: any = [];
    const labels = [
        { text: "1-2 days", color: "#F5B279", key: "1-2 days" },
        { text: "3-7 days", color: "#F09241", key: "3-7 days" },
        { text: "8-15 days", color: "#E36A00", key: "8-15 days" },
        { text: "16-30 days", color: "#AD5000", key: "16-30 days" },
    ];

    for (let i = 0; i < labels.length; i++) {
        seriesData.push({
            type: "bar",
            xKey: "week",
            yKey: labels[i].key,
            yName: labels[i].text,
            strokeOpacity: 0,
            fill: labels[i].color,
            strokeWidth: 0.5,
            stacked: true,
            tooltip: {
                renderer: TooltipRenderer,
            },
        });
    }

    return seriesData;
}

export const APIMock = {
    grid: [
        {
            tags: 1,
            bpp: 100,
            plnt: "A",
            order_id: "123",
            order_type: "abc",
            lineitmid: "321",
            item_code: "a",
            item_desc: "desc",
            oq: 120,
            due_dt: "2024-04-24",
            orclsdt: "2024-04-24",
            ex_delay: 16,
            ex_short: 19,
            cus_code: 101,
            cus_name: "Zara",
            crdd: "2024-04-24",
            release_dt: "2024-04-24",
            or_Att1: "NA",
            or_Att2: "NA",
            or_Att3: "NA",
            mjr_r: "packing",
            min_r: "ABC"
        },
        {
            tags: 1,
            bpp: 100,
            plnt: "A",
            order_id: "123",
            order_type: "abc",
            lineitmid: "321",
            item_code: "a",
            item_desc: "desc",
            oq: 120,
            due_dt: "2024-04-24",
            orclsdt: "2024-04-24",
            ex_delay: 16,
            ex_short: 19,
            cus_code: 101,
            cus_name: "Zara",
            crdd: "2024-04-24",
            release_dt: "2024-04-24",
            or_Att1: "NA",
            or_Att2: "NA",
            or_Att3: "NA",
            mjr_r: "packing",
            min_r: "ABC"
        },
        {
            tags: 2,
            bpp: 100,
            plnt: "A",
            order_id: "123",
            order_type: "abc",
            lineitmid: "321",
            item_code: "a",
            item_desc: "desc",
            oq: 120,
            due_dt: "2024-04-24",
            orclsdt: "2024-04-24",
            ex_delay: 16,
            ex_short: 19,

            cus_code: 101,
            cus_name: "Zara",
            crdd: "2024-04-24",
            release_dt: "2024-04-24",
            or_Att1: "NA",
            or_Att2: "NA",
            or_Att3: "NA",
            mjr_r: "packing",
            min_r: "ABC"
        },
        {
            tags: 3,
            bpp: 100,
            plnt: "A",
            order_id: "123",
            order_type: "abc",
            lineitmid: "321",
            item_code: "a",
            item_desc: "desc",
            oq: 120,
            due_dt: "2024-04-24",
            orclsdt: "2024-04-24",
            ex_delay: 16,
            ex_short: 19,

            cus_code: 101,
            cus_name: "Zara",
            crdd: "2024-04-24",
            release_dt: "2024-04-24",
            or_Att1: "NA",
            or_Att2: "NA",
            or_Att3: "NA",
            mjr_r: "packing",
            min_r: "ABC"
        },
        {
            tags: 3,
            bpp: 100,
            plnt: "A",
            order_id: "123",
            order_type: "abc",
            lineitmid: "321",
            item_code: "a",
            item_desc: "desc",
            oq: 120,
            due_dt: "2024-04-24",
            orclsdt: "2024-04-24",
            ex_delay: 16,
            ex_short: 19,

            cus_code: 101,
            cus_name: "Zara",
            crdd: "2024-04-24",
            release_dt: "2024-04-24",
            or_Att1: "NA",
            or_Att2: "NA",
            or_Att3: "NA",
            mjr_r: "packing",
            min_r: "ABC"
        },
        {
            tags: 3,
            bpp: 100,
            plnt: "A",
            order_id: "123",
            order_type: "abc",
            lineitmid: "321",
            item_code: "a",
            item_desc: "desc",
            oq: 120,
            due_dt: "2024-04-24",
            orclsdt: "2024-04-24",
            ex_delay: 16,
            ex_short: 19,

            cus_code: 101,
            cus_name: "Zara",
            crdd: "2024-04-24",
            release_dt: "2024-04-24",
            or_Att1: "NA",
            or_Att2: "NA",
            or_Att3: "NA",
            mjr_r: "packing",
            min_r: "ABC"
        },
    ],
    graph: {
        otif_graph: {
            start: '1 May 2024',
            end: '1 Aug 2024',
            data: [
                {
                    otif_plus: 60,
                    otif: 50,
                    x_label: 'May 2024'

                },
                {
                    otif_plus: 60,
                    otif: 50,
                    x_label: 'Jun 2024'

                },
                {
                    otif_plus: 42,
                    otif: 30,
                    x_label: 'Jul 2024 - wk 1'
                },
                {
                    otif_plus: 42,
                    otif: 30,
                    x_label: 'Jul 2024 - wk 2'
                },
                {
                    otif_plus: 42,
                    otif: 30,
                    x_label: 'Jul 2024 - wk 3'
                },
                {
                    otif_plus: 42,
                    otif: 30,
                    x_label: 'Jul 2024 - wk 4'
                }
            ]
        },
        ot_n_if_graph: {
            start: '1 Jun 2024',
            end: '4 Aug 2024',
            data: [
                {
                    if: 60,
                    ot: 50,
                    x_label: 'Jun 2024'

                },
                {
                    if: 115,
                    ot: 45,
                    x_label: 'Jul 2024'
                },
                {
                    if: 42,
                    ot: 30,
                    x_label: 'Aug 2024 - wk 1'
                }
            ]
        },
    }
};
export const gridColumnConfig = [
    {
        cc: "tags",
        cp: 0,
        hd: "Tags",
        v: true,
        cla: "center",
        scc: "tags"
    },
    {
        cc: "bpp",
        cp: 1,
        hd: "BPP",
        v: true,
        cla: "center",
        scc: "bpp",
    },
    {
        cc: "plnt",
        cp: 2,
        hd: "Plant",
        v: true,
        cla: "center",
        scc: "plnt",
    },
    {
        cc: "order_id",
        cp: 3,
        hd: "Order Id",
        v: true,
        cla: "center",
        scc: "order_id",
    },
    {
        cc: "order_type",
        cp: 4,
        hd: "Order Type",
        v: true,
        cla: "center",
        scc: "order_type",
    },
    {
        cc: "lineitmid",
        cp: 5,
        hd: "Line Item Id",
        v: true,
        cla: "center",
        scc: "lineitmid",
    },
    {
        cc: "item_code",
        cp: 6,
        hd: "Item Code",
        v: true,
        cla: "center",
        scc: "item_code",
    },
    {
        cc: "item_desc",
        cp: 7,
        hd: "Item Description",
        v: true,
        cla: "center",
        scc: "item_desc",
    },
    {
        cc: "oq",
        cp: 8,
        hd: "Order Quantity",
        v: true,
        cla: "center",
        scc: "oq",
    },
    {
        cc: "due_dt",
        cp: 9,
        hd: "Due Date",
        v: true,
        cla: "center",
        scc: "due_dt",
    },
    {
        cc: "orclsdt",
        cp: 10,
        hd: "Order Closing Date",
        v: true,
        cla: "center",
        scc: "orclsdt",
    },
    {
        cc: "ex_delay",
        cp: 11,
        hd: "Extend Of Delay (In Days)",
        v: true,
        cla: "center",
        scc: "ex_delay",
    },
    {
        cc: "ex_short",
        cp: 12,
        hd: "Extend Of Shortage",
        v: true,
        cla: "center",
        scc: "ex_short",
    },
    {
        cc: "cus_code",
        cp: 13,
        hd: "Customer Code",
        v: true,
        cla: "center",
        scc: "cus_code",
    },
    {
        cc: "cus_name",
        cp: 14,
        hd: "Customer Name",
        v: true,
        cla: "center",
        scc: "cus_name",
    },
    {
        cc: "crdd",
        cp: 15,
        hd: "CRDD",
        v: true,
        cla: "center",
        scc: "crdd",
    },
    {
        cc: "release_dt",
        cp: 16,
        hd: "Release Date",
        v: true,
        cla: "center",
        scc: "release_dt",
    },
    {
        cc: "or_Att1",
        cp: 17,
        hd: "Order Attribute 1",
        v: true,
        cla: "center",
        scc: "or_Att1",
    },
    {
        cc: "or_Att2",
        cp: 18,
        hd: "Order Attribute 2",
        v: true,
        cla: "center",
        scc: "or_Att2",
    },
    {
        cc: "or_Att3",
        cp: 19,
        hd: "Order Attribute 3",
        v: true,
        cla: "center",
        scc: "or_Att3",
    },
    {
        cc: "mjr_r",
        cp: 20,
        hd: "Major Reason",
        v: true,
        cla: "center",
        scc: "mjr_r",
    },
    {
        cc: "min_r",
        cp: 21,
        hd: "Minor Reason",
        v: true,
        cla: "center",
        scc: "min_r",
    },

];






export const getMyColumnDefinitions = (labels: any): ColDef[] => {

    const labelKeys = labels.map((label: any) => label.key);

    const columns: ColDef[] = [
        {
            headerName: 'Week',
            field: 'week',
            sortable: true,
            filter: true,
            width: 150,
        },
        ...labelKeys.map((key: any) => ({
            headerName: key,
            field: key,
            sortable: true,
            filter: true,
            width: 100,

        })),
    ];

    return columns;
};