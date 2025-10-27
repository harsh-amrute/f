import React, { type PropsWithChildren, useEffect, useRef, useState } from 'react'
import { getRedirecting, loginRedirect } from '../../../helpers/utils'
import { MainService } from '../../../module-main/services/api'
import { useNavigate } from 'react-router'
import { UserDataContext } from '../../../context';
import { listMenuParent } from "../NavbarMenu/listMenu";
import { notifyError } from '../../../helpers/notify';
import { useUser } from '../../../UserDataContext';

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
  const [isSideBarOpen, toggleSidebar] = useState<boolean>(false)
  const { userData, setUserData } = useUser();
  const { children, loadingComponent: Loading } = props;
  
  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        if (getRedirecting()) return;

        const response = await MainService.getProfile();
        setUserData(response.data.data);
        props.setMenuItem(getSelectedMenuItem(response.data.data.roles.permission));
        
      } catch (err) {
          loginRedirect(navigate); 
      } finally {
        setLoading(false);
      }
    };

    if (!userData && !getRedirecting()) {
      verifyUserSession();
    } else {
      setLoading(false);
    }
  }, []);

  const changeColorTheme = (color: string) => {

    if(userData){

      const newUserData: any = {...userData}
      newUserData.user.theme_ui = color
      
      setUserData(newUserData);
    }
  }

  if (!userData && loading) {
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
