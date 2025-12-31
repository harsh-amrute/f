import {
  SCProfileOverView,
  SCProfilePad,
  SCProfileImg,
  SCProfileName,
  SCTabsWrapper,
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
    <div style={{marginLeft: '24px'}}>
      <SCProfileOverView style={{zoom: 0.75}}>
        <SCProfilePad>
          <SCProfileImg src="/assets/img/profile/profile.svg" />
          <SCProfileName>{user?.user?.name}</SCProfileName>
        </SCProfilePad>
      </SCProfileOverView>

        <SCTabsWrapper>
        <NavigationTab
          listTabs={listTabs}
          onClick={handleClickItem}
        />
        </SCTabsWrapper>
      <div style={{zoom: 0.75, borderLeft: '1px solid #cecece', borderRight: '1px solid #cecece', borderBottom: '1px solid #cecece', borderRadius: '0 0 12px 12px', boxShadow: '0px 10px 20px #c4c8d066', background: '#fff'}}>
      {tabPanel === 0 && <Overview style={{zoom: 0.75}} themeUi={themeUi} />}
      {tabPanel === 1 && <Permissions roles={user.roles} />}
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

export default Profile
