import { useQuery } from '@tanstack/react-query'
import { MDMService } from './api'


export const QUERY_KEYS = {
  useGetMasterUIConfiguration: ['MDMService.useGetMasterUIConfiguration']
}

export const useGetMasterUIConfiguration = (onSuccess:any) => {
  return useQuery(QUERY_KEYS.useGetMasterUIConfiguration, async () => {
    return await MDMService.getMasterUIConfiguration();
  },{onSuccess});
}

