import axios from 'axios';

type OverallBMReportInputType = {
    page: number,
    appliedFilters: any
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OverallBMReportService {

    export const getOverallBMReportData = async ({ page, appliedFilters}: OverallBMReportInputType) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOverAllBMReportData/?avawip=${0}&page=${page}&page_size=${10}`, appliedFilters,{
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

}