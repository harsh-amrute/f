import { Navigate, Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import VectorAdminLayout from "."
import { UserDataContext } from "../../../../context"
import { useEffect, useState } from "react"
import { MainService } from "../../../../module-main/services/api"
import { notifyError } from "../../../../helpers/notify"
import Spinner from "../../../../components/commons/Spinner"



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


    const isLoggedIn =  localStorage.getItem('isAdmin')?true:false

    if(isLoggedIn){
        return <Navigate to={'/vector-admin'}/>
    }

    return (
        <>
            <ToastContainer/>
            <Outlet/>
        </>
    )
}



