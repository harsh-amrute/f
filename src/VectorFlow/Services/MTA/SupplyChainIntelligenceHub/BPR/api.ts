/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { BPRDataPayload, SubmitBPRRemarkPayload } from '../../../../../VectorFlow/types/BPR';


export namespace BPRService {

  export const getBPRUIConfiguration = async () => {
    return await axios.get(`https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/GetBPRUIConfiguration`,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getBPRData = async (payload:BPRDataPayload) => {
    return await axios.post(`https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/GetBPRData`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const submitRemark = async (payload:SubmitBPRRemarkPayload) => {
    return await axios.post(`https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/SubmitRemark`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getRemarkHistory = async (payload:any) => {
    return await axios.post(`https://requestly.tech/api/mockv2/GetRemarkHistory?rq_uid=cbmPNOZG8RVVRE3DQJ8t0mWWQ9y1`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }
}

