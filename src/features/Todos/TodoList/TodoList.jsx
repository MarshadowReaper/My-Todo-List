import TodoListItem from "./TodoListItem.jsx";
import { useMemo } from "react";
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, dataVersion }) {
  const filteredTodoList = useMemo(() => {
    const activeTodos = todoList.filter((todo) => !todo.isCompleted);
    const isNoTodosAtAll = todoList.length === 0;
    const isNoActiveTodos = todoList.length > 0 && activeTodos.length === 0;
    return {
      version: dataVersion,
      todos: activeTodos,
    };
  }, [todoList, dataVersion]);
  const clear = filteredTodoList.todos.length === 0;

  return (
    <>
      {clear ? (
        <p>Add todo above to get started</p>
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
