/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

export namespace MaterialCoverageServices {


    // console.log('url',process.env.REACT_APP_VF_API_HOST_MTO + `/getOpenSOSummaryData/`)
    export const getMaterialSOData = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOpenSOSummaryData/`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

    export const getOpenSODetailsData=async(data:string)=>{
        console.log(process.env.REACT_APP_VF_API_HOST_MTO + `/getOpenSODetailsData/`+data)
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOpenSODetailsData/${data}`, {
        
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }


}