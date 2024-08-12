import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DynamicReleaseManagementService {
    export const getDynamicReleaseData = async ({ graph, ao = 0, page = 1 }: { graph: number, ao: number, page: number }) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

    export const saveRouteData = async (body: any) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/updateOrderDataRoute/`, body, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

    export const updateDynamicReleaseData = async (body: any) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/UpdateDynamicReleaseData/`, body, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }




}
