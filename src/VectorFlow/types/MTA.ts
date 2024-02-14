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