/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

export namespace OrderAtRiskService {

    export const getOrderAtRiskData = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrdersAtRiskData`, {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}