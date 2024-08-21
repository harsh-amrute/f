import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace STPLAndFullKitService {

    export const getSTPLandFullkitInDaysData = async (params: any) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getSTPLandFullkitInDaysData/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params
        })
    }

}
