import { Navigate, Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import VectorAdminLayout from "."
import { UserDataContext } from "../../../../context"


export const AuthGate = ()=>{


    const isLoggedIn =  localStorage.getItem('isAdmin')?true:false

    if(!isLoggedIn){
        return <Navigate to={'/vector-admin/login'}/>
    }

    return (
        <UserDataContext.Provider
            value={{
                user: {
                    id: 0,
                    email: '',
                    name: '',
                    is_admin: false,
                    role: '',
                    user:{
                        theme_ui:"NOIRFUSION"
                    }
                  },
                  changeColorTheme: (color) => {return color},
                  isSideBarOpen:false,
                  toggleSideBar:()=>{return}
            }}
        >
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



