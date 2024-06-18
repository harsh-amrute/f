export interface MTOStore {
    AnalyticsData: any
}


export interface ColumnData {
    colId?: string;
    field?: string;
    headerName?: string;
    hide?: boolean;
    cellRenderer?: string;
    tooltipComponent?: string;
    initialWidth?: number;
    autoHeaderHeight?: boolean;
    wrapHeaderText?: boolean;
    tooltipField?: string;
    filter?: string;
    floatingFilter?: boolean;
    nooi?: string;
    req?: string;
    uom?: string;
    soh?: string;
    siqc?: string;
    sit?: string;
    gap?: string;
    ppo?: string;
    tsfs?: string;
    editable?: boolean;
    cellStyle?: {
        backgroundColor?: string;
        border?: string;
        color?: string;
        padding?: string;
    };
}


export interface OrderAttribute {
    attribute1: string;
    attribute2: string;
}

export interface LineAttribute {
    lineAttribute1: string;
    lineAttribute2: string;
}

export interface CustomerAttribute {
    customerAttribute1: string;
    customerAttribute2: string;
}

export interface Order {
    oid: string; // Order ID
    ot: string; // Order Type
    lid: string; // Line ID
    ic: string; // Item Code
    id: string; // Item Description
    ig: string; // Item Group
    dd: string; // Due Date (ISO 8601 format string)
    rd: string; // Release Date (ISO 8601 format string)
    oq: number; // Order Quantity
    bs: number; // Batch Size
    fk: number; // Full Kit Available Percentage
    cc: string; // Customer Code
    cn: string; // Customer Name
    bpp: number; // Buffer Penetration Percentage
    clr: string; // Color
    pid: string; // Plant ID
    pnm: string; // Plant Name
    ov: number; // Order Value
    pdb: number; // Production Buffer Size
    pcb: number; // Procurement Buffer Size
    td: string; // Trailing Department
    ccrid: string; // CCR ID
    ccrnm: string; // CCR Name
    ccrgrid: string; // CCR Group ID
    ccrgrnm: string; // CCR Group Name
    sih: number; // Stock On Hand
    sit: number; // Stock In Transit (including Stock in QC)
    opo: number; // Open Purchase Orders
    rmSh: number; // Raw Material/PM Shortage
    oa: OrderAttribute[]; // Order Attributes
    la: LineAttribute[]; // Line Attributes
    ca: CustomerAttribute[]; // Customer Attributes
}

