import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useRegisterUser, usePutEditUser } from "../../../services/profile";
import LoadingSpinner from "../LoadingSpinner";
import PrdPermissions from "../../../components/layouts/ProductPermission/common-mulselect";
import LcPermissions from "../../../components/layouts/LocationPermission/common-mulselect";
import UserMangementStepper from "../../VectorFLOW/commons/UserManagementStepper";
import {
  formDataPermission,
  handleSelectParent,
  handleSelectChild,
  handleSelectGrandChild
} from "./common-func";
import { useUserData } from "../../../context";
import _ from "lodash";

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
    valueSelect,
    stepperDetails,
    activeApplication,
    setActiveApplication,
    allPermissions,
    updateAllPermissions,
    storePermission,
    setStorePermission,
    setStepperDetails
  } = props;

  const [isLoadSpinner, setIsLoadSpinner] = useState<any>(false);
  const { mutateAsync: mutateRegister } = useRegisterUser();
  const { mutateAsync: mutatePutEditUser } = usePutEditUser();

  const backModalUser = () => {
 
    //Reset Current Application Permissions
    if(valueSelect.length > 0){
      const initalPermissions = valueSelect.find((app:any)=>app.application_id === activeApplication);
      setStorePermission([...storePermission.map((app:any)=>{
        if(app.application_id === activeApplication){
          return {
            ...app,productPermission:initalPermissions.productPermission,locationPermission:initalPermissions.locationPermission
          }
        }
        return {...app}
      })])
    }
    
    if(getActiveApplicationIndex() === 0){
      setIsOpenUser(true);
      setIsOpenAdvanced(false);
    }
    else{
      const newApplicationId = storePermission[getActiveApplicationIndex()-1].application_id;
      setStepperDetails([...stepperDetails.map((step:any)=>{
        const stepCopy = {...step};
        if(step.id === newApplicationId) stepCopy.currentState='active';
        if(step.id === activeApplication) stepCopy.currentState='pending';
        return stepCopy;
      })]);
      setActiveApplication(newApplicationId);
      updateAllPermissions(newApplicationId);
    } 
    
  };

  const handleSubmit = () => {
    let product:any;
    let location:any;
    
    const productPermissions:any = [];
    const locationPermissions:any = [];

    storePermission.forEach((app:any,index:number) => {
      if(index===storePermission.length-1){
        product = prdPermissionRef.current?.getPrdPermissionValue();
        location = lcPermissionRef.current?.getLcPermissionValue();

        //Store Permissions
        const storePermissionCopy = [...storePermission]
        const currentPermission:any = storePermissionCopy.find((app:any)=>app.application_id === activeApplication);
        currentPermission.productPermission = product;
        currentPermission.locationPermission = location;
        setStorePermission(storePermissionCopy)
      }
      else{
        product =
      // eslint-disable-next-line no-unsafe-optional-chaining
      app.productPermission

      location =
      // eslint-disable-next-line no-unsafe-optional-chaining
      app.locationPermission
      }
      
      const dataPrdPermission = formDataPermission({
        parent: product.brand,
        child: product.subBrand,
        grandChild: product.category,
        keyParent: "product_hierarchy_1",
        keyChild: "product_hierarchy_2",
        keyGrandChild: "product_hierarchy_3",
      });

      const dataLcPermission = formDataPermission({
        parent: location.lcRegion,
        child: location.lcType,
        grandChild: location.lcCluster,
        keyParent: "location_heirarchy_1",
        keyChild: "location_heirarchy_2",
        keyGrandChild: "location_heirarchy_3",
      });

      productPermissions.push({
        application_id:app.application_id,
        permissions:dataPrdPermission
      })
      locationPermissions.push({
        application_id:app.application_id,
        permissions:dataLcPermission
      })
  
    });

    const { brand} =
      // eslint-disable-next-line no-unsafe-optional-chaining
      prdPermissionRef.current?.getPrdPermissionValue();

      const { lcRegion} =
      // eslint-disable-next-line no-unsafe-optional-chaining
      lcPermissionRef.current?.getLcPermissionValue();

    // if(brand?.length > 0 && lcRegion?.length > 0) {
      // setIsLoadSpinner(true);
      console.log("productPdrmis", productPermissions);
      const formData: any = {
        ...infoUser,
        tc: true,
        // product_permissions: productPermissions,
        // location_permissions: locationPermissions
        product_permissions: [],
        location_permissions: []
      };


      setIsLoadSpinner(true);
 
      if (contentModal.callApi === 1 ) {
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
    // } else {
    //   notifyError(
    //     "somethin .."+
    //     t("profile.tabContent.manageUsers.notifyError.PleaseSelectPermission")
    //   );
    //   setIsLoadSpinner(false);
    // }
  };

  
  const saveAndGoToNext = () => {
    const storePermissionCopy = [...storePermission]
    const currentPermission:any = storePermissionCopy.find((app:any)=>app.application_id === activeApplication);
    const currentProductPermission = prdPermissionRef.current?.getPrdPermissionValue();
    const currentLocationPermission = lcPermissionRef.current?.getLcPermissionValue();

    // if(currentProductPermission.brand === undefined || currentLocationPermission.lcRegion === undefined) return notifyError(
    //   t("profile.tabContent.manageUsers.notifyError.PleaseSelectPermission")
    // );

    // if(currentPermission){
    //   currentPermission.productPermission = currentProductPermission;
    //   currentPermission.locationPermission = currentLocationPermission;
    //   setStorePermission(storePermissionCopy)
    // }
    
    const newApplicationId = storePermission[getActiveApplicationIndex()+1].application_id;
    setStepperDetails([...stepperDetails.map((step:any)=>{
      const stepCopy = {...step};
      if(step.id === newApplicationId) stepCopy.currentState='active';
      if(step.id === activeApplication) stepCopy.currentState='completed';
      return stepCopy;
    })]);
    setActiveApplication(newApplicationId);
    updateAllPermissions(newApplicationId);
    
  }


  const getCurrentProductPermission = ()=>{
    if(storePermission.length > 0) return _.cloneDeep(storePermission.find((app:any)=>app.application_id === activeApplication).productPermission);
    return {};
  }

  const getCurrentLocationPermission = ()=>{
    if(storePermission.length > 0) return {...storePermission.find((app:any)=>app.application_id === activeApplication).locationPermission};
    return {};
  }

  const getActiveApplicationIndex = ()=>{
    return storePermission?.findIndex((app:any)=>app.application_id === activeApplication);
  }



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
                      <span onClick={()=>{setIsOpenUser(false);setIsOpenAdvanced(false);setStorePermission([]);}} className="close-forced">
                        x
                      </span>
                    </Dialog.Title>
                    <div className="advanced-permission-container">
                      {stepperDetails?.length > 1 && 
                        (<div style={{margin:'20px',minWidth:'500px'}}>
                          <UserMangementStepper
                            list={stepperDetails}
                            // activeStep={getActiveApplicationIndex()}
                            themeUi={themeUi}
                          />
                        </div>)
                      }

                      <PrdPermissions
                        ref={prdPermissionRef}
                        product={allPermissions?.product_permission}
                        valueSelectPrd={getCurrentProductPermission()}
                        handleSelectParent={handleSelectParent}
                        handleSelectChild={handleSelectChild}
                        handleSelectGrandChild={handleSelectGrandChild}
                      />
                      <LcPermissions
                        ref={lcPermissionRef}
                        location={allPermissions?.location_permission}
                        valueSelectLc={getCurrentLocationPermission()}
                        handleSelectParent={handleSelectParent}
                        handleSelectChild={handleSelectChild}
                        handleSelectGrandChild={handleSelectGrandChild}
                      />

                      <div className="modal-bottom upper-line">
                        {
                          getActiveApplicationIndex() === storePermission?.length-1 ? 
                          (
                            <button
                              type="button"
                              className={`btn_submit ${themeUi} ${
                                isLoadSpinner ? "btn-disabled" : ""
                              }`}
                              onClick={handleSubmit}
                              disabled={isLoadSpinner}
                            >
                              {contentModal.buttonSubmit}
                            </button>) : 
                          (<button
                            type="button"
                            className={`btn_submit ${themeUi} ${
                              isLoadSpinner ? "btn-disabled" : ""
                            }`}
                            onClick={saveAndGoToNext}
                            disabled={isLoadSpinner}
                            style={{width:'190px'}}
                          >
                            {"Save & Go To Next"}
                          </button>)
                        }
                        
                        <button
                          type="button"
                          className="btn_cancel"
                          disabled={isLoadSpinner}
                          onClick={backModalUser}
                        >
                          {t("profile.tabContent.manageUsers.button.goBack")}
                        </button>
                      </div>
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
