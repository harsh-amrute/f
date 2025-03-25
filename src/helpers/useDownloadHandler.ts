import { LOCAL_STORAGE_KEY } from "./constants";
import axios from "axios";
import { MainService } from "../module-main/services/api";
import { notifyError } from "./notify";

let refreshTokenPromise: any = null;

interface Token {
  tokenType?: string
  access?: string
  refresh?: string
  expiryAt?: number
  apigeeToken: { access_token: string }
}

const useDownloadHandler = () => {
  const refreshAccessToken = async () => {
    if (!refreshTokenPromise) {
      refreshTokenPromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const { refresh }: Token = JSON.parse(
              localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_PAYLOAD) || '{}'
            )
            const response = await axios.post<Token>(MainService.getrefreshTokenUrl(), {
              refresh
            })
            const token: any = response?.data
            localStorage.setItem(
              LOCAL_STORAGE_KEY.TOKEN_PAYLOAD,
              JSON.stringify(token?.data?.token)
            )
            const newToken = token?.data?.token;
            
            resolve(newToken);
          } catch (error) {
            reject(error);
          } finally {
            refreshTokenPromise = null; // Reset promise after refresh
          }
        }, 1000);
      });
    }
    return refreshTokenPromise;
  };

  const handleDownloadMTOVF = async (reportName: string, downloadName: string) => {
    try{
      const token = await refreshAccessToken();
      setTimeout(async() => {
        const userid = localStorage.getItem('User-ID');
        const username = localStorage.getItem('User-Name');
      
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.access}`,
        };
      
        if (userid) headers['User-ID'] = userid;
        if (username) headers['User-Name'] = username;
      
        const response = await fetch(`${process.env.REACT_APP_VF_API_HOST_MTO}/DownloadReportData/?report_name=${reportName}`, {
          headers,
        });
        if (!response.ok) {
          if (response.status == 404) {
            notifyError("File not found");
          } else {
            notifyError("Error while downloading")
          }
        } else {
          // Convert response to blob object
          const blob = await response.blob()
          // Create download URL for blob object
          const url = URL.createObjectURL(blob)
  
          // Trigger download
          const link = document.createElement('a')
          link.href = url
          if (downloadName.length !== 0) {
            link.setAttribute('download', `${downloadName}`)
          } else {
            link.setAttribute('download', `ReportFile.zip`)
          }
          document.body.appendChild(link)
          link.click()
          // Clean up download URL
          URL.revokeObjectURL(url);
        }
      }, 500);
    }
    catch(err){
      notifyError('Error while downloading');
    }
  }
  
  
  const handleDownloadVF = async (reportName: string, downloadName:string) => {
  
    try {
      const token = await refreshAccessToken();

      setTimeout(async () => {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}api/mta/DownloadReports/${encodeURIComponent(reportName)}`, {
          headers: {
            Authorization: `Bearer ${token?.access}`
          }
        })
        if (!response.ok) {
          if (response.status == 404) {
            notifyError("File not found");
          } else {
            notifyError("Error while downloading")
          }
          return false;
        } else {
          // Convert response to blob object
          const blob = await response.blob()
          // Create download URL for blob object
          const url = URL.createObjectURL(blob)
  
          // Trigger download
          const link = document.createElement('a')
          link.href = url
          if (downloadName.length !== 0) {
            link.setAttribute('download', `${downloadName}`)
          } else {
            link.setAttribute('download', `ReportFile.zip`)
          }
          document.body.appendChild(link)
          link.click()
          // Clean up download URL
          URL.revokeObjectURL(url);
          return true;
        }
      }, 500);
    } catch (error: any) {
      console.log(error,"error")
      notifyError('Error while downloading');
      return false;
    }
  
  }

  return { handleDownloadMTOVF,handleDownloadVF };
};

export default useDownloadHandler;
