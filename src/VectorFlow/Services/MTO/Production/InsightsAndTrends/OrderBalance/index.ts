import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { OrderBalanceService } from './api'

export const useGetOrderBalanceData = () => {
    return useMutation(async (graphFlag: any) => {
        return OrderBalanceService.getOrderBalanceData(graphFlag);
    })
}
