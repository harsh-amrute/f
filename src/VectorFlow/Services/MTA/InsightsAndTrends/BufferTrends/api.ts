/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace BufferTrendsService {
    export const getBufferTrendsGraph = async (body:any) => {
            return axios.post(process.env.REACT_APP_VF_MOCK_API_HOST +`/getBTGData`,body,{
                headers: { 'Content-Type': 'application/json' }
                })
        
       

        
    }

}