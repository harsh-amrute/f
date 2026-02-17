import React, { CSSProperties, useEffect, useRef, useState } from "react";
import {
  SCHorizontalDivison,
  SCViewContainer,
  SCViewContainerWithBgToggle,
} from "../../../components/VectorFLOW/commons/MTO/ActionToolBar/styles";
import { useUserData } from "../../../context";
import { NewChartView, NewGridIcon } from "../../../helpers/SvgRenderer";
import PermissionHeirarchyCanvas from "../manage-users/PermissioinHeirarchyCanvas";
import PermissionForm from "./PermissionForm";
import VFButton from "../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../components/VectorFLOW/commons/VFButtonOutline";
import { ToggleButton, ToggleContainer } from "./style";
import Portal from "../../../components/VectorFLOW/layouts/Portal";
import { DropdownWrapper } from "../../../components/commons/CustomDropdown/style";
import Spinner from "../../../components/commons/Spinner";


const ViewToggle = ({
  allApplications,
  selectedApplication,
  setSelectedApplication,
}: any) => {
  return (
    <ToggleContainer>
      {allApplications.map((app: string) => (
        <ToggleButton
          key={app}
          active={selectedApplication === app}
          onClick={() => setSelectedApplication(app)}
        >
          {app}
        </ToggleButton>
      ))}
    </ToggleContainer>
  );
};

const ChartViewToggle = ({ isChartView, setIsChartView }: any) => {
  const user = useUserData();
  const themeUi = user.user.user.theme_ui;

  return (
    <SCViewContainerWithBgToggle style={{ zoom: 0.5, border: '0.5px solid #cecece' }}>
      <SCViewContainer
        onClick={() => {
          isChartView && setIsChartView?.(!isChartView);
        }}
      >
        <NewChartView theme={themeUi} view={!isChartView} />
      </SCViewContainer>

      <SCHorizontalDivison />

      <SCViewContainer
        onClick={() => {
          !isChartView && setIsChartView?.(!isChartView);
        }}
        style={{ paddingTop: "7px" }}
      >
        <NewGridIcon theme={themeUi} view={isChartView} />
      </SCViewContainer>
    </SCViewContainerWithBgToggle>
  );
};

const hasSelectedPermissions = (permissions: any): boolean => {
  if (!permissions || typeof permissions !== 'object' || Object.keys(permissions).length === 0) {
    return false; 
  }
  for (const appName in permissions) {
    const appPermissions = permissions[appName];
    if (appPermissions && typeof appPermissions === 'object') {
      
      for (const permType in appPermissions) {
        const permList = appPermissions[permType];
        
        if (Array.isArray(permList) && permList.length > 0) {
          return true; // Found at least one permission
        }
      }
    }
  }

  return false; 
};

