/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'


export namespace MDMService {

  export const getMasterUIConfiguration = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/GetMasterUIConfiguration`)
    // return await axios.get( `https://3c8e9192-79db-40d7-b728-b29784f572de.mock.pstmn.io/api/user/all-master`)
  }

}
