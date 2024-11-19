/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { BPRDataPayload, SubmitBPRRemarkPayload } from '../../../../../VectorFlow/types/BPR';


export namespace BORColorBandWiseService {

    export const getBORColorBandWiseRecordCount = async (body:any) => {
        return axios.post(process.env.REACT_APP_VF_API_HOST + `/GetBOROrderAllocationReportDataCount`,body,{
            headers: { 'Content-Type': 'application/json' }
          })
      }

  
  export const getBORColorBandWisData = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetBOROrderAllocationReportData`,body,{
      headers:{ 'Content-Type': 'application/json' }
    })
  }
}


