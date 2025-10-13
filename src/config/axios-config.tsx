import axios, { AxiosError } from 'axios'
import qs from 'qs'
import { cleanObject, loginRedirect } from '../helpers/utils'
import { decryptStorageData } from '../VectorFlow/Pages/MTO/Common/encryption';


export const setupAxios = () => {
  
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;
  axios.defaults.withCredentials = true

  axios.interceptors.request.use(async function (config) {
    const encryptedUserId = localStorage.getItem('User-ID');
    const encryptedUserName = localStorage.getItem('User-Name');

    const decryptedUserId = await decryptStorageData(encryptedUserId);
    const decryptedUserName = await decryptStorageData(encryptedUserName);
    
    config.headers['User-ID'] = decryptedUserId;
    config.headers['User-Name'] = decryptedUserName;
    
    return config;
  });

    axios.interceptors.response.use(undefined, function (error) {
    const errorResp = getAxiosError(error);

    if (errorResp.status === 403) {
      window.location.href = '/permission-forbidden?URLPermission=true';
      return Promise.reject(errorResp);
    }

    if (errorResp.status === 401) {
      loginRedirect();
      return Promise.reject(errorResp);
    }

    return Promise.reject(errorResp);
  });


  axios.defaults.paramsSerializer = {
    serialize: (params) => qs.stringify(cleanObject(params))
  }
}


const getAxiosError = (error: any) => {
  let message

  if (error.code === AxiosError.ERR_NETWORK) {
    message = ERROR_NETWORK
  } else if (
    error.code === AxiosError.ETIMEDOUT ||
    error.response?.status === 504
  ) {
    message = ERROR_TIMEOUT
  } else if (error.response) {
    message = error.response.data?.message
      ? error.response.data.message
      : ERROR_GENERAL

    switch (error.response.status) {
      case 401:
        message = 'You are not authorized to access this resource!'
        break
      case 403:
        message = "You don't have permission to access the resource!"
        break
      case 404:
        message = 'The requested resource does not exist or has been deleted!'
        break
      case 500:
        message = ERROR_GENERAL
        break
    }
  } else if (!error.request) {
    message = ERROR_CLIENT
  }

  return {
    code: error.code,
    status: error.response?.status,
    error: error.response?.data?.error || error.response?.data.email?.[0],
    message,
    path: error.config?.url,
    validation: error.response?.data?.validation,
    response: error.response?.data,
    traceError: error.response?.data?.message,
    timestamp: error.response?.data?.timestamp || new Date()
  }
}

const ERROR_GENERAL = 'Something went wrong and the request was not completed!'
const ERROR_NETWORK =
  'Network error, please check your network connectivity and try again.'
const ERROR_TIMEOUT =
  'Looks like the server is taking too long to respond. The system is still processing your request in the background. Please check the result later or try again.'
const ERROR_CLIENT =
  'Client error found. Unable to create the HTTP request. Please refresh and try again.'
