import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routePaths } from './routePaths';
import { useAuth } from '../store/authContext';
// import { ProtectedRoute } from '../components/ProtectedRoute';

export const PrivateRouter = () => {
  const { isUserAuthenticated, getAuthenticatedUserInfo } = useAuth();

  return (
    <Routes>
      {routePaths.privateAdmin.map((routeGroup, index) => {
        if (
          isUserAuthenticated() &&
          getAuthenticatedUserInfo().role === 'admin'
        ) {
          return (
            <Route
              key={index}
              path={routeGroup.path}
              element={routeGroup.element}
            >
              {/* {routeGroup.children.map((route, childIndex) => (
                <Route
                  key={childIndex}
                  path={route.path}
                  element={route.element}
                />
              ))} */}
            </Route>
          );
        } else {
          return null; // Hide the route group if the user is not an admin
        }
      })}

      {routePaths.privateSeller.map((routeGroup, index) => {
        if (
          isUserAuthenticated() &&
          getAuthenticatedUserInfo().role === 'seller'
        ) {
          return (
            <Route
              key={index}
              path={routeGroup.path}
              element={routeGroup.element}
            >
              {/* {routeGroup.children.map((route, childIndex) => (
                <Route
                  key={childIndex}
                  path={route.path}
                  element={route.element}
                />
              ))} */}
            </Route>
          );
        } else {
          return null; // Hide the route group if the user is not a seller
        }
      })}

      {routePaths.public.map((routeGroup, index) => (
        <Route
          key={index}
          path={routeGroup.path}
          element={routeGroup.element}
        >
          {/* {routeGroup.children.map((route, childIndex) => (
            <Route
              key={childIndex}
              path={route.path}
              element={route.element}
            />
          ))} */}
        </Route>
      ))}
    </Routes>
  );
};
