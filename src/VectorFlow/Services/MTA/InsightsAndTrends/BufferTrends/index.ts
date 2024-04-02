import { useMutation } from '@tanstack/react-query'
import { BufferTrendsService } from './api'


export const QUERY_KEYS = {
  useBTGDataCount: ['BufferTrendsService.getBTGDataCount'],
  useGetBufferTrendsGraph: ['BufferTrendsService.getBufferTrendsGraph'],
}

export const useBTGDataCount = ()=>{
    return useMutation(async(body:any)=>{
      return await BufferTrendsService.getBTGDataCount(body);
    })
  }

export const useGetBufferTrendsGraph = ()=>{
    return useMutation(async(body:any)=>{
        return await BufferTrendsService.getBufferTrendsGraph(body);
    })
}


