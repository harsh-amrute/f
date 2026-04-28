import { useRef, useState, useEffect } from "react";
import {
  scProfileOverView,
  subTitleBox,
  subTitlePad,
  subTitleSpan,
  subTitlePadItem,
  itemBtn,
} from "./styles.css";
import {
  ButtonFloat,
  TableUserManagement,
  ModalManageUsers,
  ButtonOutlineIcon,
} from "../../../components/index";
import {
  useGetAllRoles,
  useGetAllUsers,
  useGetAllPermissions,
  useGetUserPermissions,
  useRegisterUser,
  usePutEditUser
} from "../../../services/profile";
import { useTranslation } from "react-i18next";
import { generateRolesObject } from '../../../helpers/utils';
import _ from 'lodash'
import { useNavigate } from "react-router";
import { notifyError, notifySuccess, notifyWarningWithoutAutoClose } from "../../../helpers/notify";
import { APPLICATION_NAMES } from "../../../helpers/constants";
import { useUserData } from "../../../context";
import SingleUserPermissionSelectionModal from "../bulk-upload/SingleUserPermissionSelectionModal";
import VFModalCard from "../../../components/VectorFLOW/commons/VFModalCard";
import VFLoader from "../../../components/VectorFLOW/commons/VFLoader";
import { useGetDBRsettingsData } from "../../../VectorFlow/Services/MTO/Common/DBRSettings";


interface ManageUsersProps{
  is_admin:boolean
  permission:Array<any>
  themeUi: string
}

