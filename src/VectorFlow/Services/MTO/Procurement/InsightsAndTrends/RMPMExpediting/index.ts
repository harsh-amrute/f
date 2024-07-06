
import { useQuery } from '@tanstack/react-query'
import { RMPMExpedtingServices } from './api'



const QUERY_KEYS = {
    useGetLatestRunDate: ['MDMService.useGetLatestRunDate']
}

export const useGetDate = () => {

    return useQuery(QUERY_KEYS.useGetLatestRunDate, async () => {
        return await RMPMExpedtingServices.getLastRunDate();
    })

}