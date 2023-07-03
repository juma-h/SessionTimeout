import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIdle from "../Hooks/useIdleTimer.js";

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const handleIdle = () => {
    setShowModal(true);//show modal
    setRemainingTime(15);//set 15 seconds as time remaining
  };

  const { isIdle } = useIdle({ onIdle: handleIdle, idleTime: 0.5 });

  useEffect(() => {
    let interval;

    if (isIdle && showModal) {
      interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) =>
          prevRemainingTime > 0 ? prevRemainingTime - 1 : 0//reduces the second by 1
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIdle, showModal]);



  useEffect(() => {
    if (remainingTime === 0 && showModal) {
      // alert("Time out!");
      setShowModal(false);
      navigate("/");
    }
  }, [remainingTime, showModal, navigate]);// this is responsoble for logging user out after timer is down to zero and they have not clicked anything

  const handleLogOut = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleStayLoggedIn = () => {
    setShowModal(false);
    setRemainingTime(30);
  };
  //click loggedin and gives them a timer of 30 seconds before rendered inactive again

  // function millisToMinutesAndSeconds(millis) {
  //   var minutes = Math.floor(millis / 60000);
  //   var seconds = ((millis % 60000) / 1000).toFixed(0);
  //   return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  // }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  

  return (
    <>
      {/* handle isIdle for the content page */}
      {isIdle && (
        <>
          <div>
            <h1>Welcome to the Home Page</h1>
            <p>Thank you for logging in!</p>
          </div>
        </>
      )}

      {/* handle isIdle for the modal */}
      {isIdle && showModal ? (
        <div className="modal">
          <div className="modal-content">
            <h2>Idle Timeout Warning</h2>
            <p>You are about to be logged out due to inactivity.</p>
            <br />
            Time remaining: {millisToMinutesAndSeconds(remainingTime * 1000)}

            <br />
            <button className="btn btn-primary" onClick={handleLogOut}>
              Logout
            </button>
            <button className="btn btn-light" onClick={handleStayLoggedIn}>
              Stay Logged In
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Welcome to the Home Page</h1>
          <p>Thank you for logging in!</p>
        </div>
      )}
    </>
  );
}

export default HomePage;
