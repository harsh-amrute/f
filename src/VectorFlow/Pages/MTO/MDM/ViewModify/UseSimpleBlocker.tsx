import { useEffect } from "react";
import { useLocation } from "react-router";

const useSimpleBlocker = (activeMaster:any,backFunction:any,message = 'You have unsaved changes. Are you sure you want to leave?') => {
    const location = useLocation();
  
    useEffect(() => {
  
      const handlePopState = () => {
        const userConfirmed = window.confirm(message);
        if (!userConfirmed) {
          return;
        }
        else{
           backFunction(); 
        }
      };
    
      window.history.pushState(null, '', location.pathname);
      window.addEventListener('popstate', handlePopState);
  
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, [ activeMaster,message, location.pathname]);
  };

export default useSimpleBlocker