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

export enum STPLAndFullKitCategoryKeys {
    bl2_bl2_all_Except = 0,
    sg2_dom_normal = 1,
    bl2_bl3 = 2,
    xy_tab_exp = 3,
    xy_tab_dom_nrml = 4,
    bl4 = 5,
    sg1_dom_nrml = 6,
    sg1_exp_nrml = 7,
    sg2_exp_nrml = 8,
}
