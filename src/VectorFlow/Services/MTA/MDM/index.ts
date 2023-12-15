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
  useDeleteDraft:['MDMService.useDeleteDraft']
}


export const useGetMasterUIConfiguration = () => {
  return useMutation(QUERY_KEYS.useGetMasterUIConfiguration, async (screenType:string) => {
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
  return useMutation(QUERY_KEYS.useCreateDraft,async(body:any)=>{
    return await MDMService.createDraft(body)
  })
}

export const useModifyDraft = ()=>{
  return useMutation(QUERY_KEYS.useModifyDraft,async(body:any)=>{
    return await MDMService.modifyDraft(body)
  })
}

export const useDeleteDraft = ()=>{
  return useMutation(QUERY_KEYS.useDeleteDraft,async(id:string)=>{
    return await MDMService.deleteDraft(id)
  })
}