import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrderReschedulingService {
    export const getOrderReschedulingData = async () => {

        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/GetOrderReschedulingData/`, {

            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

    export const getOrderReschedulingPageData = async (pageNum: string) => {
        console.log("this url is called", process.env.REACT_APP_VF_API_HOST_MTO + `/GetOrderReschedulingData/?page=${pageNum}`)
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/GetOrderReschedulingData/?page=${pageNum}`, {

            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
    export const putUpdateOrderDueDate = async (body: any) => {
        const url = `${process.env.REACT_APP_VF_API_HOST_MTO}/UpdateOrderDueDate/`;
        return await axios.put(url, body, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        });
    };

}
