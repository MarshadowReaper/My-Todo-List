import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router";
function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
  };
  if (result.success) {
  navigate("/login");
}
  return <button onClick={handleLogout}>Log Off</button>;
}

export default Logoff;
