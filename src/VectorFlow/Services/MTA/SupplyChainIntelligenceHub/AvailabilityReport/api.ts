/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

export namespace ARService {

  export const getARDataCount = async (body: any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetAvailabilityReportCount`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  export const getARData = async (body: any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetAvailabilityReport`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
   export const getARSummaryData = async (body: any) => {
    return await axios.post(process.env.REACT_APP_API_HOST + `api/mta/GetAvailabilitySummary`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}