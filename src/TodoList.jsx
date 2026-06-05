import TodoListItem from "./TodoListItem.jsx";

function TodoList({ todoList, onCompleteTodo }) {
  const clear = todoList.length === 0;

  return (
    <>
      {clear ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <TodoListItem
              todo={todo}
              key={todo.id}
              onCompleteTodo={onCompleteTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
//testing
