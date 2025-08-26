/* eslint-disable @typescript-eslint/no-namespace */
import { type ChangePassRequest } from '../types/User'
import axios from 'axios'
import { type RegisterRequest, type LoginRequest } from '../types'
import { LOCAL_STORAGE_KEY } from '../../helpers/constants'
import { type QueryClient } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { persistor } from '../../redux/store/store'

const API_USER = 'api/user'

interface Token {
  tokenType?: string
  access?: string
  refresh?: string
  expiryAt?: number
  apigeeToken: { access_token: string }
}

export namespace MainService {
  export const acquireToken = async () => {
    let token: Token
    try {
      token = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_PAYLOAD) || '{}'
      )
      // if (token.expiryAt && token.accessToken && token.refreshToken) {
      //   // minus 20 seconds for network latency
      //   if (new Date(token.expiryAt - 20 * 1000) > new Date()) {
      //     return token;
      //   }
      //   console.log('token expired, requesting a new token', 'expired at', new Date(token.expiryAt));
      //   return refreshToken(token.refreshToken);
      // } else {
      //   return undefined;
      // }
      return isEmpty(token) ? undefined : token
    } catch {
      // in case token modified by human
      return undefined
    }
  }

  // get a new access_token by refresh_token
  export const refreshToken = async () => {
    try {
      const { refresh }: Token = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_PAYLOAD) || '{}'
      )
      const response = await axios.post<Token>(getrefreshTokenUrl(), {
        refresh
      })
      const token: any = response?.data
      localStorage.setItem(
        LOCAL_STORAGE_KEY.TOKEN_PAYLOAD,
        JSON.stringify(token?.data?.token)
      )
      return token?.data?.token
    } catch (error) {
      console.log(error)
      //  refresh token not valid or expired
      throw error
    }
  }

  export const logout = async (queryClient: QueryClient) => {
    const { refresh }: Token = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_PAYLOAD) || '{}'
    )

    try {
      // logout from server
      await axios.post(getLogoutUrl(), { refresh })
    } finally {
      queryClient.clear()
      localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN_PAYLOAD)
      localStorage.removeItem(LOCAL_STORAGE_KEY.URL_PERMISSION)
      localStorage.removeItem('isCheckLogin')
      await persistor.purge();
    }
  }

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
          LOCAL_STORAGE_KEY.TOKEN_PAYLOAD,
          JSON.stringify(resp?.data?.data?.token)
        )
        localStorage.setItem(
          LOCAL_STORAGE_KEY.URL_PERMISSION,
          JSON.stringify(resp?.data?.data?.url_permission)
        )
        localStorage.setItem(
          LOCAL_STORAGE_KEY.LANDING_PAGE,
          resp?.data?.data?.landing_page
        )
        localStorage.setItem(
          LOCAL_STORAGE_KEY.User_ID,
          resp?.data?.data?.user?.id
        )
        localStorage.setItem(
          LOCAL_STORAGE_KEY.User_Name,
          resp?.data?.data?.user?.name
        )
        return await Promise.resolve(resp)
      })
  }

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
