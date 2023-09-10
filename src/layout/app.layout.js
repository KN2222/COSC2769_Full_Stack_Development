import { HomeNav } from '../components/navbar/HomeNav';
import { SellerNavbar } from '../components/navbar/SellerNav';
import { AdminNavbar } from '../components/navbar/AdminNav';
import { Footer } from '../components/footer';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import { useEffect, useState } from 'react';
import { HomeBanner } from '../components/banner/HomeBanner';

export const AppLayout = () => {
  const { isUserAuthenticated, getAuthenticatedUserInfo } = useAuth();
  const isAuthenticated = isUserAuthenticated();
  const userInfo = getAuthenticatedUserInfo();

  const [navbarComponent, setNavbarComponent] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setNavbarComponent(<HomeNav />);
    } else {
      const userRole = userInfo.role.slice(1, -1);

      switch (userRole) {
        case 'customer':
          setNavbarComponent(<HomeNav />);
          break;
        case 'seller':
          setNavbarComponent(<SellerNavbar />);
          break;
        case 'admin':
          setNavbarComponent(<AdminNavbar />);
          break;
        default:
          setNavbarComponent(<HomeNav />);
      }
    }
  }, []);

  return (
    <div className='vw-100 mt-0'>
      <HomeBanner/>
      {navbarComponent}
      <Outlet />
      <Footer />
    </div>
  );
};
