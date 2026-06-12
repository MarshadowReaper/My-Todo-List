import TodoListItem from "./TodoListItem.jsx";
import { useMemo } from "react";
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, dataVersion }) {
  const filteredTodoList = useMemo(() => {
    const activeTodos = todoList.filter((todo) => !todo.isCompleted);
    const isNoTodosAtAll = todoList.length === 0;
    const isNoActiveTodos = todoList.length > 0 && activeTodos.length === 0;
    let filteredTodos;

switch (statusFilter) {
  case "completed":
    filteredTodos = todoList.filter((todo) => todo.isCompleted);
    break;

  case "active":
    filteredTodos = todoList.filter((todo) => !todo.isCompleted);
    break;

  case "all":
  default:
    filteredTodos = todoList;
}
  return  {
  version: dataVersion,
  todos: filteredTodos,
}
    return {
      version: dataVersion,
      todos: activeTodos,
    };
  }, [todoList, dataVersion]);
  const clear = filteredTodoList.todos.length === 0;
const getEmptyMessage = () => {
  switch (statusFilter) {
    case "completed":
      return "No completed todos yet. Complete some tasks to see them here.";

    case "active":
      return "No active todos. Add a todo above to get started.";

    case "all":
    default:
      return "Add todo above to get started.";
  }
};
  return (
    <>
      {clear ? (
        <p>{getEmptyMessage()}</p>
      ) : (
        <ul>
          {filteredTodoList.todos.length === 0 && (
            <p>No matching todos found.</p>
          )}
          {filteredTodoList.todos.map((todo) => (
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
