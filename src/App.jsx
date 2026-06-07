import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList.jsx";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  //This is matching assignment 5's requirements

  function addTodo(todoTitle) {
    const toDo = { id: Date.now(), title: todoTitle, isCompleted: false };

    setTodoList((previous) => [toDo, ...previous]);
  }
  function completeTodo(id) {
    const updatedList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      } else {
        return todo;
      }
    });
    setTodoList(updatedList);
  }

  return (
    <div>
      <h1> My Todos </h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}
//<TodoList todoList={todoList} /> This is managing and passing data down to children
export default App;

//Programmer's note: I had a LOT of troubleshooting to do with this one so figured to help understand the lesson better I should label what role the codes are playing
