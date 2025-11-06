import { useNavigate, useRoutes } from 'react-router'
import { initRoutes } from './app-routes'
import { AutoLogoutTimer } from './VectorFlow/Pages/MTO/Common/AutoLogout/AutoLogoutTimer';
import { UserDataContext } from './context';
import { useState } from 'react';

function App() {
  const [isSideBarOpen, toggleSidebar] = useState<boolean>(false)
  const [ userData, setUserData ] = useState<any>(null);

  const changeColorTheme = (color: string) => {

    if(userData){

      const newUserData: any = {...userData}
      newUserData.user.theme_ui = color
      
      setUserData(newUserData);
    }
  }
  return (
          <UserDataContext.Provider value={{ user: userData,setUser: setUserData, changeColorTheme,isSideBarOpen:isSideBarOpen,toggleSideBar:toggleSidebar }}>
      <AutoLogoutTimer />
      <AppRouter />
    </UserDataContext.Provider>
  );
}

function AppRouter() {
  const routes = initRoutes();
  return useRoutes(routes);
}

export default App
