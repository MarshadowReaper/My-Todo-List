import TodoForm from "./features/TodoForm.jsx";
import TodoList from "./features/TodoList/TodoList.jsx";
import { useState } from "react";
import Header from "./shared/Header.jsx";
import Logon from "./features/Logon.jsx";
import TodosPage from "./features/Todos/TodosPage.jsx";

//This is holding the data
function App() {
  const [todoList, setTodoList] = useState([]);
  //This is how to create a state
  function addTodo(todoTitle) {
    const newTodo = { id: Date.now(), title: todoTitle };

    setTodoList((previous) => [newTodo, ...previous]);
  }
  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });

    setTodoList(updatedTodos);
  };

  return (
    <div>
      <Header
        email={email}
        token={token}
        onSetEmail={setEmail}
        onSetToken={setToken}
      />

      {token ? (
        <TodosPage token={token} />
      ) : (
        <Logon onSetEmail={setEmail} onSetToken={setToken} />
      )}

    </div>
  );
}

export default App;
