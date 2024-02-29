import axios from 'axios'
import { GetMasterDataPayload } from '../../../types/MDM';


export namespace SupplyChainIntelligenceHubService {

  // export const getBPRUIConfiguration = async () => {
  //   return await axios.get(`https://requestly.tech/api/mockv2/GetBPRUIConfiguration?username=user1708583815102&`,{
  //     headers:{ 'Content-Type': 'application/json' }
  //   });
  // }

  export const getBPRUIConfiguration = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST+ `/RRRUIConfig`);
  }

  export const getRRRData = async (body:GetMasterDataPayload) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST+ `/RRRUIConfig`,body,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }



}
