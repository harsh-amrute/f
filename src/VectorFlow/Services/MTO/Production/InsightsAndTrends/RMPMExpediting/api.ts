
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RMPMExpedtingServices {

    export const getLastRunDate = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getRunDate/`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    export const getRMPMExpedition = async (data: any) => {
        if (data.val === 'all') {
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getExpiditingRMData/?rm_horizon=${data.horizon}&supplier_horizon=${data.horizon}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        else if (data.val === 'rm') {
            console.log('rm link',process.env.REACT_APP_VF_API_HOST_MTO + `/getExpiditingRMData/?rm_horizon=${data.horizon}`)
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getExpiditingRMData/?rm_horizon=${data.horizon}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        else {
            console.log(process.env.REACT_APP_VF_API_HOST_MTO + `/getExpiditingRMData/?supplier_horizon=${data.horizon}`)
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getExpiditingRMData/?supplier_horizon=${data.horizon}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

    }
}