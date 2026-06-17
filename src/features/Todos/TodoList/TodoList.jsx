import TodoListItem from "./TodoListItem.jsx";


function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter(
    (todo) => todo.isCompleted === false,
  );
  const clear = filteredTodoList.length === 0;




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
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;

