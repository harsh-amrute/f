/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace ResearchInsightsService {
    export const getUpdatedGraphData = async (body:any) => {
        return axios.post(process.env.REACT_APP_VF_API_HOST +`/api/SCIH/GetResearchInsightData`,body,{
            headers: { 'Content-Type': 'application/json' }
        })      
    }

}