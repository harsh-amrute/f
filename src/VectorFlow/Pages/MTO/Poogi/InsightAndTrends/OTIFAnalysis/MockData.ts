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
        cc: "line_item_id",
        cp: 5,
        hd: "Line Item Id",
        v: true,
        cla: "center",
        scc: "line_item_id",
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
        cc: "order_quantity",
        cp: 8,
        hd: "Order Quantity",
        v: true,
        cla: "center",
        scc: "order_quantity",
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
        cc: "or_closing_dt",
        cp: 10,
        hd: "Order Closing Date",
        v: true,
        cla: "center",
        scc: "or_closing_dt",
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
        cc: "relese_dt",
        cp: 16,
        hd: "Release Date",
        v: true,
        cla: "center",
        scc: "relese_dt",
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

export const graphColumnConfig = {
    otif: [
        { 
            "cc": "x_label",
            "cp": 1,
            "hd": "Week",
            "v": true,
            "cla": "left",
            "scc": "x_label"
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
            "cc": "x_label",
            "cp": 0,
            "hd": "Week",
            "v": true,
            "cla": "left",
            "scc": "x_label"
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
            ex_short: 19,
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
        ]},
        ot_n_if_graph:{
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
        ]},
    }
};