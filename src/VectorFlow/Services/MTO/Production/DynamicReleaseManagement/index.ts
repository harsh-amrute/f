import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { DynamicReleaseManagementService } from './api'

export const QUERY_KEYS = {
    useGetDynamicReleaseData: ['MDMService.useGetDynamicReleaseData']
}

export const useGetDynamicReleaseData = () => {
    return useMutation(async ({ graph, ao = 0, page = 1 }: { graph: number, ao: number, page: number }) => {

        return DynamicReleaseManagementService.getDynamicReleaseData({ graph, ao, page })


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



