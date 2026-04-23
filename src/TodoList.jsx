import TodoListItem from "./TodoListItem.jsx";
const todos = [
  { id: 1, title: "review resources" },
  { id: 2, title: "take notes" },
  { id: 3, title: "code out app" },
  { id: 4, title: "take quizes" },
];
//This is holding the data
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

function TodoList() {
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
