/* eslint-disable @typescript-eslint/no-namespace */
import axios from "axios";

import {RRRDataPayload} from '../../../../types/RRR'

export namespace SDRServices {

    export const getSDRUIConfiguration = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST+ `/SDRUIConfig`);
      }
    
    export const getSDRData = async (body:RRRDataPayload) => {
      return await axios.post(process.env.REACT_APP_VF_API_HOST+ `/GetSupplierDispatchReportData`,body,{
        headers:{ 'Content-Type': 'application/json' }
      });
    }

    export const getSDRDataCount = async (body:RRRDataPayload) => {
      return await axios.post(process.env.REACT_APP_VF_API_HOST+ `/GetSupplierDispatchReportDataCount`,body,{
        headers:{ 'Content-Type': 'application/json' }
      });
    }
}