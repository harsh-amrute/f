/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

export namespace BTRService{

  export const getBTRDataCount = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetBTRDataCount`,body,{
      headers:{ 'Content-Type': 'application/json' }
    });
  }
    export const getBTRData = async (body:any) => {
        return await axios.post(process.env.REACT_APP_VF_API_HOST + `/GetBTRData`,body,{
          headers:{ 'Content-Type': 'application/json' }
        });
      }
}