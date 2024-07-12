import { useQuery } from '@tanstack/react-query'
import { BMTrends } from './api'

export const QUERY_KEYS = {
    useGetBMTrendsData: ['MDMService.useGetBMTrendsData'],
}

export const useGetBMTrendsData = ()=>{
    return useQuery(QUERY_KEYS.useGetBMTrendsData,async()=>{
      return await BMTrends.getBMTrendsData()
    })
  }
