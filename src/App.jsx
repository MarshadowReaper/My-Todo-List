import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./components/RequireAuth";
import Header from "./shared/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/todos"
          element={
            <RequireAuth>
              <TodosPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
<<<<<<< HEAD
=======
=======
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
>>>>>>> origin/main
>>>>>>> 99d300ae37c1842168a019b80a90a927fefa6071
  );
}

export default App;
