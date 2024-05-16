/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'



export namespace InTransitWhereAboutsService {

export const getInTransitWhereAboutsDataCount = async (body:any) => {
  return await axios.post(process.env.REACT_APP_VF_API_HOST + `/api/SCIH/GetInTransitWhereAboutsDataCount`,body,{
      headers:{ 'Content-Type': 'application/json' }
    });
}

  export const getInTransitWhereAboutsData = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/api/SCIH/GetInTransitWhereAboutsData`,body,{
        headers:{ 'Content-Type': 'application/json' }
      });
  }


}

