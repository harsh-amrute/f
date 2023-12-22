import { toast, type Theme, type ToastPosition } from 'react-toastify'

interface PromiseToastMsg{
  pending:string
  success:string
  error:string
}


export const ATTR_TOAST = {
  position: 'top-right',
  autoClose: 4000,
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

export const notifyPromise = (promise:Promise<unknown>,msgs:PromiseToastMsg)=>toast.promise(promise,msgs)

export const notifyLoader = (msg: string) => toast.loading(msg)
