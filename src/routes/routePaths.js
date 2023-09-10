// import { ProtectedRoute } from '../components/ProtectedRoute';
import { AdminLayout } from '../layout/admin.layout';
import { AdminHomePage } from '../pages/admin/home';
import { AdminSellerPage } from '../pages/admin/seller';
import Home from '../pages/customer/home';
import { CustomerLayout } from '../layout/customer.layout';
import { AdminCategoryPage } from '../pages/admin/category';
import Login from '../pages/login';
import SignUp from '../pages/signup';
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
import { SellerStatistic } from '../pages/seller/statistic';
import Category from '../pages/customer/category';
import NotFoundPageSeller from '../pages/errors/404Seller';
import NotFoundPageAdmin from '../pages/errors/404Admin';

export const routePaths = {
  public: [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/category/:categoryId',
          element: <Category />,
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
          path: '/',
          element: <Home />,
        },
        {
          path: '/product/:productId',
          element: <ProductDetail />,
        },
      ],
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
        {
          path: '*',
          element: <NotFoundPageAdmin />,
          children: [],
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
          element: <SellerOrder />,
        },
        {
          path: '/seller/statistic',
          element: <SellerStatistic />,
        },
        {
          path: '*',
          element: <NotFoundPageSeller />,
          children: [],
        },
      ],
    },
  ],
};
