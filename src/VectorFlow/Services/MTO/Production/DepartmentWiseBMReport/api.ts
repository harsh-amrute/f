import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DepartmentWiseBMReport {

    export const getDeptWiseBMReport = async (data: any) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDeptWiseBMReportData/?avawip=${data}`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

    export const getBombLevelData = async (data: any) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getBOMLevelWiseAllocationData/?oid=${data.oid}&lid=${data.lid}`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }
}
