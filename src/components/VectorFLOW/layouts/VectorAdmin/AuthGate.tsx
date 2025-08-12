import { Navigate, Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import VectorAdminLayout from "."
import { UserDataContext } from "../../../../context"
import { useEffect, useState } from "react"
import { MainService } from "../../../../module-main/services/api"
import { notifyError } from "../../../../helpers/notify"
import Spinner from "../../../../components/commons/Spinner"
import PageNotFound from "../../../../module-store-transfer/pages/notFound"



export const AuthGate = ()=>{


    const isLoggedIn =  localStorage.getItem('isAdmin')?true:false
    const [userData, setUserData] = useState<any>({});
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');
    const [isSideBarOpen,toggleSidebar] = useState<boolean>(false)

    if(!isLoggedIn){
        return <Navigate to={'/vector-admin/login'}/>
    }
    const changeColorTheme = (color: string) => {
        const newUserData: any = {...userData}
        newUserData.user.theme_ui = color
        
        setUserData(newUserData);
      }
  
    useEffect(() => {
      if(token){
        MainService.getProfile()
        .then((res) => {
          setUserData(res.data.data)
          setLoading(false)

        })
        .catch((err) => {
          notifyError(err)
          setLoading(false)
        })
      }
    }, [])
    if (loading) {
        return <Spinner/>
      }
    return (
        <UserDataContext.Provider value={{ user: userData, changeColorTheme,isSideBarOpen:isSideBarOpen,toggleSideBar:toggleSidebar }}>
            <VectorAdminLayout>
                <Outlet/>
            </VectorAdminLayout>
        </UserDataContext.Provider>
    )
}


export const UnAuthGate = ()=>{

  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(token){
      MainService.getProfile()
      .then((res) => {
        setUserData(res.data.data)
      setLoading(false)
      })
      .catch((err) => {
        notifyError(err)
        setLoading(false)
      })
    }
    else{
    setLoading(false)
    }
  }, []);

  if (loading)  return <Spinner/>
  if(!token || (userData && !userData?.user?.is_admin))    return < PageNotFound /> 

    return (
        <>
            <ToastContainer/>
            <Outlet/>
        </>
    )
}



