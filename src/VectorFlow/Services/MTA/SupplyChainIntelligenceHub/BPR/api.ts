/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { BPRDataPayload, SubmitBPRRemarkPayload } from '../../../../../VectorFlow/types/BPR';


export namespace BPRService {

  export const getBPRUIConfiguration = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetBPRUIConfig`,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }
  
  
  export const getBPRDataCount = async (payload:BPRDataPayload) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetBPRDataCount`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getBPRData = async (payload:BPRDataPayload) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetBPRData`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const submitRemark = async (payload:{data:Array<SubmitBPRRemarkPayload>}) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/AddRemark`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getRemarkHistory = async (payload:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetRemarkDetails`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    }); 
  }

  export const getAllSKUs=async()=>{
    // return await axios.get(`https://requestly.tech/api/mockv2/GetAllSKU?username=user1708583815102&`,{
      return await axios.get(process.env.REACT_APP_VF_API_HOST + '/SKUDesc',{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getAllLocations=async()=>{
    // return await axios.get(`https://requestly.tech/api/mockv2/GetAllSKU?username=user1708583815102&`,{
      return await axios.get(process.env.REACT_APP_VF_API_HOST + `/WHDesc`,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getDailyData = async (payload:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/DailyDataGraph`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    }); 
  }

  export const saveState = async (payload:{reportname:string,state:string}) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/SaveState`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    }); 
  }

  export const getState = async (payload:string) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetState`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    }); 
  }

  export const resetState = async (payload:string) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/ResetState`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    }); 
  }

  export const getAnalyticsData = async (payload:string) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetAnalyticsData`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    }); 
  }

  export const getInTransitWhereAboutAnalytics = async()=>{
    return await axios.get(process.env.REACT_APP_VF_API_HOST + '/GetInTransitWhereAboutAnalytics',{
      headers:{ 'Content-Type': 'application/json' }
    })
  }

  export const getOpenExpediteAnalytics = async()=>{
    return await axios.get(process.env.REACT_APP_VF_API_HOST + '/OpenExpediteAnalytics',{
      headers:{ 'Content-Type': 'application/json' }
    })
  }

  export const getLocationTypes = async()=>{
    return await axios.get(process.env.REACT_APP_VF_API_HOST + '/LocationType',{
      headers:{ 'Content-Type': 'application/json' }
    })
  }

  export const getlastRunDate = async()=>{
    return await axios.get(process.env.REACT_APP_VF_API_HOST + '/GetLastRunDate',{
      headers:{ 'Content-Type': 'application/json' }
    })
  }

  export const getUiConfig = async(reportName:string)=>{
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetUIConfig?reportName=${reportName}`,{
      headers:{ 'Content-Type': 'application/json' }
    })
  }
}


