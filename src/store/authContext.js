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
import { GetUserAvatar } from '../api/getUserAvatar';
import GetCart from '../api/getCart';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['sb']);
  const [accessToken, setAccessToken] = useState('default');
  // Decode the token and save the decoded object into local storage

  useEffect(() => {
    const decodedData = decodeAndStoreTokenData(accessToken);
  }, [accessToken]);

  const decodeAndStoreTokenData = (token) => {
    try {
      const decodedToken = jwt_decode(token);

      // Store the decoded token data in local storage
      for (const key in decodedToken) {
        localStorage.setItem(key, JSON.stringify(decodedToken[key]));
      }

      return decodedToken;
    } catch (error) {
      // console.error('Error decoding and storing token data:', error);
      return null;
    }
  };

  function useLogout() {
    const [, , removeCookie] = useCookies(['sb']); // Import the useCookies hook and add sb to the dependencies
    return useCallback(() => {
      removeCookie('sb', { path: '/' });
      localStorage.removeItem('_id');
      localStorage.removeItem('role');
      localStorage.removeItem('iat');
      localStorage.removeItem('cart');
      return '/';
    }, [removeCookie]);
  }

  const Logout = useLogout();

  const isUserAuthenticated = useCallback(() => {
    const id = localStorage.getItem('_id');
    const role = localStorage.getItem('role');
    const iat = localStorage.getItem('iat');
    return id && role && iat; // Returns true if all of them exist, else false
  }, []);

  const getAuthenticatedUserInfo = useCallback(() => {
    if (isUserAuthenticated()) {
      const id = localStorage.getItem('_id');
      const role = localStorage.getItem('role');
      const iat = localStorage.getItem('iat');
      return { id, role, iat };
    }
    return null;
  }, [isUserAuthenticated]);

  // * How to use isUserAuthenticated and getAuthenticatedUserInfo
  // const { isUserAuthenticated, getAuthenticatedUserInfo } = useAuth();

  // if (isUserAuthenticated()) {
  //   const userInfo = getAuthenticatedUserInfo();
  //   console.log('User ID:', userInfo.id);
  //   console.log('User Role:', userInfo.role);
  //   console.log('Token Issued At:', userInfo.iat);
  // } else {
  //   console.log('User is not authenticated.');
  // }

  const { userAvatar, getUserAvatar } = GetUserAvatar();

  const getProfile = useCallback(async (role) => {
    try {
      const response = await APIService.get(`/${role}/profile`);
      if (response.status === 200) {
        const userProfile = response.data;
        return userProfile;
      } else {
        console.error('Failed to get user profile:', response.statusText);
        throw new Error('Failed to get user profile');
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }, []);

  const { cartData, isLoading } = GetCart();


  useEffect(() => {
    if (!isLoading) {
      const extractedCart = cartData.cart;
      if (extractedCart && extractedCart.cart) {
        localStorage.setItem('cart', JSON.stringify(extractedCart.cart));
      }
    }
  }, [cartData, isLoading]);

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
      isUserAuthenticated,
      getAuthenticatedUserInfo,
      Logout,
      userAvatar,
      getUserAvatar,
      getProfile,
    }),
    [
      accessToken,
      setToken,
      isUserAuthenticated,
      getAuthenticatedUserInfo,
      Logout,
      userAvatar,
      getUserAvatar,
      getProfile,
    ]
  );

  return <AuthContext.Provider value={sb}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
