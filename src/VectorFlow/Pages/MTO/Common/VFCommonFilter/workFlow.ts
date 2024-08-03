
// // plant - > dept - > grp - > ccr
// // 4 - > 2, 3 - > 1, 2
// // 4 - > 3 - > 1 

import { FilterState } from "../../../../types/MTO";

// // type Filter ={
// //     type: 'string',
// //     name: 'string',
// //     attributeName: 'string',
// //     operator: 'string',
// //     value: 'string'
// // }

// // type FilterGroup = {
// //     id: 'string',
// //     label: 'string',
// //     filters: Filter[]
// // }

// // type AllFilters = {
// //     customers: FilterGroup,
// //     resource: FilterGroup,
// //     order: FilterGroup,
// //     major: FilterGroup 
// // }

// export const filterAttributes = {
//     customer: ["cc", "cn"],
//     resource: ["pn", "deptid", "ccrid", "grpid"],
//     order: ["id", "lid", "ic", "ide", "ov", "ot", "pbsz", "pcbsz"],
//     major: ["majid","minid"]
// };

// export const ignoredAttributes = ["route"];

// export const staticHeaderConfig: any = {
//     //Order Filter attributes
//     id: { name: "order ID", type: 'search'},
//     lid: { name:"Line Item", type: 'search'},
//     ic: { name:"Item Code", type: 'search'},
//     ide: { name:"Item Description", type: 'textCompare'},
//     ov: { name: "Price", type: 'numberCompare'},
//     ot: { name:"Order Type", type: 'multiSelect'},
//     pbsz: { name: "Production Buffer", type: 'numberCompare'},
//     pcbsz: {name: "Procurement Buffer", type: 'numberCompare'},
    
//     // Customer Filter Attributes
//     cc: { name:"Customer Code", type: 'search'},
//     cn: { name:"Customer Name", type: 'search'},
    
//     // Major Filter Attributes
//     majid: { name: "Major Reason", type: 'select'},
//     minid: { name: 'Minor Reason', type: 'select'},
    
//     // Resource Filter Attributes
//     pn: { name: "Plant", type: 'search'},
//     deptid: { name: "Department", type: 'select'},
//     ccrid: { name: "CCR", type: 'select'},
//     grpid: { name: "CCR Group", type: 'select'},
// }

