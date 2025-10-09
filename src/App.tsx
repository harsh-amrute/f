import { useLocation, useNavigate, useRoutes } from 'react-router'
import { initRoutes } from './app-routes'
import { useEffect, useState } from 'react'
import { MainService } from './module-main/services/api'
import { loginRedirect } from './helpers/utils';
import { AutoLogoutTimer } from './VectorFlow/Pages/MTO/Common/AutoLogout/AutoLogoutTimer';

function App () {

  const [userData, setUserData]  = useState();
  const location = useLocation();
  const navigate = useNavigate();
   useEffect(() => {
     console.log("this is calling");
    if(location.pathname !== '/login'){
     
        console.log("this is userData",userData);
        MainService.getProfile()
        .then((res) => {
          setUserData(res.data.data)
        })
        .catch((err) => {
          console.log(err)
           loginRedirect(navigate)
        })
      }
    },[location.pathname])

  if(!userData && location.pathname !== '/login'){
    return <div>Loading...</div>
  }
  return (
    <>
    {userData && <AutoLogoutTimer />}
    {useRoutes(initRoutes({userData}))}
    </>
  )
}

export default App
