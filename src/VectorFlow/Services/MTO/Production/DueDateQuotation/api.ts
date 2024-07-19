import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UIConfigService {
    export const getUIConfig = async (reportName: string) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getUIReportConfiguration/`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            },
            params: {
                report_name: reportName
            }
        })
    }

    export const getOrdersForDDQ = async (currentPage: number,unScheduled: boolean) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrdersForDDQ/`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            },
            params: {
                page: currentPage,
                unSch: unScheduled ? 1 : 0
            }
        })
    }
  

}
