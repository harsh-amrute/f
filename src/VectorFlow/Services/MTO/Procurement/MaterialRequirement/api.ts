import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MaterialRequirementService {
    export const getMaterialRequirementData=async(data:string)=>{
        console.log(process.env.REACT_APP_VF_API_HOST_MTO + `/getMaterialRequirementData/?releaseDate=`+data)
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getMaterialRequirementData/?releaseDate=${data}`, {
        
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }
}