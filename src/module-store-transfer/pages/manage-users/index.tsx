import { useRef, useState,useEffect } from "react";
import {
  SCProfileOverView,
  SCSubTitleBox,
  SCSubTitlePad,
  SCSubTitleSpan,
  SCSubTitlePadItem,
  SCItemBtn,
} from "./styles";
import {
  ButtonFloat,
  TableUserManagement,
  ModalManageUsers,
  ModalAdvanedPermissions,
  ButtonOutlineIcon,
} from "../../../components/index";
import {
  useGetAllRoles,
  useGetAllUsers,
  useGetAllPermissions,
  useGetHeadersData,
  useGetUserPermissions,
  useRegisterUser,
  usePutEditUser
} from "../../../services/profile";
import Spinner from "../../../components/commons/Spinner";
import { useTranslation } from "react-i18next";
// import { dataListRoles } from "./listRoles";
import { generateRolesObject } from '../../../helpers/utils';
import _ from 'lodash'
import { useNavigate } from "react-router";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { APPLICATION_NAMES } from "../../../helpers/constants";
import { useUserData } from "../../../context";
import SingleUserPermissionSelectionModal from "../bulk-upload/SingleUserPermissionSelectionModal";
import VFModalCard from "../../../components/VectorFLOW/commons/VFModalCard";


interface ManageUsersProps{
  is_admin:boolean
  permission:Array<any>
  themeUi:string
  // isRolesDrawerOpen:boolean
  // isURLsDrawerOpen:boolean
  // toggleRolesDrawer:(v:boolean)=>void
  // toggleURLsDrawer:(v:boolean)=>void
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
  const [isLoadingHeaders, setIsLoadingHeaders] = useState(true);

  const [valueSelect, setvalueSelect] = useState<any>();

  const prdPermissionRef = useRef<any>();
  const lcPermissionRef = useRef<any>();

  const { data: dataFetch,refetch, isFetching } = useGetAllUsers();
  const { data: dataPermissions } = useGetAllPermissions();
  const { mutateAsync : usegetHeaderData } = useGetHeadersData();
  const [headers , setHeaders] = useState<any>();

  const { mutateAsync: getUserPermissions,isLoading:edit } = useGetUserPermissions();
  
  useGetAllRoles((data:any)=>{
    const dataAllRoles = data.data ? generateRolesObject(data.data) : [];
    setListRoles(dataAllRoles);
    setIsLoadingRoles(false);
  });
  
  const getHeaderDatafunct = async() =>{
    try {
        const reponse = await usegetHeaderData();
        setHeaders(reponse.data);
    } catch (e) {
        console.error("Error fetching headers", e);
    } finally {
        setIsLoadingHeaders(false);
    }
  }
  useEffect(() => {
    getHeaderDatafunct();
  },[])
  const dataAllPermissions = dataPermissions?.data;

  const dataAllUsers = dataFetch?.data;

  const [stepperDetails,setStepperDetails] = useState();
  const [activeApplication,setActiveApplication] = useState<number>(0);
  const [allPermissions,setAllPermissions] = useState<any>([]);
  const [storePermission,setStorePermission] = useState([]);
  const [currentItem,setCurrentItem] = useState();
  const [isEditUser,setIsEditUser] = useState<boolean | undefined>()

  const {user} = useUserData()
  const feature_permission = user?.feature_permission || [];
  const bulkUploadEnabled = feature_permission.includes("Bulk_upload");

  const isCheckBoxRef = useRef<any>({
    isPrdCheck: {},
    isLcCheck: {},
  });
  
  //Follwing Function Updates All Permissions according to current active Application/Application Id provided
  const updateAllPermissions = (applicationId:number) => {
    setAllPermissions(dataAllPermissions.find((app:any)=>app.application_id===applicationId))
  }

