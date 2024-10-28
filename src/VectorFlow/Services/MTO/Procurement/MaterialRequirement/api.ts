import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MaterialRequirementService {
    export const getMaterialRequirementData = async ({currPage, releaseDate, appliedFilters}: any) => {
       
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getMaterialRequirementData/?page=${currPage}&releaseDate=${releaseDate}`, 
        appliedFilters,
        {

            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

    export const getMaterialRequirementDataDayWise = async ({currPage, releaseDate, appliedFilters}: any) => {
      
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getMaterialRequirementDayWiseData/?page=${currPage}&releaseDate=${releaseDate}`, 
        appliedFilters,
        {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })

    }

    // export const getLastRunDate=async()=>{
    //     return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getRunDate/`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
    //         }
    //     })
    // }

}
