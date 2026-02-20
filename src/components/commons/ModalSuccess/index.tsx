import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  SCModalContent,
  SCModalBox,
  SCWrapper,
  SCImg,
  SCTextAbove,
  SCTextBelow,
  SCBtnClose,
  SCBtnBack,
  btnGradientVar,
  btnBackColorVar,
} from "./styles.css";
import { useTranslation } from "react-i18next";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";

interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  setIsOpenReportIssue: any;
  colorTheme: string;
}

const ModalSuccess = ({
  openModal,
  closeModal,
  setIsOpenReportIssue,
  colorTheme,
}: ModalProps) => {
  const { t } = useTranslation();

  const handleBack = () => {
    setIsOpenReportIssue(true);
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  const colorButton =
    globalStyles.chooseThemeColor[
      colorTheme as keyof typeof globalStyles.chooseThemeColor
    ]?.colorButton;
  const color4 =
    globalStyles.chooseThemeColor[
      colorTheme as keyof typeof globalStyles.chooseThemeColor
    ]?.color4;

  return (
    <>
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
          <div className={SCModalContent}>
            <div className={SCModalBox}>
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
                  <div className={SCWrapper}>
                    <img
                      className={SCImg}
                      src="/assets/img/reportIssue/tick-success.svg"
                      alt="tick"
                    />
                    <div className={SCTextAbove}>
                      {t("reportAnIssue.msgSuccessAbove")}
                    </div>
                    <div className={SCTextBelow}>
                      {t("reportAnIssue.msgSuccessBelow")}
                    </div>

                    <button
                      className={SCBtnClose}
                      style={assignInlineVars({
                        [btnGradientVar]: colorButton || "",
                      })}
                      onClick={closeModal}
                    >
                      {t("reportAnIssue.btnClose")}
                    </button>

                    <button
                      className={SCBtnBack}
                      style={assignInlineVars({
                        [btnBackColorVar]: color4 || "",
                      })}
                      onClick={handleBack}
                    >
                      {t("reportAnIssue.btnBack")}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalSuccess;