  const getApplicationIds = () => {
    const application_names = [APPLICATION_NAMES.MTA, APPLICATION_NAMES.MTO];

    console.log("DataAllPermissions...", dataAllPermissions);
    const applicationIds = dataAllPermissions
      .filter((dataAllPermission: any) => application_names.includes(dataAllPermission.application_name))
      .map((filterItem: any) => filterItem.application_id);
    return applicationIds;
  }

  const [selectedPermissions, setSelectedPermissions] = useState<any>({});

  const handleClickAddNewUser = () => {
    if (!getApplicationIds().length) {
      notifyError(t("profile.tabContent.manageUsers.notifyError.RoleMismatch"))
      return;
    }
    setvalueSelect({});
    setInfoUser({
      name: "",
      email: "",
      roles: [],
      edit:false
    });
    setContentModal({
      callApi: 1,
      title: t("profile.tabContent.manageUsers.modal.addNewTitle"),
      buttonSubmit: "Add User",
    });
    setIsOpenUser(true);
    setIsEditUser(false)
    setStorePermission([]);
    setSelectedPermissions({}); // Reset permissions on new user
    isCheckBoxRef.current.isPrdCheck = {},
    isCheckBoxRef.current.isLcCheck = {}
  };
  
  const onCloseModal = () => {
    setIsOpenUser(false);
  };
 
  // ... (keeping existing code)



