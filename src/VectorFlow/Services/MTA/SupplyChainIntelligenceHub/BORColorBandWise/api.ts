/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'


export namespace BORColorBandWiseService {

    export const getBORColorBandWiseRecordCount = async (body:any) => {
        return axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetBOROrderAllocationReportDataCount`,body,{
            headers: { 'Content-Type': 'application/json' }
          })
      }

  
  export const getBORColorBandWisData = async(body:any)=>{
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetBOROrderAllocationReportData`,body,{
      headers:{ 'Content-Type': 'application/json' }
    })
  }
}


