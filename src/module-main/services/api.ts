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

export namespace MainService {

  export const logout = async (queryClient: QueryClient) => {
    let toastMessage: string | null = null;
  
    try {
      await axios.post(getLogoutUrl(), {});
      toastMessage = 'User logged out successfully';
  
    } catch (error: any) {
      console.log(error,"error");
      if (  error.response?.status === 401) {
        toastMessage = 'Session timed out';
      } 
    } finally {
      queryClient.clear();
      await persistor.purge();  
      localStorage.clear();
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
