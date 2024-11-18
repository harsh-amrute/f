import { Dialog, Transition } from '@headlessui/react'
import {Fragment,ReactNode} from 'react'

import './styles.css'

interface DrawerProps{
    header?:any
    children:ReactNode
    isOpen:boolean
    onClose:()=>void
}


const Drawer = (props:DrawerProps)=>{

    const {
        header,
        children,
        isOpen,
        onClose
    } = props

    return (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="modal-box" onClose={onClose}>
            <Transition.Child
              as={Fragment}
              enter="transition"
              enterFrom="opa-0"
              enterTo="opa"
            //   leave="leave-modal"
            //   leaveFrom="opa"
            //   leaveTo="opa-0"
            >
              <div className="modal-bg inset" />
            </Transition.Child>

            <div className="modal-content">
              <div className="content-wrapper">
                {/* <Transition.Child
                  as={Fragment}
                  leave="leave-modal"
                  leaveFrom="opacity-0 translate-x-0"
                  leaveTo="opacity-0 translate-x-500"
                > */}
                  <Dialog.Panel className="drawer-content">
                    {/* <img
                      src="/assets/img/ist/warning.svg"
                      className="warning_img"
                    /> */}
                    {header && (
                      <Dialog.Title as="div" className="drawer-title">
                        {header}
                      </Dialog.Title>
                    )}
                    <div style={{height:'calc(100% - 32px)'}}>
                      {children}
                    </div>

                    {/* <div className="mt-4">
                      <button
                        type="button"
                        className={"button_reject " + themeUi}
                        onClick={onClickModal}
                      >
                        {text}
                      </button>
                      <button
                        type="button"
                        className="button_cancel"
                        onClick={closeModal}
                      >
                        {t('pendingISTRequests.button.cancel')}
                      </button>
                    </div> */}
                  </Dialog.Panel>
                {/* </Transition.Child> */}
              </div>
            </div>
          </Dialog>
        </Transition>
    )
}

export default Drawer