import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OTIFAanalysisService {

    export const getOTIFAnalysisData = async (params: any) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOTIFAnalysisData/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params
        })
    }

}
