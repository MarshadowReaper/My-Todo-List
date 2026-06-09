import TodoListItem from "./TodoListItem.jsx";
<<<<<<< HEAD

<<<<<<<< HEAD:src/features/Todos/TodoList/TodoList.jsx
function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter(
    (todo) => todo.isCompleted === false,
  );
  const clear = filteredTodoList.length === 0;
========
function TodoList({ todoList, onCompleteTodo }) {
  const clear = todoList.length === 0;
>>>>>>>> main:src/TodoList.jsx

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
=======
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
>>>>>>> main
  );
}

export default TodoList;
<<<<<<< HEAD
//testing
=======
>>>>>>> main
