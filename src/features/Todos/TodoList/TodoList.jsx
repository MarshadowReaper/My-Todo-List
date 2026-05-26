import TodoListItem from "./TodoListItem.jsx";
import { useMemo } from "react";
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, dataVersion }) {
  const filteredTodoList = useMemo(() => {
    console.log(`Recalculating filtered todos (v${dataVersion})`);

    return todoList.filter((todo) => !todo.isCompleted);
  }, [todoList, dataVersion]);
  const clear = filteredTodoList.todos.length === 0;

  return (
    <>
      {clear ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
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
