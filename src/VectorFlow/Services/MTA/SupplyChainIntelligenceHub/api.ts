/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'


export namespace SupplyChainIntelligenceHubService {

  export const getBORUIConfiguration = async () => {
    return await axios.get(`http://localhost:5149/BORUIConfig`);
  }

  export const getBORData = async (body:{filters:Array<{attributeName:string,op:string,value:string}>,paginationParameter:{pageNumber:number,recordsPerPage:number}}) => {
    return await axios.post(`http://localhost:5149/BORData`,body,{
      headers: { 'Content-Type': 'application/json' }
    });
  }

   export const getBORDataCount = async ( body:{filters:Array<{attributeName:string,op:string,value:string}>,paginationParameter:{pageNumber:number,recordsPerPage:number}}) => {
    return await axios.post(`http://localhost:5149/BORDataCount`, body,{
      headers: { 'Content-Type': 'application/json' }
    });
  }

}

