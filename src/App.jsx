import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList.jsx";
import { useState } from "react";

//This is holding the data
//A small hello to the instructor this part was skipped by git
function App() {
  const [todoList, setTodoList] = useState([]);
  //This is how to create a state
  function addTodo(todoTitle) {
    const newTodo = { id: Date.now(), title: todoTitle };

    setTodoList((previous) => [newTodo, ...previous]);
  }

  return (
    <div>
      <h1> My Todos </h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}
//<TodoList todoList={todoList} /> This is managing and passing data down to children
export default App;
