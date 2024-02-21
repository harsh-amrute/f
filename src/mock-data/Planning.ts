export const MonitorGITChildLocationWiseMockData = {
    maxTechBlackRedColumn:[
        {
            "ln": "8511",
            "spd": 297,
            "d": 228
        },
        {
        "ln": "3063",
        "spd": 297,
        "d": 228
        }
    ],
    delayDaysStatisticalBox:[
        {
            "ln": "905",
            "mean": 25,
            "median": 17,
            "mind": 5,
            "maxd": 49
          },
          {
            "ln": "South India Shopping Mall (Rajamundry)",
            "mean": 25,
            "median": 17,
            "mind": 5,
            "maxd": 49
          },
    ]

}

export const MonitorGITChildTransporterWiseMockData = {
    maxTechBlackRedColumn:[
        {
            "tn": "8511",
            "spd": 297,
            "d": 228
        },
        {
        "tn": "3063",
        "spd": 297,
        "d": 228
        }
    ],
    delayDaysStatisticalBox:[
        {
            "tn": "905",
            "mean": 25,
            "median": 17,
            "mind": 5,
            "maxd": 49
          },
          {
            "tn": "South India Shopping Mall (Rajamundry)",
            "mean": 25,
            "median": 17,
            "mind": 5,
            "maxd": 49
          },
    ]

}

export const MonitorGITChildCustomMockData = [
    {
        "ln": "Dummy2",
        "LL1": null,
        "LL2": null,
        "LL3": null,
        "LL4": null,
        "LL5": null,
        "c1": null,
        "c2": null,
        "c3": null,
        "c4": null,
        "c5": null,
        "c6": null,
        "c7": null,
        "c8": null,
        "c9": null,
        "c10": null,
        "c11": null,
        "c12": null,
        "c13": null,
        "c14": null,
        "c15": null
      },
      {
        "ln": "PACU0008",
        "LL1": "Direct MBO",
        "LL2": "",
        "LL3": "",
        "LL4": null,
        "LL5": null,
        "c1": "Direct MBO",
        "c2": "",
        "c3": "",
        "c4": "",
        "c5": "",
        "c6": "",
        "c7": "",
        "c8": "",
        "c9": "",
        "c10": "",
        "c11": "",
        "c12": "",
        "c13": "",
        "c14": "",
        "c15": ""
      }
]

export const MonitorGITChildMockData = {
    locationWise:MonitorGITChildLocationWiseMockData,
    transporterWise:MonitorGITChildTransporterWiseMockData,
    customScreens:MonitorGITChildCustomMockData
}

export const getPlanningDataCountMockData = {
    "recordCount": "200",
    "data": [
        {
            "category": "git/wip",
            "parentCount": 800,
            "childCount": 400
        },
        {
            "category": "expedite",
            "parentCount": 1200,
            "childCount": 800
        },
        {
            "category": "excessInventory",
            "count": "600"
        },
        {
            "category": "orderFulfillment",
            "count": "2000"
        }
    ],
    "status": 200,
    "msg": null,
    "errorCount": null,
    "error": null,
    "conflictErrorCount": null,
    "conflictError": null
}

export const mockMasterData: any = {
    recordCount: 345,
    data: []
  };
// export const getPlanningDataGraphMockData = {
//     recordCount:345,
//     data:[
        
//     ]
// }
