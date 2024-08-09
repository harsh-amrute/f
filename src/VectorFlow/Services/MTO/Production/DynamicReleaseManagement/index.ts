import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { DynamicReleaseManagementService } from './api'

export const QUERY_KEYS = {
    useGetDynamicReleaseData: ['MDMService.useGetDynamicReleaseData']
}

export const useGetDynamicReleaseData = () => {
    return useMutation(async ({ graph, ao = 0 }: { graph: number, ao: number }) => {

        return DynamicReleaseManagementService.getDynamicReleaseData({ graph, ao })


    })
}

