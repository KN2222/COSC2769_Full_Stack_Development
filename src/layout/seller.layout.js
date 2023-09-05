import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../components/footer';
import { useEffect } from 'react';
import { useGetSellerByID } from '../api/getSellerByID';
import { useAuth } from '../store/authContext';

export const SellerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useGetSellerByID();
  const { getAuthenticatedUserInfo } = useAuth();
  const userInfo = getAuthenticatedUserInfo();

  useEffect(() => {
    if (userInfo.role.slice(1, -1) === 'seller') {
      if (
        location.pathname.includes('/seller') &&
        (status === 'Pending' || status === 'Rejected')
      ) {
        navigate('/seller/status');
        console.log('status', status);
        console.log('location', location.pathname);
      }
    } else {
      navigate('/');
    }
  }, [status, location.pathname, navigate, userInfo.role]);

  return (
    <div className='vw-100'>
      <Outlet />
      <Footer />
    </div>
  );
};
