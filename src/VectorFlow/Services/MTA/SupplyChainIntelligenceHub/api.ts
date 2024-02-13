/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'


export namespace SupplyChainIntelligenceHubService {

  export const getBPRUIConfiguration = async () => {
    return await axios.get(`https://97ff0825-1fbf-4dd0-9da6-4cd185e0aa53.mock.pstmn.io/GetBPRUIConfiguration`);
  }

}

