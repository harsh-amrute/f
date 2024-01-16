/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { GetMasterDataPayload } from '../../../types/MDM';


export namespace MDMService {

  export const getMasterUIConfiguration = async (screenType:string) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetMasterUIConfiguration`,{screenType:screenType});
  }

  export const getCount = async (body:GetMasterDataPayload) => {
   
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetCount`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getMasterData = async (body:GetMasterDataPayload) => {
   
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetMasterData`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getAllDrafts = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/allDrafts`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getDraftById = async(id:string)=>{
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/draft/${id}`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const createDraft = async (body: any) => {
    return axios.post(process.env.REACT_APP_VF_API_HOST + `/draft`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const modifyDraft = async (body: any) => {
    return axios.put(process.env.REACT_APP_VF_API_HOST + `/draft`,body,{
      headers: { 'Content-Type': 'application/json' },
    })
  }

  export const deleteDraft = async(id:string)=>{
    return await axios.delete(process.env.REACT_APP_VF_API_HOST + `/draft/${id}`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getSeasonalityDetails = async (body:any) => {
    return await axios.post('https://2cfc61ae-927a-4577-8843-ee38dfb26302.mock.pstmn.io/GetSeasonalityDetails',body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  export const getPendingTasks = async()=>{
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetTaskPendingForReviewData`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskDetails = async(taskId:string)=>{
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetTaskDetails/${taskId}`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskStatusData = async()=>{
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetTaskStatusData`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskDetailsDownloadData = async(body:{taskId:string,approverId:number})=>{
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetTaskDetailsDownloadData`,JSON.stringify(body),{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const removeMasterData = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_VF_API_HOST + '/RemoveMasterData',JSON.stringify(body),{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const modifyMasterData = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_VF_API_HOST + '/ModifyMasterData',body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }


export const deleteTask = async(taskId:any)=>{
  return await axios.delete(process.env.REACT_APP_VF_API_HOST + '/DeleteTask',{params:{taskId}})
}

}

