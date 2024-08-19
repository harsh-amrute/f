import { useQuery } from '@tanstack/react-query'
import { FilterDataService } from './api'

//useQuery for get 
export const QUERY_KEYS = {
    useGetFilterData: ['MDMService.useGetFilterData'],
}

export const useGetFilterData = ()=>{
    return useQuery(QUERY_KEYS.useGetFilterData,async()=>{
      return await FilterDataService.getFilterData()
    })
}



