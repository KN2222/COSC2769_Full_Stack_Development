import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminLayout } from "../layout/admin.layout";
import { AdminHomePage } from "../pages/admin/home";
import { AdminSellerPage } from "../pages/admin/seller";
import Home from "../pages/customer/home";
import { CustomerLayout } from "../layout/customer.layout";
import { AdminCategoryPage } from "../pages/admin/category";
import Login from "../layout/auth/Login";
import SignUp from "../layout/auth/SignUp";
import ProductDetail from "../components/productDetail/ProductDetail";
import { AdminProfile } from "../pages/admin/profile";

export const routePaths = {
  public: [
    {
      path: "/",
      element: <CustomerLayout />,
      children: [
        {
          path: "/category",
          element: <div>This is category page</div>,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product/:productID",
          element: <ProductDetail />,

        },
      ],
    },
  ],
  privateAdmin: [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/home",
          element: <AdminHomePage />,
        },
        {
          path: "/admin/seller",
          element: <AdminSellerPage />,
        },
        {
          path: "/admin/category",
          element: <AdminCategoryPage />,
        },
        {
          path: '/admin/profile',
          element: <AdminProfile/>,
        },
        {
          path: "/admin/category",
          element: <div>This is admin category page</div>,
        },
        {
          path: "/admin/category/:id",
          element: <div>This is admin category detail page</div>,
        },
        {
          path: "/admin/cv",
          element: <div>This is admin seller page</div>,
        },
        {
          path: "/admin/cv/:id",
          element: <div>This is admin seller detail page</div>,
        },
      ],
    },
  ],

  privateSeller: [
    {
      path: "/seller",
      element: <ProtectedRoute />,
      children: [],
    },
  ],
};
