

import { openSOSummary } from './Data';

export const mapOrderDetails = (c1: string, c2: string, c3: string, kit: string, buc: number) => {
    let obj = {};
    let totalOrdCount = 0;
    let custCount = 0;
    let orderValue = 0;
    openSOSummary.map((data) => {
        if (kit !== "" && buc !== 4) {
            if ((data.color == c1 || data.color == c2 || data.color == c3) && data.kit == kit && data.bucket == buc) {
                totalOrdCount += Number(data.ordCount)
                custCount += Number(data.custCount)
                orderValue += Number(data.ordValue)
            }
        }
        else {
            if (data.color == c1) {
                totalOrdCount += Number(data.ordCount)
                custCount += Number(data.custCount)
                orderValue += Number(data.ordValue)
            }

        }
        obj = {
            totalCunt: orderValue,
            cusCunt: custCount,
            ordCunt: totalOrdCount
        }
    })

    return obj;
}

export const calculatePercentage = (c1: string, c2: string, c3: string, c4: string) => {
    let totalOrdCount = 0;
    openSOSummary.map((data) => {
        if (data.color == c1 || data.color == c2 || data.color == c3 || data.color == c4) {
            totalOrdCount += Number(data.ordCount)
        }
    })
    return totalOrdCount;
}