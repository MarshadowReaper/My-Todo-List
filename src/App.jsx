import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList.jsx";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState(todos);
  //This is how to create a state
  return (
    <div>
      <h1> My Todos </h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  );
}
//<TodoList todoList={todoList} /> This is managing and passing data down to children
export default App;

//Programmer's note: I had a LOT of troubleshooting to do with this one so figured to help understand the lesson better I should label what role the codes are playing
