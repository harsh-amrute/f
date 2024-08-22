import { useMutation } from '@tanstack/react-query'
import { OverallBMReportService } from './api'

export const useGetOverAllBMReport = () => {
    return useMutation(async (data: number) => {
        return await OverallBMReportService.getOverallBMReportData(data)
    })
}