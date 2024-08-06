import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ReasonOrderChangeServices {

    export const getPoogiReasonsAnalyticalData = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getPoogiReasonForDelayedOrdersAnalyticsData/`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

    export const getPoogiReasonsDelayedOrder = async () => {
        console.log(process.env.REACT_APP_VF_API_HOST_MTO + `/getPoogiReasonForDealyedOrdersData/?isAssigned=${0}`)
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getPoogiReasonForDealyedOrdersData/?isAssigned=${0}`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }
}