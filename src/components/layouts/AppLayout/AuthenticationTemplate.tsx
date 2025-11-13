import React, { type PropsWithChildren, useEffect, useRef, useState } from 'react'
import {getRedirecting, loginRedirect } from '../../../helpers/utils'
import { MainService } from '../../../module-main/services/api'
import { useNavigate } from 'react-router'
import { useUserData } from '../../../context';
import { listMenuParent } from "../NavbarMenu/listMenu";

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

  const {user, setUser}  = useUserData();
  const { children, loadingComponent: Loading } = props;
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

   
    useEffect(() => {
      const verifyUserSession = async () => {
        try {
          if (getRedirecting()) return;
  
          const response = await MainService.getProfile();
          setUser(response.data.data);
          if(response.data.data){
            props.setMenuItem(getSelectedMenuItem(response.data.data.roles.permission));      
          }  
        } catch (err) {
            loginRedirect(navigate); 
        } finally {
          setLoading(false);
        }
      };
      
      verifyUserSession();
      
    }, []);



  if(!user){
    return Loading;
  }
  if (user) {
    return (
      <>
        {children}
      </>
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
