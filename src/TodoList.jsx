import TodoListItem from "./TodoListItem.jsx";

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

export default TodoList;
