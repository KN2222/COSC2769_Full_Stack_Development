import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../components/footer';
import { useEffect } from 'react';
import { useGetSellerByID } from '../api/getSellerByID';
import { useAuth } from '../store/authContext';
import { SellerNavbar } from '../components/navbar/SellerNav';

export const SellerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useGetSellerByID();
  const { getAuthenticatedUserInfo } = useAuth();
  const userInfo = getAuthenticatedUserInfo();

  useEffect(() => {
    if (!userInfo) return navigate('/');
    if (
      location.pathname.includes('/seller') &&
      userInfo.role.slice(1, -1) === 'seller'
    ) {
      if (status === 'Pending' || status === 'Rejected') {
        navigate('/seller/status');
      } else {
        navigate(location.pathname);
      }
    } else {
      navigate('/');
    }
  }, [status, location.pathname, navigate]);

  return (
    <div className='vw-100'>
      <SellerNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};
