import { useQuery,useMutation } from '@tanstack/react-query'

import { SupplyChainIntelligenceHubService } from './api'


export const QUERY_KEYS = {
  useGetBORUIConfiguration: ['MDMService.useGetBORUIConfiguration'],
  useBORData:['MDMService.useBORData'],
  useBORDataCount:['MDMService.useBORDataCount']
}


export const useGetBORUIConfiguration = () => {
    return useQuery(QUERY_KEYS.useGetBORUIConfiguration,async () => {
      return await SupplyChainIntelligenceHubService.getBORUIConfiguration();
    });
  }
  export const useBORData=()=>{
    return useMutation(async (paginationParameter:{pageNumber:number,recordsPerPage:number}) => {
      return await SupplyChainIntelligenceHubService.getBORData(paginationParameter);
    });
  }
  export const useBORDataCount = () => {
    return useMutation(async (filter:any) => {
      return await SupplyChainIntelligenceHubService.getBORDataCount(filter);
    });
  }