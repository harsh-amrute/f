
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
}