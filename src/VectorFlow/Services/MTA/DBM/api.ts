/* eslint-disable @typescript-eslint/no-namespace */
import axios from "axios";

export namespace DBMServices {
    
    export const getDBMUIConfig = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST+ `/DBMUIConfig`);
      }
    
      export const getDBMData = async (body:{filters:Array<{attributeName:string,op:string,value:string}>,paginationParameter:{pageNumber:number,recordsPerPage:number}}) => {
        return await axios.post(process.env.REACT_APP_VF_API_HOST +`/DBMData`,body,{
          headers: { 'Content-Type': 'application/json' }
        });
      }

      export const getDBMDataCount = async (body:{filters:Array<{attributeName:string,op:string,value:string}>,paginationParameter:{pageNumber:number,recordsPerPage:number}}) => {
        return await axios.post(process.env.REACT_APP_VF_API_HOST+ `/DBMDataCount`,body,{
          headers:{ 'Content-Type': 'application/json' }
        });
      }

      export const getDBMApplySelectedNorm = async (body:{data:Array<{SKUCode:string,LocCode:string}>,paginationParameter:{pageNumber:number,recordsPerPage:number},filters:Array<{attributeName:string,op:string,value:string}>}) => {
        return await axios.post(process.env.REACT_APP_VF_API_HOST+ `/DBMApplySelectedNorms`,body,{
          headers:{ 'Content-Type': 'application/json' }
        });
      }

      // export const getDBMUpdateSleepTbl = async (body:{data:Array<{SKUCode:string,LocCode:string}>,paginationParameter:{pageNumber:number,recordsPerPage:number},filters:Array<{attributeName:string,op:string,value:string}>}) => {
      //   return await axios.post(process.env.REACT_APP_VF_API_HOST+ `/DBMUpdateSleepTbl`,body,{
      //     headers:{ 'Content-Type': 'application/json' }
      //   });
      // }

      export const getDBMUpdateSleepTbl = async (body:{data:{SKUCode:string,WHCode:string}}) => {
        return await axios.post(process.env.REACT_APP_VF_API_HOST+ `/DBMUpdateSleepTbl`,body,{
          headers:{ 'Content-Type': 'application/json' }
        });
      }
}