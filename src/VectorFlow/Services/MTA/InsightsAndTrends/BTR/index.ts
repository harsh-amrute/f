import {useMutation,useQuery } from '@tanstack/react-query'


import { BTRService } from './api'


export const QUERY_KEYS = {
  useGetBTRDataCount:['useGetBTRDataCount']
}

export const useGetBTRDataCount = () => {
  return useQuery(QUERY_KEYS.useGetBTRDataCount,async (body:any) => {
    return await BTRService.getBTRDataCount()
  });
}


export const useGetBTRData = () => {
    return useMutation(async (body:any) => {
      return await BTRService.getBTRData(body)
    });
  }

  