import { useMutation } from "@tanstack/react-query"
import { getDayWiseCoverageData } from "./api";


interface DayWiseCoverageParams{
    startDate: string, 
    endDate: string,
    plannedReleaseDate?: string,
    appliedFilters?:any,
}

export const useGetDayWiseCoverageData = () => {
    return useMutation(async (data: DayWiseCoverageParams) => {
        return getDayWiseCoverageData(data.startDate, data.endDate, data.plannedReleaseDate, data.appliedFilters);
    })
}