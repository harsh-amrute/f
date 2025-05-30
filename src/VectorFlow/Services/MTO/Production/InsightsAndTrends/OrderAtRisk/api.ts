/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

export namespace OrderAtRiskService {

    export const getOrderAtRiskData = async ({page, appliedFilters, page_size}: any) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrdersAtRiskData/`,
        appliedFilters,
        {
            headers: { 'Content-Type': 'application/json' },
            params: {
                page,
                page_size
            }
        });
    }

    export const getOrderAtRiskDataExcelExport = async ({ body, isExcelExport, report_name}: any) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrdersAtRiskData/`,
        body,
        {
            headers: { 'Content-Type': 'application/json' },
            params: {
                export : isExcelExport,
                report_name
            },
            responseType: 'blob' 
        });
    }
}