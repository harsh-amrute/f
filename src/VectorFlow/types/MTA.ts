export interface PlanningCounts {
    childMonitorCount:number,
    parentMonitorCount:number,
    parentExpediteCount:number,
    childExpediteCount:number,
    reviewExcessInventoryCount:number,
    reviewOrderFulfillmentCount:number,
}

export interface PlanningCategory {
    category:string,
    childCount?:number,
    parentCount?:number,
    reviewCount?:number
}

export interface DailyDataGraph {
    normChangeData:any,
    chartData:any,
    masterData:any,
    suggestionData:any,
    monitoringData:any,
    rowData:any

}

export interface MTAStore{
    showDailyDataGraphModal:boolean,
    showNormChangeHistoryTable:boolean
    dailyData:DailyDataGraph
}