// export const APIMock = {
//     "msg": "All records fetched successfully",
//     "data": {
//         "customers": [{
//                 "cc": "cust065",
//                 "cn": "Customer 65",
//                 "Area": "New",
//                 "City": "Ahmedabad",
//                 "State": "Gujarat",
//                 "Region": "East",
//                 "Country": "India"
//             },
//             {
//                 "cc": "cust065",
//                 "cn": "Customer 65",
//                 "Area": "New",
//                 "City": "Ahmedabad",
//                 "State": "Gujarat",
//                 "Region": "East",
//                 "Country": "India"
//             }
//         ],
//         "ordLineItems": [
//             {
//                 "id": "order_6",
//                 "lid": "line_0_0",
//                 "ic": "item_0_0",
//                 "ide": "Description for item 0_0",
//                 "ov": 635.62,
//                 "ot": "type_35",
//                 "cc": "cust100",
//                 "pn": "Plant4",
//                 "route": 1,
//                 "pbsz": 190,
//                 "pcbsz": 115,
//                 "majid": 1,
//                 "minid": 2, // no need
//                 "latr1": "data1",
//                 "latr2": "data2",
//                 "latr3": "data3",
//                 "latr4": "data4",
//             },
//             {
//                 "id": "order_7",
//                 "lid": "line_1_0",
//                 "ic": "item_3_0",
//                 "ide": "Deiption for item 0_0",
//                 "ov": 65.62,
//                 "ot": "fype_35",
//                 "cc": "cust100",
//                 "pn": "plant4",
//                 "route": 21,
//                 "pbsz": 10,
//                 "pcbsz":15,
//                 "majid": 31,
//                 "minid": 24, // no need
//                 "latr1": "dta1",
//                 "latr2": "ata2",
//                 "latr3": "dta3",
//                 "latr4": "ata4",
//             },
//             {
//                 "id": "order_6",
//                 "lid": "line_0_0",
//                 "ic": "item_0_0",
//                 "ide": "Description for item 0_0",
//                 "ov": 635.62,
//                 "ot": "type_35",
//                 "cc": "cust100",
//                 "pn": "Plant4",
//                 "route": 1,
//                 "pbsz": 190,
//                 "pcbsz": 115,
//                 "majid": 1,
//                 "minid": 2, // no need
//                 "latr1": "data1",
//                 "latr2": "data2",
//                 "latr3": "data3",
//                 "latr4": "data4",
//             },
//         ],
//         "hdrKeyMap": {
//             "ar": "Area",
//             "ct": "City",
//             "st": "State",
//             "rg": "Region",
//             "con": "Country"
//         },
//         "ccrgroups": {
//             1: {
//                 nm: "CCRGRP1"
//             },
//             2: {
//                 nm: "CCRGRP1"
//             }
//         },
//         "ccrs": {
//             1: {
//                 nm: "CCRGRP1"
//             },
//             2: {
//                 nm: "CCRGRP1"
//             }
//         },
//         "dept": {
//             1: {
//                 nm: "dept1"
//             },
//             2: {
//                 nm: "dep2"
//             }
//         },
//         "mjar": {
//             1: {
//                 name: "MJR1",
//                 min: [{}, {}, {}]
//             },
//             2: {
//                 name: "MJR1",
//                 min: [{}, {}, {}]
//             },
//             3: {
//                 name: "MJR1",
//                 min: [{}, {}, {}]
//             },
//         },
//         "mappings": [{
//             "rid": 1,
//             "ccrid": 1,
//             "grpid": 3,
//             "deptid": 4
//         },
//         {
//             "rid": 1,
//             "ccrid": 2,
//             "grpid": 2,
//             "deptid": 4
//         },
//         {
//             "rid":2,
//             "ccrid":3,
//             "grpid":2,
//             "deptid":5
//         }
//         ]
//     }
// }

// export const dynamicAttributes = {
//     customers: ["ar", "ct", "st", "rg", "con"],  // get while iterating over data.customer
//     resource: [],
//     order: ["latr1", "latr2", "latr3", "latr4"], // get while iterating over data.ordLineItems
//     major: []
// };

// // Merge these attributes with filterAttributes
// export const updatedFilterAttributes = {
//     customer: ["cc", "cn","ar", "ct", "st", "rg", "con"],
//     resource: ["pn", "deptid", "ccrid", "grpid"],
//     order: ["id", "lid", "ic", "ide", "ov", "ot", "pbsz", "pcbsz", "latr1", "latr2", "latr3", "latr4"], 
//     major: ["majid", "minid"]
// };

// // create filterGroupObjects 
// export const filterGroupObjects = {
//     customers : {
//         id: "cus",
//         label: "Customer Filter",
//         filters: []
//     },
//     resources : {
//         id: "res",
//         label: "Resource Filter",
//         filters: []
//     },
//     orders : {
//         id: "odr",
//         label: "Orders Filter",
//         filters: []
//     },
//     major : {
//         id: "mjr",
//         label: "Major/ Minor Reason",
//         filters: []
//     },
// }



// // Start iterating over filterAttributes get thier corresponding unique values from APIMock data and pushed them into set
// export function findUniqueKeysAndValues(apiData: any) {
//     const uniqueValues: any = {};

//     // Function to collect keys and values
//     function collectKeysAndValues(obj) {
//         for (const key in obj) {
//             if (!uniqueValues[key]) {
//                 uniqueValues[key] = new Set();
//             }
//             uniqueValues[key].add(obj[key]);
//         }
//     }

//     // Iterate over customers and ordLineItems
//     if (apiData.data.customers) {
//         apiData.data.customers.forEach(collectKeysAndValues);
//     }

