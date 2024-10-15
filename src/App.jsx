import { ToastContainer } from "react-toastify";
import Register from "./pages/auth/Register.jsx";
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";
import Login from "./pages/auth/Login.jsx";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NotFound from "./components/common/NotFound.jsx";
import SideBar from "./components/common/SideBar";
import FAQs from "./pages/FAQs";
import Notification from "./pages/Notification.jsx";
import UserInfo from "./pages/user/UserInfo";
import ProtectedRoute from "./components/guard/ProtectedRoute.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import { useSelector } from "react-redux";
import PublicRoute from "./components/guard/PublicRoute.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";

export default function App() {
  const isDark = useSelector((state) => state.theme.darkMode);

  return (
    <main>
      {isDark ? <ToastContainer theme="dark" /> : <ToastContainer />}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Outlet />
            </PublicRoute>
          }
        >
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="verify" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:restToken" element={<ResetPassword />} />
          <Route path="/" element={<Navigate to="/register" replace />} />
        </Route>

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <SideBar>
                <Outlet />
              </SideBar>
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<h1>home page</h1>} />
          <Route path="FAQs" element={<FAQs />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="notifications" element={<Notification />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
