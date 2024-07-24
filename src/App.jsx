import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import DeadEyeLaserWorksApi from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import Navigation from "./routes-nav/Navigation";
import AppRoutes from "./routes-nav/AppRoutes";
import FooterApp from "./footer/FooterApp";
import VerificationAlert from "./common/VerificationAlert";
import LoadingSpinner from "./common/LoadingSpinner";

export const TOKEN_STORAGE_ID = "deadeyeLaserWorks-token";
export const firstValue = null;
export let isRememberMe = false;

/** App component
 *
 * The main component of the DeadEye Laser Works application.
 * It handles user authentication, routing, and provides global context.
 *
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(
    TOKEN_STORAGE_ID,
    firstValue,
    isRememberMe
  );
  const [currentUser, setCurrentUser] = useState(null);
  const [services, setServices] = useState([]);
  const [isHomepage, setIsHomepage] = useState(false);

  console.debug(
    "App",
    "infoLoaded=",
    infoLoaded,
    "token=",
    token,
    "currentUser=",
    currentUser,
    "services",
    services,
    "isHomepage=",
    isHomepage
  );

  useEffect(() => {
    console.debug("App useEffect loadUserInfo", "token=", token);
    async function getcurrentUser() {
      try {
        let services = await DeadEyeLaserWorksApi.getAllServices();
        setServices(services);
        if (token) {
          let { username, status } = jwtDecode(token);
          DeadEyeLaserWorksApi.token = token;
          let currentUser = await DeadEyeLaserWorksApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        }
      } catch (err) {
        console.error("App loadUserInfo: problem loading", err);
        setCurrentUser(null);
      }

      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getcurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await DeadEyeLaserWorksApi.signup(signupData);
      setToken(token);
      isRememberMe = true;
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err };
    }
  }

  async function login(loginData, rememberMe) {
    try {
      let token = await DeadEyeLaserWorksApi.login(loginData);
      if (rememberMe) {
        isRememberMe = true;
        setToken(token);
      } else {
        setToken(token);
      }

      let { username } = jwtDecode(token);
      let currentUser = await DeadEyeLaserWorksApi.getCurrentUser(username);
      setCurrentUser(currentUser);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, services, setServices }}
      >
        <Navigation logout={logout} />
        {currentUser && !currentUser.isVerified && (
          <VerificationAlert currentUser={currentUser} />
        )}
        <div
          className={`App ${isHomepage ? "bg-light" : ""} border border-0`}
          style={!isHomepage ? { backgroundColor: "grey" } : {}}
        >
          <AppRoutes
            login={login}
            signup={signup}
            setIsHomepage={setIsHomepage}
          />
        </div>
        <FooterApp />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
