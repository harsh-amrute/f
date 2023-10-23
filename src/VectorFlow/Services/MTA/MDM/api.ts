/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'


export namespace MDMService {

  export const getMasterUIConfiguration = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetMasterUIConfiguration`);
  }

}
