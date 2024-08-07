import { useQuery, useMutation } from '@tanstack/react-query'
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
    return useMutation(async (data: number) => {
        return await ReasonOrderChangeServices.getPoogiReasonsDelayedOrder(data)
    })
}

export const useGetPoogiRemarks = () => {
    return useMutation(async (data: string) => {
        return await ReasonOrderChangeServices.getPoogIRemarks(data);
    })
}

