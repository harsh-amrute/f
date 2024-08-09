export const columnConfig = [
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
  {
    cc: "item_code",
    cp: 6,
    hd: "Item Code",
    v: true,
    cla: "left",
    scc: "item_code",
  },
  {
    cc: "item_desc",
    cp: 7,
    hd: "Item Description",
    v: true,
    cla: "left",
    scc: "item_desc",
  },
  {
    cc: "order_quantity",
    cp: 8,
    hd: "Order Quantity",
    v: true,
    cla: "left",
    scc: "order_quantity",
  },
  {
    cc: "trail_dept",
    cp: 9,
    hd: "Trailing Department",
    v: true,
    cla: "left",
    scc: "trail_dept",
  },
  {
    cc: "qty_mfg",
    cp: 10,
    hd: "Quantity Balance To Manufacture",
    v: true,
    cla: "left",
    scc: "qty_mfg",
  },
  {
    cc: "qty_disp",
    cp: 10,
    hd: "Quantity Balance To Dispatch",
    v: true,
    cla: "left",
    scc: "qty_disp",
  },
  {
    cc: "cus_code",
    cp: 11,
    hd: "Customer Code",
    v: true,
    cla: "left",
    scc: "cus_code",
  },
  {
    cc: "cus_name",
    cp: 12,
    hd: "Customer Name",
    v: true,
    cla: "left",
    scc: "cus_name",
  },
];

export const columnConfigData = {
  tableColumn: [
    {
      cc: "trailDept",
      cp: 1,
      hd: "Trailing Department",
      v: true,
      cla: "left",
      scc: "trailDept",
    },
    {
      cc: "b",
      cp: 2,
      hd: "Black",
      v: true,
      cla: "left",
      scc: "b",
    },
    {
      cc: "r",
      cp: 3,
      hd: "Red",
      v: true,
      cla: "left",
      scc: "r",
    },
    {
      cc: "y",
      cp: 4,
      hd: "Yellow",
      v: true,
      cla: "left",
      scc: "y",
    },
    {
      cc: "g",
      cp: 5,
      hd: "Green",
      v: true,
      cla: "left",
      scc: "g",
    },
    {
      cc: "bl",
      cp: 6,
      hd: "Blue",
      v: true,
      cla: "left",
      scc: "bl",
    },
  ],
};

export const APIMock = {
  orderCount: [
    {
      trailDept: "Cutting",
      b: 20,
      r: 10,
      y: 14,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Sewing",
      b: 22,
      r: 9,
      y: 14,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Embroidery",
      b: 18,
      r: 13,
      y: 14,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Finishing",
      b: 10,
      r: 10,
      y: 11,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Packing",
      b: 15,
      r: 10,
      y: 11,
      g: 10,
      bl: 9,
    },
  ],
  balMfg: [
    {
      trailDept: "Cutting",
      b: 20,
      r: 10,
      y: 14,
      g: 0,
      bl: 9,
    },
    {
      trailDept: "Sewing",
      b: 22,
      r: 9,
      y: 4,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Embroidery",
      b: 8,
      r: 13,
      y: 14,
      g: 7,
      bl: 9,
    },
    {
      trailDept: "Finishing",
      b: 10,
      r: 21,
      y: 11,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Packing",
      b: 15,
      r: 2,
      y: 1,
      g: 10,
      bl: 9,
    },
  ],
  balDisp: [
    {
      trailDept: "Cutting",
      b: 20,
      r: 10,
      y: 14,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Sewing",
      b: 22,
      r: 9,
      y: 14,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Embroidery",
      b: 18,
      r: 13,
      y: 14,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Finishing",
      b: 10,
      r: 10,
      y: 11,
      g: 10,
      bl: 9,
    },
    {
      trailDept: "Packing",
      b: 15,
      r: 10,
      y: 11,
      g: 10,
      bl: 9,
    },
  ],
  gridData: [
    {
      bpp: 100,
      plnt: "A",
      order_id: "123",
      order_type: "abc",
      line_item_id: "321",
      item_code: "a",
      item_desc: "desc",
      order_quantity: 120,
      trail_dept: "packing",
      qty_mfg: 100,
      qty_disp: 80,
      cus_code: 101,
      cus_name: "Zara",
    },
    {
      bpp: 120,
      plnt: "A",
      order_id: "123",
      order_type: "abc",
      line_item_id: "321",
      item_code: "a",
      item_desc: "desc",
      order_quantity: 120,
      trail_dept: "packing",
      qty_mfg: 100,
      qty_disp: 80,
      cus_code: 101,
      cus_name: "Zara",
    },
    {
      bpp: 60,
      plnt: "A",
      order_id: "123",
      order_type: "abc",
      line_item_id: "321",
      item_code: "a",
      item_desc: "desc",
      order_quantity: 120,
      trail_dept: "packing",
      qty_mfg: 100,
      qty_disp: 80,
      cus_code: 101,
      cus_name: "Zara",
    },
    {
      bpp: 10,
      plnt: "A",
      order_id: "123",
      order_type: "abc",
      line_item_id: "321",
      item_code: "a",
      item_desc: "desc",
      order_quantity: 120,
      trail_dept: "packing",
      qty_mfg: 100,
      qty_disp: 80,
      cus_code: 101,
      cus_name: "Zara",
    },
    {
      bpp: 100,
      plnt: "A",
      order_id: "123",
      order_type: "abc",
      line_item_id: "321",
      item_code: "a",
      item_desc: "desc",
      order_quantity: 120,
      trail_dept: "packing",
      qty_mfg: 100,
      qty_disp: 80,
      cus_code: 101,
      cus_name: "Zara",
    },
    {
      bpp: 40,
      plnt: "A",
      order_id: "123",
      order_type: "abc",
      line_item_id: "321",
      item_code: "a",
      item_desc: "desc",
      order_quantity: 120,
      trail_dept: "packing",
      qty_mfg: 100,
      qty_disp: 80,
      cus_code: 101,
      cus_name: "Zara",
    },
    {
      bpp: 20,
      plnt: "A",
      order_id: "123",
      order_type: "abc",
      line_item_id: "321",
      item_code: "a",
      item_desc: "desc",
      order_quantity: 120,
      trail_dept: "packing",
      qty_mfg: 100,
      qty_disp: 80,
      cus_code: 101,
      cus_name: "Zara",
    },
  ],
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
          "6": {
              "nm": "CCR Name 6"
          },
          "7": {
              "nm": "CCR Name 7"
          },
          "8": {
              "nm": "CCR Name 8"
          },
          "9": {
              "nm": "CCR Name 9"
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
      "system_type": ["MTA"]
  }
}

export const APIBMResponseMock: any = {
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
          "6": {
              "nm": "CCR Name 6"
          },
          "7": {
              "nm": "CCR Name 7"
          },
          "8": {
              "nm": "CCR Name 8"
          },
          "9": {
              "nm": "CCR Name 9"
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
      "system_type": ["MTO"]
  }
}

export const APIFKResponseMock: any = {
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
          "6": {
              "nm": "CCR Name 6"
          },
          "7": {
              "nm": "CCR Name 7"
          },
          "8": {
              "nm": "CCR Name 8"
          },
          "9": {
              "nm": "CCR Name 9"
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
      "system_type": ["MTO"]
  }
}
