import { useQuery,useMutation } from '@tanstack/react-query'
import { GetMasterDataPayload } from '~/VectorFlow/types/MDM';
import { MDMService } from './api'


export const QUERY_KEYS = {
  useGetMasterUIConfiguration: ['MDMService.useGetMasterUIConfiguration'],
  useGetMasterData:['MDMService.useGetMasterData']
}

export const useGetMasterUIConfiguration = () => {
  return useQuery(QUERY_KEYS.useGetMasterUIConfiguration, async () => {
    return await MDMService.getMasterUIConfiguration();
  });
}

export const useGetMasterData = () => {
  return useMutation(async (body:GetMasterDataPayload) => {
    return await MDMService.getMasterData(body)
  })
}

