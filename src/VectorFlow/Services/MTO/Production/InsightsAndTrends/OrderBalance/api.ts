import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrderBalanceService {

    export const getOrderBalanceData = async (graphFlag: string) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrderBalanceData/?graphflag=${graphFlag}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

}
