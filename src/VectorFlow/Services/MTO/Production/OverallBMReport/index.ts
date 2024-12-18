import { useMutation } from '@tanstack/react-query'
import { OverallBMReportService } from './api'
type OverallBMReportInputType = {
    page: number,
    appliedFilters: any,
    page_size?: number,
    analytics?: 0 | 1,
    user? : any
}

export const useGetOverAllBMReport = () => {
    return useMutation(async (data: OverallBMReportInputType) => {
        return await OverallBMReportService.getOverallBMReportData(data)
    })
}