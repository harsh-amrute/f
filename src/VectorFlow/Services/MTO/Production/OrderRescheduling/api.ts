import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrderReschedulingService {
    export const getOrderReschedulingData = async () => {
        console.log(process.env.REACT_APP_VF_API_HOST_MTO + `/GetOrderReschedulingData/`)
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/GetOrderReschedulingData/`, {

            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

}
