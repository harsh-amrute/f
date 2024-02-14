/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace PlanningService {

    export const getPlanningDataCount = async (body:any) => {
        return axios.post('https://ddd9ea92-1351-4abf-876a-b4f291f17cf5.mock.pstmn.io' + `/GetPlanningDataCount`,body,{
            headers: { 'Content-Type': 'application/json' }
          })
      }

    export const getPlanningData = async (body:any) => {
        return axios.post('https://ddd9ea92-1351-4abf-876a-b4f291f17cf5.mock.pstmn.io' + `/GetPlanningDataGraph`,body,{
            headers: { 'Content-Type': 'application/json' }
            })
    }

}