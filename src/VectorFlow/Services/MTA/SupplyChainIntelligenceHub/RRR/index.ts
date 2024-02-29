import { useQuery,useMutation } from '@tanstack/react-query'

import { RRRServices } from './api'
import {RRRDataPayload} from '../../../../types/RRR'


export const QUERY_KEYS = {
  useGetBPRUIConfiguration: ['RRRServices.useGetBPRUIConfiguration'],
  useGetRRRData : ['RRRServices.getRRRData'],
  useGetRRRDataCount: ['RRRServices.getRRRDataCount']
}


export const useGetBPRUIConfiguration =  () => {
    return useQuery(QUERY_KEYS.useGetBPRUIConfiguration,async () => {
      return await RRRServices.getBPRUIConfiguration();
    });
  }

export const useGetRRRData  = ()=>{
  return useMutation(QUERY_KEYS.useGetRRRData,async (body:RRRDataPayload)=>{
    return await RRRServices.getRRRData(body);
  })
}

export const useGetRRRDataCount  = ()=>{
  return useMutation(QUERY_KEYS.useGetRRRDataCount,async (body:RRRDataPayload)=>{
    return await RRRServices.getRRRDataCount(body);
  })
}

