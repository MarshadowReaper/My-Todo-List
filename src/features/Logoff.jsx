import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router";
function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();
 const handleLogout = async () => {
  const result = await logout();

  if (result.success) {
    navigate("/login");
  } else {
   
  }
};
  return <button onClick={handleLogout}>Log Off</button>;
}

export default Logoff;
