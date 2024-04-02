/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace PlanningService {

    export const getPlanningDataCount = async (body:any) => {
        return axios.post(`https://requestly.tech/api/mockv2/GetPlanningDataCount?username=user1708583815102&`,body,{
            headers: { 'Content-Type': 'application/json' }
          })
      }

    export const getPlanningDataGraph = async (body:any) => {
        return axios.get(`https://874b1519-1a43-4314-a8d0-6c20e10100cf.mock.pstmn.io/GetBTGData`,{
            headers: { 'Content-Type': 'application/json' }
            })
    }

}