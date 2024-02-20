/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { BPRDataPayload } from '~/VectorFlow/types/BPR';


export namespace SupplyChainIntelligenceHubService {

  export const getBPRUIConfiguration = async () => {
    return await axios.get(`https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/GetBPRUIConfiguration`);
  }

  export const getBPRData = async (payload:BPRDataPayload) => {
    return await axios.post(`https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/GetBPRData`,payload,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }

}

