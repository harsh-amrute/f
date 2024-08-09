import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DynamicReleaseManagementService {
    export const getDynamicReleaseData = async ({ graph, ao = 0 }: { graph: number, ao: number }) => {


        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}`, {

            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })


    }


}
