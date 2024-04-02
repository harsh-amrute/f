import {InsightsAndTrendsService} from './api';
import { useQuery } from '@tanstack/react-query'
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
  return useQuery(QUERY_KEYS.useGetAvailabilityTrend,async()=>{
    return await InsightsAndTrendsService.getAvaialabilityTrend()
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
export const useGetAvailabilityAgeing = ()=>{
  return useQuery(QUERY_KEYS.useGetAvailabilityAgeing,async()=>{
    return await InsightsAndTrendsService.getAvailabilityAgeing()
  })
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
  return useQuery(QUERY_KEYS.useGetExcessInventorySku,async()=>{
    return await InsightsAndTrendsService.getExcessInventorySku()
  })
}
export const useGetExcessInventoryValue = ()=>{
  return useQuery(QUERY_KEYS.useGetExcessInventoryValue,async()=>{
    return await InsightsAndTrendsService.getExcessInventoryValue()
  })

}

  export const useGetChronicUnavailabilityGridView = ()=>{
  return useQuery(QUERY_KEYS.useGetChronicUnavailabilityGridView,async()=>{
    return await InsightsAndTrendsService.getChronicUnavailabilityGridView()
  })}