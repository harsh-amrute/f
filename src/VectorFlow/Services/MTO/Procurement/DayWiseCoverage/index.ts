import { useMutation } from "@tanstack/react-query"
import { getDayWiseCoverageData } from "./api";


interface DayWiseCoverageParams{
    startDate: string, 
    endDate: string,
    plannedReleaseDate?: string,
    appliedFilters?:any,
    page?: any,
    page_size?: any,
    isExcelExport?: any
    body?: any,
    report_name?:any,
    isChildren?: any
}

export const useGetDayWiseCoverageData = () => {
    return useMutation(async (data: DayWiseCoverageParams) => {
        return getDayWiseCoverageData(data.startDate, data.endDate, data.plannedReleaseDate, data.appliedFilters,data.page,data.page_size,data.isExcelExport,data.body,data.report_name,data.isChildren);
    })
}