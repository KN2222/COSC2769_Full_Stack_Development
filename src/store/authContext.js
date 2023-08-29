import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { APIService } from '../axios/client';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode'; // Import jwt_decode library for decoding tokens

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['sb']);
  const [accessToken, setAccessToken] = useState("default"); 
  // Decode the token and save the decoded object into local storage

  useEffect(() => {
    console.log('accessToken', accessToken);
    console.log(localStorage.decodedToken);
  }, [accessToken]);

  const setToken = useCallback(
    (token) => {
      setCookie('sb', token, { path: '/' });
      setAccessToken(token);

      // Decode the token and save the decoded object into local storage
      const decodedToken = jwt_decode(token);
      localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
    },
    [setCookie]
  );

  useEffect(() => {
    if (cookies.sb) {
      console.log('cookies.sb', cookies.sb);
      const token = cookies.sb;
      APIService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAccessToken(token);
    } else {
      delete APIService.defaults.headers.common['Authorization'];
      removeCookie('sb');
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
