import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ServiceList from "../services/ServiceList";
import ServiceDetail from "../services/ServiceDetail";
import AdminAddOrderForm from "../adminOrders/AdminAddOrderForm";
import AdminServiceList from "../adminService/AdminServiceList";
import OrderList from "../adminOrders/AdminOrderList";
import UserOrderList from "../user/UserOrderList";
import UserProfile from "../user/UserProfile";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoutes";
import EmailVerificationRoute from "../routes-nav/EmailVerificationRoute";

/** AppRoutes component
 *
 * Manages routing for the application.
 * - Updates homepage state based on the current route.
 * - Defines routes for different user roles and features.
 * - Redirects unknown paths to the homepage.
 *
 * Routes:
 * - /: Homepage
 * - /login: Login form
 * - /signup: Signup form
 * - /services: Service list
 * - /services/:serviceId: Service detail view
 * - /services/:serviceId/add-user-service: Add order form for admins
 * - /admin: Admin routes (services and orders management)
 * - /user: User routes (orders and profile management)
 * - /email-verification/:token: Email verification route
 * - *: Redirects to homepage for unknown paths
 */

const AppRoutes = ({ login, signup, setIsHomepage }) => {
  const location = useLocation();

  useEffect(() => {
    // console.debug("changingLocations", location);
    setIsHomepage(location.pathname === "/");
  }, [location, setIsHomepage]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route
          path="/services/:serviceId/add-user-service"
          element={<AdminAddOrderForm />}
        />
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="services" element={<AdminServiceList />} />
          <Route path="orders" element={<OrderList />} />
        </Route>
        <Route path="/user" element={<UserRoute />}>
          <Route path="orders" element={<UserOrderList />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route
          path="/email-verification/:token"
          element={<EmailVerificationRoute />}
        />
        {/* Redirect unknown paths to homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
