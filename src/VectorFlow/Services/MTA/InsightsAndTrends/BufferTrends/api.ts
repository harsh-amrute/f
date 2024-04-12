/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace BufferTrendsService {
    export const getBufferTrendsGraph = async (body:any) => {
            return axios.post(process.env.REACT_APP_VF_API_HOST +`/API/SCIH/GetBufferTrendGraphData`,body,{
                headers: { 'Content-Type': 'application/json' }
                })      
    }

}