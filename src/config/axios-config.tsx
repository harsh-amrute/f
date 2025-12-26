import axios, { AxiosError } from 'axios'
import qs from 'qs'
import { cleanObject, loginRedirect } from '../helpers/utils'
import { decryptStorageData } from '../VectorFlow/Pages/MTO/Common/encryption';
import { MainService } from '../module-main/services/api';

export const setupAxios = () => {
  let isRefreshingToken = false;
  let requestQueue: any[] = [];  

  const processQueue = (success: boolean) => {
    requestQueue.forEach(({ resolve, reject }) => {
      success ? resolve(true) : reject("Token refresh failed");
    });
    requestQueue = [];
  };
  
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;
  axios.defaults.withCredentials = true

  axios.interceptors.request.use(async function (config) {
    const encryptedUserId = localStorage.getItem('User-ID');
    const encryptedUserName = localStorage.getItem('User-Name');

    const decryptedUserId = await decryptStorageData(encryptedUserId);
    const decryptedUserName = await decryptStorageData(encryptedUserName);
    
    config.headers['User-ID'] = decryptedUserId;
    config.headers['User-Name'] = decryptedUserName;

    window.dispatchEvent(new CustomEvent('api-request-start'));
    
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      window.dispatchEvent(new CustomEvent('api-request-end'));
      return response;
    },
    async (error) => {
      window.dispatchEvent(new CustomEvent('api-request-end'));
      const originalRequest = error.config;


      if (originalRequest._skipAuthRefresh) {
        return Promise.reject(error);
      }

      let errorResp

      if (error.isAxiosError) {
        errorResp = getAxiosError(error)
      } else {
        errorResp = getOtherError(error)
      }

      // const errorResp = error.response;

      if (errorResp.status === 403) {
        window.location.href = '/permission-forbidden?URLPermission=true'
        return Promise.reject(errorResp);
      }
  
      if (errorResp?.status === 401 && !originalRequest._retry) {
        
        if (errorResp.code === "ERR_BAD_REQUEST" && errorResp.response.detail === "Authentication credentials were not provided.") {
          loginRedirect();
          return errorResp;
        }
        
        if (
          errorResp.response.code === 'token_not_valid' &&
          originalRequest.url.indexOf(MainService.getrefreshTokenUrl()) > -1
        ) {
          loginRedirect()
          return;
        }

        // If already trying refresh — queue request
        if (isRefreshingToken) {
          return new Promise((resolve, reject) => {
            requestQueue.push({ resolve, reject });
          })
          .then(() => axios(originalRequest)) // ✅ return retry
          .catch((err) => err);
        }

        originalRequest._retry = true;
        isRefreshingToken = true;
  
        try {
          await MainService.refreshToken(); // just call it, cookies auto-updated
          processQueue(true);

          // Retry original request
          return axios(originalRequest);
        } catch (err) {
          console.error("Refresh failed — logging out user:", err);
          processQueue(false);


          // Clear cookies server-side
          await MainService.logout(true);

          // Redirect to login
          loginRedirect();

          return err;
        } finally {
          isRefreshingToken = false;
        }
      }

      if (errorResp.status === 400) {
        // alert(JSON.stringify(error.response.data))
        return errorResp;
      }
  
      return Promise.reject(error);
    }
  );

  axios.defaults.paramsSerializer = {
    serialize: (params) => qs.stringify(cleanObject(params))
  }
}

const getOtherError = (error: any) => {
  const path = window.location.pathname
  if (typeof error === 'string') {
    return { message: error, path }
  } else if (!error.message) {
    console.error(error)
    return { message: ERROR_GENERAL, path }
  } else {
    console.error(error)
    return error
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