//     if (apiData.data.ordLineItems) {
//         apiData.data.ordLineItems.forEach(collectKeysAndValues);
//     }

//     // Convert Set to Array and include empty array for missing keys
//     const response: any = {};
//     for (const key in uniqueValues) {
//         response[key] = Array.from(uniqueValues[key]);
//     }

//     // Add empty array for any missing keys based on the first object in each array
//     const allKeys: any = [
//         ...new Set([
//             ...Object.keys(apiData.data.customers?.[0] || {}),
//             ...Object.keys(apiData.data.ordLineItems?.[0] || {})
//         ])
//     ];

//     allKeys.forEach(key => {
//         if (!response[key]) {
//             response[key] = [];
//         }
//     });

//     return response;
// }

// export const filterOptionsConfig = findUniqueKeysAndValues(APIMock);

// // {
// //     cc: ["cust065", "cust100", "cust200"],
// //     cn: ["Customer 65"],
// //     Area: ["New"],
// //     City: ["Ahmedabad"],
// //     State: ["Gujarat"],
// //     Region: ["East"],
// //     Country: ["India"],
// //     id: ["order_6", "order_7"],
// //     lid: ["line_0_0"],
// //     ic: ["item_0_0", "item_0_1"],
// //     ide: ["Description for item 0_0", "Description for item 0_1"],
// //     ov: [635.62, 65.62],
// //     ot: ["type_35", "type_45"],
// //     pn: ["Plant4", "Plant9"],
// //     route: [1, 2],
// //     pbsz: [190, 10],
// //     pcbsz: [115, 15],
// //     majid: [1, 81],
// //     minid: [2, 20],
// //     deptid: [1, 18],
// //     latr1: ["data1", "data5"],
// //     latr2: ["data2", "data6"],
// //     latr3: ["data3", "data7"],
// //     latr4: ["data4", "data8"],
// //     ccrid: [],
// //     grpid: []
// // }


// export const filterObjects = {
//     customers: {
//         ...filterGroupObjects["customers"],
//         filters: updatedFilterAttributes?.customer.map((key, index) => ({
//             type: staticHeaderConfig[key]?.type || 'select',
//             name: staticHeaderConfig[key]?.name || APIMock.data.hdrKeyMap[key],
//             attributeName: key,
//             operator: 'string',
//             value: '',
//             options: filterOptionsConfig[key]
//         }))
//     },
//     resources: {
//         ...filterGroupObjects["resources"],
//         filters: updatedFilterAttributes?.resource.map((key, index) => ({
//             type: staticHeaderConfig[key]?.type || 'select',
//             name: staticHeaderConfig[key]?.name || APIMock.data.hdrKeyMap[key],
//             attributeName: key,
//             operator: 'string',
//             value: '',
//             options: filterOptionsConfig[key]
//         }))
//     },
//     orders: {
//         ...filterGroupObjects["orders"],
//         filters: updatedFilterAttributes?.order.map((key, index) => ({
//             type: staticHeaderConfig[key]?.type || 'select',
//             name: staticHeaderConfig[key]?.name || APIMock.data.hdrKeyMap[key],
//             attributeName: key,
//             operator: 'string',
//             value: '',
//             options: filterOptionsConfig[key]
//         }))
//     },
//     major: {
//         ...filterGroupObjects["major"],
//         filters: updatedFilterAttributes?.major.map((key, index) => ({
//             type: staticHeaderConfig[key]?.type || 'select',
//             name: staticHeaderConfig[key]?.name || APIMock.data.hdrKeyMap[key],
//             attributeName: key,
//             operator: 'string',
//             value: '',
//             options: filterOptionsConfig[key]
//         }))
//     },
// }


// console.log(filterObjects);

