import {InsightsAndTrendsService} from './api';
import { useQuery,useMutation } from '@tanstack/react-query'
export const QUERY_KEYS = {
  useGetAvailabilityTrend: ['InsightsAndTrendsService.useGetAvailabilityTrend'],
useGetChronicUnavailabilityLoc:['InsightsAndTrendsService.useGetChronicUnavailabilityLoc'],
useGetChronicUnavailabilitySku:['InsightsAndTrendsService.useGetChronicUnavailabilitySku'],
useGetAvailabilityAgeing:['InsightsAndTrendsService.useGetAvailabilityAgeing'],
useGetDBMNormSuggestionLoc:['InsightsAndTrendsService.useGetDBMNormSuggestionLoc'],
useGetDBMNormSuggestionPie:['InsightsAndTrendsService.useGetDBMNormSuggestionPie'],
useGetDBMNormSuggestionSKUs:['InsightsAndTrendsService.useGetDBMNormSuggestionSKUs'],
useGetDBMNormSuggestionAgeing:['InsightsAndTrendsService.useGetDBMNormSuggestionAgeing'],
useGetExcessInventorySku:['InsightsAndTrendsService.useGetExcessInventorySku'],
useGetExcessInventoryValue:['InsightsAndTrendsService.useGetExcessInventoryValue'],
useGetChronicUnavailabilityGridView:['InsightsAndTrendsService.useGetChronicUnavailabilityGridView']
}
export const useGetAvailabilityTrend = ()=>{
  return useMutation(async (body:{horison:number})=>{
    return await InsightsAndTrendsService.getAvaialabilityTrend(body)
  })
}
export const useGetChronicUnavailabilityLoc = ()=>{
  return useQuery(QUERY_KEYS.useGetChronicUnavailabilityLoc,async()=>{
    return await InsightsAndTrendsService.getChronicUnavailabilityLoc()
  })
}
export const useGetChronicUnavailabilitySku = ()=>{
  return useQuery(QUERY_KEYS.useGetChronicUnavailabilitySku,async()=>{
    return await InsightsAndTrendsService.getChronicUnavailabilitySku()
  })
}
// export const useGetAvailabilityAgeing = (horizon:number)=>{
//   return useMutation(QUERY_KEYS.useGetAvailabilityAgeing,async()=>{
//     return await InsightsAndTrendsService.getAvailabilityAgeing(horizon)
//   })
// }
export const useGetAvailabilityAgeing = () => {
    return useMutation(async (body:{horison:number}) => {
      return await InsightsAndTrendsService.getAvailabilityAgeing(body);
    });
  }

export const useGetDBMNormSuggestionLoc= ()=>{
  return useQuery(QUERY_KEYS.useGetDBMNormSuggestionLoc,async()=>{
    return await InsightsAndTrendsService.getDBMNormSuggestionLoc()
  })
}
export const useGetDBMNormSuggestionPie= ()=>{
  return useQuery(QUERY_KEYS.useGetDBMNormSuggestionPie,async()=>{
    return await InsightsAndTrendsService.getDBMNormSuggestionPie()
  })
}
export const useGetDBMNormSuggestionSKUs = ()=>{
  return useQuery(QUERY_KEYS.useGetDBMNormSuggestionSKUs,async()=>{
    return await InsightsAndTrendsService.getDBMNormSuggestionSKUs()
  })
}
export const useGetDBMNormSuggestionAgeing = ()=>{
  return useQuery(QUERY_KEYS.useGetDBMNormSuggestionAgeing,async()=>{
    return await InsightsAndTrendsService.getDBMNormSuggestionAgeing()
  })
}
export const useGetExcessInventorySku = ()=>{
  return useMutation(async(body:{horison:number})=>{
    return await InsightsAndTrendsService.getExcessInventorySku(body)
  })
}
export const useGetExcessInventoryValue = ()=>{
  return useMutation(async(body:{horison:number})=>{
    return await InsightsAndTrendsService.getExcessInventoryValue(body)
  })

}

  export const useGetChronicUnavailabilityGridView = ()=>{
  return useMutation(async(body:any)=>{
    return await InsightsAndTrendsService.getChronicUnavailabilityGridView(body)
  })}