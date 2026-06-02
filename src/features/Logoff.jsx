import { useAuth } from "../context/AuthContext.jsx";

function Logoff() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return <button onClick={handleLogout}>Log Off</button>;
}

export default Logoff;
