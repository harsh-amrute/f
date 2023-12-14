/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { GetMasterDataPayload } from '../../../types/MDM';


export namespace MDMService {

  export const getMasterUIConfiguration = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetMasterUIConfiguration`);
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
    return axios.post(process.env.REACT_APP_VF_API_HOST + `/draft`,
      body)
  }

  export const modifyDraft = async (body: any) => {
    return axios.put(process.env.REACT_APP_VF_API_HOST + `/draft`,{
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(body)
    })
  }

  export const deleteDraft = async(id:string)=>{
    return await axios.delete(process.env.REACT_APP_VF_API_HOST + `/draft/${id}`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
