import { HomeNav } from '../components/navbar/HomeNav';
import { SellerNavbar } from '../components/navbar/SellerNav';
import { AdminNavbar } from '../components/navbar/AdminNav';
import { Footer } from '../components/footer';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import { useEffect, useRef } from 'react';

export const AppLayout = () => {
  const { isUserAuthenticated, getAuthenticatedUserInfo } = useAuth();
  const isAuthenticated = isUserAuthenticated();
  const userInfo = getAuthenticatedUserInfo();

  const navbarRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navbarRef.current = <HomeNav />;
    } else {
      const userRole = userInfo.role.slice(1, -1);

      switch (userRole) {
        case 'customer':
          navbarRef.current = <HomeNav />;
          break;
        case 'seller':
          navbarRef.current = <SellerNavbar />;
          break;
        case 'admin':
          navbarRef.current = <AdminNavbar />;
          break;
        default:
          navbarRef.current = <HomeNav />;
      }
    }
  }, [isAuthenticated, userInfo]);

  return (
    <div className='vw-100'>
      {navbarRef.current}
      <Outlet />
      <Footer />
    </div>
  );
};
