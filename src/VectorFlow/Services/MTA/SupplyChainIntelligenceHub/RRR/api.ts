/* eslint-disable @typescript-eslint/no-namespace */
import axios from "axios";

import {RRRDataPayload} from '../../../../types/RRR'

export namespace RRRServices {

    export const getRRRUIConfiguration = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST+ `/RRRUIConfig`);
      }
    
    export const getRRRData = async (body:RRRDataPayload) => {
      return await axios.post(process.env.REACT_APP_VF_API_HOST+ `/RRRData`,body,{
        headers:{ 'Content-Type': 'application/json' }
      });
    }

    export const getRRRDataCount = async (body:RRRDataPayload) => {
      return await axios.post(process.env.REACT_APP_VF_API_HOST+ `/RRRDataCount`,body,{
        headers:{ 'Content-Type': 'application/json' }
      });
    }

    export const getRRRAnalyticsData = async () => {
      return await axios.get(process.env.REACT_APP_VF_API_HOST+ `/RRRAnalytics`,{
        headers:{ 'Content-Type': 'application/json' }
      });
    }
}