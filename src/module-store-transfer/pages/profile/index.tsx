import {
  profileOverView,
  profilePad,
  profileImg,
  profileName,
  tabsWrapper,
  // tabsAction, // keep if you re-enable the buttons
} from "./styles.css";
import { useUserData } from "../../../../src/context";
import { useState } from "react";
import { NavigationTab } from "../../../components";
import Overview from "../overview";
import Permissions from "../permissions";
import ManageUsers from "../manage-users";
import { useTranslation } from "react-i18next";
// import VFButton from '../../../components/VectorFLOW/commons/VFButton'
// import VFButtonOutline from '../../../components/VectorFLOW/commons/VFButtonOutline'

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [tabPanel, setTabPanel] = useState<number>(0);

  const isAdmin = user.user.is_admin;
  const permissions = user?.roles?.permission;

  let listTabs;

  if (
    isAdmin ||
    permissions.includes("IST Admin") ||
    permissions.includes("Admin")
  ) {
    listTabs = [
      t("profile.tab.overview"),
      t("profile.tab.permissions"),
      t("profile.tab.manageUsers"),
    ];
  } else {
    listTabs = [t("profile.tab.overview"), t("profile.tab.permissions")];
  }

  const handleClickItem = (children: any) => {
    setTabPanel(children);
  };

  // const [isRolesDrawerOpen,toggleRolesDrawer] = useState<boolean>(false)

  // const [isURLsDrawerOpen,toggleURLsDrawer] = useState<boolean>(false)

  return (
    <>
      <div className={profileOverView} style={{ zoom: 0.75 }}>
        <div className={profilePad}>
          <img className={profileImg} src="/assets/img/profile/profile.svg" />
          <span className={profileName}>{user?.user?.name}</span>
        </div>

        <div className={tabsWrapper}>
          <NavigationTab listTabs={listTabs} onClick={handleClickItem} />
          {/* {(tabPanel === 2) && (
            <div className={tabsAction}>
              <VFButton themeUi={themeUi} onClick={()=>toggleRolesDrawer(true)} style={{boxShadow:'none'}}>
                Manage Roles
              </VFButton>
              <VFButtonOutline themeUi={themeUi} onClick={()=>toggleURLsDrawer(true)} style={{boxShadow:'none'}}>
                Manage URLs
              </VFButtonOutline>
            </div>
          )} */}
        </div>
      </div>

      <div style={{ zoom: 0.75 }}>
        {tabPanel === 0 && (
          <Overview style={{ zoom: 0.75 }} themeUi={themeUi} />
        )}
        {tabPanel === 1 && <Permissions roles={user.roles} />}
        {tabPanel === 2 && (
          <ManageUsers
            is_admin={isAdmin}
            permission={permissions}
            themeUi={themeUi}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
