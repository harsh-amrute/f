import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { OrderwiseCoverageService } from './api'

export const QUERY_KEYS = {
    useGetOrderSchedulingData: ['MDMService.useGetOrderSchedulingData']
}

export const useGetOrderwiseCoverageData = () => {
    return useMutation(async (props: { page?: number, graph: number, appliedFilters?: any }) => {
        return OrderwiseCoverageService.getOrderwiseCoverageData(props)
    })
}

