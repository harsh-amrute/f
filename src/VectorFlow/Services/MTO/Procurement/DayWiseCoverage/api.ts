import axios from "axios"

    export const getDayWiseCoverageData = async (startDate: string, endDate: string, plannedReleaseDate: string | undefined, appliedFilters:any,page?: any, pageSize?: any,isExcelExport?:any,body?:any,report_name?:any) => {
        console.log("bodyyyyy",)
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDayWiseCoverageData/`,{ ...appliedFilters, ...body}, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            },
            
            params:{
                FromDate: startDate,
                ToDate: endDate,
                planned_release_date: plannedReleaseDate,
                page: page,
                page_size: pageSize,
                isExcelExport: isExcelExport,
                report_name: report_name

            },
            responseType: isExcelExport ? 'blob' : 'json'
        })
    }

