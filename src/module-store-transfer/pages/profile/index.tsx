import {
  SCProfileOverView,
  SCProfilePad,
  SCProfileImg,
  SCProfileName
} from './styles'
import { useUserData } from '../../../../src/context'
import { useState } from 'react'
import { NavigationTab } from '../../../components'
import Overview from '../overview'
import Permissions from '../permissions'
import ManageUsers from '../manage-users'
import { useTranslation } from 'react-i18next'

const Profile = () => {
  const { t } = useTranslation()
  const { user } = useUserData()
  const themeUi = user?.user?.theme_ui;
  const [tabPanel, setTabPanel] = useState<number>(0)

  const isAdmin = user.user.is_admin;
  const permissions = user?.roles?.permission;
  
  let listTabs

  if(isAdmin || permissions.includes('IST Admin') || permissions.includes('Admin')) {
    listTabs = [
      t('profile.tab.overview'),
      t('profile.tab.permissions'),
      t('profile.tab.manageUsers')
    ]
  } else {
    listTabs = [
      t('profile.tab.overview'),
      t('profile.tab.permissions')
    ]
  }

  const handleClickItem = (children: any) => {
    setTabPanel(children)
  }

  return (
    <>
      <SCProfileOverView>
        <SCProfilePad>
          <SCProfileImg src="../assets/img/profile/profile.svg" />
          <SCProfileName>{user?.user?.name}</SCProfileName>
        </SCProfilePad>
        <NavigationTab
          listTabs={listTabs}
          onClick={handleClickItem}
        ></NavigationTab>
      </SCProfileOverView>
      {tabPanel === 0 && <Overview themeUi={themeUi} />}
      {tabPanel === 1 && <Permissions roles={user.roles} />}
      {tabPanel === 2 && <ManageUsers is_admin={isAdmin} permission={permissions} themeUi={themeUi} />}
    </>
  )
}

export default Profile