const ManageUsers = ({ is_admin, permission, themeUi }: ManageUsersProps) => {
  const { t } = useTranslation();
  const [contentModal, setContentModal] = useState({
    callApi: 0,
    title: "",
    buttonSubmit: "",
  });

  const [listRoles, setListRoles] = useState<any>([]);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [infoUser, setInfoUser] = useState<any>({
    name: "",
    email: "",
    roles: [],
  });
  
  // Loading States
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [selectedPermissions, setSelectedPermissions] = useState<any>({});
  const { data: dataFetch,refetch, isFetching } = useGetAllUsers();
  const { data: dataPermissions } = useGetAllPermissions();
  const { mutateAsync: getUserPermissions, isLoading: edit } = useGetUserPermissions();
  const { mutateAsync: getDBRSettings } = useGetDBRsettingsData();
  const { mutateAsync: registerUser, isLoading: registerLoading } = useRegisterUser();
  const { mutateAsync: editUser, isLoading: editLoading } = usePutEditUser();
  const { user } = useUserData()
  const isDynamicPermissions = (user.config_data.INHERITED_ACCESS === "1") || false

  const dataAllPermissions = dataPermissions?.data;

  const dataAllUsers = dataFetch?.data;

  const [storePermission, setStorePermission] = useState([]);
  const [currentItem, setCurrentItem] = useState();
  const [isEditUser, setIsEditUser] = useState<boolean | undefined>()

  const feature_permission = user?.feature_permission || [];
  const bulkUploadEnabled = feature_permission.includes("Bulk_upload");

  const isCheckBoxRef = useRef<any>({
    isPrdCheck: {},
    isLcCheck: {},
  });

  useGetAllRoles((data:any)=>{
    const dataAllRoles = data.data ? generateRolesObject(data.data) : [];
    setListRoles(dataAllRoles);
    setIsLoadingRoles(false);
  });

  const [isMtoPermissionEnabled, setIsMtoPermissionEnabled] = useState(false);

  const getDBRSettingsData = async () => {
    try {
      const reponse = await getDBRSettings();
      setIsMtoPermissionEnabled(reponse?.data?.data?.some((ele: any) => ele.flag === 'IsDataPermissionEnabled' && ele.value === '1') || false);
    } catch (e) {
      notifyError("Failed to fetch MTO Settings");
      console.error("Error fetching DBR Settings", e);
    }
  }

  useEffect(() => {
    getDBRSettingsData();
  }, [])






  const getApplicationIds = () => {
    const application_names = [APPLICATION_NAMES.MTA, APPLICATION_NAMES.MTO];

    const applicationIds = dataAllPermissions
      .filter((dataAllPermission: any) =>
        application_names.includes(dataAllPermission.application_name)
      )
      .map((filterItem: any) => filterItem.application_id);
    return applicationIds;
  };


  const handleClickAddNewUser = () => {
    if (!getApplicationIds().length) {
      notifyError(t("profile.tabContent.manageUsers.notifyError.RoleMismatch"));
      return;
    }
    setInfoUser({
      name: "",
      email: "",
      roles: [],
      edit: false,
    });
    setContentModal({
      callApi: 1,
      title: t("profile.tabContent.manageUsers.modal.addNewTitle"),
      buttonSubmit: "Add User",
    });
    setIsOpenUser(true);
    setIsEditUser(false);
    setStorePermission([]);
    setSelectedPermissions({}); // Reset permissions on new user
    isCheckBoxRef.current.isPrdCheck = {},
    isCheckBoxRef.current.isLcCheck = {}
  };

  const onCloseModal = () => {
    setIsOpenUser(false);
  };


  const getPermission = ({ data, txtParent, txtChild, txtGrandChild }: any) => {
    const parent: any = [];
    const child: any = [];
    const grandChild: any = [];
    const checkAddParent: any = [];
    const checkAddChild: any = [];
    const checkAddGrandChild: any = [];

    data.forEach((item: any) => {
      const valueParent = item[txtParent];
      const valueChild = `${valueParent} > ${item[txtChild]}`;
      const valueGrandChild = `${valueChild} > ${item[txtGrandChild]}`;

      if (!checkAddParent?.includes(valueParent) && valueParent?.length > 0) {
        checkAddParent.push(valueParent);
        parent.push({ label: valueParent, value: valueParent });
      }

      if (!checkAddChild?.includes(valueChild) && txtChild in item) {
        checkAddChild.push(valueChild);
        child.push({ label: valueChild, value: valueChild });
      }

      if (
        !checkAddGrandChild?.includes(valueGrandChild) &&
        txtGrandChild in item
      ) {
        checkAddGrandChild.push(valueGrandChild);
        grandChild.push({ label: valueGrandChild, value: valueGrandChild });
      }
    });

    return {
      parent,
      child,
      grandChild,
      checkAddParent,
      checkAddChild,
      checkAddGrandChild,
    };
  };

  const fillAdvancedPermissionsModalData = (item?:any)=>{
    const prevPremission = storePermission

    const validApplications: Array<number> = [];
    listRoles.forEach((app: any) => {
      const commonRoles = _.intersection(
        app.child.map((perm: any) => perm.id),
        infoUser.roles
      );
      if (commonRoles.length > 0) validApplications.push(app.id);
    });
    validApplications.sort((a: number, b: number) => a - b);

    if (contentModal.callApi === 1) {
      const fillStepperDetails = dataAllPermissions
        .map((app: any, index: number) =>
          validApplications.includes(app.application_id)
            ? {
                label: app.application_name,
                id: app.application_id,
                currentState: "pending",
                isLast: index === dataAllPermissions.length - 1,
                themeUi: themeUi,
              }
            : undefined
        )
        .filter((element: any) => element !== undefined);
      fillStepperDetails.sort((a: any, b: any) => a.id - b.id);
      fillStepperDetails &&
        fillStepperDetails[0] &&
        (fillStepperDetails[0].currentState = "active");

      const fillEmptyPermission = dataAllPermissions
        .map((app: any) =>
          validApplications.includes(app.application_id)
            ? {
                application_id: app.application_id,
                application_name: app.application_name,
                productPermission: [],
                locationPermission: [],
              }
            : undefined
        )
        .filter((element: any) => element !== undefined);

      fillEmptyPermission.sort(
        (a: any, b: any) => a.application_id - b.application_id
      );

      const prevValidApplications = prevPremission
        .map((perm: any) => perm.application_id)
        .sort((a: number, b: number) => a - b);
      const isValidApplicationChanged = !_.isEqual(
        prevValidApplications,
        validApplications
      );

      if (prevPremission.length > 0 && !isValidApplicationChanged) {
        setStorePermission(prevPremission);
      } else {
        setStorePermission(fillEmptyPermission);
      }
    }
    if (contentModal.callApi === 2) {
      const productPermissionAllApp: any = [];
      const locationPermissionAllApp: any = [];

      item?.product_id?.forEach((app:any)=>{
        const getProductPermissions = getPermission({
          data: app.permissions,
          txtParent: "product_hierarchy_1",
          txtChild: "product_hierarchy_2",
          txtGrandChild: "product_hierarchy_3",
        });

        const productPermission = {
          brand: getProductPermissions.parent,
          subBrand: getProductPermissions.child,
          category: getProductPermissions?.grandChild,
          checkAddBrand: getProductPermissions?.checkAddParent,
          checkAddSubBrand: getProductPermissions.checkAddChild,
          checkAddCategory: getProductPermissions.checkAddGrandChild,
        };

        productPermissionAllApp.push({
          application_id: app.application_id,
          application_name: app.application_name,
          productPermission: productPermission,
        });
      });

      item?.location_id?.forEach((app:any)=>{
        const getLocationPermissions = getPermission({
          data: app.permissions,
          txtParent: "location_heirarchy_1",
          txtChild: "location_heirarchy_2",
          txtGrandChild: "location_heirarchy_3",
        });

        const locationPermission = {
          lcRegion: getLocationPermissions.parent,
          lcType: getLocationPermissions.child,
          lcCluster: getLocationPermissions.grandChild,
          checkAddLcRegion: getLocationPermissions.checkAddParent,
          checkAddLcType: getLocationPermissions.checkAddChild,
          checkAddLcCluster: getLocationPermissions.checkAddGrandChild,
        };

        locationPermissionAllApp.push({
          application_id: app?.application_id,
          application_name: app?.application_name,
          locationPermission: locationPermission,
        });
      });

      const initialPermissions = productPermissionAllApp?.map(
        (prodApp: any) => {
          const coLocationPermission = locationPermissionAllApp?.find(
            (locApp: any) => prodApp.application_id === locApp.application_id
          );
          if (coLocationPermission) {
            return {
              ...prodApp,
              locationPermission: coLocationPermission.locationPermission,
            };
          }
          return { ...prodApp };
        }
      );

      //Enable Product Permissions of Applications With Selected Roles
      const newStepperDetails: any = validApplications?.map(
        (valid_id: any, index: number) => {
          //Find if Application Permission Already Exist
          const oldPermissions = initialPermissions?.find(
            (app: any) => app?.application_id === valid_id
          );
          if (oldPermissions) {
            return {
              label: oldPermissions.application_name,
              id: valid_id,
              currentState: "pending",
              isLast: index === initialPermissions.length - 1,
              themeUi: themeUi,
            };
          } else {
            return {
              label: dataAllPermissions.find(
                (app: any) => app.application_id === valid_id
              )?.application_name,
              id: valid_id,
              currentState: "pending",
              isLast: index === initialPermissions.length - 1,
              themeUi: themeUi,
            };
          }
        }
      );
      newStepperDetails.sort((a: any, b: any) => a.id - b.id);
      newStepperDetails[0].currentState = "active";

      //Set Permissions For Selected Applications

      const validApplicationPermissions: any = validApplications?.map(
        (id: any) => {
          //Find if Application Permission Already Exist
          const oldPermissions = initialPermissions.find(
            (app: any) => app.application_id === id
          );
          if (oldPermissions) {
            return _.cloneDeep(oldPermissions);
          } else {
            return {
              application_id: id,
              application_name:
                listRoles.find((app: any) => app.id === id)?.title || "",
              productPermission: [],
              locationPermission: [],
            };
          }
        }
      );
      validApplicationPermissions.sort((a: any, b: any) => a.id - b.id);
      setStorePermission(validApplicationPermissions);

    }
  };

  const handleClickEdit = async (initialItem: any) => {
    const applicationIds = getApplicationIds();
    if (!applicationIds.length) {
      notifyError(t("profile.tabContent.manageUsers.notifyError.RoleMismatch"));
      return;
    }
    const response = await getUserPermissions(initialItem.id);
    const item = { ...initialItem, ...(response.data ? response.data : {}) };
    setCurrentItem(item);
    setIsEditUser(true);
    const roles = item.role_id.map((role: any) => role.id);
    const currentUserActiveApplications = new Set<string>();
    listRoles.forEach((app: any) => {
      if(roles.some((roleId: any) => app.child.some((role: any) => role.id === roleId))) {
        currentUserActiveApplications.add(app.title);
      }
    }
    );

    setInfoUser({
      id: item.id,
      name: item.name,
      email: item.email,
      roles: roles,
      edit: true,
      activeApplications: currentUserActiveApplications
    });

    setContentModal({
      callApi: 2,
      title: t("profile.tabContent.manageUsers.modal.editUserTitle"),
      buttonSubmit: "Update User",
    });

    const isPRDCheck: any = {};
    const isLcCheck: any = {};

    const findPermissionLength = (array: any, appId: any) =>
      Array.isArray(array) ? array.find((entry: any) => entry.application_id === appId)?.permissions?.length : 0;

    const findPermissionAllLength = (array: any, appId: any, key: any) =>
      Array.isArray(array) ? array.find((entry: any) => entry.application_id === appId)?.[key]?.length : 0;

    applicationIds.forEach((applicationId: any) => {
      const productPermission = findPermissionLength(
        item.product_id,
        applicationId
      );
      const locationPermission = findPermissionLength(
        item.location_id,
        applicationId
      );

      const productPermissionAll = findPermissionAllLength(
        dataAllPermissions,
        applicationId,
        "product_permission_ids"
      );
      const locationPermissionAll = findPermissionAllLength(
        dataAllPermissions,
        applicationId,
        "location_permission_ids"
      );

      isPRDCheck[applicationId] = productPermission === productPermissionAll;
      isLcCheck[applicationId] = locationPermission === locationPermissionAll;
    });


    isCheckBoxRef.current.isPrdCheck = isPRDCheck;
    isCheckBoxRef.current.isLcCheck = isLcCheck;

    // --- Populate selectedPermissions for New Permission Modal ---
    const fetchedPermissionsArray = response.data || [];
    const newSelectedPermissions: any = {};

    if (Array.isArray(fetchedPermissionsArray) && dataAllPermissions) {
      fetchedPermissionsArray.forEach((appPerm: any) => {
          const appName = appPerm.application_name;
          const appData = dataAllPermissions.find((d: any) => d.application_name === appName);
          
          if (appData) {
            newSelectedPermissions[appName] = {};

            // Iterate through keys (e.g., location_hids, product_hids)
            Object.keys(appPerm).forEach((key) => {
                if (key.endsWith('_hids')) {
                    const hids = appPerm[key];
                    if (!Array.isArray(hids) || hids.length === 0) return;

                    const type = key.replace('_hids', '_permission'); // e.g., product_permission
                    // Determine Definition Key (some inconsistency in naming likely, check dataAllPermissions)
                  const defKey1 = `${type}_ids`; 
                    
                  const definitions = appData[defKey1] || [];
                    const prefix = type.split("_")[0];

                    const paths = hids.map((hid: string) => {
                        const cleanHid = hid.endsWith('_') ? hid.slice(0, -1) : hid;
                        const def = definitions.find((d: any) => d.h_id === cleanHid || d.h_id === hid);
                        if (!def) return null;

                      const h1 = def[`${prefix}_hierarchy_1`] ?? def[`hierarchy_1`] ?? def[`${prefix}_heirarchy_1`] ?? def[`heirarchy_1`] ?? '';
                      const h2 = def[`${prefix}_hierarchy_2`] ?? def[`hierarchy_2`] ?? def[`${prefix}_heirarchy_2`] ?? def[`heirarchy_2`] ?? '';
                      const h3 = def[`${prefix}_hierarchy_3`] ?? def[`hierarchy_3`] ?? def[`${prefix}_heirarchy_3`] ?? def[`heirarchy_3`] ?? '';

                        const path = [h1, h2, h3].filter(Boolean); // Filter out empty strings

                        // IA Node Logic
                        // If def is active (IA Node definition) AND the input HID does NOT end with underscore
                        // (Underscore implies Group/Parent selection of that node, not the IA node itself)
                      // AND it is NOT a leaf node (L3). Leaf nodes (L3) should never have prime suffix, they are just selected.
                      // Assuming L3 means h3 is present.
                      const isLeaf = (h3 && h3 !== "");
                      if (def.isActive && !hid.endsWith('_') && !isLeaf) {
                            if (path.length > 0) {
                                path[path.length - 1] = path[path.length - 1] + "'";
                            }
                      }     
                        return path;
                    }).filter((p: any) => p !== null);

                    if (paths.length > 0) {
                        newSelectedPermissions[appName][type] = paths;
                    }
                }
            });
            // Clean up empty objects
             if (Object.keys(newSelectedPermissions[appName]).length === 0) {
                delete newSelectedPermissions[appName];
            }
          }
      });
    }

    setSelectedPermissions(newSelectedPermissions);
    // -------------------------------------------------------------

    setIsOpenUser(true);
  };

  const navigate = useNavigate()
  const handleClickBulkUpload = ()=>{
    navigate("/profile/bulk-upload")
  }
  





  const createUser = async (permissions: any, userDetails?: any) => {

    let payload: any = {
      ...infoUser,
    };
    if (userDetails) {
      payload = {
        ...userDetails,
      }
    }
    
    // Ensure defaults
    if (payload.edit === undefined) payload.edit = false;
    if (payload.tc === undefined) payload.tc = true;

    if(payload.edit){
      payload.id = infoUser.id
    }

    const appNames = Object.keys(permissions);

    appNames.forEach((appName) => {
      const appData = dataAllPermissions.find(
        (d: any) => d.application_name === appName
      );
      if (!appData) return;

      const appId = appData.application_id;
      const appPermissions = permissions[appName];

      Object.keys(appPermissions).forEach((permType) => {
        if (!payload[permType]) payload[permType] = [];

        const paths = appPermissions[permType]; // Array of paths
        
        // Resolve definitions
        const defKey1 = `${permType}_ids`;
        const definitions = appData[defKey1] || [];

        const ids: string[] = [];
        const prefix = permType.split("_")[0]; // e.g. location

        const getHierarchy = (def: any) => ({
          h1: def[`${prefix}_hierarchy_1`] ?? def[`hierarchy_1`] ?? def[`${prefix}_heirarchy_1`] ?? def[`heirarchy_1`] ?? '',
          h2: def[`${prefix}_hierarchy_2`] ?? def[`hierarchy_2`] ?? def[`${prefix}_heirarchy_2`] ?? def[`heirarchy_2`] ?? '',
          h3: def[`${prefix}_hierarchy_3`] ?? def[`hierarchy_3`] ?? def[`${prefix}_heirarchy_3`] ?? def[`heirarchy_3`] ?? '',
        });

        if (Array.isArray(definitions)) {
          paths.forEach((path: string[]) => {
            // Updated Detection Logic (Apply to BOTH modes)
            // Detect IA node: last path element ends with prime (')
            const lastElement = path[path.length - 1] || '';
            const isIANode = lastElement.endsWith("'");
            // For IA nodes, strip the prime suffix to get the real hierarchy name
            const lookupPath = isIANode
              ? [...path.slice(0, -1), lastElement.slice(0, -1)]
              : path;


            if (!isDynamicPermissions) {
              // Logic For False (Cascade Mode / Legacy)
               const matchedDefs = definitions.filter((def: any) => {
                 const { h1, h2, h3 } = getHierarchy(def);

                 // IA Case: Specific Match Only (isActive: true)
                 if (isIANode) {
                   if (h1 !== lookupPath[0]) return false;
                   // Match level 2 if present
                   if (lookupPath.length > 1) {
                     if (h2 !== lookupPath[1]) return false;
                   } else {
                     // Only L1 provided for IA? Usually unexpected but check h2 empty
                     if (h2 && h2 !== "") return false;
                   }

                 // For IA node, we expect isActive to be true
                      if (def.isActive !== true) return false;

                      return true;
                  }

                  // Standard Case (Cascade / Leaf Selection)
                 // 1. Path Match (Prefix) - Match whatever depth is provided
                 if (h1 !== lookupPath[0]) return false;
                 // If path has level 2, it must match
                 if (lookupPath.length > 1 && h2 !== lookupPath[1]) return false;
                 // If path has level 3, it must match
                 if (lookupPath.length > 2 && h3 !== lookupPath[2]) return false;

                 // 2. We want ALL leaf nodes under this path
                 // A leaf node has all 3 levels populated (usually) OR is marked as a leaf in data
                 // Assuming leaf = h3 present
                  if (!h1 || h1 === "") return false;
                  if (!h2 || h2 === "") return false;
                  if (!h3 || h3 === "") return false;

                  return true;
               });
               
               if (matchedDefs.length > 0) {
                 matchedDefs.forEach((d: any) => ids.push(d.h_id));
               }

            } else {
               // Logic For True (Dynamic Mode)
                const matchedDef = definitions.find((def: any) => {
                  const { h1, h2, h3 } = getHierarchy(def);
                   
                  if (h1 !== lookupPath[0]) return false;
                   
                  if (lookupPath.length > 1) {
                    if (h2 !== lookupPath[1]) return false;
                   } else {
                      if (h2 && h2 !== "") return false;
                   }
                   
                  if (lookupPath.length > 2) {
                    if (h3 !== lookupPath[2]) return false;
                   } else {
                     if (!isIANode && h3 && h3 !== "") return false;
                   }
                   
                  if (isIANode && def.isActive !== true) return false;
                   
                   return true;
                });

                if (matchedDef) {
                  if (isIANode) {
                  // IA Node (B') -> 1_2 (no trailing underscore)
                      ids.push(matchedDef.h_id);
                  } else {
                      // Standard Node
                    const { h3 } = getHierarchy(matchedDef);
                      const isLeaf = (h3 && h3 !== "");
                      
                      if (isLeaf) {
                          // Childmost Node -> 1_2_3 (No Underscore)
                          ids.push(matchedDef.h_id);
                      } else {
                          // Parent Node -> 1_2_ (Group Selection)
                          ids.push(`${matchedDef.h_id}_`);
                      }
                  }
                } else {
                   // Log warning but proceed
                   console.warn(`ID not found for: ${path.join(">")}`);
                }
            }
          });
        }

        // Add to Payload Array
        let appEntry = payload[permType].find((e: any) => e.appId === appId);
        if (!appEntry) {
          appEntry = { appId: appId, perm: [] };
          payload[permType].push(appEntry);
        }
        appEntry.perm = Array.from(new Set([...appEntry.perm, ...ids]));
      });
    });

    try {
      let response:any = null;
      if(payload.edit){

        response = await editUser(payload);
        if(response.status===200){
          setIsPermissionModalOpen(false);
          setIsOpenUser(false);
          refetch()
          notifySuccess("User updated Succesfully")
          setSelectedPermissions({});
        }
        else {
          notifyError("Failed to update user: "+response?.response?.msg);
        }

      }else{
        response = await registerUser(payload);

        if(response.status===201){
          setIsPermissionModalOpen(false);
          setIsOpenUser(false);
          refetch()
          notifySuccess("user created succesfully")
          
          if (response?.data?.msg?.warning) {
            notifyWarningWithoutAutoClose(response.data.msg.warning);
          }
          
          setSelectedPermissions({});
        }
        else {
          notifyError("Failed to create user: "+response?.response?.msg);
        }
      }

    } catch (error) {
      console.error(error);
      notifyError("Failed to create user");
    }
  }

  return (
    <>
      {(edit || editLoading || registerLoading) && (
  <div
    style={{
            position: "fixed",
      top: 0,
      left: 0,
            width: "140vw",
            height: "140vh",
            userSelect: 'none',
      background: "rgba(255, 255, 255, 0.6)", 
      backdropFilter: "blur(3px)",            
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
            zIndex: 99999,                           
    }}
  >
          <VFLoader />
  </div>
      )}
      <div className={scProfileOverView}>
        <div className={subTitleBox}>
          <div className={subTitlePad}>
            <span className={subTitleSpan}>
              {t("profile.tabContent.manageUsers.title")}
            </span>

            <div className={subTitlePadItem}>
              <div className={itemBtn}>
                <ButtonFloat
                  text={t("profile.tabContent.manageUsers.button.addNewUser")}
                  onClick={handleClickAddNewUser}
                  icon="/assets/img/profile/icon_plus.svg"
                />
              </div>

             
             {
              bulkUploadEnabled &&

                <div className={itemBtn}>
                  <ButtonOutlineIcon
                    text={t("profile.tabContent.manageUsers.button.bulkUpload")}
                    icon={`/assets/img/profile/${
                      themeUi === "REGALBLAZE"
                        ? "icon_upload_yellow"
                        : "icon_upload"
                        }.svg`}
                        disabled={false}
                        onClick={handleClickBulkUpload}
                        />
                </div>
                      }
            
            </div>
          </div>
        </div>

        {isFetching || isLoadingRoles || !dataPermissions ? (
          <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
            <VFLoader />
          </div>
        ) : (
          <TableUserManagement
            dataAllUsers={dataAllUsers}
            handleClickEdit={handleClickEdit}
            refetch={refetch}
            is_admin={is_admin}
            permission={permission}
          />
        )}
      </div>


      <ModalManageUsers
        contentModal={contentModal}
        openModal={isOpenUser}
        closeModal={onCloseModal}
        setIsOpenAdvanced={setIsPermissionModalOpen}
        infoUser={infoUser}
        setInfoUser={setInfoUser}
        listRoles={listRoles}
        setListRoles={setListRoles}
        fillAdvancedPermissionsModalData={fillAdvancedPermissionsModalData}
        currentItem={currentItem}
        isEditUser={isEditUser}
        setIsEditUser={setIsEditUser}
        createUser={createUser}
        isMtoPermissionEnabled={isMtoPermissionEnabled}
        />   

<VFModalCard
            openModal={isPermissionModalOpen}
            headerIcon={"/assets/img/profile/icon_upload.svg"}
            closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
            closeModal={() => {
              setIsPermissionModalOpen(false);
            }}
            headerText={<span style={{fontSize: '1.6rem'}}>
              Set Permissions
            </span>
            }
          >


      <SingleUserPermissionSelectionModal
        
        activeApplications={[...(infoUser?.activeApplications || [])]}
        infoUser={infoUser}
          isLoader={editLoading || registerLoading}
        setInfoUser={setInfoUser}
        closeModal={()=>{setIsPermissionModalOpen(false)}}
        dataAllPermissions={dataAllPermissions}
        createUser = {createUser}
        key={infoUser.id}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
          allRoles={listRoles}
        setPrevModal={()=>{
          setContentModal({
            callApi: 1,
            title: t("profile.tabContent.manageUsers.modal.addNewTitle"),
            buttonSubmit: "Add User",
          });
          setIsOpenUser(true);

        }}
        
        />   
      </VFModalCard>
    </>
  );
};

export default ManageUsers;
