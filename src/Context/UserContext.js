import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserAPI from "../API/UserAPI";
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const location = window.location.pathname;
  const defaultUser = { isLoading: true, isAuthenticated: false, token: "", account: {} };
  const [user, setUser] = useState(defaultUser);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...defaultUser, isLoading: false });
  };

  const fetchUser = async () => {
    let response = await UserAPI.getAccount();
    if (response && response.EC === 0) {
      let roleUser = response.DT.role;
      let id = response.DT.id_User;
      let fullName = response.DT.fullName;
      let token = response.DT.access_token;
      let data = {
        isAuthenticated: true,
        token,
        account: { roleUser, id, fullName },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...defaultUser, isLoading: false });
    }
    console.log(user);
  };
  useEffect(() => {
    if (location !== "/login") {
      fetchUser();
    } else {
      setUser({ user, isLoading: false });
    }
  }, []);

  return <UserContext.Provider value={{ user, loginContext, logoutContext }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
