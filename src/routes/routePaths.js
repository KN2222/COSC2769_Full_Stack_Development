import { CategoryNav } from "../layout/CategoryNav";

export const routePaths = {
  public: [
    {
      path: "/", element: <div>This is home store page</div>
    },
    {
      path: "/category", element: <CategoryNav />
    },
    
    {
      path: "/login", element: <div>This is login page</div>
    },
    {
      path: "/signup", element: <div>This is register page</div>
    },
  ],
  private: [
    {
      path: "/admin", element: <div>This is admin page</div>
    },
    {
      path: "/admin/profile", element: <div>This is admin profile page</div>
    },
    {
      path: "/admin/category", element: <div>This is admin category page</div>
    },
    {
      path: "/admin/category/:id", element: <div>This is admin category detail page</div>
    },
    {
      path: "/admin/seller", element: <div>This is admin seller page</div>
    },
    {
      path: "/admin/seller/:id", element: <div>This is admin seller detail page</div>
    },

    {
      path: "/customer/profile", element: <div>This is store profile page</div>
    }

  ]
}