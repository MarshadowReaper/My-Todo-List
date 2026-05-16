import TodoForm from "./TodoForm";
import TodoList from "./TodoList/TodoList";
import { useState, useEffect } from "react";
function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  const fetchTodos = async () => {
    setIsTodoListLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        headers: {
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
      });

      if (response.status === 401) {
        throw new Error("unauthorized");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();

      setTodoList(data.tasks);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsTodoListLoading(false);
    }
  };
  async function addTodo(todoTitle) {
    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((previous) => [tempTodo, ...previous]);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const data = await response.json();

      setTodoList((prev) =>
        prev.map((todo) => (todo.id === tempTodo.id ? data : todo)),
      );
    } catch (error) {
      setTodoList((prev) => prev.filter((todo) => todo.id !== tempTodo.id));

      setError(error.message);
    }
  }

  async function completeTodo(id) {
    const updatedList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      } else {
        return todo;
      }
    });
    setTodoList(updatedList);

    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": token,
      },
      credentials: "include",
      body: JSON.stringify({
        isCompleted: true,
      }),
    });
  }
  const updateTodo = async (editedTodo) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });

    setTodoList(updatedTodos);
    await fetch(`/api/tasks/${editedTodo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": token,
      },
      credentials: "include",
      body: JSON.stringify({
        title: editedTodo.title,
        isCompleted: editedTodo.isCompleted,
      }),
    });
  };
  useEffect(() => {
    if (!token) return;

    fetchTodos();
  }, [token]);

  return (
    <>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </>
  );
}

export default TodosPage;
