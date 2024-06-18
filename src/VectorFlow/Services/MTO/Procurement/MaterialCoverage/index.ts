import { useQuery, useMutation } from '@tanstack/react-query'
import { MaterialCoverageServices } from './api'

//useQuery for get 
export const QUERY_KEYS = {
    useGetSummarySo: ['MDMService.useGetSummarySO'],
    useGetOpenSODetailsData:['MDMService.useGetOpenSODetailsData']
}

export const useGetSOSummaydetails = ()=>{
    return useQuery(QUERY_KEYS.useGetSummarySo,async()=>{
      return await MaterialCoverageServices.getMaterialSOData()
    })
  }

export const useGetOpenSODetailsData = () => {
  return useMutation(async(data:any)=>{
        //console.log("return ===",MaterialCoverageServices.getOpenSODetailsData)
        return MaterialCoverageServices.getOpenSODetailsData(data)
    })
}
