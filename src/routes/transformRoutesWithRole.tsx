import NotFound from "../pages/NotFound";
import PrivetRoute from "./PrivetRoute";

export interface RouteWithRole {
  path: string;
  element: React.ReactNode;
  roles?: string[];
}

export const transformRoutesWithRole = (routes: RouteWithRole[]) => {
  const authenticated = true;

  const filteredRoutes = routes.filter((route) =>
    authenticated ? !!route.roles : !route.roles
  );

  const notFoundRoute = {
    path: "*",
    element: <NotFound />,
  };

  const transformedRoutes = filteredRoutes.map((route) => {
    if (route.roles) {
      return {
        ...route,
        element: <PrivetRoute roles={route.roles}>{route.element}</PrivetRoute>,
      };
    }

    return route;
  });

  return [...transformedRoutes, notFoundRoute];
};
