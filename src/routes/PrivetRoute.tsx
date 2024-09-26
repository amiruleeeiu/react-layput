import React from "react";

interface PrivateRouteProps {
  roles: string[];
  children: React.ReactNode;
}

const PrivateRoute = ({ roles: allowedRoles, children }: PrivateRouteProps) => {
  const userRole = "admin";

  if (allowedRoles.includes(userRole)) {
    return children;
  }

  return (
    <div>
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default PrivateRoute;
