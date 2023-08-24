import { Route, Routes } from "react-router-dom";
import { routePaths } from "./routePaths";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminHomePage } from "../pages/admin/home";

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={<ProtectedRoute />}>
        {routePaths.privateAdmin.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children.map((child, index) => (
              <Route key={index} path={child.path} element={child.element} />
            ))}
          </Route>
        ))}
      </Route>

      {routePaths.privateSeller.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children.map((child, index) => (
            <Route key={index} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  );
};