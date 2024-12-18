import { useMutation } from '@tanstack/react-query'
import { OverallBMReportService } from './api'
type OverallBMReportInputType = {
    page: number,
    appliedFilters: any,
    page_size?: number,
    analytics?: 0 | 1,
}

export const useGetOverAllBMReport = () => {
    return useMutation(async (data: OverallBMReportInputType) => {
        return await OverallBMReportService.getOverallBMReportData(data)
    })
}

export const useShortOrderCompleteOrder = () =>{

    return useMutation(async (data:any)=>{

        return await OverallBMReportService.shortOrder_completeOrder(data);
    })

}