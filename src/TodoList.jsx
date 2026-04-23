<<<<<<< HEAD
import TodoListItem from "./TodoListItem.jsx";
function TodoList({ todoList }) {
  // recieves data
=======

import TodoListItem from "./TodoListItem.jsx";
function TodoList({ todoList }) {
  // recieves data
  return (
    <ul>
      {todoList.map((todo) => (
        // Will loop through the data
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </ul>
    //(<TodoListItem todo={todo} key={todo.id}/>)))} Is how the data gets Rendered
  );
}


const todoList = [
  { id: 1, title: "review resources" },
  { id: 2, title: "take notes" },
  { id: 3, title: "code out app" },
  { id: 4, title: "take quizes" },
];
function TodoList() {
>>>>>>> 50e9d9faa8e78db1fcf146434eeb4206c8e27f56
  return (
    <ul>
      {todoList.map((todo) => (
        // Will loop through the data
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </ul>
    //(<TodoListItem todo={todo} key={todo.id}/>)))} Is how the data gets Rendered
  );
}

export default TodoList;
