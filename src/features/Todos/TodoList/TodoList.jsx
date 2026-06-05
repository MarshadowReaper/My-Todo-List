import TodoListItem from "./TodoListItem.jsx";
import { useMemo } from "react";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, dataVersion }) {
  const activeTodos = useMemo(() => {
    return todoList.filter((todo) => !todo.isCompleted);
  }, [todoList, dataVersion]);

  const isEmptyApp = todoList.length === 0;
  const isNoResults = todoList.length > 0 && activeTodos.length === 0;

  if (isEmptyApp) {
    return <p>Add todo above to get started</p>;
  }

  return (
    <ul>
      {isNoResults && <p>No matching todos found.</p>}

      {activeTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
