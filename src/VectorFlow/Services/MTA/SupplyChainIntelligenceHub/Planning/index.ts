import { useQuery,useMutation } from '@tanstack/react-query'
import { PlanningService } from './api'


export const QUERY_KEYS = {
    useGetPlanningDataCount: ['MDMService.useGetPlanningDataCount'],
    useGetPlanningData: ['MDMService.useGetPlanningData'],

 
}

export const useGetPlanningDataCount = ()=>{
    return useMutation(async(body:any)=>{
      return await PlanningService.getPlanningDataCount(body);
    })
  }

export const useGetPlanningData = ()=>{
    return useMutation(async(body:any)=>{
        return await PlanningService.getPlanningData(body);
    })
}


