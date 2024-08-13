import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OTIFAanalysisService {

    export const getOTIFAnalysisData = async (graphFlag: string) => {
        console.log("this url is called", process.env.REACT_APP_VF_API_HOST_MTO + `/getOTIFAnalysisData/?graphflag=${graphFlag}`)
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOTIFAnalysisData/?graphflag=${graphFlag}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

}
