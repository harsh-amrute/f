import {
  profileOverView,
  profilePad,
  profileImg,
  profileName,
  tabsWrapper,
} from "./styles.css";
import { useUserData } from "../../../../src/context";
import { useState } from "react";
import { NavigationTab } from "../../../components";
import Overview from "../overview";
import Permissions from "../permissions";
import ManageUsers from "../manage-users";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [tabPanel, setTabPanel] = useState<number>(0);

  const isAdmin = user.user.is_admin;
  const permissions = user?.roles?.map((role:any)=>role.name);


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


  return (
    <div style={{marginLeft: '24px'}}>
      <div className={profileOverView} style={{zoom: 0.75}}>
        <div className={profilePad}>
          <img className={profileImg} src="/assets/img/profile/profile.svg" />
          <div className={profileName}>{user?.user?.name}</div>
        </div>
      </div>

        <div className={tabsWrapper}>
        <NavigationTab
          listTabs={listTabs}
          onClick={handleClickItem}
        />
        </div>
      <div style={{zoom: 0.75, borderLeft: '1px solid #cecece', borderRight: '1px solid #cecece', borderBottom: '1px solid #cecece', borderRadius: '0 0 12px 12px', boxShadow: '0px 10px 20px #c4c8d066', background: '#fff'}}>
      {tabPanel === 0 && <Overview style={{zoom: 0.75}} themeUi={themeUi} />}
        {tabPanel === 1 && <Permissions />}
      {tabPanel === 2 && (
        <ManageUsers 
        is_admin={isAdmin} 
        permission={permissions} 
        themeUi={themeUi} 
          />
        )}
        </div>
    </div>
  )
}

export default Profile;
