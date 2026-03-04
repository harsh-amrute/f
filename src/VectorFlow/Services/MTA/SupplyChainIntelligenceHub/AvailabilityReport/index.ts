import { useMutation } from '@tanstack/react-query'

import { ARService } from './api'

export const QUERY_KEYS = {
  useGetARDataCount: ['useGetARDataCount']
}

export const useGetARDataCount = () => {
  return useMutation(async (body: any) => {
    return await ARService.getARDataCount(body)
  });
}

export const useGetARData = () => {
  return useMutation(async (body: any) => {
    return await ARService.getARData(body)
  });
}

export const useGetARSummaryData = () => {
  return useMutation(async (body: any) => {
    return await ARService.getARSummaryData(body)
  });
}

