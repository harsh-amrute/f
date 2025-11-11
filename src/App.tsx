import { useNavigate, useRoutes } from "react-router";
import { initRoutes } from "./app-routes";
import { AutoLogoutTimer } from "./VectorFlow/Pages/MTO/Common/AutoLogout/AutoLogoutTimer";
import { UserDataContext } from "./context";
import { useEffect, useState } from "react";
import { getRedirecting, loginRedirect } from "./helpers/utils";
import { MainService } from "./module-main/services/api";
import { notifyLoader } from "./helpers/notify";
import OverlayLoader from "./VectorFlow/Pages/MTO/Common/Loader";
import "./react-select.css";
import "./agCharts.css";

function App() {
  const [isSideBarOpen, toggleSidebar] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  // if (!userData && loading) {
  //     return (<OverlayLoader message='Loading...'></OverlayLoader>)
  // }

  const changeColorTheme = (color: string) => {
    if (userData) {
      const newUserData: any = { ...userData };
      newUserData.user.theme_ui = color;

      setUserData(newUserData);
    }
  };
  return (
    <UserDataContext.Provider
      value={{
        user: userData,
        setUser: setUserData,
        changeColorTheme,
        isSideBarOpen: isSideBarOpen,
        toggleSideBar: toggleSidebar,
      }}
    >
      <AutoLogoutTimer />
      <AppRouter />
    </UserDataContext.Provider>
  );
}

function AppRouter() {
  const routes = initRoutes();
  return useRoutes(routes);
}

export default App;
