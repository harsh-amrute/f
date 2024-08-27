import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OverallBMReportService {

    export const getOverallBMReportData = async (data: number) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOverAllBMReportData/?avawip=${0}&page=${data}&page_size=${10}`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

}