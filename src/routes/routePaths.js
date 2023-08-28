import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminLayout } from "../layout/admin.layout";
import { AdminHomePage } from "../pages/admin/home";
import { AdminSellerPage } from "../pages/admin/seller";
import Home from "../pages/customer/home";
import { CustomerLayout } from "../layout/customer.layout";

export const routePaths = {
  public: [
    {
      path: "/",
      element: <CustomerLayout/>,
      children: [
        {
          path: "/category",
          element: <div>This is category page</div>,
        },

        {
          path: "/login",
          element: <div>This is login page</div>,
        },
        {
          path: "/signup",
          element: <div>This is register page</div>,
        },
        {
          path: "/",
          element: <Home />,
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