  const onClosePermissionModal = () => {
    setIsPermissionModalOpen(false);
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

      if (!checkAddGrandChild?.includes(valueGrandChild) && txtGrandChild in item) {
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

    const validApplications:Array<number> = [];
    listRoles.forEach((app:any)=>{
      const commonRoles = _.intersection(app.child.map((perm:any)=>perm.id),infoUser.roles);
      if(commonRoles.length > 0) validApplications.push(app.id);
    });
    validApplications.sort((a:number,b:number)=>a-b);
    
    
    if(contentModal.callApi === 1){

      const fillStepperDetails = dataAllPermissions.map((app:any,index:number)=>validApplications.includes(app.application_id) ? ({
        label:app.application_name,
        id:app.application_id,
        currentState:'pending',
        isLast:index===dataAllPermissions.length-1,
        themeUi:themeUi
      }) : undefined).filter((element:any) => element !== undefined);
      fillStepperDetails.sort((a:any,b:any)=>a.id-b.id)
      fillStepperDetails && fillStepperDetails[0] &&  (fillStepperDetails[0].currentState = 'active');
      
      const fillEmptyPermission = dataAllPermissions.map((app:any)=>validApplications.includes(app.application_id) ? ({
        application_id:app.application_id,
        application_name:app.application_name,
        productPermission:[],
        locationPermission:[]
      }) : undefined).filter((element:any) => element !== undefined)
  
      fillEmptyPermission.sort((a:any,b:any)=>a.application_id-b.application_id);
      
      const prevValidApplications = prevPremission.map((perm: any) => perm.application_id).sort((a: number, b: number) => a - b);
      const isValidApplicationChanged = !_.isEqual(prevValidApplications, validApplications);
     
      if(prevPremission.length > 0 && !isValidApplicationChanged){
        setStorePermission(prevPremission);
      }else{

        setStorePermission(fillEmptyPermission);
      }
      setStepperDetails(fillStepperDetails);
      setActiveApplication(validApplications[0]);
      updateAllPermissions(validApplications[0]);
    }
    if(contentModal.callApi === 2){
      const productPermissionAllApp:any = [];
      const locationPermissionAllApp:any = [];

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
          'application_id':app.application_id,
          'application_name':app.application_name,
          'productPermission':productPermission
        })
      })

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
          'application_id':app?.application_id,
          'application_name':app?.application_name,
          'locationPermission':locationPermission
        })

    })

    const initialPermissions = productPermissionAllApp?.map((prodApp:any)=>{
      const coLocationPermission = locationPermissionAllApp?.find((locApp:any)=>prodApp.application_id === locApp.application_id);
      if(coLocationPermission){
        return {
          ...prodApp,
          locationPermission:coLocationPermission.locationPermission
        }
      }
      return {...prodApp}
    })

    //Enable Product Permissions of Applications With Selected Roles
    const newStepperDetails:any = validApplications?.map((valid_id:any,index:number)=>{
      //Find if Application Permission Already Exist
      const oldPermissions = initialPermissions?.find((app:any)=>app?.application_id === valid_id);
      if(oldPermissions){
        return {
          label:oldPermissions.application_name,
          id:valid_id,
          currentState:'pending',
          isLast:index===initialPermissions.length-1,
          themeUi:themeUi
        }
      }
      else{
        return {
          label:dataAllPermissions.find((app:any)=>app.application_id === valid_id)?.application_name,
          id:valid_id,
          currentState:'pending',
          isLast:index===initialPermissions.length-1,
          themeUi:themeUi
        }
      }
    })
    newStepperDetails.sort((a:any,b:any)=>a.id-b.id)
    newStepperDetails[0].currentState = 'active';
    setStepperDetails(newStepperDetails);

    //Set Permissions For Selected Applications

    const validApplicationPermissions:any = validApplications?.map((id:any)=>{
      //Find if Application Permission Already Exist
      const oldPermissions = initialPermissions.find((app:any)=>app.application_id === id);
      if(oldPermissions){
        return _.cloneDeep(oldPermissions)
      }
      else{
        return {
          application_id: id,
          application_name: listRoles.find((app:any) => app.id === id)?.title || "",
          productPermission:[],
          locationPermission:[]
        }
      }
    })
    validApplicationPermissions.sort((a:any,b:any)=>a.id-b.id);
    setStorePermission(validApplicationPermissions);

    setvalueSelect(_.cloneDeep(validApplicationPermissions));

    setActiveApplication(validApplicationPermissions[0].application_id)

    updateAllPermissions(validApplicationPermissions[0].application_id)
    }
  }


  const handleClickEdit = async(initialItem: any) => {
    const applicationIds = getApplicationIds();
    if (!applicationIds.length) {
      notifyError(t("profile.tabContent.manageUsers.notifyError.RoleMismatch"));
      return;
    }
    const response = await getUserPermissions(initialItem.id);
    const item = {...initialItem, ...response.data? response.data: {}}
    setCurrentItem(item)
    setIsEditUser(true)
    const roles = item.role_id.map((role: any) => role.id);
    const currentUserActiveApplications = new Set<string>();
    listRoles.forEach((app: any) => {
      if(roles.some((roleId: any) => app.child.some((role: any) => role.id === roleId))) {
        currentUserActiveApplications.add(app.title);
        console.log("app.title", app.title);
      }
    }
    );

    console.log("currentUserActiveApplications", currentUserActiveApplications);
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

      const productPermission = findPermissionLength(item.product_id, applicationId);
      const locationPermission = findPermissionLength(item.location_id, applicationId);

      const productPermissionAll = findPermissionAllLength(dataAllPermissions, applicationId, 'product_permission_ids');
      const locationPermissionAll = findPermissionAllLength(dataAllPermissions, applicationId, 'location_permission_ids');

      isPRDCheck[applicationId] = productPermission === productPermissionAll;
      isLcCheck[applicationId] = locationPermission === locationPermissionAll;

    });

    // }); 

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
                    const defKey2 = `${type.replace("_permission", "")}_permission_ids`;
                    
                    const definitions = appData[defKey1] || appData[defKey2] || [];
                    const prefix = type.split("_")[0];

                    const paths = hids.map((hid: string) => {
                        const cleanHid = hid.endsWith('_') ? hid.slice(0, -1) : hid;
                        const def = definitions.find((d: any) => d.h_id === cleanHid || d.h_id === hid);
                        if (!def) return null;

                        const h1 = def[`${prefix}_hierarchy_1`] || def[`hierarchy_1`] || def[`${prefix}_heirarchy_1`] || def[`heirarchy_1`];
                        const h2 = def[`${prefix}_hierarchy_2`] || def[`hierarchy_2`] || def[`${prefix}_heirarchy_2`] || def[`heirarchy_2`];
                        const h3 = def[`${prefix}_hierarchy_3`] || def[`hierarchy_3`] || def[`${prefix}_heirarchy_3`] || def[`heirarchy_3`];

                        const path = [h1, h2, h3].filter(Boolean); // Filter out empty strings

                        if (!isDynamicPermissions) {
                            // Legacy Mode Logic
                            // If it's a Node (not a Leaf), append 'isActive' to prevent cascade
                            // Definition of Leaf: Typically 3 levels (or all levels present)
                            // Definition of Node here: h3 is empty (or implied by data structure)
                            // Checking if h3 from data was actually present
                            
                            const isLeaf = (h3 && h3 !== ""); 
                            
                            // If not a leaf, we assume it's a specific Node selection (isActive)
                            if (!isLeaf) {
                                path.push("isActive");
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
  }


  const navigate = useNavigate()
  const handleClickBulkUpload = ()=>{
    navigate("/profile/bulk-upload")
  }
  

  useEffect(()=>{
    console.log("infoUser", infoUser);
    console.log("listRoles", listRoles);
  }, [infoUser])


  const { mutateAsync: registerUser } = useRegisterUser();
  const {mutateAsync: editUser} = usePutEditUser();

  const isDynamicPermissions = (user.config_data.INHERITED_ACCESS==="1") || false

  console.log("isDynamicPermissions", isDynamicPermissions)

  const createUser = async (permissions: any) => {
    console.log("permissions", permissions);

    const payload: any = {
      ...infoUser,
    };
    
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
        const defKey2 = `${permType.replace("_permission", "")}_permission_ids`;
        const definitions = appData[defKey1] || appData[defKey2] || [];

        const ids: string[] = [];
        const prefix = permType.split("_")[0]; // e.g. location

        if (Array.isArray(definitions)) {
          paths.forEach((path: string[]) => {
            const isIA = path[path.length - 1] === "isActive";
            const hierarchyPath = isIA ? path.slice(0, -1) : path;
            
            if (!isDynamicPermissions) {
               // Logic For False (Cascade Mode)
               const matchedDefs = definitions.filter((def: any) => {
                  const h1 = def[`${prefix}_hierarchy_1`] || def[`hierarchy_1`] || def[`${prefix}_heirarchy_1`] || def[`heirarchy_1`];
                  const h2 = def[`${prefix}_hierarchy_2`] || def[`hierarchy_2`] || def[`${prefix}_heirarchy_2`] || def[`heirarchy_2`];
                  const h3 = def[`${prefix}_hierarchy_3`] || def[`hierarchy_3`] || def[`${prefix}_heirarchy_3`] || def[`heirarchy_3`];

                  // IA Case: Specific Match Only
                  if (isIA) {
                      if (h1 !== hierarchyPath[0]) return false;
                      if (hierarchyPath.length > 1 && h2 !== hierarchyPath[1]) return false;
                      // IA Node means no H3 usually, or ignoring it for H2 IA.
                      // Ensure it matches the specific Active Node
                      if (def.isActive !== true) return false;
                      
                      // Match level
                      if (hierarchyPath.length === 1 && (h2 && h2 !== "")) return false;
                      if (hierarchyPath.length === 2 && (h3 && h3 !== "")) return false;

                      return true;
                  }

                  // Standard Case (Cascade / Leaf Selection)
                  // 1. Path Match (Prefix)
                  if (h1 !== hierarchyPath[0]) return false;
                  if (hierarchyPath.length > 1 && h2 !== hierarchyPath[1]) return false;
                  if (hierarchyPath.length > 2 && h3 !== hierarchyPath[2]) return false;

                  // 2. Leaf Requirement (All 3 levels must be present)
                  // We only save LEAF nodes in Legacy, unless it is an IA node
                  if (!h1 || h1 === "") return false;
                  if (!h2 || h2 === "") return false;
                  if (!h3 || h3 === "") return false;

                  return true;
               });
               
               if (matchedDefs.length > 0) {
                 matchedDefs.forEach((d: any) => ids.push(d.h_id));
               } else {
                  console.warn(`IDs not found for: ${path.join(">")}`);
               }

            } else {
               // Logic For True (Dynamic Mode)
                const matchedDef = definitions.find((def: any) => {
                   const h1 = def[`${prefix}_hierarchy_1`] || def[`hierarchy_1`] || def[`${prefix}_heirarchy_1`] || def[`heirarchy_1`];
                   const h2 = def[`${prefix}_hierarchy_2`] || def[`hierarchy_2`] || def[`${prefix}_heirarchy_2`] || def[`heirarchy_2`];
                   const h3 = def[`${prefix}_hierarchy_3`] || def[`hierarchy_3`] || def[`${prefix}_heirarchy_3`] || def[`heirarchy_3`];
                   
                   if (h1 !== hierarchyPath[0]) return false;
                   
                   if (hierarchyPath.length > 1) {
                      if (h2 !== hierarchyPath[1]) return false;
                   } else {
                      if (h2 && h2 !== "") return false;
                   }
                   
                   if (hierarchyPath.length > 2) {
                      if (h3 !== hierarchyPath[2]) return false;
                   } else {
                      if (!isIA && h3 && h3 !== "") return false;
                   }
                   
                   if (isIA && def.isActive !== true) return false;
                   
                   return true;
                });

                if (matchedDef) {
                  // IA Node
                  if (isIA) {
                      ids.push(matchedDef.h_id);
                  } else {
                      // Standard Node
                      const h3 = matchedDef[`${prefix}_hierarchy_3`] || matchedDef[`hierarchy_3`] || matchedDef[`${prefix}_heirarchy_3`] || matchedDef[`heirarchy_3`];
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
      console.log("Creating User Payload:", payload);
      let response:any = null;
      if(payload.edit){
        response = await editUser(payload);
           notifySuccess("User updated successfully");
        if(response.status===200){
          setIsPermissionModalOpen(false);
          setIsOpenUser(false);
          refetch()
          notifySuccess("user updated succesfully")
        }
        else{
          console.log('response', response);
          notifyError("Failed to update user: "+response?.response?.msg);
        }

      }else{
        response = await registerUser(payload);

        notifySuccess("User created successfully");
        if(response.status===201){
          setIsPermissionModalOpen(false);
          setIsOpenUser(false);
          refetch()
          notifySuccess("user created succesfully")
        }
        else{
          console.log('response', response);
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
    {edit && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.6)", 
      backdropFilter: "blur(3px)",            
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,                           
    }}
  >
    <Spinner />
  </div>
)}
      <SCProfileOverView>
        <SCSubTitleBox>
          <SCSubTitlePad>
            <SCSubTitleSpan>
              {t("profile.tabContent.manageUsers.title")}
            </SCSubTitleSpan>
            <SCSubTitlePadItem>              
              <SCItemBtn>
                <ButtonFloat
                  text={t("profile.tabContent.manageUsers.button.addNewUser")}
                  onClick={handleClickAddNewUser}
                  icon="/assets/img/profile/icon_plus.svg"
                />
              </SCItemBtn>
             
             {
              bulkUploadEnabled &&

                <SCItemBtn>
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
                </SCItemBtn>
                      }
            
            </SCSubTitlePadItem>
          </SCSubTitlePad>
        </SCSubTitleBox>

        {isFetching || isLoadingRoles || isLoadingHeaders || !dataPermissions ? (
          <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
            <Spinner />
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
      </SCProfileOverView>



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
        setInfoUser={setInfoUser}
        closeModal={()=>{setIsPermissionModalOpen(false)}}
        dataAllPermissions={dataAllPermissions}
        createUser = {createUser}
        key={infoUser.id}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
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
