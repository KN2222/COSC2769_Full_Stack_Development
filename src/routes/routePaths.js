import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminNavbar } from "../components/navbar/AdminNav";
import { AdminLayout } from "../layout/admin.layout";
import { AdminHomePage } from "../pages/admin/home";

export const routePaths = {
  public: [
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
  ],

  privateAdmin: [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/home",
          element: <AdminHomePage/>
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
