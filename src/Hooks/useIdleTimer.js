import React, { useState, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";

function useIdle({ onIdle, idleTime = 1 }) {
  const [isIdle, setIsIdle] = useState(null);

  //handles what happens when the user is idle
  const handleOnIdle = (event) => {
    setIsIdle(true); //set the state to true
    const currentTime = new Date().getTime();

    console.log("user is idle?", event); //log the user is idle followed by the event
    console.log("Last Active time", getLastActiveTime());
    console.log("Current time", currentTime); // you the log the time the user was last active
    onIdle(); //then call onIdle function
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * idleTime,
    onIdle: handleOnIdle,
    debounce: 500,
  });
  return {
    getRemainingTime,
    getLastActiveTime,
    isIdle,
  };
}

export default useIdle;
