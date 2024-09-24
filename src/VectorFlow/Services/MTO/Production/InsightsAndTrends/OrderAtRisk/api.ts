/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

export namespace OrderAtRiskService {

    export const getOrderAtRiskData = async ({page, appliedFilters}: any) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrdersAtRiskData/`,
        appliedFilters,
        {
            headers: { 'Content-Type': 'application/json' },
            params: {
                page
            }
        });
    }
}