const SingleUserPermissionSelectionModal = ({ dataAllPermissions, closeModal, createUser, activeApplications, infoUser, setInfoUser, setPrevModal, selectedPermissions, setSelectedPermissions, allRoles, isLoader }: { dataAllPermissions: any, closeModal: any, createUser: any, activeApplications: any, infoUser: any, setInfoUser: any, setPrevModal: any, selectedPermissions: any, setSelectedPermissions: any, allRoles: any, isLoader: any }) => {
  const [isChartView, setIsChartView] = React.useState(false);
  const [allApplications, setAllApplications] = useState<any>(dataAllPermissions?.map(
    (ele: any) => ele.application_name
  ).filter((app: string) => activeApplications.includes(app)));
  const [selectedApplication, setSelectedApplication] = React.useState<
  string[]
  >(allApplications[0]);

    useEffect(()=>{
      console.log("activeApplications changed", activeApplications);
    },[activeApplications])
  
  // Store the initial permissions snapshot on first render
  const initialPermissionsRef = useRef<any>(JSON.parse(JSON.stringify(selectedPermissions || {})));

  const ResetPermissions = () => {
    if (infoUser?.edit) {
      // Edit mode: restore to the original fetched permissions
      setSelectedPermissions(JSON.parse(JSON.stringify(initialPermissionsRef.current)));
    } else {
      // Create mode: clear all permissions
      setSelectedPermissions({});
    }
  }

  useEffect(()=>{
      ResetPermissions();
        setAllApplications(
          dataAllPermissions
            ?.map((ele: any) => ele.application_name)
            .filter(
              (app: string) =>[...infoUser.activeApplications]?.includes(app)
            )
        );
        
    },[infoUser.activeApplications])




  useEffect(()=>{
    setSelectedApplication(allApplications[0]);
  },[allApplications])
  
  const user = useUserData();
  const themeUi = user.user.user.theme_ui;
  
  const clearAllPermissions = () => {
    setSelectedPermissions({});
  }
  
  // Check if Distribution role requires both location & product permissions

  // const isApplyDisabled = !hasSelectedPermissions(selectedPermissions) || isDistributionPermMissing;

  // Build tooltip message

  const [open, setOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    /**
     * Handles clicks outside the dropdown to close it.
     * 
     * @param {MouseEvent} e - The mouse event.
     */
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      } else {
        console.log("no ref found");
      }
    };
  
    // Add or remove event listener for handling clicks outside the dropdown
    useEffect(() => {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);
  
    /**
     * Handles the click event for the "Bulk Action" button.
     * 
     * @param {React.MouseEvent<HTMLElement>} e - The mouse event.
     */
    const onSelectClick = (e: React.MouseEvent<HTMLElement>) => {
      const { bottom, left } = e.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: bottom + window.scrollY,
        bottom: bottom,
        left: left + window.scrollX - 200,
      });
      setOpen(!open);
    };

  const isCreateDisabled = (selectedPermissions: any, infoUser: any) => {
    const distributionRoles = allRoles?.find((e: any) => e.title === "Distribution");
    if (!distributionRoles) return false; // No Distribution app defined, nothing to enforce

    const isRoleFromDistribution = infoUser?.roles?.some((role: any) => distributionRoles.child?.some((ele: any) => ele.id === role));

    if (isRoleFromDistribution) {
      const hasLocPerm = (selectedPermissions?.Distribution?.location_permission?.length ?? 0) > 0;
      const hasProdPerm = (selectedPermissions?.Distribution?.product_permission?.length ?? 0) > 0;
      if (hasLocPerm && hasProdPerm) {
        return false;
      }
      return true; // Missing required permissions
    }

    return false; // No distribution role, no restriction
  }

  return (
      <div style={{ width: "80vw", height: "80vh", padding: "25px" }}>
     
        <div
          style={{
            width: "100%",
            height: "28px",
            display: "flex",
            justifyContent: "space-between",  
          }}
          >
          <ViewToggle
            allApplications={allApplications}
            selectedApplication={selectedApplication}
            setSelectedApplication={setSelectedApplication}
            />
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <VFButtonOutline onClick={(e: any)=>{onSelectClick(e)}} themeUi={themeUi} style={{marginRight: '20px', height: '3.5rem', width: 'fit-content',padding: '0 14px', fontSize: '1.1rem'}}>
              Know More About Permissions ?
            </VFButtonOutline>

            {open && (
        <Portal wrapperId="checkbox-dropdown">
          <DropdownWrapper
            ref={dropdownRef}
            topPos={dropdownPosition.top + "px"}
            leftPos={dropdownPosition.left + "px"}
           >
          <div  style={{background: '#181818', width: '500px', border: '1px solid #cecece', color: '#cecece', padding: '12px', zIndex: '1000', }}>
            • Selecting a permission at a parent level automatically applies all its child permissions by default.
            <br></br>
            • Pink highlights indicate this permissions will be applied for the user due to parent selection.
            <br></br>
            • If you select a specific child permission, the default selection of its sibling permissions is removed, ensuring only explicityl chosen permissions are applied.
          </div>
          </DropdownWrapper>

        </Portal>)}

          <ChartViewToggle
            isChartView={isChartView}
            setIsChartView={setIsChartView}
            />
            </div>
        </div>
        <div style={{height: '80%'}}>

        {(!isChartView) ? (
        
          <PermissionHeirarchyCanvas
          dataAllPermissions={dataAllPermissions}
          selectedApplication={selectedApplication}
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
          />
          
        ) : (
          <PermissionForm
          currentAppAllPermissions={dataAllPermissions.find(
            (ele: any) => ele.application_name === selectedApplication
          )}
          selectedApplication={selectedApplication}
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
          />
        )}
          </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '10px'}}>
          <div style={{display: 'flex', gap: '20px'}}>

          <VFButtonOutline
            style={{height: '3.5rem', fontSize: '1.2rem'}}
            themeUi={themeUi}
            onClick={() => {
              setPrevModal();
              closeModal();
            }}
            
            >Go back</VFButtonOutline>
          <VFButtonOutline
            style={{height: '3.5rem', fontSize: '1.2rem'}}
            themeUi={themeUi}
            onClick={() => {ResetPermissions()}}
            
            >Reset</VFButtonOutline>
            </div>
          <div style={{display: 'flex', gap: '20px'}}>

          <VFButtonOutline
            style={{height: '3.5rem', fontSize: '1.2rem'}}
            themeUi={themeUi}
            onClick={() => {clearAllPermissions()}}
            
            >Clear All</VFButtonOutline>
          {/* <div style={{ position: 'relative', display: 'inline-block' }} title={isApplyDisabled ? disabledTooltip : ''}> */}
          <VFButton
            style={{ height: '3.5rem', fontSize: '1.2rem', cursor: 'pointer' }}
          themeUi={themeUi}
            // disabled={isApplyDisabled}
            disabled={isCreateDisabled(selectedPermissions, infoUser)}
          onClick={() => {createUser(selectedPermissions)}}
          >{infoUser?.edit?'Update User':'Create User'}</VFButton>
          {/* </div> */}
          
          </div>
        </div>
      </div>
  );
};

export default SingleUserPermissionSelectionModal;
