import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login.jsx";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/common/Loading.jsx";
import Register from "./pages/Register.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ToastContainer />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyEmail />} />
          </Routes>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
