import Header from "./shared/Header.jsx";
import Logon from "./features/Logon.jsx";
import TodosPage from "./features/Todos/TodoList/TodosPage.jsx";

import { useAuth } from "./context/AuthContext.jsx";

//This is holding the data
function App() {
  const { token } = useAuth();

  return (
    <div>
      <Header />
      {token ? <TodosPage /> : <Logon />}
    </div>
  );
}

export default App;

//Programmer's note: I had a LOT of troubleshooting to do with this one so figured to help understand the lesson better I should label what role the codes are playing
