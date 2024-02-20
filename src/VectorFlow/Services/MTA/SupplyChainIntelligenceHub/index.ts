import { useQuery,useMutation } from '@tanstack/react-query'

import { SupplyChainIntelligenceHubService } from './api'


export const QUERY_KEYS = {
  useGetBPRUIConfiguration: ['MDMService.useGetBPRUIConfiguration']
}


export const useGetBPRUIConfiguration =  () => {
    return useQuery(QUERY_KEYS.useGetBPRUIConfiguration,async () => {
      return await SupplyChainIntelligenceHubService.getBPRUIConfiguration();
    });
  }
