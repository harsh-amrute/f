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
        "ProcMaterialCovOpenSales" = 100,  // pending
        "ProcPlanning" = 101,  // pending
        "ProcMaterialRequirement" = 102,  // pending
        "ProcDayWiseCov" = 103,  // pending
        "ProcRMPMOrderCov" = 104,// pending
        "ProcRMPMBufferTrend" = 105,// pending
        "ProcExpediteRMSupplies" = 106,// pending

    // Production
        "ProdEnquiryResponse" = 200,// pending
        "ProdDDQScheduleOrder" = 201,// pending
        "ProdDDQUnScheduleOrder" = 202,// pending
        "ProdDDQThree" = 203,// pending
        "ProdOrderRescheduling" = 204,// pending
        "ProdFullkitAssignment" = 205,// pending
        "ProdDynamicReleaseManagement" = 206,// pending
        "ProdDeptWiseBMReport" = 207,// pending
        "ProdOverallBMReport" = 208,// pending
        "ProdFolSummary" = 209,// pending
        "ProdStplAndFullKit" = 210,// pending
        "ProdElapsedTime" = 211,// pending
        "ProdOrderAtRisk" = 212,// pending
        "ProdOrderBalance" = 213,// pending

    // POOGI
        "PoogiReasonForDelayedOrders" = 300,
        "PoogiOTIFAnalysis" = 301,
        "PoogiOTAndIFAnalysis" = 302,
        "PoogiLeadTime" = 303,
}       
