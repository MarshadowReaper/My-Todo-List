<<<<<<< HEAD
=======
import TodoForm from "./features/TodoForm.jsx";
import TodoList from "./features/TodoList/TodoList.jsx";
>>>>>>> origin/main
import { useState } from "react";
import Header from "./shared/Header.jsx";
import Logon from "./features/Logon.jsx";
import TodosPage from "./features/Todos/TodosPage.jsx";

function App() {
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

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
=======
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
      <h1> My Todos </h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
>>>>>>> origin/main
    </div>
  );
}
//<TodoList todoList={todoList} /> This is managing and passing data down to children
export default App;
