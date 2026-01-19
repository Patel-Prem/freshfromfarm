// import React, { useState, useEffect } from "react";
// import { AuthContext } from "./Context"

// const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(() => {
//         return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
//     });

//     useEffect(() => {
//         // Persist isAuth to localStorage whenever it changes
//         localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
//     }, [isAuthenticated]);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }


// export default AuthProvider;

import { useState, useEffect } from 'react';
import { AuthContext } from './Context';
// import APIService from "../services/APIService";

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  // Get new access token from backend using refresh token cookie
  const refreshAccessToken = async () => {
    // try {
    //   const res = await APIService.refreshToken();
    //   console.log('res', res)
    //   setAccessToken(res.data.accessToken);
    //   return res.data.accessToken;
    // } catch (error) {
    //   console.error('Refresh failed:', error);
    //   setAccessToken(null);
    // }
  };

  // useEffect(() => {
  //   refreshAccessToken(); // refresh once on app load
  // }, [accessToken]);
  
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;