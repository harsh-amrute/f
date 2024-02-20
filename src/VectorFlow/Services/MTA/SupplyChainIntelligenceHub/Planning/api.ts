/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace PlanningService {

    export const getPlanningDataCount = async (body:any) => {
        return axios.post('https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io' + `/GetPlanningDataCount`,body,{
            headers: { 'Content-Type': 'application/json' }
          })
      }

    export const getPlanningDataGraph = async (body:any) => {
        return axios.post('https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io' + `/GetPlanningDataGraph`,body,{
            headers: { 'Content-Type': 'application/json' }
            })
    }

}