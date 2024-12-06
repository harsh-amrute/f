import { useMutation } from '@tanstack/react-query'


import { BORColorBandWiseService } from './api'


export const QUERY_KEYS = {
//   useGetBPRUIConfiguration: ['BPRService.useGetBPRUIConfiguration'],
}



export const useGetBORColorBandWiseRecordCount =()=>{
  return useMutation(async(body:any)=>{
    return await BORColorBandWiseService.getBORColorBandWiseRecordCount(body)
  })
}

export const useGetBORColorBandWisData =()=>{
    return useMutation(async(body:any)=>{
      return await BORColorBandWiseService.getBORColorBandWisData(body)
    })
  }