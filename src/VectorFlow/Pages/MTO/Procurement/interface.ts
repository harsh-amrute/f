export interface ICallRecord {
    orderNo: string,
    orderQty: number,
    custName: string,
    custCode: number,
    orderDueDate: string,
    orderRlsDate: string,
    color: string,
    type: string
}

export interface IAccount {
    id: number;
    icon: string;
    cp: string;
    oli: string;
    rmCode: string,
    rmDesc: string,
    noOfOrdImp: number,
    totalReq: number,
    uom: string,
    soh: number,
    sq: number,
    st: number,
    gap: number,
    penD: number,
    edit: number,
    tsfs: number,
    callRecords: ICallRecord[];
}