/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { GetMasterDataPayload } from '../../../types/MDM';


export namespace MDMService {

  export const getMasterUIConfiguration = async (screenType:string) => {
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetMasterUIConfiguration`,{screenType:screenType});
  }

  export const getCount = async (body:GetMasterDataPayload) => {
   
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetCount`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getRetailCount = async (body:GetMasterDataPayload) => {
   
    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/get-count/`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getMasterData = async (body:GetMasterDataPayload) => {
   
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetMasterData`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getMasterDataRetail = async (body:GetMasterDataPayload) => {
   
    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/get-master-data/`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getAllDrafts = async () => {
    return await axios.get(process.env.REACT_APP_API_HOST + `api/mta/allDrafts`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getDraftCount = async(id:string)=>{
    return await axios.get(process.env.REACT_APP_API_HOST + `api/mta/draftCount/${id}`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getDraftById = async(id:string,body:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/draft/${id}`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const createDraft = async (body: any) => {
    return axios.post(process.env.REACT_APP_API_HOST + `api/mta/draft`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const modifyDraft = async (body: any) => {
    return axios.put(process.env.REACT_APP_API_HOST + `api/mta/draft`,body,{
      headers: { 'Content-Type': 'application/json' },
    })
  }

  export const deleteDraft = async(id:string)=>{
    return await axios.delete(process.env.REACT_APP_API_HOST + `api/mta/draft/${id}`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getSeasonalityDetails = async (body:any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + 'api/mta/GetSeasonalityDetails',body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  export const getPendingTasks = async()=>{
    return await axios.get(process.env.REACT_APP_API_HOST + `api/mta/GetTaskPendingForReviewData`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskDetails = async(body:{taskId:string,paginationParameter:{pageNumber:number,recordsPerPage:number}})=>{
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetTaskDetails`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskCount = async(taskId:string)=>{
    return await axios.get(process.env.REACT_APP_API_HOST + `api/mta/GetTaskCount/${taskId}`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskStatusData = async()=>{
    return await axios.get(process.env.REACT_APP_API_HOST + `api/mta/GetTaskStatusData`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskDetailsDownloadData = async(body:{taskId:string,approverId:number})=>{
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetTaskDetailsDownloadData`,JSON.stringify(body),{
      headers: { 'Content-Type': 'application/json' }
    })
  }


  export const modifyMasterData = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + 'api/mta/ModifyMasterData',{...body,"forwardUsers":true},{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const modifyMasterDataRetail = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/modify-master-data/`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const addMasterData = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + 'api/mta/AddMasterData',{...body,"forwardUsers":true},{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const addMasterDataRetail = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/add-valid-master/`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const deleteMasterData = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + 'api/mta/RemoveMasterData',{...body,"forwardUsers":true},{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const deleteMasterDataRetail = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/remove-master-data/`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }


  export const deleteTask = async(taskId:any)=>{
    return await axios.delete(process.env.REACT_APP_API_HOST + 'api/mta/DeleteTask',{params:{taskId}})
  }

  export const approveTask = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + 'api/mta/PostMasterAfterApproved',body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const validateMaster = async(formData:any,masterId:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + 'api/validate-master/basic-validation/' + masterId,formData,{
      responseType:'stream'
    })
  }

  export const getSkuLoc = async (body:any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetSkuLoc`,body);
  }

  export const getTaskMastersHistory = async (body:any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetTaskMastersHistory`,body);
  }
  
  export const getUploadProgress = async(processId:any)=>{
    return await axios.get(process.env.REACT_APP_API_HOST + 'api/validate-master/get-upload-progress/' + processId,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getAllReports = async()=>{
    return await axios.get(process.env.REACT_APP_API_HOST + 'api/mta/GetAllReports',{
      headers: { 'Content-Type': 'application/json' }
    })
  }

}

