import { Dialog, Transition } from "@headlessui/react";
import "./styles.css";
import { Fragment, ReactNode} from "react";

import {
  SCModalContent,
  SCTextTitle,
  SCCloseModal,
  SCWrapperContent,
  VFHeaderWrapper
} from "./styles";  

interface VFModalProps {
  openModal: boolean;
  closeModal: () => void;
  headerText:string;
  headerIcon:string;
  children:ReactNode;
}


const VFModalCard = ({
  openModal,
  closeModal,
  headerText,
  headerIcon,
  children
  
}: VFModalProps) => {


  return (
    <>
      {
        <Transition appear show={openModal} as={Fragment}>
          <Dialog as="div" className="modal-box" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="transition"
              enterFrom="opa-0"
              enterTo="opa"
              leave="leave-modal"
              leaveFrom="opa"
              leaveTo="opa-0"
            >
              <div className="modal-bg inset" />
            </Transition.Child>
            <SCModalContent>
              <div className="modal-content--box">
                <Transition.Child
                  as={Fragment}
                  enter="transition"
                  enterFrom="opa-0 tranlate "
                  enterTo="opa translate-y-0 "
                  leave="leave-modal"
                  leaveFrom="opa translate-y-0"
                  leaveTo="opacity-0 tranlate"
                >
                  <Dialog.Panel className="modal-forced--block">
                    <Dialog.Title as="h3" className="modal-title-forced">
                    <VFHeaderWrapper>
                      <img src={headerIcon} height={25} width={27} data-testid='vfmodal-img'/> 
                      <SCTextTitle>{headerText}</SCTextTitle>
                      <SCCloseModal onClick={closeModal}>
                        <img src="/assets/img/VectorFLOW/NMS/close.svg" height={14} width={14} style={{marginLeft:'580px'}}/>
                      </SCCloseModal>
                      </VFHeaderWrapper>
                    </Dialog.Title>
                    <SCWrapperContent>
                       {children}
                    </SCWrapperContent>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </SCModalContent>
          </Dialog>
        </Transition>
      }
    </>
  );

}

export default VFModalCard;


