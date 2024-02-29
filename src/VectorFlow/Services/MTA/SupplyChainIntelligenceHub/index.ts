import { useQuery,useMutation } from '@tanstack/react-query'

import { SupplyChainIntelligenceHubService } from './api'


export const QUERY_KEYS = {
  useGetBPRUIConfiguration: ['MDMService.useGetBPRUIConfiguration'],
  useGetRRRData : ['MDMServices.useGetRRRData']
}


export const useGetBPRUIConfiguration =  () => {
    return useQuery(QUERY_KEYS.useGetBPRUIConfiguration,async () => {
      return await SupplyChainIntelligenceHubService.getBPRUIConfiguration();
    });
  }

// export const useGetRRRData  = ()=>{
//   return useQuery(QUERY_KEYS.useGetRRRData,async ()=>{
//     return await SupplyChainIntelligenceHubService.getRRRData();
//   })
// }
