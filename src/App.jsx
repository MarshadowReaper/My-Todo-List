import Header from "./shared/Header.jsx";
import Logon from "./features/Logon.jsx";
import TodosPage from "./features/Todos/TodosPage.jsx";
import { useState } from "react";
const todos = [
  { id: 1, title: "review resources" },
  { id: 2, title: "take notes" },
  { id: 3, title: "code out app" },
  { id: 4, title: "take quizes" },
];
function App() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState();
  //This is how to create a state

  return (
    <div>
      <Header />
      {token ? (
        <TodosPage token={token} />
      ) : (
        <Logon onSetEmail={setEmail} onSetToken={setToken} />
      )}
    </div>
  );
}
//<TodoList todoList={todoList} /> This is managing and passing data down to children
export default App;

//Programmer's note: I had a LOT of troubleshooting to do with this one so figured to help understand the lesson better I should label what role the codes are playing
