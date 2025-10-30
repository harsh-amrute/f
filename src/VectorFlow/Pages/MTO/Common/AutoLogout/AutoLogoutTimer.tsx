import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { MainService } from '../../../../../module-main/services/api';
import { useIdleTimer } from './useIdleTimer';
import { notifyLoader } from '../../../../../helpers/notify';
import { toast } from 'react-toastify';
import { useUserData } from '../../../../../context';

export function AutoLogoutTimer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const [isWarningVisible, setWarningVisible] = useState(false);
  const finalLogoutTimerRef = useRef<number | null>(null);

  // Timeout Configuration 
  const logoutTimeout = parseInt(process.env.REACT_APP_IDLE_TIMEOUT || '900000', 10);
  const promptDuration = 60 * 1000;
  const promptTimeout = logoutTimeout - promptDuration;
  const { setUser } = useUserData();


  const performLogout = useCallback(async () => {
    if (location.pathname !== '/login') {
      toast.dismiss();
      setWarningVisible(false);
      const response = await MainService.logout(true, queryClient);
      if (response?.status == 200) {
        setUser(undefined);
      }
      navigate('/login');
    }
  }, [location.pathname, navigate, queryClient]); 

const handlePrompt = useCallback(() => {
  if (location.pathname !== '/login') {
    setWarningVisible(true);
    notifyLoader('You will be logged out in a minute due to inactivity.');
    finalLogoutTimerRef.current = window.setTimeout(performLogout, promptDuration);
  }
}, [performLogout, promptDuration, location.pathname]);
  const { resetTimer } = useIdleTimer(handlePrompt, promptTimeout);

  const stayActive = useCallback(() => {
    setWarningVisible(false);
    toast.dismiss();
    if (finalLogoutTimerRef.current) {
      clearTimeout(finalLogoutTimerRef.current);
    }
    resetTimer();
  }, [resetTimer]); 

  useEffect(() => {
    const handleActivity = () => {
      if (isWarningVisible) {
        stayActive();
      }
    };

    const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'];
    events.forEach((event) => window.addEventListener(event, handleActivity));
       
    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [isWarningVisible, stayActive]);

  return null;
}