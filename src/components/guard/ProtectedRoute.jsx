import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.userInfo);
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
};
