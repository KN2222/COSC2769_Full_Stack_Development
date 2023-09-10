import { HomeNav } from '../components/navbar/HomeNav';
import { Footer } from '../components/footer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../store/authContext';
import { HomeBanner } from '../components/banner/HomeBanner';
export const CustomerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAuthenticatedUserInfo } = useAuth();
  const userInfo = getAuthenticatedUserInfo();

  useEffect(() => {
    if (userInfo.role.slice(1, -1) === 'customer') {
      if (location.pathname === '/customer') {
      }
    } else if (userInfo.role.slice(1, -1) === 'seller') {
      navigate('/seller/home');
    } else if (userInfo.role.slice(1, -1) === 'admin') {
      navigate('/admin/home');
    }
  }, [navigate, location, userInfo.role]);

  return (
    <div className='vw-100'>
      <HomeBanner/>
      <HomeNav />
      <Outlet />
      <Footer />
    </div>
  );
};
