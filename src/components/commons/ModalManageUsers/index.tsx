import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Fragment } from "react";
import { Errors, ArrowList } from "../../../components";
import { notifyError } from "../../../helpers/notify";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { useUserData } from "../../../context";

interface ModalProps {
  contentModal: any;
  openModal: boolean;
  closeModal: () => void;
  setIsOpenAdvanced: any;
  infoUser: any;
  setInfoUser: any;
  listRoles: any;
  setListRoles: any;
}

const ModalManageUsers = ({
  contentModal,
  openModal,
  closeModal,
  setIsOpenAdvanced,
  infoUser,
  setInfoUser,
  listRoles,
  setListRoles,
}: ModalProps) => {
  const { t } = useTranslation();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  
  const form = useForm<any>({
    values: {
      username: infoUser.name,
      email_id: infoUser.email,
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = form;

  const onSubmit = () => {
    const value = getValues();    
    if (infoUser.roles.length > 0) {
      if (value.password.length > 0) {
        setInfoUser({
          ...infoUser,
          name: value.username,
          email: value.email_id.trim(),
          password: value.password,
        });
      } else {
        setInfoUser({ ...infoUser, name: value.username, email: value.email_id });
      }
      setIsOpenAdvanced(true);
      closeModal();
    } else {
      notifyError(
        t("profile.tabContent.manageUsers.notifyError.pleaseSelectRole")
      );
    }
  };

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

            <div className="modal-content">
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
                    <Dialog.Title as="h3" className="modal-user-title">
                      <span className="modal-title--left">
                        <img
                          src="/assets/img/ist/avatar_contact.png"
                          className="modal-img-user"
                          alt="user"
                        />
                        {contentModal?.title}
                      </span>
                      <span onClick={closeModal} className="close-forced">
                        x
                      </span>
                    </Dialog.Title>

                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="new-password">
                      <div className="modal-content-user">
                        <div className="modal-Per-input--box">
                          <label
                            htmlFor="user-name"
                            className="modal-Per-label"
                          >
                            {t("profile.tabContent.manageUsers.modal.username")}
                          </label>
                          <input
                            id="user-name"
                            type="text"
                            className={`modal-Per-input ${
                              errors.username != null ? "modal-input--error" : ""
                            }`}
                            {...register("username", {
                              required: true,
                              maxLength: {
                                value: 8,
                                message: t(
                                  "profile.tabContent.manageUsers.validate.userNameMaxLength"
                                ),
                              },
                              pattern: {
                                value:
                                  // eslint-disable-next-line no-useless-escape
                                  /^[^@.\s-]*$/,
                                message: t(
                                  "profile.tabContent.manageUsers.validate.validateUserName"
                                ),
                              },
                            })}
                            autoComplete="off"
                          />
                          {errors.username != null && (
                            <Errors errors={errors} name="username" />
                          )}
                        </div>

                        <div className="modal-Per-input--box">
                          <label htmlFor="email-id" className="modal-Per-label">
                            {t("profile.tabContent.manageUsers.modal.emailID")}
                          </label>
                          <input
                            id="email-id"
                            type="email"
                            className={`modal-Per-input ${
                              errors.email_id != null ? "modal-input--error" : ""
                            }`}
                            {...register("email_id", {
                              required: true,
                              pattern: {
                                value:
                                  // eslint-disable-next-line no-useless-escape
                                  /^\s*([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})\s*$/i,
                                message: t("loginPage.validate.email"),
                              },
                              maxLength: {
                                value: 200,
                                message: t(
                                  "profile.tabContent.manageUsers.validate.emailMaxLength"
                                ),
                              },
                            })}
                            autoComplete="new-password"
                          />
                          {errors.email_id != null && (
                            <Errors errors={errors} name="email_id" />
                          )}
                        </div>

                        <div className="modal-Per-input--box">
                          <label htmlFor="password" className="modal-Per-label">
                            {t("profile.tabContent.manageUsers.modal.password")}
                          </label>
                          <input
                            id="password"
                            type="password"
                            placeholder={contentModal.callApi === 2 ? "***********" : ""}
                            className={`modal-Per-input ${
                              errors.password != null
                                ? "modal-input--error"
                                : ""
                            }`}
                            {...register("password", {
                              minLength: {
                                value: 8,
                                message: t("loginPage.validate.password"),
                              },
                              maxLength: {
                                value: 15,
                                message: t(
                                  "loginPage.validate.passwordMaxLength"
                                ),
                              },
                              pattern: {
                                value:
                                  // eslint-disable-next-line no-useless-escape
                                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])(?=.*[a-zA-Z]).{8,}$/,
                                message: t(
                                  "profile.tabContent.manageUsers.validate.formatPassword"
                                ),
                              },
                            })}
                            autoComplete="new-password"
                          />
                          {errors.password != null && (
                            <Errors errors={errors} name="password" />
                          )}
                        </div>
                      </div>

                      <div className="list-roles">
                        <div className="list-roles--title">
                          <span className="title-text">
                            {t("profile.tabContent.manageUsers.modal.roles")}
                          </span>
                        </div>

                        <ArrowList
                          listData={listRoles}
                          setListData={setListRoles}
                          infoUser={infoUser}
                          setInfoUser={setInfoUser}
                        />
                      </div>

                      <div className="modal-bottom">
                        <button type="submit" className={"btn_submit " + themeUi}>
                          {t("profile.tabContent.manageUsers.button.nextBtn")}
                        </button>
                        <button
                          type="button"
                          className="btn_cancel"
                          onClick={closeModal}
                        >
                          {t("profile.tabContent.manageUsers.button.cancel")}
                        </button>
                      </div>
                    </form>                
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

export default ModalManageUsers;
