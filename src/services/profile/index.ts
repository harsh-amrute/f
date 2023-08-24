import { useMutation, useQuery } from '@tanstack/react-query'
import {
  type ChangePassword,
  type ChangeStatus,
  type InfoUser,
  type ChangeTheme
} from '../../types/profile'
import { MainService } from './api'

export const QUERY_KEYS = {
  useGetAllUsers: ['MainService.useGetAllUsers'],
  useGetAllPermissions: ['MainService.useGetAllPermissions']
}

export const useChangePassword = () => {
  return useMutation(async (payload: ChangePassword) => {
    return await MainService.changePassword(payload)
  })
}

export const useGetAllUsers = () => {
  return useQuery(QUERY_KEYS.useGetAllUsers, async () => {
    return await MainService.getAllUsers()
  })
}

export const useGetAllPermissions = () => {
  return useQuery(QUERY_KEYS.useGetAllPermissions, async () => {
    return await MainService.getAllPermissions()
  })
}

export const UsePutDeleteUser = () => {
  return useMutation(async (id: string) => {
    return await MainService.putDeleteUser(id)
  })
}

export const useChangeStatus = () => {
  return useMutation(async (data: ChangeStatus) => {
    return await MainService.postChangeStatus(data)
  })
}

export const useResetPwd = () => {
  return useMutation(async (id: string) => {
    return await MainService.postResetPwd(id)
  })
}

export const useRegisterUser = () => {
  return useMutation(async (data: InfoUser) => {
    return await MainService.postRegisterUser(data)
  })
}

export const usePutEditUser = () => {
  return useMutation(async (data: InfoUser) => {
    return await MainService.putEditUser(data)
  })
}

export const useChangeThemeUser = () => {
  return useMutation(async (data: ChangeTheme) => {
    return await MainService.postChangeTheme(data)
  })
}
