import { useQuery,useMutation } from '@tanstack/react-query'
import { BPRDataPayload, GetDailyDataPayload, SubmitBPRRemarkPayload } from '../../../../../VectorFlow/types/BPR';

import { OpenExpeditingRequestsService } from './api'


export const QUERY_KEYS = {
    GetOpenExpediteRequestData: ['OpenExpeditingRequestsService.GetOpenExpediteRequestData'],
}


export const useGetOpenExpediteRequestData = () => {
    return useQuery(QUERY_KEYS.GetOpenExpediteRequestData,async () => {
      return await OpenExpeditingRequestsService.getOpenExpediteRequestData();
    });
  }

  export const useAddRemarkForExpedite = () => {
    return useMutation(async (body:any) => {
      return await OpenExpeditingRequestsService.addRemarkForExpedite(body);
    });
  }

  export const useGetRemarkDetailsForExpedite = () => {
    return useMutation(async (body:any) => {
      return await OpenExpeditingRequestsService.getRemarkDetailsForExpedite(body);
    });
  }
