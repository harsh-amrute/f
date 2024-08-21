import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrderBalanceService {
    export const getOrderBalanceData = async (params: any) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrderBalanceData/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params
        })
    }

}
