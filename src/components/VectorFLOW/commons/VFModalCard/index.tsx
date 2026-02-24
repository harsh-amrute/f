import { Dialog, Transition } from "@headlessui/react";
import "./style.css";
import { Fragment, ReactNode } from "react";

import { assignInlineVars } from "@vanilla-extract/dynamic";

import {
  SCModalContent,
  SCTextTitle,
  SCCloseModal,
  SCWrapperContent,
  VFHeaderWrapper,
  SCHeader,
  modalTitleForced,
  modalForcedBlock,
  headerBgVar,
  headerTextVar,
  contentLRVar,
  contentBgVar,
  heightVar,
  headerBorderRadius,
  headerPadding,
  absolutePosition,
} from "./styles.css";
import { noop } from "lodash";

interface VFModalProps {
  openModal: boolean;
  closeModal?: () => void;
  headerText?: string | ReactNode;
  headerIcon: string;
  children: ReactNode;
  paddingLeftAndRight?: number;
  headerBgColor?: string;
  headerTextColor?: string;
  closeIcon?: string;
  backgroundColor?: string;
  zoom?: string;
  absolute?: boolean;
}

const VFModalCard = ({
  openModal,
  closeModal,
  headerText,
  headerIcon,
  closeIcon,
  children,
  paddingLeftAndRight,
  headerBgColor,
  headerTextColor,
  backgroundColor,
  zoom = "1",
  absolute,
}: VFModalProps) => {
  const resolvedLR =
    paddingLeftAndRight === 0
      ? "0px"
      : typeof paddingLeftAndRight === "number"
      ? `${paddingLeftAndRight}px`
      : "74px";

  return (
    <>
      {
        <Transition appear show={openModal} as={Fragment}>
          <Dialog as="div" className="modal-box" onClose={noop}>
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

            <div className={SCModalContent} style={{ zoom }}>
              <div className="modal-content--box">
                <Transition.Child
                  as={Fragment}
                  enter="transition"
                  enterFrom="opa-0 tranlate"
                  enterTo="opa translate-y-0"
                  leave="leave-modal"
                  leaveFrom="opa translate-y-0"
                  leaveTo="opacity-0 tranlate"
                >
                  <Dialog.Panel className="modal-forced--block">
                    <Dialog.Title
                      as="h3"
                      className="modal-title-forced"
                      style={{
                        backgroundColor: headerBgColor,
                        boxShadow: "0px 5px 10px 0px rgba(110, 107, 107,0.11)",
                        position: "relative",
                        zIndex: "10",
                      }}
                    >
                      <div
                        className={`${VFHeaderWrapper} ${
                          absolute ? absolutePosition : ""
                        }`}
                        style={{
                          backgroundColor: headerBgColor,
                          ...assignInlineVars({
                            [heightVar]: absolute ? "44px" : "40px",
                            [headerBorderRadius]: absolute
                              ? "12px 12px 0 0"
                              : "0 0 12px 12px",
                            [headerPadding]: absolute ? "0 12px" : "0",
                          }),
                        }}
                      >
                        <div className={SCHeader}>
                          {headerIcon.length > 0 && (
                            <img
                              src={headerIcon}
                              height={20}
                              width={20}
                              data-testid="vfmodal-img"
                            />
                          )}
                          <span
                            className={SCTextTitle}
                            style={assignInlineVars({
                              [headerTextVar]: headerTextColor ?? "#000000",
                            })}
                          >
                            {headerText}
                          </span>{" "}
                        </div>
                        {closeModal && (
                          <span
                            className={SCCloseModal}
                            onClick={closeModal}
                            data-testid="close-modal-icon"
                          >
                            <img src={closeIcon} height={16} width={16} />
                          </span>
                        )}
                      </div>
                    </Dialog.Title>

                    <div
                      className={SCWrapperContent}
                      style={assignInlineVars({
                        // include units; 0 should be '0px' (or '0') to avoid being ignored
                        ...(resolvedLR !== undefined
                          ? {
                              [contentLRVar]:
                                typeof resolvedLR === "number"
                                  ? `${resolvedLR}px`
                                  : resolvedLR,
                            }
                          : {}),
                        ...(backgroundColor
                          ? { [contentBgVar]: backgroundColor }
                          : {}),
                      })}
                    >
                      {children}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      }
    </>
  );
};

export default VFModalCard;
