import {useMutation } from '@tanstack/react-query'


import { BTRService } from './api'


export const QUERY_KEYS = {
  
}


export const useGetBTRData = () => {
    return useMutation(async () => {
      return await BTRService.getBTRData()
    });
  }

  