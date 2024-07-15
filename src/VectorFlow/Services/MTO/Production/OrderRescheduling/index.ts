import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { OrderReschedulingService } from './api'

export const QUERY_KEYS = {
    useGetOrderSchedulingData: ['MDMService.useGetOrderSchedulingData']
}

export const useGetOrderSchedulingData = () => {
    return useMutation(async () => {
        return OrderReschedulingService.getOrderReschedulingData()
    })
}


export const usePutUpdateOrderDueDate = () => {
    return useMutation(async (body: any) => {
        return OrderReschedulingService.putUpdateOrderDueDate([body]);
    })
}
