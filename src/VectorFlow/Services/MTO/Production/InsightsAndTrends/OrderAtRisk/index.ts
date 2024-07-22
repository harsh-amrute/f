import { useQuery } from '@tanstack/react-query'
import { OrderAtRiskService } from './api';

const QUERY_KEYS = {
    useGetOrderATRiskData: ['MDMService.useGetOrderATRiskData']
}

export const useGetOrderRiskData = () => {
    return useQuery(QUERY_KEYS.useGetOrderATRiskData, async() => {
        return await OrderAtRiskService.getOrderAtRiskData();
    });
}