import axios from 'axios'

export namespace SupplyChainIntelligenceHubService {

  export const getBPRUIConfiguration = async () => {
    return await axios.get(`https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/GetBPRUIConfiguration`);
  }

}
