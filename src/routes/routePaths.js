import { ProtectedRoute } from '../components/ProtectedRoute';
import { AdminLayout } from '../layout/admin.layout';
import { AdminHomePage } from '../pages/admin/home';
import { AdminSellerPage } from '../pages/admin/seller';
import Home from '../pages/customer/home';
import { CustomerLayout } from '../layout/customer.layout';
import { AdminCategoryPage } from '../pages/admin/category';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import ProductDetail from '../components/productDetail/ProductDetail';
import { AdminProfile } from '../pages/admin/profile';
import CheckOut from '../pages/customer/checkout';
import Profile from '../pages/customer/profile';
import OrderManagement from '../pages/customer/orderManagement';
import { AppLayout } from '../layout/app.layout';
import { SellerLayout } from '../layout/seller.layout';
import CustomerProfile from '../pages/customer/profile';
import Status from '../pages/seller/status';
import SellerProfile from '../pages/seller/profile';
import SellerHome from '../pages/seller/home';
import SellerOrder from '../pages/seller/order';

export const routePaths = {
  public: [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          //TODO fetch data
          path: '/category',
          element: <div>This is category page</div>,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
        {
          path: '/checkout',
          element: <CheckOut />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/product/:productId',
          element: <ProductDetail />,
        },
      ],
    },
    {
      path: '*',
      element: <></>,
      children: [],
    },
  ],

  privateCustomer: [
    {
      path: '/customer',
      element: <CustomerLayout />,
      children: [
        {
          path: '/customer/profile',
          element: <CustomerProfile />,
        },
        {
          path: '/customer/product-order',
          element: <OrderManagement />,
        },
      ],
    },
  ],

  privateAdmin: [
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: '/admin/home',
          element: <AdminHomePage />,
        },
        {
          path: '/admin/seller',
          element: <AdminSellerPage />,
        },
        {
          path: '/admin/category',
          element: <AdminCategoryPage />,
        },
        {
          path: '/admin/profile',
          element: <AdminProfile />,
        },
      ],
    },
  ],

  privateSeller: [
    {
      path: '/seller',
      element: <SellerLayout />,
      children: [
        {
          path: '/seller/status',
          element: <Status />,
        },
        {
          path: '/seller/home',
          element: <SellerHome />,
        },
        {
          path: '/seller/profile',
          element: <SellerProfile />,
        },
        { 
          path: '/seller/order', 
          element: <SellerOrder />
        }
      ],
    },
  ],
};
