import useDebounce from "../../../utils/useDebounce";
import SortBy from "../../../shared/SortBy";
import TodoForm from "../TodoForm";
import TodoList from "./TodoList";
import FilterInput from "../../../shared/FilterInput";
import { useState, useEffect, useCallback } from "react";
function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [filterError, setFilterError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [sortBy, setSortBy] = useState("creationDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterTerm, setFilterTerm] = useState("");
  const [dataVersion, setDataVersion] = useState(0);

  const invalidateCache = useCallback(() => {
    setDataVersion((prev) => prev + 1);
  }, []);
  const handleFilterChange = (newTerm) => {
    setFilterTerm(newTerm);
  };

  const debouncedFilterTerm = useDebounce(filterTerm, 300);
  const fetchTodos = async () => {
    setIsTodoListLoading(true);
    setError("");

    try {
      const paramsObject = {
        sortBy,
        sortDirection,
      };

      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm;
      }

      const params = new URLSearchParams(paramsObject);

      const response = await fetch(`/api/tasks?${params}`, {
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
      setFilterError("");
    } catch (error) {
      if (
        debouncedFilterTerm ||
        sortBy !== "creationDate" ||
        sortDirection !== "desc"
      ) {
        setFilterError(`Error filtering/sorting todos: ${error.message}`);
      } else {
        setError(`Error fetching todos: ${error.message}`);
      }
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
      invalidateCache();
    } catch (error) {
      setTodoList((prev) => prev.filter((todo) => todo.id !== tempTodo.id));

      setError(`Todo operation failed: ${error.message}`);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((t) => t.id === id);

    const original = [...todoList];
    const updatedList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      } else {
        return todo;
      }
    });
    setTodoList(updatedList);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
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

      if (!response.ok) {
        throw new Error("Failed to complete todo");
      }

      invalidateCache();
    } catch (error) {
      setTodoList(original);

      setError(`Todo operation failed: ${error.message}`);
    }
  }
  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((t) => t.id === editedTodo.id);
    const original = [...todoList];
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });

    setTodoList(updatedTodos);
    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
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

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      invalidateCache();
    } catch (error) {
      setTodoList(original);

      setError(`Todo operation failed: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {filterError && (
        <div>
          <p>{filterError}</p>

          <button onClick={() => setFilterError("")}>Clear Filter Error</button>

          <button
            onClick={() => {
              setFilterTerm("");
              setSortBy("creationDate");
              setSortDirection("desc");
              setFilterError("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
      {isTodoListLoading && <p>Loading todos...</p>}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />
      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </>
  );
}

export default TodosPage;
