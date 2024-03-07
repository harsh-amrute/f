/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { BPRDataPayload, SubmitBPRRemarkPayload } from '../../../../../VectorFlow/types/BPR';


export namespace BPRService {

  export const getBPRUIConfiguration = async () => {
    return await axios.get(`https://requestly.tech/api/mockv2/GetBPRUIConfiguration?username=user1708583815102&`,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getBPRData = async (payload:BPRDataPayload) => {
    return await axios.post(`https://requestly.tech/api/mockv2/GetBPRData?username=user1708583815102&`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const submitRemark = async (payload:SubmitBPRRemarkPayload) => {
    return await axios.post(`https://requestly.tech/api/mockv2/SubmitRemark?username=user1708583815102&`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getRemarkHistory = async (payload:any) => {
    return await axios.post(`https://requestly.tech/api/mockv2/GetRemarkHistory?rq_uid=cbmPNOZG8RVVRE3DQJ8t0mWWQ9y1`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    }); 
  }

  export const getAllSKUs=async()=>{
    return await axios.get(`https://requestly.tech/api/mockv2/GetAllSKU?username=user1708583815102&`,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }
}
