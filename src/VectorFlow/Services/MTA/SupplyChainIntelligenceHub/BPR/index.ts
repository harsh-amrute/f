import { useQuery,useMutation } from '@tanstack/react-query'
import { BPRDataPayload, SubmitBPRRemarkPayload } from '../../../../../VectorFlow/types/BPR';

import { BPRService } from './api'


export const QUERY_KEYS = {
  useGetBPRUIConfiguration: ['BPRService.useGetBPRUIConfiguration'],
  userGetBPRData:['BPRService.userGetBPRData']
}


export const useGetBPRUIConfiguration = () => {
    return useQuery(QUERY_KEYS.useGetBPRUIConfiguration,async () => {
      return await BPRService.getBPRUIConfiguration();
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
  return useMutation(async (payload:SubmitBPRRemarkPayload) => {
    return await BPRService.submitRemark(payload);
  });
}