import { useMutation, useQuery } from '@tanstack/react-query'
import { UIConfigService } from './api'

export const QUERY_KEYS = {
    useGetUIConfig: ['MDMService.useGetUIConfig'],
}

export const useGetUIConfig = (reportName: string) => {
    return useQuery(QUERY_KEYS.useGetUIConfig ,async () => {
        return UIConfigService.getUIConfig(reportName)
    })
}

interface DDQInputParams{
    currentPage: number,
    unScheduled: boolean
}

export const useGetOrdersForDDQ = () => {
    return useMutation(async (data: DDQInputParams) => {
        return UIConfigService.getOrdersForDDQ(data?.currentPage, data?.unScheduled)
    })
}

export const useGetBufferMasterData = () => {
    return useMutation(async () => {
        return UIConfigService.getBufferMasterData()
    })
}

export const useGetCCRGroupMaster = () => {
    return useMutation(async () => {
        return UIConfigService.getCCRGroupMaster()
    })
}


export const useGetRouteDetails = () => {
    return useMutation(async (route_id: number) => {
        return UIConfigService.getRouteDetails(route_id)
    })
}

