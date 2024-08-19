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
        <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #418D18">
        </div>
        <div style="display:flex ; width: 100%; justify-content: space-between">
            <div>Annealing-Rolling
            </div>
            <div> ${datum['Annealing-Rolling']}
            </div>
        </div>
    </div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #9D9797"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Planning</div><div>${datum["Planning"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #EBBF2C"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Annealing</div><div>${datum["Annealing"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F04D4D"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Annealing-Furnace</div><div> ${datum["Annealing-Furnace"]}</div></div></div>
</div>
</div>
`
}
export function TooltipRendererIF({ datum, xKey }: any) {

    console.log('datum', datum['Sales'])
    return `
<div style="width: 180px">
<div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
    ${datum[xKey]}
</div>
<div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">

<div>
    <div style="display: flex;">
        <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #418D18">
        </div>
        <div style="display:flex ; width: 100%; justify-content: space-between">
            <div>Sales
            </div>
            <div> ${datum['Sales']}
            </div>
        </div>
    </div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #9D9797"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Line Overloaded</div><div>${datum["Line Overloaded"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #EBBF2C"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Quality</div><div>${datum["Quality"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F04D4D"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Packing</div><div> ${datum["Packing"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #3876FF"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Coating Liquid NA</div><div> ${datum["Coating Liquid Not Available"]}</div></div></div>
</div>
</div>
`
}

export const OFdata: any = [
    { "month": 'Dec 2023', "Annealing-Rolling": 12, "Planning": 8, "Annealing": 5, "Annealing-Furnace": 3 },
    { "month": 'Jan 2024', "Annealing-Rolling": 10, "Planning": 7, "Annealing": 4, "Annealing-Furnace": 2 },
    { "month": 'Feb 2024', "Annealing-Rolling": 18, "Planning": 11, "Annealing": 8, "Annealing-Furnace": 6 },
    { "month": 'Mar 2024', "Annealing-Rolling": 14, "Planning": 9, "Annealing": 6, "Annealing-Furnace": 4 },
]
export const IFdata: any = [
    { "month": 'Dec 2023', "Sales": 12, "Line Overloaded": 8, "Quality": 5, "Packing": 3, "Coating Liquid Not Available": 2 },
    { "month": 'Jan 2024', "Sales": 10, "Line Overloaded": 7, "Quality": 4, "Packing": 2, "Coating Liquid Not Available": 1 },
    { "month": 'Feb 2024', "Sales": 18, "Line Overloaded": 11, "Quality": 8, "Packing": 6, "Coating Liquid Not Available": 0 },
    { "month": 'Mar 2024', "Sales": 14, "Line Overloaded": 9, "Quality": 6, "Packing": 4, "Coating Liquid Not Available": 4 },
    { "month": 'Apr 2024', "Sales": 20, "Line Overloaded": 12, "Quality": 9, "Packing": 7, "Coating Liquid Not Available": 0 },
]

export function createSeriesDataIF() {
    const seriesData: any = [];
    const labels = [
        { text: "Sales", color: "#418D18", key: "Sales" },
        { text: "Line Overloaded", color: "#9D9797", key: "Line Overloaded" },
        { text: "Quality", color: "#EBBF2C", key: "Quality" },
        { text: "Packing", color: "#F04D4D", key: "Packing" },
        { text: "Coating Liquid Not Available", color: "#3876FF", key: "Coating Liquid Not Available" },
    ];

    for (let i = 0; i < labels.length; i++) {
        seriesData.push({
            type: "line",
            xKey: "month",
            yKey: labels[i].key,
            yName: labels[i].text,
            // strokeOpacity: 0,
            fill: labels[i].color,
            stroke:
                labels[i].color
            ,
            // stroke: "Yellow",
            marker: {
                fill: labels[i].color,
                stroke: labels[i].color,
                // formatter: function (params) {
                //     if (params.datum.y === 0) return { size: 0 }
                // }
            },

            strokeWidth: 2,
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
        { text: "Annealing-Rolling", color: "#418D18", key: "Annealing-Rolling" },
        { text: "Planning", color: "#9D9797", key: "Planning" },
        { text: "Annealing", color: "#EBBF2C", key: "Annealing" },
        { text: "Annealing-Furnace", color: "#F04D4D", key: "Annealing-Furnace" },
    ];

    for (let i = 0; i < labels.length; i++) {
        seriesData.push({
            type: "line",
            xKey: "month",
            yKey: labels[i].key,
            yName: labels[i].text,
            fill: labels[i].color,
            stroke:
                labels[i].color
            ,
            marker: {
                fill: labels[i].color,
                stroke: labels[i].color,
                // formatter: function (params) {
                //     if (params.datum.y === 0) return { size: 0 }
                // }
            },

            strokeWidth: 2,
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