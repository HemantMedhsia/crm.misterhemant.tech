import React from "react";
import { useAuth } from "../../context/AuthProvider.jsx";
import { Navigate } from "react-router-dom";

const RoleBasedAccess = ({ allowedRoles, children }) => {
  const { userRole, authToken } = useAuth();

  if (!authToken) {
    return window.location.href = `${import.meta.env.VITE_HOME_REDIRECT_URL}`;
  }

  if (allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }

  return <div>You do not have permission to view this content.</div>;
};

export default RoleBasedAccess;
