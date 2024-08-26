export const mapOrderDetails = (data: string[], c1: string, c2: string, c3: string, kit: string, buc: number) => {

    let obj = {};
    let totalOrdCount = 0;
    let custCount = 0;
    let orderValue = 0;
    let startdate = 0;
    let endDate = 0;
    data?.map((data: any) => {
        if (kit !== "" && buc === 0) {
            if ((data.col == c1 || data.col == c2 || data.col == c3) && data.kit == kit && data.bkt == buc) {
                orderValue += Number(data.ordcnt)
                custCount += Number(data.custcnt)
                totalOrdCount += Number(data.ordval)
            }
        }
        else if (kit !== "" && (buc == 1 || buc == 2 || buc == 3 || buc == 4)) {
            if ((data.col == c1 || data.col == c2) && data.kit == kit && data.bkt == buc) {
                orderValue += Number(data.ordcnt)
                custCount += Number(data.custcnt)
                totalOrdCount += Number(data.ordval)
                startdate = data.S
                endDate = data.E
            }
        }
        else {
            if ((data.col == c1 || data.col == c2)) {
                orderValue += Number(data.ordcnt)
                custCount += Number(data.custcnt)
                totalOrdCount += Number(data.ordval)
                startdate = data.S
                endDate = data.E
            }
        }
        obj = {
            ordCunt: orderValue,
            cusCunt: custCount,
            totalCunt: totalOrdCount,
            stdt: startdate,
            endt: endDate
        }
    })
    return obj;
}

export const calculatePercentage = (data: string[], c1: string, c2: string, c3: string, c4: string, buc: number) => {
    let totalOrdCount = 0;
    data?.map((data: any) => {
        if ((data.col == c1 || data.col == c2 || data.col == c3 || data.col == c4) && data.bkt == buc) {
            totalOrdCount += Number(data.ordcnt)
        }
    })

    return totalOrdCount;
}

export const calculateColorOrderCount = (data: string[], c1: string, kit: string, buc: number) => {
    let colorOrderTotalcount = 0;
    data?.map((data: any) => {
        if (data.col == c1 && data.kit == kit && data.bkt == buc) {
            colorOrderTotalcount += Number(data.ordcnt)
        }
    })
    return colorOrderTotalcount;
}

export interface DetailsObj {
    c1: string,
    c2: string,
    c3: string,
    kit: string,
    S: string,
    E: string
}

export const getToolTipContent = (col: string, ToolTipdata: any) => {
    return (
        <table style={{ padding: "0px 10px 0px 10px", fontSize: '14px', display: "table", width: '150px' }}>
            <tbody>
                {col == 'Red' || col == 'Green' ?
                    <>
                        <tr style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <td>
                                {col == 'Red' ? 'Black' : 'Green'}
                            </td>
                            <td>
                                {isNaN(ToolTipdata.p1) ? 0 : ToolTipdata.p1}%/{ToolTipdata?.c1}
                            </td>
                        </tr>
                    </>
                    : null

                }
                {col == 'Red' || col == 'Blue' ?
                    <>
                        <tr style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <td>
                                {col == 'Red' ? 'Red' : 'White'}
                            </td>
                            <td>
                                {isNaN(ToolTipdata.p2) ? 0 : ToolTipdata.p2}%/{ToolTipdata?.c2}
                            </td>
                        </tr>
                        <tr style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <td>
                                {col == 'Red' ? 'Yellow' : 'Blue'}
                            </td>
                            <td>
                                {isNaN(ToolTipdata.p3) ? 0 : ToolTipdata.p3}%/{ToolTipdata?.c3}
                            </td>
                        </tr>
                    </>
                    : null
                }

            </tbody>

        </table>
    )
}