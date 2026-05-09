function TodoListItem({ todo, onCompleteTodo }) {
  //This Recieves one item
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onCompleteTodo(todo.id)}
      />

      {todo.title}
    </li>

    // and this is how it gets displayed
  );
}
export default TodoListItem;
