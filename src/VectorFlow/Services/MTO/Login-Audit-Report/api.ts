
import axios from 'axios';

export namespace LoginAuditReportService {

  export const getLoginAuditReportData = async () => {
    
    const API_HOST = process.env.REACT_APP_VF_API_HOST_MTO; 
    const URL = `${API_HOST}/login-audit-report`;

    return await axios.get(URL);
  };
}