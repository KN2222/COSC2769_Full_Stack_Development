import { ProtectedRoute } from '../components/ProtectedRoute';
import Login from '../layout/auth/Login';
import SignUp from '../layout/auth/SignUp';
export const routePaths = {
  public: [
    {
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
  ],
  privateAdmin: [
    {
      path: '/admin',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/admin/profile',
          element: <div>This is admin profile page</div>,
        },
        {
          path: '/admin/category',
          element: <div>This is admin category page</div>,
        },
        {
          path: '/admin/category/:id',
          element: <div>This is admin category detail page</div>,
        },
        {
          path: '/admin/seller',
          element: <div>This is admin seller page</div>,
        },
        {
          path: '/admin/seller/:id',
          element: <div>This is admin seller detail page</div>,
        },
      ],
    },
  ],

  privateSeller: [
    {
      path: '/seller',
      element: <ProtectedRoute />,
      children: [],
    },
  ],
};
