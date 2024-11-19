/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { BPRDataPayload, SubmitBPRRemarkPayload } from '../../../../types/BPR';


export namespace OrderAllocationReportService {

    export const getOrderAllocationReportRecordsCount = async (body:any) => {
        return axios.post(process.env.REACT_APP_VF_API_HOST + `/GetOrderAllocationReportDataCount`,body,{
            headers: { 'Content-Type': 'application/json' }
          })
      }

  
  export const getOrderAllocationReportData = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetOrderAllocationReportData`,body,{
      headers:{ 'Content-Type': 'application/json' }
    })
  }
}


