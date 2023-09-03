import { Outlet } from 'react-router-dom';
import { HomeNav } from '../components/navbar/HomeNav';
import { Footer } from '../components/footer';

export const CustomerLayout = () => {
  return (
    <div className='vw-100 d-flex flex-column justify-content-between'>
      <HomeNav />
      <Outlet />
      <Footer />
    </div>
  );
};
