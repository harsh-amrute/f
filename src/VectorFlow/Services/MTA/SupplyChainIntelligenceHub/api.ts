/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'


export namespace SupplyChainIntelligenceHubService {

  export const getBORUIConfiguration = async () => {
    return await axios.get(`http://localhost:5149/BORUIConfig`);
  }

  export const getBORData = async (paginationParameter:{pageNumber:number,recordsPerPage:number}) => {
    return await axios.post(`http://localhost:5149/BORData`,paginationParameter,{
      headers: { 'Content-Type': 'application/json' }
    });
  }

   export const getBORDataCount = async ( filter:any) => {
    return await axios.post(`http://localhost:5149/BORDataCount`, filter,{
      headers: { 'Content-Type': 'application/json' }
    });
  }

}

