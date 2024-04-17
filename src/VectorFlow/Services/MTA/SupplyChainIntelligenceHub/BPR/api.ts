/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { BPRDataPayload, SubmitBPRRemarkPayload } from '../../../../../VectorFlow/types/BPR';


export namespace BPRService {

  export const getBPRUIConfiguration = async () => {
    return await axios.get(process.env.REACT_APP_VF_MOCK_API_HOST + `/GetBPRUIConfiguration`,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getBPRData = async (payload:BPRDataPayload) => {
    return await axios.post(process.env.REACT_APP_VF_MOCK_API_HOST + `/GetBPRData`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const submitRemark = async (payload:SubmitBPRRemarkPayload) => {
    return await axios.post(process.env.REACT_APP_VF_MOCK_API_HOST + `/SubmitRemark`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getRemarkHistory = async (payload:any) => {
    return await axios.post(process.env.REACT_APP_VF_MOCK_API_HOST + `/GetRemarkHistory`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    }); 
  }

  export const getAllSKUs=async()=>{
    // return await axios.get(`https://requestly.tech/api/mockv2/GetAllSKU?username=user1708583815102&`,{
      return await axios.get(`http://10.8.1.10:8082/SKUDesc`,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getAllLocations=async()=>{
    // return await axios.get(`https://requestly.tech/api/mockv2/GetAllSKU?username=user1708583815102&`,{
      return await axios.get(`http://10.8.1.10:8082/WHDesc`,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getDailyData = async (payload:any) => {
    return await axios.post(process.env.REACT_APP_VF_MOCK_API_HOST + `/GetDailyData`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    }); 
  }
}