export const filterObjects: FilterState = {
    major: {
        id: "mjr",
        label: "Major/ Minor Reason",
        filters: [
            {
                type: "select",
                name: "Major Reason",
                attributeName: "majid",
                operator: "string",
                value: "",
                options: [1, 31]
            },
            {
                type: "select",
                name: "Minor Reason",
                attributeName: "minid",
                operator: "string",
                value: "",
                options: [2, 24]
            }
        ]
    },
    orders: {
        id: "odr",
        label: "Orders Filter",
        filters: [
            {
                type: "search",
                name: "order ID",
                attributeName: "id",
                operator: "string",
                value: [],
                options: ["order_6", "order_7","order_8","order_9"]
            },
            {
                type: "search",
                name: "Line Item",
                attributeName: "lid",
                operator: "string",
                value: [],
                options: ["line_0_0", "line_1_0"]
            },
            {
                type: "search",
                name: "Item Code",
                attributeName: "ic",
                operator: "string",
                value: [],
                options: ["item_0_0", "item_3_0"]
            },
            {
                type: "multiSelect",
                name: "Order Type",
                attributeName: "ot",
                operator: "string",
                value: [],
                options: ["type_35", "fype_35"]
            },
            {
                type: "textCompare",
                name: "Item Description",
                attributeName: "ide",
                operator: "string",
                value: "",
                options: ["Description for item 0_0", "Deiption for item 0_0"]
            },
            {
                type: "numberCompare",
                name: "Price",
                attributeName: "ov",
                operator: "string",
                value: "",
                options: [635.62, 65.62]
            },
            {
                type: "numberCompare",
                name: "Production Buffer",
                attributeName: "pbsz",
                operator: "string",
                value: "",
                options: [190, 10]
            },
            {
                type: "numberCompare",
                name: "Procurement Buffer",
                attributeName: "pcbsz",
                operator: "string",
                value: "",
                options: [115, 15]
            },
            {
                type: "select",
                name: "latr1",
                attributeName: "latr1",
                operator: "string",
                value: "",
                options: ["data1", "dta1"]
            },
            {
                type: "select",
                name: "latr2",
                attributeName: "latr2",
                operator: "string",
                value: "",
                options: ["data2", "ata2"]
            },
            {
                type: "select",
                name: "latr3",
                attributeName: "latr3",
                operator: "string",
                value: "",
                options: ["data3", "dta3"]
            },
            {
                type: "select",
                name: "latr4",
                attributeName: "latr4",
                operator: "string",
                value: "",
                options: ["data4", "ata4"]
            }
        ]
    },
    resources: {
        id: "res",
        label: "Resource Filter",
        filters: [
            {
                type: "search",
                name: "Plant",
                attributeName: "pn",
                operator: "string",
                value: [],
                options: ["Plant4", "plant4"]
            },
            {
                type: "select",
                name: "Department",
                attributeName: "deptid",
                operator: "string",
                value: "",
                options: []
            },
            {
                type: "select",
                name: "CCR",
                attributeName: "ccrid",
                operator: "string",
                value: "",
                options: []
            },
            {
                type: "select",
                name: "CCR Group",
                attributeName: "grpid",
                operator: "string",
                value: "",
                options: []
            }
        ]
    },
    
    customers: {
        id: "cus",
        label: "Customer Filter",
        filters: [
            {
                type: "search",
                name: "Customer Code",
                attributeName: "cc",
                operator: "string",
                value: [],
                options: ["cust065"]
            },
            {
                type: "search",
                name: "Customer Name",
                attributeName: "cn",
                operator: "string",
                value: [],
                options: ["Customer 65"]
            },
            {
                type: "select",
                name: "Area",
                attributeName: "ar",
                operator: "string",
                value: "",
                options: ["New"]
            },
            {
                type: "select",
                name: "City",
                attributeName: "ct",
                operator: "string",
                value: "",
                options: ["Ahmedabad"]
            },
            {
                type: "select",
                name: "State",
                attributeName: "st",
                operator: "string",
                value: "",
                options: ["Gujarat"]
            },
            {
                type: "select",
                name: "Region",
                attributeName: "rg",
                operator: "string",
                value: "",
                options: ["East"]
            },
            {
                type: "select",
                name: "Country",
                attributeName: "con",
                operator: "string",
                value: "",
                options: ["India"]
            }
        ]
    },
    
};











