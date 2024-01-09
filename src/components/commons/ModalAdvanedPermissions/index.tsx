import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useRegisterUser, usePutEditUser } from "../../../services/profile";
import LoadingSpinner from "../LoadingSpinner";
import PrdPermissions from "../../../components/layouts/ProductPermission/common-mulselect";
import LcPermissions from "../../../components/layouts/LocationPermission/common-mulselect";
import {
  formDataPermission,
  handleSelectParent,
  handleSelectChild,
  handleSelectGrandChild,
} from "./common-func";
import { useUserData } from "../../../context";

const ModalAdvanedPermissions = (props: any) => {
  const { t } = useTranslation();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const {
    openModal,
    closeModal,
    contentModal,
    setIsOpenUser,
    setIsOpenAdvanced,
    infoUser,
    refetch,
    prdPermissionRef,
    lcPermissionRef,
    dataAllPermissions,
    valueSelect,
  } = props;

  const [isLoadSpinner, setIsLoadSpinner] = useState<any>(false);
  const { mutateAsync: mutateRegister } = useRegisterUser();
  const { mutateAsync: mutatePutEditUser } = usePutEditUser();

  const backModalUser = () => {
    setIsOpenUser(true);
    setIsOpenAdvanced(false);
  };

  const handleSubmit = () => {
    const { brand, subBrand, category } =
      // eslint-disable-next-line no-unsafe-optional-chaining
      prdPermissionRef.current?.getPrdPermissionValue();

    const { lcRegion, lcType, lcCluster } =
      // eslint-disable-next-line no-unsafe-optional-chaining
      lcPermissionRef.current?.getLcPermissionValue();

    if (brand?.length > 0) {
      setIsLoadSpinner(true);

      const dataPrdPermission = formDataPermission({
        parent: brand,
        child: subBrand,
        grandChild: category,
        keyParent: "product_hierarchy_1",
        keyChild: "product_hierarchy_2",
        keyGrandChild: "product_hierarchy_3",
      });

      const dataLcPermission = formDataPermission({
        parent: lcRegion,
        child: lcType,
        grandChild: lcCluster,
        keyParent: "wh_region",
        keyChild: "wh_type",
        keyGrandChild: "wh_location_group",
      });

      const formData: any = {
        ...infoUser,
        tc: true,
        product_permissions: dataPrdPermission,
        location_permissions: dataLcPermission,
      };

      if (contentModal.callApi === 1) {
        mutateRegister(formData, {
          onSuccess: (res: any) => {
            setIsLoadSpinner(false);
            if (res?.status === 400) {
              res?.response?.email?.forEach((element: any) => {
                notifyError(element);
              });
              res?.response?.name?.forEach((element: any) => {
                notifyError(element);
              });
              
              notifyError(res?.response?.msg);
            } else {
              notifySuccess(res?.data?.msg);
              closeModal();
              refetch();
            }
          },
          onError: (error: any) => {
            console.log("error", error);
            setIsLoadSpinner(false);
            error.response?.email?.forEach((element: any) => {
              notifyError(element);
            });
            error.response?.name?.forEach((element: any) => {
              notifyError(element);
            });
          },
        });
      } else if (contentModal.callApi === 2) {
        mutatePutEditUser(formData, {
          onSuccess: (res: any) => {
            setIsLoadSpinner(false);
            if (res?.status === 400) {
              if(typeof res?.response?.msg === 'object' && Array.isArray(res?.response?.msg)) {
                res?.response?.msg?.forEach((element: any) => {
                  notifyError(element);
                });
              } else if (typeof res?.response?.msg === 'string') {
                notifyError(res?.response?.msg);
              }
              res?.response?.name?.forEach((element: any) => {
                notifyError(element);
              });
            } else {
              notifySuccess(res?.data?.msg);
              refetch();
              closeModal();
            }
          },
          onError: (error: any) => {
            console.log("error", error);
            setIsLoadSpinner(false);
            error.response?.msg?.forEach((element: any) => {
              notifyError(element);
            });
            error.response?.name?.forEach((element: any) => {
              notifyError(element);
            });
          },
        });
      }
    } else {
      notifyError(
        t("profile.tabContent.manageUsers.notifyError.PleaseSelectPermission")
      );
      setIsLoadSpinner(false);
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
                        {t(
                          "profile.tabContent.manageUsers.advancedPermission.title"
                        )}
                      </span>
                      <span onClick={backModalUser} className="close-forced">
                        x
                      </span>
                    </Dialog.Title>

                    <PrdPermissions
                      ref={prdPermissionRef}
                      product={dataAllPermissions?.product}
                      valueSelectPrd={valueSelect?.productPermission}
                      handleSelectParent={handleSelectParent}
                      handleSelectChild={handleSelectChild}
                      handleSelectGrandChild={handleSelectGrandChild}
                    />
                    <LcPermissions
                      ref={lcPermissionRef}
                      location={dataAllPermissions?.location}
                      valueSelectLc={valueSelect?.locationPermission}
                      handleSelectParent={handleSelectParent}
                      handleSelectChild={handleSelectChild}
                      handleSelectGrandChild={handleSelectGrandChild}
                    />

                    <div className="modal-bottom upper-line">
                      <button
                        type="button"
                        className={`btn_submit ${themeUi} ${
                          isLoadSpinner ? "btn-disabled" : ""
                        }`}
                        onClick={handleSubmit}
                        disabled={isLoadSpinner}
                      >
                        {contentModal.buttonSubmit}
                      </button>
                      <button
                        type="button"
                        className="btn_cancel"
                        disabled={isLoadSpinner}
                        onClick={backModalUser}
                      >
                        {t("profile.tabContent.manageUsers.button.goBack")}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      }

      {isLoadSpinner && <LoadingSpinner />}
    </>
  );
};

export default ModalAdvanedPermissions;
