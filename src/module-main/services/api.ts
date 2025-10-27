/* eslint-disable @typescript-eslint/no-namespace */
import { type ChangePassRequest } from '../types/User'
import axios from 'axios'
import { type RegisterRequest, type LoginRequest } from '../types'
import { LOCAL_STORAGE_KEY } from '../../helpers/constants'
import { type QueryClient } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { persistor } from '../../redux/store/store'
import { encryptStorageData } from '../../VectorFlow/Pages/MTO/Common/encryption'
import { notifySuccess } from '../../helpers/notify'

const API_USER = 'api/user'

interface Token {
  tokenType?: string
  access?: string
  refresh?: string
  expiryAt?: number
  apigeeToken: { access_token: string }
}
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve(); 
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    console.log(script);

    script.onload = () => {
      console.log(`Script loaded successfully: ${src}`);
      resolve();
    };

    script.onerror = () => {
      console.error(`Failed to load script: ${src}`);
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.head.appendChild(script);
  });
};

export namespace MainService {

  // get a new access_token by refresh_token
  export const refreshToken = async () => {
    try {

      const response = await axios.post(getrefreshTokenUrl(),null, { _skipAuthRefresh: true } as any);
      return response;

    } catch (error) {
      console.error("Refresh token failed:", error);
      //  refresh token not valid or expired
      throw error
    }
  }

  export const logout = async (isUnAuth=false, queryClient?: QueryClient,) => {
    let toastMessage: string | null = null;
  
    try {
      await axios.post(getLogoutUrl(), {}, { _skipAuthRefresh: true } as any);
      if (isUnAuth) {
        toastMessage = 'Session expired or invalid. Please log in again.';
      } else {
        toastMessage = 'User logged out successfully';
      }
  
    } catch (error: any) {
      console.log(error,"error");
      if (error.response?.status === 401) {
        toastMessage = 'Session expired or invalid. Please log in again.';
      } 
    } finally {
      queryClient?.clear();
      await persistor.purge();  
      localStorage.clear();
      sessionStorage.clear();
      if (typeof window.terminateVTM === 'function') {
        window.terminateVTM();  
      }
    }
  
    if (toastMessage) {
      notifySuccess(toastMessage);
    }
  };

  export const getrefreshTokenUrl = () => {
    return `/${API_USER}/token/refresh/`
  }

  export const getLogoutUrl = () => {
    return `/${API_USER}/logout/`
  }

  export const register = async (payload: RegisterRequest) => {
    return await axios.post(`/${API_USER}/register/`, payload)
  }

  export const login = async (payload: LoginRequest) => {
    return await axios

      .post(`/${API_USER}/login/`, payload)
      .then(async (resp) => {
      
        localStorage.setItem(
          LOCAL_STORAGE_KEY.User_ID,
         await encryptStorageData(resp?.data?.data?.user?.id)
        );

        localStorage.setItem(
          LOCAL_STORAGE_KEY.User_Name,
          await encryptStorageData(resp?.data?.data?.user?.name)
        );
        
        if (process.env.REACT_APP_VTM_ENABLED ) {
          try {
            // const user = { ...resp?.data?.data?.user, roles: resp?.data?.data?.roles };  
            const user = {...resp.data?.data?.user,roles: resp.data?.data?.roles};
            console.log("im hereeeeeeeee",user)
            
            console.log("user scrippttttt", process.env.REACT_APP_VTM_SCRIPT_URL);
            await loadScript(process.env.REACT_APP_VTM_SCRIPT_URL || '');
            if (user && typeof window.initVTM === "function") {
              window.initVTM(user);
            } else {
              console.warn("VTM initialization failed: User or initVTM not available.");
            }
          } catch (scriptError) {
            console.error("Could not initialize VTM due to a script loading error.", scriptError);
          }
        }
        return await Promise.resolve(resp);
      });
  };



  export const forgotPassword = async (payload: { email: string }) => {
    return await axios.post(`/${API_USER}/send-email-reset-pwd/`, payload)
  }
  export const changePassword = async (payload: ChangePassRequest) => {
    return await axios.post(
      `/${API_USER}/forgot-password/${payload.uid}/${payload.token}`,
      payload
    )
  }

  export const getProfile = async () => {
    return await axios.get(`/${API_USER}/profile/`)
  }
  export const getProductFilter = async (url: string) => {
    return await axios.get(url)
  }
  export const getTotalPaticulars = async () => {
    return await axios.get('/api/ist/total-paticulars')
  }
}
