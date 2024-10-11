/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { GetMasterDataPayload } from '../../../types/MDM';


export namespace MDMService {

  export const getMasterUIConfiguration = async (screenType: string) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetMasterUIConfiguration`, { screenType: screenType });
  }

  export const getCount = async (body: GetMasterDataPayload) => {

    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetCount`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getRetailCount = async (body: GetMasterDataPayload) => {

    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/get-count/`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getMasterData = async (body: GetMasterDataPayload) => {

    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetMasterData`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getMasterDataRetail = async (body: GetMasterDataPayload) => {

    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/get-master-data/`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getAllDrafts = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/allDrafts`, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getDraftCount = async (id: string) => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/draftCount/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getDraftById = async (id: string, body: any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/draft/${id}`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const createDraft = async (body: any) => {
    return axios.post(process.env.REACT_APP_VF_API_HOST + `/draft`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const modifyDraft = async (body: any) => {
    return axios.put(process.env.REACT_APP_VF_API_HOST + `/draft`, body, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  export const deleteDraft = async (id: string) => {
    return await axios.delete(process.env.REACT_APP_VF_API_HOST + `/draft/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getSeasonalityDetails = async (body: any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + '/GetSeasonalityDetails', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getPendingTasks = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetTaskPendingForReviewData`, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskDetails = async (body: { taskId: string, paginationParameter: { pageNumber: number, recordsPerPage: number } }) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetTaskDetails`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskCount = async (taskId: string) => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetTaskCount/${taskId}`, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskStatusData = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetTaskStatusData`, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getTaskDetailsDownloadData = async (body: { taskId: string, approverId: number }) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetTaskDetailsDownloadData`, JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' }
    })
  }


  export const modifyMasterData = async (body: any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + '/ModifyMasterData', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const modifyMasterDataRetail = async (body: any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/modify-master-data/`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const addMasterData = async (body: any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + '/AddMasterData', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const addMasterDataRetail = async (body: any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/add-valid-master/`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const deleteMasterData = async (body: any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + '/RemoveMasterData', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const deleteMasterDataRetail = async (body: any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + `/api/validate-master/remove-master-data/`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }


  export const deleteTask = async (taskId: any) => {
    return await axios.delete(process.env.REACT_APP_VF_API_HOST + '/DeleteTask', { params: { taskId } })
  }

  export const approveTask = async (body: any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + '/PostMasterAfterApproved', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const validateMaster = async (formData: any, masterId: any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + 'api/validate-master/basic-validation/' + masterId, formData, {
      responseType: 'stream'
    })
  }

  export const getSkuLoc = async (body: any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetSkuLoc`, body);
  }

  export const getTaskMastersHistory = async (body: any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetTaskMastersHistory`, body);
  }

  export const getUploadProgress = async (processId: any) => {
    return await axios.get(process.env.REACT_APP_API_HOST + 'api/validate-master/get-upload-progress/' + processId, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getAllReports = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + '/GetAllReports', {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  /**This get the  MTO Masters Data*/
  export const getMTOMastersData = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + '/GetMasterManagementData', {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  export const getMTOTaskStatusData = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + '/GetTasks', {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  /** Save buffer master task MTO */
  export const saveBufferMasterTask = async (body: any) => {
    return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + '/SaveBufferMasterTask/', 
      body
    )
  }

  export const getBufferMasterData = async () => {
    return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + '/GetBufferMasterForMasterMgmt/?masterId=501', {
      headers: { 'Content-Type': 'application/json' }
    })
  }



  export const getBufferTypeMaster = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + '/GetBufferTypeMaster/', {
      headers: { 'Content-Type': 'application/json' }
    })
  }

}

