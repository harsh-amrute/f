import { useQuery } from '@tanstack/react-query'
import { FilterDataService } from './api'

//useQuery for get 
export const QUERY_KEYS = {
    useGetFilterData: ['MDMService.useGetFilterData'],
}

export const useGetFilterData = (page_type?: any)=>{
    return useQuery(QUERY_KEYS.useGetFilterData,async()=>{
      return await FilterDataService.getFilterData(page_type)
    })
}



