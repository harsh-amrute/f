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
            <div> ${datum['1_2_d']}
            </div>
        </div>
    </div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F09241"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>3-7 days</div><div>${datum["3_7_d"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>8-15 days</div><div>${datum["8_15_d"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>16-30 days</div><div> ${datum["16_30_d"]}</div></div></div>
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
            <div>0%-20%
            </div>
            <div> ${datum['0_2_p']}
            </div>
        </div>
    </div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #F09241"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>20%-40%</div><div>${datum["20_40_p"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>40%-60%</div><div>${datum["40_60_p"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>60%-80%</div><div> ${datum["60_80_p"]}</div></div></div>
    <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #6A3001"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>80%-100%</div><div> ${datum["80_100_p"]}</div></div></div>
</div>
</div>
`
}

export const data: any = [
    { "m": 'Feb 2024-WK 3', "1_2_d": 12, "3_7_d": 8, "8_15_d": 5, "16_30_d": 3 },
    { "m": 'Feb 2024-WK 4', "1_2_d": 10, "3_7_d": 7, "8_15_d": 4, "16_30_d": 2 },
    { "m": 'Mar 2024-WK 1', "1_2_d": 18, "3_7_d": 11, "8_15_d": 8, "16_30_d": 6 },
    { "m": 'Mar 2024-WK 2', "1_2_d": 14, "3_7_d": 9, "8_15_d": 6, "16_30_d": 4 },
    { "m": 'Mar 2024-WK 3', "1_2_d": 20, "3_7_d": 12, "8_15_d": 9, "16_30_d": 7 },
    { "m": 'Mar 2024-WK 4', "1_2_d": 16, "3_7_d": 10, "8_15_d": 7, "16_30_d": 5 },
]
export const IFdata: any = [
    { "m": 'Feb 2024-WK 3', "0_2_p": 12, "20_40_p": 8, "40_60_p": 5, "60_80_p": 3, "80_100_p": 2 },
    { "m": 'Feb 2024-WK 4', "0_2_p": 10, "20_40_p": 7, "40_60_p": 4, "60_80_p": 2, "80_100_p": 1 },
    { "m": 'Mar 2024-WK 1', "0_2_p": 18, "20_40_p": 11, "40_60_p": 8, "60_80_p": 6, "80_100_p": 0 },
    { "m": 'Mar 2024-WK 2', "0_2_p": 14, "20_40_p": 9, "40_60_p": 6, "60_80_p": 4, "80_100_p": 4 },
    { "m": 'Mar 2024-WK 3', "0_2_p": 20, "20_40_p": 12, "40_60_p": 9, "60_80_p": 7, "80_100_p": 0 },
    { "m": 'Mar 2024-WK 4', "0_2_p": 16, "20_40_p": 10, "40_60_p": 7, "60_80_p": 5, "80_100_p": 2 },
]

export function createSeriesDataIF() {
    const seriesData: any = [];
    const labels = [
        { text: "0%-20%", color: "#F5B279", key: "0_2_p" },
        { text: "20%-40%", color: "#F09241", key: "20_40_p" },
        { text: "40%-60%", color: "#E36A00", key: "40_60_p" },
        { text: "60%-80%", color: "#AD5000", key: "60_80_p" },
        { text: "80%-100%", color: "#6A3000", key: "80_100_p" }
    ];

    for (let i = 0; i < labels.length; i++) {
        seriesData.push({
            type: "bar",
            xKey: "m",
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
        { text: "1-2 days", color: "#F5B279", key: "1_2_d" },
        { text: "3-7 days", color: "#F09241", key: "3_7_d" },
        { text: "8-15 days", color: "#E36A00", key: "8_15_d" },
        { text: "16-30 days", color: "#AD5000", key: "16_30_d" },
    ];

    for (let i = 0; i < labels.length; i++) {
        seriesData.push({
            type: "bar",
            xKey: "m",
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
            tags: 0,
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
        cc: "tag",
        cp: 0,
        hd: "Tags",
        v: true,
        cla: "center",
        scc: "tag"
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
        cc: "oid",
        cp: 3,
        hd: "Order Id",
        v: true,
        cla: "center",
        scc: "oid",
      },
      {
        cc: "ot",
        cp: 4,
        hd: "Order Type",
        v: true,
        cla: "center",
        scc: "ot",
      },
      {
        cc: "lid",
        cp: 5,
        hd: "Line Item Id",
        v: true,
        cla: "center",
        scc: "lid",
      },
      {
        cc: "ic",
        cp: 6,
        hd: "Item Code",
        v: true,
        cla: "center",
        scc: "ic",
      },
      {
        cc: "id",
        cp: 7,
        hd: "Item Description",
        v: true,
        cla: "center",
        scc: "id",
      },
      {
        cc: "oqty",
        cp: 8,
        hd: "Order Quantity",
        v: true,
        cla: "center",
        scc: "oqty",
      },
      {
        cc: "dd",
        cp: 9,
        hd: "Due Date",
        v: true,
        cla: "center",
        scc: "dd",
      },
      {
        cc: "cdt",
        cp: 10,
        hd: "Order Closing Date",
        v: true,
        cla: "center",
        scc: "cdt",
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
        cc: "ex_shortage",
        cp: 12,
        hd: "Extend Of Shortage",
        v: true,
        cla: "center",
        scc: "ex_shortage",
      },
      {
        cc: "cc",
        cp: 13,
        hd: "Customer Code",
        v: true,
        cla: "center",
        scc: "cc",
      },
      {
        cc: "cn",
        cp: 14,
        hd: "Customer Name",
        v: true,
        cla: "center",
        scc: "cn",
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
        cc: "rdt",
        cp: 16,
        hd: "Release Date",
        v: true,
        cla: "center",
        scc: "rdt",
      },
      {
        cc: "oattr",
        cp: 17,
        hd: "Order Attribute 1",
        v: true,
        cla: "center",
        scc: "oattr",
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

    const columns: ColDef[] = [
        {
            headerName: 'Week',
            field: 'm',
            sortable: true,
            filter: true,
            width: 150,
        },
        ...labels.map((entry: any) => ({
            headerName: entry.text,
            field: entry.key,
            sortable: true,
            filter: true,
            width: 100,

        })),
    ];

    return columns;
};