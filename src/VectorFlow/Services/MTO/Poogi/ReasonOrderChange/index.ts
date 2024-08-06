import { useQuery } from '@tanstack/react-query'
import { ReasonOrderChangeServices } from './api'

//useQuery for get 
export const QUERY_KEYS = {
    useGetReasonForAnalyticDelayOrder: ['MDMService.useGetReasonForAnalyticDelayOrder'],
    useGetReasonForDelayOrder: ['MDMService.useGetReasonForDelayOrder']
}

export const useGetReasonForPoogiAnalytics = () => {
    return useQuery(QUERY_KEYS.useGetReasonForAnalyticDelayOrder, async () => {
        return await ReasonOrderChangeServices.getPoogiReasonsAnalyticalData()
    })
}

export const useGetReasonForDelayOrder = () => {
    return useQuery(QUERY_KEYS.useGetReasonForDelayOrder, async () => {
        return await ReasonOrderChangeServices.getPoogiReasonsDelayedOrder()
    })
}


