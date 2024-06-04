/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'


export namespace SupplyChainIntelligenceHubService {

  export const getBORUIConfiguration = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST +`/BORUIConfig`);
  }

  // export const getBORData = async (body:{filters:Array<{attributeName:string,op:string,value:string}>,paginationParameter:{pageNumber:number,recordsPerPage:number}}) => {
  //   return await axios.post(process.env.REACT_APP_VF_API_HOST +`/BORData`,body,{
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // }

  export const getBORData = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST +`/BORData`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
}


   export const getBORDataCount = async ( body:{filters:any,paginationParameter:{pageNumber:number,recordsPerPage:number}}) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST +`/BORDataCount`, body,{
      headers: { 'Content-Type': 'application/json' }
    });
  }

}

