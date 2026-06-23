import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  return children;
}

export default RequireAuth;
