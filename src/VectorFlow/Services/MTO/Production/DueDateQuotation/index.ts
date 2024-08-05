import { useMutation, useQuery } from '@tanstack/react-query'
import { DueDateQuotationService } from './api'

export const QUERY_KEYS = {
    useGetUIConfig: ['MDMService.useGetUIConfig'],
}

export const useGetUIConfig = (reportName: string) => {
    return useQuery(QUERY_KEYS.useGetUIConfig ,async () => {
        return DueDateQuotationService.getUIConfig(reportName)
    })
}

interface DDQInputParams{
    currentPage: number,
    unScheduled: boolean
}

export const useGetOrdersForDDQ = () => {
    return useMutation(async (data: DDQInputParams) => {
        return DueDateQuotationService.getOrdersForDDQ(data?.currentPage, data?.unScheduled)
    })
}

export const useGetBufferMasterData = () => {
    return useMutation(async () => {
        return DueDateQuotationService.getBufferMasterData()
    })
}

export const useGetCCRGroupMaster = () => {
    return useMutation(async () => {
        return DueDateQuotationService.getCCRGroupMaster()
    })
}


export const useGetRouteDetails = () => {
    return useMutation(async (route_id: number) => {
        return DueDateQuotationService.getRouteDetails(route_id)
    })
}

export const useGetCCRItemTypeMappingMaster = () => {
    return useMutation(async () => {
        return DueDateQuotationService.getCCRItemTypeMappingMaster()
    })
}
export const useGetFOLData = () => {
    return useMutation(async () => {
        return DueDateQuotationService.getFOLData()
    })
}
export const useGetCCRMasterData = () => {
    return useMutation(async () => {
        return DueDateQuotationService.getCCRMasterData()
    })
}

export const useGetDailyWorkingCalendar = () => {
    return useMutation(async () => {
        return DueDateQuotationService.getDailyWorkingCalendar()
    })
}

export const useGetMarketOperatingLeadTimeMasterData = () => {
    return useMutation(async () => {
        return DueDateQuotationService.getMarketOperatingLeadTimeMasterData()
    })
}

