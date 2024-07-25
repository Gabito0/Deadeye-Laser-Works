import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** UserRoute component
 *
 * A route protection component that ensures only authenticated users can access certain routes.
 */

const UserRoute = () => {
  const { currentUser } = useContext(UserContext);

  // console.debug("UserRoute", "currentUser=", currentUser);

  if (!currentUser) {
    return <Navigate to={"/homepage"} />;
  }
  return <Outlet />;
};

export default UserRoute;
