import { Card, Container } from 'react-bootstrap';
import { AdminNavbar } from '../components/navbar/AdminNav';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../components/footer';
import { useEffect } from 'react';
import { useAuth } from '../store/authContext';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAuthenticatedUserInfo } = useAuth();
  const userInfo = getAuthenticatedUserInfo();

  useEffect(() => {
    if (
      location.pathname === '/admin' &&
      userInfo.role.slice(1, -1) === 'admin'
    ) {
      navigate('/admin/home');
    } else {
      navigate('/');
    }
  }, [navigate, location, userInfo.role]);

  return (
    <div className='vw-100'>
      <AdminNavbar />
      <Container className='mb-2'>
        <Card
          bg={'dark'}
          text={'light'}
        >
          <Card.Img
            variant='top'
            src='/large-warehouse-with-bright-light-coming-through-door_123827-23506.png'
            style={{ width: '100%', height: '18rem' }}
          />
          <Card.Body style={{ textAlign: 'center' }}>
            <Card.Title>Warehouse</Card.Title>
          </Card.Body>
        </Card>
      </Container>
      <Outlet />
      <Footer />
    </div>
  );
};
