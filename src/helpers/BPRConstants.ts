import {BTRCategoryMapperType} from '../VectorFlow/types/BTR'

export const BTRCategoryMapper:BTRCategoryMapperType = {
    "1":{
        bgColor:"black",
        color:'white',
        cellLabel:"CTB",
        toolTipHeader:"Cont Tech Black",
        toolTipDescription:"*Total Tech black days > RLT"
    },
    "2":{
        bgColor:"#8E8E8E",
        color:'white',
        cellLabel:"SE",
        toolTipHeader:"Stagnated Excess",
        toolTipDescription:"*Consecutive white for 2 RLTs & No consumption in last 2 RLTs"
    },
    "3":{
        bgColor:" #F02424",
        color:'white',
        cellLabel:"SD",
        toolTipHeader:"Super Delay",
        toolTipDescription:"*>=2*SLt"
    },
    "4":{
        bgColor:"#355FD3",
        color:'white',
        cellLabel:"SI",
        toolTipHeader:'Supply Chain Issue',
        toolTipDescription:'*Eco Black ageing > 1.5 RLTs'
    },
    "5":{
        bgColor:"linear-gradient(90deg, rgba(41,41,41,1) 50%, rgba(240,36,36,1) 50%)",
        color:'white',
        cellLabel:"B+R",
        toolTipHeader:"Cont Tech Black+Red",
        toolTipDescription:"*Total Tech black + red days >=RLT"
    }
}

export const MultiFilterSupplyChainCheckboxList =[
    
    { label: 'Plant', id: '1' },
    { label: 'Supplier', id: '2' },
    { label: 'CWH', id: '3' },
    { label: 'RWH', id: '4' },
    { label: 'Depot', id: '5' },
    { label: 'Distributor', id: '6' },
    { label: 'Retailer', id: '7' }   
]

export const suspensionMessages = [
    { Key: 1, Value: "Suspended as part of exclusions" },
    { Key: 2, Value: "Suspended as Norm is in Sleep Mode" },
    { Key: 4, Value: "Suspended as Phase-In in progress" },
    { Key: 8, Value: "Suspended as Phase-Out in progress" },
    { Key: 16, Value: "Suspended as either norm<Min norm or norm<2 or RLT,RCP,GCP<3" },
    { Key: 32, Value: "Suspended as Insufficient Data Points" },
    { Key: 64, Value: "Suspended due to stock is in white" },
    { Key: 128, Value: "Suspended due to Supply Issue" },
    { Key: 256, Value: "Suspended due to New SKU introduction" },
    { Key: 512, Value: "Suspended due to suggestion acceptance" },
    { Key: 1024, Value: "Suspended due to Force Norm Changes" },
    { Key: 2048, Value: "Suspended due to Spike" },
    { Key: 4096, Value: "Suspended due to Suggestion acceptance" },
    { Key: 8192, Value: "Suspended due to Seasonality" }
]

export const GraphSeriesOverrides = {
    column:{
        series:{
            highlightStyle:{
                item:{
                    fill:'rgb(255,255,255,0.2)'
                }
            }
        },
    },
    pie:{
        series:{
            highlightStyle:{
                item:{
                    fill:'rgb(255,255,255,0.2)'
                }
            }
        },
    },
    line:{
        series:{
            highlightStyle:{
                item:{
                    fill:'rgb(255,255,255,0.2)'
                }
            }
        },
    },
    histogram:{
        series:{
            highlightStyle:{
                item:{
                    fill:'rgb(255,255,255,0.2)'
                }
            }
        },
    },
}
export interface RouterToAnalyticsStringMap {
    [route: string]: string;
  }


export const routerToAnalyticsStringMap:RouterToAnalyticsStringMap = {
    // "/supply-chain-intelligence-hub/planning": "planning",
    "/supply-chain-intelligence-hub/bpr": "bpr",
    "/supply-chain-intelligence-hub/rrr": "rrr",
    "/supply-chain-intelligence-hub/bor": "bor",
    "/dbm/dbm-norm-suggestions": "dbm",
    "/insights-and-trends/research-insights": "ri",
  };
  