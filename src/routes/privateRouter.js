import { Route, Routes } from "react-router-dom"
import { routePaths } from "./routePaths"

export const PrivateRouter = () => {
  return (
    <Routes>
      {routePaths.privateAdmin.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children.map((child, index) => (
            <Route key={index} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
      
      {routePaths.privateSeller.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children.map((child, index) => (
            <Route key={index} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  )
}