/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace BufferTrendsService {

    export const getBTGDataCount = async (body:any) => {
        return axios.post(`https://requestly.tech/api/mockv2/GetPlanningDataCount?username=user1708583815102&`,body,{
            headers: { 'Content-Type': 'application/json' }
          })
      }

    export const getBufferTrendsGraph = async (body:any) => {
            return axios.post(`http://localhost:8081/getBTGData`,body,{
                headers: { 'Content-Type': 'application/json' }
                })
        
       

        
    }

}