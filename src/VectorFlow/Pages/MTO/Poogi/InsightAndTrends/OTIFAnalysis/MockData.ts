export const gridColumnConfig = [
    {
        "cc": "tags",
        "cp": 2,
        "hd": "Tags",
        "v": true,
        "cla": "left",
        "scc": "tags"
    },
    {
        cc: "bpp",
        cp: 1,
        hd: "BPP",
        v: true,
        cla: "left",
        scc: "bpp",
      },
      {
        cc: "plnt",
        cp: 2,
        hd: "Plant",
        v: true,
        cla: "left",
        scc: "plnt",
      },
      {
        cc: "order_id",
        cp: 3,
        hd: "Order Id",
        v: true,
        cla: "left",
        scc: "order_id",
      },
      {
        cc: "order_type",
        cp: 4,
        hd: "Order Type",
        v: true,
        cla: "left",
        scc: "order_type",
      },
      {
        cc: "line_item_id",
        cp: 5,
        hd: "Line Item Id",
        v: true,
        cla: "left",
        scc: "line_item_id",
      },

];

export const graphColumnConfig = {
    otif: [
        { 
            "cc": "wk",
            "cp": 1,
            "hd": "Week",
            "v": true,
            "cla": "left",
            "scc": "wk"
        },
        { 
            "cc": "otif_plus",
            "cp": 1,
            "hd": "Otif % Trends (+3 Days)",
            "v": true,
            "cla": "left",
            "scc": "otif_plus"
        },
        { 
            "cc": "otif",
            "cp": 2,
            "hd": "Otif % Trends",
            "v": true,
            "cla": "left",
            "scc": "otif"
        },
    ],
    ot_n_if: [
        { 
            "cc": "wk",
            "cp": 0,
            "hd": "Week",
            "v": true,
            "cla": "left",
            "scc": "wk"
        },
        { 
            "cc": "ot",
            "cp": 1,
            "hd": "On Time %",
            "v": true,
            "cla": "left",
            "scc": "ot"
        },
        { 
            "cc": "if",
            "cp": 2,
            "hd": "In Full %",
            "v": true,
            "cla": "left",
            "scc": "if"
        },
    ]
}

export const APIMock = {
    grid: [
        {
            tags: {
                if: true,  // both are true to show overlapped tags
                ot: true
            },
            bpp: 100,
            plnt: "A",
            order_id: "123",
            order_type: "abc",
            line_item_id: "321",
            item_code: "a",
            item_desc: "desc",
            order_quantity: 120,
            due_dt: "2024-04-24",
            or_closing_dt: "2024-04-24",
            ex_delay: 16,
            cus_code: 101,
            cus_name: "Zara", 
            crdd: "2024-04-24",
            relese_dt: "2024-04-24",
            or_Att1: "NA",
            or_Att2: "NA",
            or_Att3: "NA",
            mjr_r: "packing",
            min_r: "ABC"
        },
        {
            tags: {
                if: false,   // in case we want to show 'ot' tag only than 'if' will be false
                ot: true
            },
            bpp: 100,
            plnt: "A",
            order_id: "123",
            order_type: "abc",
            line_item_id: "321",
            item_code: "a",
            item_desc: "desc",
            order_quantity: 120,
            due_dt: "2024-04-24",
            or_closing_dt: "2024-04-24",
            ex_delay: 16,
            cus_code: 101,
            cus_name: "Zara", 
            crdd: "2024-04-24",
            relese_dt: "2024-04-24",
            or_Att1: "NA",
            or_Att2: "NA",
            or_Att3: "NA",
            mjr_r: "packing",
            min_r: "ABC"
        },
        {
            tags: {
                if: true,
                ot: false,   // in case we want to show 'if' tag only than 'ot' will be false
            },
            bpp: 100,
            plnt: "A",
            order_id: "123",
            order_type: "abc",
            line_item_id: "321",
            item_code: "a",
            item_desc: "desc",
            order_quantity: 120,
            due_dt: "2024-04-24",
            or_closing_dt: "2024-04-24",
            ex_delay: 16,
            cus_code: 101,
            cus_name: "Zara", 
            crdd: "2024-04-24",
            relese_dt: "2024-04-24",
            or_Att1: "NA",
            or_Att2: "NA",
            or_Att3: "NA",
            mjr_r: "packing",
            min_r: "ABC"
        }
    ],
    graph: {
        otif_graph: [
            {
                otif_plus: 60,
                otif: 50,
                wk: 'Jan-wk1',
                mon: 'Jan',

            },
            {
                otif_plus: 55,
                otif: 45,
                wk: 'Jan-wk2',
                mon: 'Jan',
            },
            {
                otif_plus: 42,
                otif: 30,
                wk: 'Jan-wk3',
                mon: 'Jan',
            },
            {
                otif_plus: 52,
                otif: 40,
                wk: 'Jan-wk4',
                mon: 'Jan',
            },
            {
                otif_plus: 40,
                otif: 35,
                wk: 'Feb-wk1',
                mon: 'Feb',
            },
            {
                otif_plus: 62,
                otif: 40,
                wk: 'Feb-wk2',
                mon: 'Feb',
            },
            {
                otif_plus: 68,
                otif: 50,
                wk: 'Feb-wk3',
                mon: 'Feb',
            },
            {
                otif_plus: 70,
                otif: 55,
                wk: 'Feb-wk4',
                mon: 'Feb',
            },
            {
                otif_plus: 65,
                otif: 50,
                wk: 'Mar-wk1',
                mon: 'Mar',
            },
            {
                otif_plus: 72,
                otif: 60,
                wk: 'Mar-wk2',
                mon: 'Mar',
            },
            {
                otif_plus: 52,
                otif: 40,
                wk: 'Mar-wk3',
                mon: 'Mar',
            },
            {
                otif_plus: 42,
                otif: 30,
                wk: 'Mar-wk4',
                mon: 'Mar',
            },
        ],
        ot_n_if_graph:[
            {
                if: 60,
                ot: 50,
                wk: 'Jan-wk1',
                mon: 'Jan',

            },
            {
                if: 55,
                ot: 45,
                wk: 'Jan-wk2',
                mon: 'Jan',
            },
            {
                if: 42,
                ot: 30,
                wk: 'Jan-wk3',
                mon: 'Jan',
            },
            {
                if: 52,
                ot: 40,
                wk: 'Jan-wk4',
                mon: 'Jan',
            },
            {
                if: 40,
                ot: 35,
                wk: 'Feb-wk1',
                mon: 'Feb',
            },
            {
                if: 62,
                ot: 40,
                wk: 'Feb-wk2',
                mon: 'Feb',
            },
            {
                if: 68,
                ot: 50,
                wk: 'Feb-wk3',
                mon: 'Feb',
            },
            {
                if: 70,
                ot: 55,
                wk: 'Feb-wk4',
                mon: 'Feb',
            },
            {
                if: 65,
                ot: 50,
                wk: 'Mar-wk1',
                mon: 'Mar',
            },
            {
                if: 72,
                ot: 60,
                wk: 'Mar-wk2',
                mon: 'Mar',
            },
            {
                if: 52,
                ot: 40,
                wk: 'Mar-wk3',
                mon: 'Mar',
            },
            {
                if: 42,
                ot: 30,
                wk: 'Mar-wk4',
                mon: 'Mar',
            },
        ],
    }
};