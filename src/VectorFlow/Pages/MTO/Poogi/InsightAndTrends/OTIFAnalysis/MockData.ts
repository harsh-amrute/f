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

export const APIResponseMock: any = {
  "msg": "All records fetched successfully",
  "data": {
      "customers": [
          {
              "cc": "cust001",
              "cn": "Customer 1",
              "Area": "New",
              "City": "Ahmedabad",
              "State": "Gujarat",
              "Region": "East",
              "Country": "India"
          },
          {
              "cc": "cust002",
              "cn": "Customer 2",
              "Area": "New",
              "City": "Ahmedabad",
              "State": "Gujarat",
              "Region": "East",
              "Country": "India"
          }
      ],
      "ordLineItems": [
          {
              "id": "order_6",
              "lid": "line_2",
              "ic": "SFG5",
              "ide": "SFG5 data",
              "ov": 137.74,
              "ot": "TYPE1",
              "cc": "cust053",
              "pn": "Plant3",
              "route": 5,
              "pbsz": null,
              "pcbsz": null,
              "latr1": "data1",
              "latr2": "data2",
              "latr3": "data3",
              "majid": 3,
              "minid": 14,
              "deptid": 5,
              "ms": "MTO"
          },
          {
              "id": "order_6",
              "lid": "line_1",
              "ic": "RM4",
              "ide": "RM4 data",
              "ov": 611.11,
              "ot": "TYPE1",
              "cc": "cust085",
              "pn": "Plant3",
              "route": 1,
              "pbsz": null,
              "pcbsz": null,
              "latr1": "data1",
              "latr2": "data2",
              "latr3": "data3",
              "majid": 5,
              "minid": 21,
              "deptid": 3,
              "ms": "MTO"
          }
      ],
      "ordAttr": [
          {
              "id": "order_1",
              "type": "abc_10",
              "firstdata": "dat123",
              "new_value": "new10",
              "thirddata": "datatdtdtaha",
              "complexity": "high_10",
              "seconddata": "data23652"
          },
          {
              "id": "order_2",
              "type": "abc_10",
              "firstdata": "dat123",
              "new_value": "new10",
              "thirddata": "datatdtdtaha",
              "complexity": "high_10",
              "seconddata": "data23652"
          }
      ],
      "mappings": [
          {
              "rid": 5,
              "ccrid": 3,
              "grpid": 2,
              "deptid": 3
          },
          {
              "rid": 1,
              "ccrid": 4,
              "grpid": 5,
              "deptid": 4
          },
          {
              "rid": 5,
              "ccrid": 1,
              "grpid": 1,
              "deptid": 1
          },
          {
              "rid": 1,
              "ccrid": 1,
              "grpid": 1,
              "deptid": 1
          }
      ],
      "ccrs": {
          "1": {
              "nm": "CCR Name 1"
          },
          "3": {
              "nm": "CCR Name 3"
          },
          "4": {
              "nm": "CCR Name 4"
          },
          "5": {
              "nm": "CCR Name 5"
          }
      },
      "ccrgroups": {
          "5": {
              "nm": "c5"
          },
          "4": {
              "nm": "c4"
          },
          "3": {
              "nm": "c3"
          },
          "2": {
              "nm": "c2"
          },
          "1": {
              "nm": "c1"
          }
      },
      "dept": {
          "1": {
              "nm": "Dept1"
          },
          "2": {
              "nm": "Dept2"
          },
          "3": {
              "nm": "Dept3"
          },
          "4": {
              "nm": "Dept4"
          },
          "5": {
              "nm": "Dept5"
          }
      },
      "mjar": {
          "5": {
              "name": "MR5",
              "min": [
                  {
                      "id": 25,
                      "name": "MIR25"
                  },
                  {
                      "id": 24,
                      "name": "MIR24"
                  }
              ]
          },
          "4": {
              "name": "MR4",
              "min": [
                  {
                      "id": 20,
                      "name": "MIR20"
                  },
                  {
                      "id": 19,
                      "name": "MIR19"
                  }
              ]
          },
          "3": {
              "name": "MR3",
              "min": [
                  {
                      "id": 15,
                      "name": "MIR15"
                  },
                  {
                      "id": 14,
                      "name": "MIR14"
                  }
              ]
          },
          "2": {
              "name": "MR2",
              "min": [
                  {
                      "id": 10,
                      "name": "MIR10"
                  },
                  {
                      "id": 9,
                      "name": "MIR9"
                  }
              ]
          },
          "1": {
              "name": "MR1",
              "min": [
                  {
                      "id": 5,
                      "name": "MIR5"
                  },
                  {
                      "id": 4,
                      "name": "MIR4"
                  }
              ]
          }
      },
      "hdrkeymap": {
        "cattr": [
            {
                "key": "Area",
                "name": "Area"
            },
            {
                "key": "City",
                "name": "City"
            },
            {
                "key": "State",
                "name": "State"
            },
            {
                "key": "Region",
                "name": "Region"
            },
            {
                "key": "Country",
                "name": "Country"
            }
        ],
        "oattr": [
            {
                "key": "type",
                "name": "type"
            },
            {
                "key": "firstdata",
                "name": "firstdata"
            },
            {
                "key": "new_value",
                "name": "new_value"
            },
            {
                "key": "thirddata",
                "name": "thirddata"
            },
            {
                "key": "complexity",
                "name": "complexity"
            },
            {
                "key": "seconddata",
                "name": "seconddata"
            }
        ],
        "lattr": [
            {
                "key": "latr1",
                "name": "latr1"
            },
            {
                "key": "latr2",
                "name": "latr2"
            },
            {
                "key": "latr3",
                "name": "latr3"
            }
        ]
    },
      "system_type": ["MTA", "MTO"]
  }
}