import { useAuth } from "../context/AuthContext.jsx";
import Logoff from "../features/Logoff.jsx";

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="site-header">
      <h1>Todo List</h1>

      {isAuthenticated && <Logoff />}
    </header>
  );
}

export default Header;
