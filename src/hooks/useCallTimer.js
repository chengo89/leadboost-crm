import { useState, useEffect, useRef } from 'react';

export function useCallTimer() {
  const [callDuration, setCallDuration] = useState(0);
  const [isOnCall, setIsOnCall] = useState(false);
  const callTimerRef = useRef(null);

  useEffect(() => {
    if (isOnCall && !callTimerRef.current) {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else if (!isOnCall && callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
      setCallDuration(0);
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isOnCall]);

  const startCall = () => {
    setIsOnCall(true);
  };

  const endCall = () => {
    setIsOnCall(false);
  };

  return {
    callDuration,
    isOnCall,
    startCall,
    endCall
  };
}