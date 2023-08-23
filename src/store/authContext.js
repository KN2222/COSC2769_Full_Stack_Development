import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { APIService } from "../axios/client";
import { useCookies } from "react-cookie";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["sb"]);

  const [accessToken, setAccessToken] = useState('HI');

  useEffect(() => {
    console.log("accessToken", accessToken);
  }, [accessToken]);

  const setToken = useCallback(
    (token) => {
      setCookie("sb", token, { path: "/" });
      setAccessToken(token);
    },
    [setCookie]
  );


  useEffect(() => {
    if (cookies.sb) {
      console.log("cookies.sb", cookies.sb);
      const token = cookies.sb;
      APIService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("APIService.defaults.headers.common", APIService.defaults.headers.common);
      setAccessToken(token);
    } else {
      delete APIService.defaults.headers.common["Authorization"];
      removeCookie("sb");
      setAccessToken(null);
    }
  }, [cookies, removeCookie]);

  const sb = useMemo(
    () => ({
      accessToken,
      setToken,
    }),
    [accessToken, setToken]
  );

  
  return <AuthContext.Provider value={sb}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};