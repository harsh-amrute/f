/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace PlanningService {

    export const getPlanningDataCount = async (body:any) => {
        return axios.post(`https://requestly.tech/api/mockv2/GetPlanningDataCount?username=user1708583815102&`,body,{
            headers: { 'Content-Type': 'application/json' }
          })
      }

    export const getPlanningDataGraph = async (body:any) => {
        return axios.post(`https://requestly.tech/api/mockv2/GetPlanningDataGraph?username=user1708583815102&`,body,{
            headers: { 'Content-Type': 'application/json' }
            })
    }

}