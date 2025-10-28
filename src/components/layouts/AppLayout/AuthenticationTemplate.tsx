import React, { type PropsWithChildren, useEffect, useRef, useState } from 'react'
import { getRedirecting, loginRedirect } from '../../../helpers/utils'
import { MainService } from '../../../module-main/services/api'
import { useNavigate } from 'react-router'
import { UserDataContext, useUserData } from '../../../context';
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

  console.log("this is mounting....");
  const {user, setUser}  = useUserData();
  const { children, loadingComponent: Loading } = props;
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

   
    useEffect(() => {
      const verifyUserSession = async () => {
        try {
          if (getRedirecting()) return;
  
          const response = await MainService.getProfile();
          console.log("user in authentication",user);
          setUser(response.data.data);
          if(response.data.data){
            console.log("response Data", response.data.data);
            console.log()
            props.setMenuItem(getSelectedMenuItem(response.data.data.roles.permission));      
          }  
        } catch (err) {
            console.log("errr", err);
            loginRedirect(navigate); 
        } finally {
          setLoading(false);
        }
      };
  
      if (!user && !getRedirecting()) {
        verifyUserSession();
      } else {
        setLoading(false);
      }
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
