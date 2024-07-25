import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UIConfigService {

    export const getUIConfigData = async (reportName: string) => {
        console.log("this url is called", process.env.REACT_APP_VF_API_HOST_MTO + `/getUIReportConfiguration/?report_name=${reportName}`)
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getUIReportConfiguration/?report_name=${reportName}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

}
