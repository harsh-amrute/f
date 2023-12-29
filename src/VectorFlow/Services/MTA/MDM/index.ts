import { useQuery,useMutation } from '@tanstack/react-query'
import { GetMasterDataPayload } from '../../../types/MDM';
import { MDMService } from './api'


export const QUERY_KEYS = {
  useGetMasterUIConfiguration: ['MDMService.useGetMasterUIConfiguration'],
  useGetMasterData:['MDMService.useGetMasterData'],
  useGetAllDrafts:['MDMService.useGetAllDrafts'],
  useGetDraftById:['MDMService.useGetDraftById'],
  useCreateDraft:['MDMService.useCreateDraft'],
  useModifyDraft:['MDMService.useModifyDraft'],
  useDeleteDraft:['MDMService.useDeleteDraft'],
  useGetSeasonalityDetails:['MDMService.useGetSeasonalityDetails'],
  useGetPendingTasks:['MDMService.useGetPendingTasks'],
  useGetTaskStatusData:['MDMService.useGetTaskStatusData']
}


export const useGetMasterUIConfiguration = () => {
  return useMutation(async (screenType:string) => {
    return await MDMService.getMasterUIConfiguration(screenType);
  });
}

export const useGetCount = () => {
  return useMutation(async (body:GetMasterDataPayload) => {
    return await MDMService.getCount(body)
  })
}

export const useGetMasterData = () => {
  return useMutation(async (body:GetMasterDataPayload) => {
    return await MDMService.getMasterData(body)
  })
}

export const useGetAllDrafts = ()=>{
  return useQuery(QUERY_KEYS.useGetAllDrafts,async()=>{
    return await MDMService.getAllDrafts()
  })
}

export const useGetDraftById = ()=>{
  return useMutation(QUERY_KEYS.useGetDraftById,async(id:string)=>{
    return await MDMService.getDraftById(id)
  })
}

export const useCreateDraft = ()=>{
  return useMutation(async(body:any)=>{
    return await MDMService.createDraft(body)
  })
}

export const useModifyDraft = ()=>{
  return useMutation(async(body:any)=>{
    return await MDMService.modifyDraft(body)
  })
}

export const useDeleteDraft = ()=>{
  return useMutation(async(id:string)=>{
    return await MDMService.deleteDraft(id)
  })
}

export const useGetSeasonalityDetails = () => {
  return useMutation(QUERY_KEYS.useGetSeasonalityDetails,async(body:object)=>{
    return await MDMService.getSeasonalityDetails(body)
  })
}

export const useGetPendingTasks = () =>{
  return useQuery(QUERY_KEYS.useGetPendingTasks,async()=>{
    return await MDMService.getPendingTasks()
  })
}

export const useGetTaskDetails = ()=>{
  return useMutation(async(taskId:string)=>{
    return await MDMService.getTaskDetails(taskId)
  })
}

export const useGetTaskStatusData = ()=>{
  return useQuery(QUERY_KEYS.useGetTaskStatusData,async()=>{
    return await MDMService.getTaskStatusData()
  })
}

export const useGetTasKDetailDownloadData = ()=>{
  return useMutation(async(body:{taskId:string,approverId:number})=>{
    return await MDMService.getTaskDetailsDownloadData(body)
  })
}