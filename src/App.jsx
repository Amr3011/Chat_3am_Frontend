import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Register from "./pages/auth/Register.jsx";
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";
import Login from "./pages/auth/Login.jsx";
import { Outlet, Route, Routes } from "react-router-dom";
import NotFound from "./components/common/NotFound.jsx";
import SideBar from "./components/common/SideBar";
import FAQs from "./pages/FAQs";
import Notification from "./pages/Notification.jsx";
import UserInfo from "./pages/user/UserInfo";
import ProtectedRoute from "./components/guard/ProtectedRoute.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import { useSelector } from "react-redux";

export default function App() {
  const isDark = useSelector((state) => state.theme.darkMode);
  return (
    <main>
      {isDark ? <ToastContainer theme="dark" /> : <ToastContainer />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SideBar>
                <Outlet />
              </SideBar>
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<h1>home page</h1>} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
