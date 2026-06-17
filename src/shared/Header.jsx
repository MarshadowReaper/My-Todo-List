function Header({ token, onSetToken, onSetEmail }) {
  function handleLogOut() {
    onSetToken("");
    onSetEmail("");
  }

  return (
    <header className="site-header">
      <h1>Todo List</h1>

      {token && <button onClick={handleLogOut}>Log Out</button>}
    </header>
  );
}

export default Header;
