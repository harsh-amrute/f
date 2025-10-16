import { useRoutes } from 'react-router'
import { initRoutes } from './app-routes'
import { AutoLogoutTimer } from './VectorFlow/Pages/MTO/Common/AutoLogout/AutoLogoutTimer';

import { UserProvider } from "./UserDataContext";

function App() {
  return (
    <UserProvider>
      <AutoLogoutTimer />
      <AppRouter />
    </UserProvider>
  );
}

function AppRouter() {
  const routes = initRoutes();
  return useRoutes(routes);
}

export default App
