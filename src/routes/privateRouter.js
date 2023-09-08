import { Route, Routes } from 'react-router-dom';
import { routePaths } from './routePaths';
import { ProtectedRoute } from '../components/ProtectedRoute';
import NotFoundPage from '../pages/errors/404';
export const PrivateRouter = () => {
  return (
    <Routes>
      <Route
        path='*'
        component={NotFoundPage}
      />
      <Route
        path='/customer'
        element={<ProtectedRoute />}
      >
        {routePaths.privateCustomer.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          >
            {route.children.map((child, index) => (
              <Route
                key={index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Route>
      <Route
        path='/admin'
        element={<ProtectedRoute />}
      >
        {routePaths.privateAdmin.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          >
            {route.children.map((child, index) => (
              <Route
                key={index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Route>

      <Route
        path='/seller'
        element={<ProtectedRoute />}
      >
        {routePaths.privateSeller.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          >
            {route.children.map((child, index) => (
              <Route
                key={index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Route>
    </Routes>
  );
};
