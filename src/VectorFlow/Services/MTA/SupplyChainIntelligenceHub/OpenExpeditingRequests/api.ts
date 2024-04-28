/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'


export namespace OpenExpeditingRequestsService {

  export const getOpenExpediteRequestData = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetOpenExpediteRequest`,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }
  
  export const addRemarkForExpedite = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/AddRemarkForExpedite`,body,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

  export const getRemarkDetailsForExpedite = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetRemarkDetailsForExpedite`,body,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }
}

