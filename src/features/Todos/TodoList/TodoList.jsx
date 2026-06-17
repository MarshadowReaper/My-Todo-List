import styles from "./TodoList.module.css";
import TodoListItem from "./TodoListItem.jsx";
import { useMemo } from "react";
function TodoList({
  todoList,
  statusFilter = "all",
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
}) {
  const filteredTodoList = useMemo(() => {
    let filteredTodos = todoList;

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
    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [todoList, statusFilter, dataVersion]);
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
        <ul className={styles.todoList}>
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
