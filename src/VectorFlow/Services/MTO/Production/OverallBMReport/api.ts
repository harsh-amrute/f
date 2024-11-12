import axios from 'axios';

type OverallBMReportInputType = {
    page: number,
    appliedFilters: any,
    page_size?: number,
    analytics?: 0 | 1
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OverallBMReportService {

    export const getOverallBMReportData = async ({ page, appliedFilters, page_size,analytics = 0}: OverallBMReportInputType) => {
        if(analytics==0){

            return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOverAllBMReportData/?avawip=${0}&page=${page}&page_size=${page_size || process.env.REACT_APP_MTO_BM_REPORT_ROWS_PER_PAGE}&analytics=${analytics}`, appliedFilters,{
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
                }
            })
        }
        else{
             return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDeptWiseBMReportData/?avawip=${0}&analytics=${analytics}`, appliedFilters,{
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
                }
            })
        }
    }

}