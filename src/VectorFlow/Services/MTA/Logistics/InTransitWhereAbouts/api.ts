/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'



export namespace InTransitWhereAboutsService {

export const getInTransitWhereAboutsDataCount = async () => {
  return await axios.post(process.env.REACT_APP_VF_API_HOST + `/api/SCIH/GetInTransitWhereAboutsDataCount`,{},{
      headers:{ 'Content-Type': 'application/json' }
    });
}

  export const getInTransitWhereAboutsData = async (body:{pageNumber:number,recordsPerPage:number}) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/api/SCIH/GetInTransitWhereAboutsData`,body,{
        headers:{ 'Content-Type': 'application/json' }
      });
  }


}

