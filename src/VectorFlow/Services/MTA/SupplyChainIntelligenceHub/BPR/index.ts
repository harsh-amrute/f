import { useQuery,useMutation } from '@tanstack/react-query'
import { BPRDataPayload, GetDailyDataPayload, SubmitBPRRemarkPayload } from '../../../../../VectorFlow/types/BPR';

import { BPRService } from './api'


export const QUERY_KEYS = {
  useGetBPRUIConfiguration: ['BPRService.useGetBPRUIConfiguration'],
  userGetBPRData:['BPRService.userGetBPRData'],
  useGetAllSKUs:['BPRService.useGetAllSKUs'],
  useGetAllLocations:['BPRService.useGetAllLocations'],
  useGetInTransitWhereAboutAnalytics:['BPRService.useGetInTransitWhereAboutAnalytics'],
  useGetOpenExpediteAnalytics:['BPRService.useGetOpenExpediteAnalytics']
}


export const useGetBPRUIConfiguration = () => {
    return useQuery(QUERY_KEYS.useGetBPRUIConfiguration,async () => {
      return await BPRService.getBPRUIConfiguration();
    });
  }

  export const useGetAllSKUs=()=>{
    return useQuery(QUERY_KEYS.useGetAllSKUs,async () => {
      return await BPRService.getAllSKUs();
    });
   
  }

  export const useGetAllLocations=()=>{
    return useQuery(QUERY_KEYS.useGetAllLocations,async () => {
      return await BPRService.getAllLocations();
    });
   
  }

  export const useGetBPRDataCount = () => {
    return useMutation(async (payload:BPRDataPayload) => {
      return await BPRService.getBPRDataCount(payload);
    });
  }


export const useGetBPRData = () => {
  return useMutation(async (payload:BPRDataPayload) => {
    return await BPRService.getBPRData(payload);
  });
}

export const useGetBPRRemarkHistory = () => {
  return useMutation(async (payload:BPRDataPayload) => {
    return await BPRService.getRemarkHistory(payload);
  });
}

export const useSubmitBPRRemark = () => {
  return useMutation(async (payload:{data:Array<SubmitBPRRemarkPayload>}) => {
    return await BPRService.submitRemark(payload);
  });
}

export const useGetDailyData = () => {
  return useMutation(async (payload:GetDailyDataPayload) => {
    return await BPRService.getDailyData(payload);
  });
}

export const useSaveState = () => {
  return useMutation(async (payload:{reportname:string,state:string}) => {
    return await BPRService.saveState(payload);
  });
}

export const useGetState = () => {
  return useMutation(async (payload:string) => {
    return await BPRService.getState(payload);
  });
}

export const useResetState = () => {
  return useMutation(async (payload:string) => {
    return await BPRService.resetState(payload);
  });
}

export const useGetAnalyticsData = () => {
  return useMutation(async (payload:string) => {
    return await BPRService.getAnalyticsData(payload);
  });
}

export const useGetInTransitWhereAboutAnalytics = ()=>{
  return useQuery(QUERY_KEYS.useGetInTransitWhereAboutAnalytics,async()=>{
    return await BPRService.getInTransitWhereAboutAnalytics()
  })
}

export const useGetOpenExpediteAnalytics = ()=>{
  return useQuery(QUERY_KEYS.useGetOpenExpediteAnalytics,async()=>{
    return await BPRService.getOpenExpediteAnalytics()
  })
}