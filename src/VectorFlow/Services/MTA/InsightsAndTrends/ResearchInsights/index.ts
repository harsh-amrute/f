import { useMutation } from '@tanstack/react-query'
import { ResearchInsightsService } from './api'


export const QUERY_KEYS = {
  
}


export const useGetUpdatedGraphData = ()=>{
    return useMutation(async(body:any)=>{
        return await ResearchInsightsService.getUpdatedGraphData(body);
    })
}


