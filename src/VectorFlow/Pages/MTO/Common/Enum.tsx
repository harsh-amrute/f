export enum EnumKitStatus {
    Nokit = 1,
    PartialKit = 2,
    FullKit = 3,
}

export enum ProcurementSeriesDataYKey {
    total_soh = 0,
    total_sit = 1,
    total_po = 2,
    shortage = 3
}
export enum ProcurementSeriesDataYName {
    "Orders With Full Kit (On hand Stock)" = 0,
    "Orders With Full Kit (incl. In Transit Inventory + In QC)" = 1,
    "Orders With Full Kit (incl. In Open Orders)" = 2,
    "Orders With RM /PM Shortage" = 3
}

export enum ProcurementSeriesDataFill {
    "#F4BD8E" = 0,
    "#F09241" = 1,
    "#AD5000" = 2,
    "#6A3001" = 3
}

export enum OTIFTags {
    OTIFNone = 0,
    OT_False_IF_False = 1,
    OT_True_IF_True = 2,
    OT_True_IF_False = 3,
    OT_False_IF_True = 4,
}

export enum InputTypes {
    TextCompare = "textCompare",
    NumberCompare = "numberCompare",
    MultiSelect = "multiSelect",
    Checkbox = "checkbox",
    Search = "search",
    Select = "select"
}

export enum pagination {
    mtoPageSize = 15
}

export enum UIGridCode {

    // Procurement
        "ProcMaterialCovOpenSales" = 100,  
        "ProcPlanning" = 101, 
        "ProcMaterialRequirement" = 102,  
        "ProcDayWiseCov" = 103,  
        "ProcRMPMOrderCov" = 104,
        "ProcPlanningSimulation" = 105,  // Blocked

    // Production
        "ProdEnquiryResponse" = 200,
        "ProdDDQScheduleOrder" = 201,// pending
        "ProdDDQUnScheduleOrder" = 202,// pending
        "ProdDDQThree" = 203,// pending
        "ProdOrderRescheduling" = 204,
        "ProdFullkitAssignment" = 205,
        "ProdDynamicReleaseManagement" = 206,// Blocked
        "ProdDeptWiseBMReport" = 207,// pending
        "ProdOverallBMReport" = 208,// pending
        "ProdFolSummary" = 209,
        "ProdStplAndFullKit" = 210,
        "ProdElapsedTime" = 211,
        "ProdOrderAtRisk" = 212,
        "ProdOrderBalance" = 213,

    // POOGI
        "PoogiReasonForDelayedOrders" = 300,
        "PoogiOTIFAnalysis" = 301,
        "PoogiOTAndIFAnalysis" = 302,
        "PoogiLeadTime" = 303,
        "PoogiTopFailureReason" = 304,  // code commented pending
}       
