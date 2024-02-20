import { useQuery,useMutation } from '@tanstack/react-query'
import { BPRDataPayload } from '~/VectorFlow/types/BPR';

import { SupplyChainIntelligenceHubService } from './api'


export const QUERY_KEYS = {
  useGetBPRUIConfiguration: ['SupplyChainIntelligenceHubService.useGetBPRUIConfiguration'],
  userGetBPRData:['SupplyChainIntelligenceHubService.userGetBPRData']
}


export const useGetBPRUIConfiguration = () => {
    return useQuery(QUERY_KEYS.useGetBPRUIConfiguration,async () => {
      return await SupplyChainIntelligenceHubService.getBPRUIConfiguration();
    });
  }

  export const useGetBPRData = () => {
    return useMutation(QUERY_KEYS.useGetBPRUIConfiguration,async (payload:BPRDataPayload) => {
      return await SupplyChainIntelligenceHubService.getBPRData(payload);
    });
  }
