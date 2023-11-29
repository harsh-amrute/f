/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { GetMasterDataPayload } from '../../../types/MDM';


export namespace MDMService {

  export const getMasterUIConfiguration = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetMasterUIConfiguration`);
  }

  export const getMasterData = async (body:GetMasterDataPayload) => {
    // return await axios.post(`https://2cfc61ae-927a-4577-8843-ee38dfb26302.mock.pstmn.io/get-master-data`,body,{
    //   headers: { 'Content-Type': 'application/json' }
    // })
    return await axios.post(`http://10.8.1.10:8082/GetMasterData`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }

}
