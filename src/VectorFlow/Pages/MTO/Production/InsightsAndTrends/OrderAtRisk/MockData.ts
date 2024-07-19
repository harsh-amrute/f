export const columnConfig = [
    {
        "cc": "bpp",
        "cp": 1,
        "hd": "BPP",
        "v": true,
        "cla": "left",
        "scc": "bpp"
    },
    {
        "cc": "plnt",
        "cp": 2,
        "hd": "Plant",
        "v": true,
        "cla": "left",
        "scc": "plnt"
    },
    {
        "cc": "order_id",
        "cp": 3,
        "hd": "Order Id",
        "v": true,
        "cla": "left",
        "scc": "order_id"
    },
    {
        "cc": "order_type",
        "cp": 4,
        "hd": "Order Type",
        "v": true,
        "cla": "left",
        "scc": "order_type"
    },
    {
        "cc": "line_item_id",
        "cp": 5,
        "hd": "Line Item Id",
        "v": true,
        "cla": "left",
        "scc": "line_item_id"
    },
    {
        "cc": "item_code",
        "cp": 6,
        "hd": "Item Code",
        "v": true,
        "cla": "left",
        "scc": "item_code"
    },
    {
        "cc": "item_desc",
        "cp": 7,
        "hd": "Item Description",
        "v": true,
        "cla": "left",
        "scc": "item_desc"
    },
    {
        "cc": "order_quantity",
        "cp": 8,
        "hd": "Order Quantity",
        "v": true,
        "cla": "left",
        "scc": "order_quantity"
    },
    {
        "cc": "major_reason",
        "cp": 9,
        "hd": "Major Reason",
        "v": true,
        "cla": "left",
        "scc": "major_reason"
    },
    {
        "cc": "minor_reason",
        "cp": 10,
        "hd": "Minor Reason",
        "v": true,
        "cla": "left",
        "scc": "minor_reason"
    },
    {
        "cc": "cus_code",
        "cp": 11,
        "hd": "Customer Code",
        "v": true,
        "cla": "left",
        "scc": "cus_code"
    },
    {
        "cc": "cus_name",
        "cp": 12,
        "hd": "Customer Name",
        "v": true,
        "cla": "left",
        "scc": "cus_name"
    },
]

export const reasonColConfig =  [
  { 
      "cc": "reason",
      "cp": 2,
      "hd": "Major | Minor Reasons",
      "v": true,
      "cla": "left",
      "scc": "reason"
  },
  { 
      "cc": "black",
      "cp": 2,
      "hd": "Impacted orders - Black",
      "v": true,
      "cla": "left",
      "scc": "black"
  },
  { 
      "cc": "red",
      "cp": 3,
      "hd": "Impacted orders - Red",
      "v": true,
      "cla": "left",
      "scc": "red"
  }
]

export const APIMock = {
    reasonsBarData: [
      {
        reason: "P1-Dept 2 | Quality",
        black: 50,
        red: 16,
      },
      {
        reason: "P2-Dept 2 | Inspection",
        black: 70,
        red: 20,
      },
      {
        reason: "P1-Dept 4 | Quality",
        black: 60,
        red: 20,
      },
      {
        reason: "P1-Dept 5 | Quality",
        black: 60,
        red: 24
      },
      {
        reason: "P2-Dept 5 | Quality",
        black: 50,
        red: 24
      },
      {
        reason: "P2-Dept 4 | Raw Material Delay",
        black: 70,
        red: 24
      },
      {
        reason: "P1-Dept 3 | Quality",
        black: 40,
        red: 40
      },
      {
        reason: "P1-Dept 6 | Inspection",
        black: 20,
        red: 24
      },
      {
        reason: "P2-Dept 6 | Inspection",
        black: 60,
        red: 24
      },
      {
        reason: "P1-Dept 7 | Raw Material Delay",
        black: 46,
        red: 24
      },
    ],
    gridData: [
      {
        bpp: 100,
        plnt: 'A',
        order_id: '123',
        order_type: 'abc',
        line_item_id: '321',
        item_code: 'a',
        item_desc: 'desc',
        order_quantity: 120,
        major_reason: 'packing',
        minor_reason: 'ABC',
        cus_code: 101,
        cus_name: 'Zara',
      },
      {
        bpp: 120,
        plnt: 'A',
        order_id: '123',
        order_type: 'abc',
        line_item_id: '321',
        item_code: 'a',
        item_desc: 'desc',
        order_quantity: 120,
        major_reason: 'packing',
        minor_reason: 'ABC',
        cus_code: 101,
        cus_name: 'Zara',
      },
      {
        bpp: 60,
        plnt: 'A',
        order_id: '123',
        order_type: 'abc',
        line_item_id: '321',
        item_code: 'a',
        item_desc: 'desc',
        order_quantity: 120,
        major_reason: 'packing',
        minor_reason: 'ABC',
        cus_code: 101,
        cus_name: 'Zara',
      },
      {
        bpp: 10,
        plnt: 'A',
        order_id: '123',
        order_type: 'abc',
        line_item_id: '321',
        item_code: 'a',
        item_desc: 'desc',
        order_quantity: 120,
        major_reason: 'packing',
        minor_reason: 'ABC',
        cus_code: 101,
        cus_name: 'Zara',
      },
      {
        bpp: 100,
        plnt: 'A',
        order_id: '123',
        order_type: 'abc',
        line_item_id: '321',
        item_code: 'a',
        item_desc: 'desc',
        order_quantity: 120,
        major_reason: 'packing',
        minor_reason: 'ABC',
        cus_code: 101,
        cus_name: 'Zara',
      },
      {
        bpp: 40,
        plnt: 'A',
        order_id: '123',
        order_type: 'abc',
        line_item_id: '321',
        item_code: 'a',
        item_desc: 'desc',
        order_quantity: 120,
        major_reason: 'packing',
        minor_reason: 'ABC',
        cus_code: 101,
        cus_name: 'Zara',
      },
      {
        bpp: 20,
        plnt: 'A',
        order_id: '123',
        order_type: 'abc',
        line_item_id: '321',
        item_code: 'a',
        item_desc: 'desc',
        order_quantity: 120,
        major_reason: 'packing',
        minor_reason: 'ABC',
        cus_code: 101,
        cus_name: 'Zara',
      },
    ]
}
