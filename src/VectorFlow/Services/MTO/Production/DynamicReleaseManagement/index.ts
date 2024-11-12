import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { DynamicReleaseManagementService } from './api'

export const QUERY_KEYS = {
    useGetDynamicReleaseData: ['MDMService.useGetDynamicReleaseData']
}

export const useGetDynamicReleaseData = () => {
    return useMutation(async (data: { graph: number, ao: number, page: number, appliedFilters: any }) => {

        return DynamicReleaseManagementService.getDynamicReleaseData(data)


    })
}

export const useSaveRouteData = () => {
    return useMutation(async (body: any) => {

        return DynamicReleaseManagementService.saveRouteData(body)


    })
}
export const useUpdateDynamicReleaseData = () => {
    return useMutation(async (body: any) => {

        return DynamicReleaseManagementService.updateDynamicReleaseData(body)


    })
}



