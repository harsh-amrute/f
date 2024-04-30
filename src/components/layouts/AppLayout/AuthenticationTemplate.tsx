import React, { type PropsWithChildren, useEffect, useState } from 'react'
import { loginRedirect } from '../../../helpers/utils'
import { MainService } from '../../../module-main/services/api'
import { useNavigate } from 'react-router'
import { UserDataContext } from '../../../context';
import { listMenuParent } from "../NavbarMenu/listMenu";
import { notifyError } from '../../../helpers/notify';

interface AuthenticationTemplateProps {
  isAnonymous: boolean
  loadingComponent: React.ReactElement,
  setMenuItem:any;
}

export const AuthenticationTemplate = ({
  isAnonymous,
  loadingComponent,
  children,
  setMenuItem
}: PropsWithChildren<AuthenticationTemplateProps>) => {
  if (isAnonymous) {
    return <UnauthenticatedTemplate>{children}</UnauthenticatedTemplate>
  } else {
    return (
      <AuthenticatedTemplate loadingComponent={loadingComponent} setMenuItem={setMenuItem}>
        {children}
      </AuthenticatedTemplate>
    )
  }
}

const getSelectedMenuItem = (permission:string[]) => {
  return listMenuParent.find((menu:any)=>{
    // let flag = false;
    // permission.forEach((permission:string)=>{
    //   if(!menu.role.includes(permission)){
    //     flag = true;
    //   }
    // })
    // if(flag) return false;
    // return true;
    return permission.find((p:string)=>{
      return menu.role.includes(p)
    })
  })  
}

const AuthenticatedTemplate = (
  props: PropsWithChildren<
  Pick<AuthenticationTemplateProps, 'loadingComponent' | 'setMenuItem'>
  >
) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>({})
  const [isSideBarOpen,toggleSidebar] = useState<boolean>(false)

  const { children, loadingComponent: Loading } = props
  useEffect(() => {
    MainService.getProfile()
      .then((res) => {
        setUserData(res.data.data)
        setLoading(false)
        props.setMenuItem(getSelectedMenuItem(res.data.data.roles.permission))
      })
      .catch((err) => {
        notifyError(err)
        loginRedirect(navigate)
        setLoading(false)
      })
  }, [])

  const changeColorTheme = (color: string) => {
    const newUserData: any = {...userData}
    newUserData.user.theme_ui = color
    
    setUserData(newUserData);
  }

  if (loading) {
    return Loading
  }

  if (userData) {
    return (
      <UserDataContext.Provider value={{ user: userData, changeColorTheme,isSideBarOpen:isSideBarOpen,toggleSideBar:toggleSidebar }}>
        {children}
      </UserDataContext.Provider>
    )
  }

  return null
}

const UnauthenticatedTemplate = ({
  children
}: {
  children: React.ReactNode
}) => {
  return <>{children}</>
}
