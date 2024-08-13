export enum EnumKitStatus {
    Nokit = 1,
    PartialKit = 2,
    FullKit = 3,
}

export enum ProcurementSeriesDataYKey {
    soh = 0,
    sit = 1,
    po = 2,
    or = 3
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
    TextCompare= "textCompare",
    NumberCompare ="numberCompare",
    MultiSelect="multiSelect",
    Checkbox="checkbox",
    Search="search",
    Select="select"
}