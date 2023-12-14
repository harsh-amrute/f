import { toast, type Theme, type ToastPosition } from 'react-toastify'

export const ATTR_TOAST = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'colored'
} as {
  position: ToastPosition
  autoClose: number
  hideProgressBar: boolean
  closeOnClick: boolean
  pauseOnHover: boolean
  theme?: Theme
}

export const notifyError = (msg: string) => toast.error(msg, ATTR_TOAST)

export const notifySuccess = (msg: string) => toast.success(msg, ATTR_TOAST)
