import { Routes, Route } from 'react-router-dom';
import { routePaths } from './routePaths';
import { useCategoryTree } from '../api/getCategoryTree';
import { useEffect, useState } from 'react';

const PublicRouter = () => {
  const { categoryTree } = useCategoryTree();
  const [categoryRoutes, setCategoryRoutes] = useState(null);

  useEffect(() => {
    if (categoryTree) {
      setCategoryRoutes(mapToCategoryRoutes(categoryTree));
    }
    return () => {};
  }, [categoryTree]);

  const mapToCategoryRoutes = (categoryTree) => {
    let categories = [];
    const traverse = (node) => {
      for (const key in node) {
        categories.push({
          name: key,
          id: node[key]._id,
          subCategories: node[key].subCategories,
        });
        traverse(node[key].subCategories);
      }
    };
    traverse(categoryTree);
    return categories;
  };

  return (
    <Routes>
      {routePaths.public.map((route, index) => (
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

      {categoryRoutes &&
        categoryRoutes.map((category, index) => {
          const { name, id } = category;
          return (
            <Route
              key={index}
              path={`/category/${name}`}
              element={<h1>{name + ' ' + id}</h1>}
            />
          );
        })}
    </Routes>
  );
};
export default PublicRouter;
