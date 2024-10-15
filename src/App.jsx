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
// import ProtectedRoute from "./components/guard/ProtectedRoute.jsx";
import Settings from "./pages/Setting.jsx";
import PrivateChat from "./components/chat/PrivateChat.jsx";
import GroupChat from "./components/chat/GroupChat.jsx";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <SideBar>
              <Outlet />
            </SideBar>
            // </ProtectedRoute>
          }
        >
          <Route path="/" element={<h1>home page</h1>} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/privatechat" element={<PrivateChat />} />
          <Route path="/groupchat" element={<GroupChat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
