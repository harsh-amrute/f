import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TrendsFailureReasonsService {

    export const getTrendsFailureData = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getTrendOfFailureReasonsData`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

}
