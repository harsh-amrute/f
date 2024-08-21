import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OTAndIFAanalysisService {

    export const getOTAndIFAnalysisData = async (graphFlag: string) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOTandIFAnalysisData/?graphflag=${graphFlag}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}
