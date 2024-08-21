import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { OrderBalanceService } from './api'

export const useGetOrderBalanceData = () => {
    return useMutation(async (params: any) => {
        return OrderBalanceService.getOrderBalanceData(params);
    })
}
