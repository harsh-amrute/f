import { useMutation } from '@tanstack/react-query'
import { OverallBMReportService } from './api'
type OverallBMReportInputType = {
    page: number,
    appliedFilters: any,
    page_size?: number
}

export const useGetOverAllBMReport = () => {
    return useMutation(async (data: OverallBMReportInputType) => {
        return await OverallBMReportService.getOverallBMReportData(data)
    })
}