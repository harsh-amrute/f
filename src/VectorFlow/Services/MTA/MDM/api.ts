/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { GetMasterDataPayload } from '../../../types/MDM';


export namespace MDMService {

  export const getMasterUIConfiguration = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetMasterUIConfiguration`);
  }

  export const getMasterData = async (body:GetMasterDataPayload) => {
    // return await axios.post(process.env.REACT_APP_VF_API_HOST + `/get-master-data`)
    return await axios({
      method: 'post',
      url: `https://2cfc61ae-927a-4577-8843-ee38dfb26302.mock.pstmn.io/get-master-data`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(body)
    })
  }

}
