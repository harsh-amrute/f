import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DepartmentWiseBMReport {

    export const getDeptWiseBMReport = async (data: any) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDeptWiseBMReportData/?avawip=${data.wip}&page=${data.curr}`, {
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

    export const addBMReportRemark = async (body: any) => {
        //console.log('addAPI Call',body)
        return await axios.post(process.env.REACT_APP_VF_API_HOST_MTO + `/createBMReportRemarksData/`, body, {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    export const getDeptWiseWipData = async (body: any) => {
        return await axios.post(process.env.REACT_APP_VF_API_HOST_MTO + `/getDeptWiseWipData/`, body, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }
}
