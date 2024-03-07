/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace PlanningService {

    export const getPlanningDataCount = async (body:any) => {
        return axios.post(process.env.REACT_APP_VF_MOCK_API_HOST + `/GetPlanningDataCount`,body,{
            headers: { 'Content-Type': 'application/json' }
          })
      }

    export const getPlanningDataGraph = async (body:any) => {
        return axios.post(process.env.REACT_APP_VF_MOCK_API_HOST + `/GetPlanningDataGraph`,body,{
            headers: { 'Content-Type': 'application/json' }
            })
    }

    export const getPlanningDataGrid = async (body:any) => {
        return axios.post(process.env.REACT_APP_VF_MOCK_API_HOST + `/GetPlanningDataGrid`,body,{
            headers: { 'Content-Type': 'application/json' }
            })
    }

    export const getPlanningDataCustom = async (body:any) => {
        return axios.post(process.env.REACT_APP_VF_MOCK_API_HOST + `/GetPlanningDataCustom`,body,{
            headers: { 'Content-Type': 'application/json' }
            })
    }

}