import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** AdminRoute component
 *
 * This component is used to protect routes that should only be accessible to users with administrative privileges.
 *
 */

const AdminRoute = () => {
  const { currentUser } = useContext(UserContext);

  // console.debug("AdminRoute", "currentUser", currentUser);

  if (!currentUser || currentUser.status !== "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AdminRoute;
