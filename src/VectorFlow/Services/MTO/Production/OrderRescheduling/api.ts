import axios from 'axios';
import { AnyFn } from 'react-spring';

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
    export const putUpdateOrderDueDate = async (body: any) => {
        const url = `${process.env.REACT_APP_VF_API_HOST_MTO}/UpdateOrderDueDate/`;
        console.log(url);
        return await axios.put(url, body, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        });
    };

}
