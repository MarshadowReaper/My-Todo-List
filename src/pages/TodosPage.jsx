import DOMPurify from "dompurify";
import styles from "./TodosPage.module.css";
import useDebounce from "../utils/useDebounce.js";
import SortBy from "../shared/SortBy.jsx";
import TodoForm from "../features/Todos/TodoForm.jsx";
import TodoList from "../features/Todos/TodoList/TodoList.jsx";
import FilterInput from "../shared/FilterInput.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useReducer, useEffect } from "react";
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from "../reducers/todoReducer.js";
import { useSearchParams } from "react-router";
import StatusFilter from "../shared/StatusFilter";

function TodosPage() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const statusFilter = searchParams.get("status") || "all";
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const handleFilterChange = (newTerm) => {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: { filterTerm: newTerm },
    });
  };

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  async function addTodo(todoTitle) {
    const trimmedTitle = todoTitle.trim();

    if (trimmedTitle.length > 100) {
      return;
    }

    const cleanTitle = DOMPurify.sanitize(todoTitle.trim(), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
    const tempTodo = {
      id: Date.now(),
      title: cleanTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: {
        todo: tempTodo,
      },
    });
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: cleanTitle,
          isCompleted: false,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const data = await response.json();

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: tempTodo.id,
          todo: data,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          message: `Error adding todo: ${error.message}`,
          tempId: tempTodo.id,
          creationDate: new Date(),
        },
      });
    }
  }

  async function completeTodo(todoId) {
    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { todoId },
    });

    try {
      const response = await fetch(`/api/tasks/${todoId}`, {
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

      const data = await response.json();

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        payload: {
          todo: data,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          message: `Error completing todo: ${error.message}`,
          todoId,
        },
      });
    }
  }
  const updateTodo = async (editedTodo) => {
    const cleanTitle = DOMPurify.sanitize(editedTodo.title.trim(), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
    const previousTodo = todoList.find((todo) => todo.id === editedTodo.id);
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return {
          ...editedTodo,
          title: cleanTitle,
        };
      }
      return todo;
    });
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: {
        previousTodo,
        updatedTodo: editedTodo,
      },
    });

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      payload: {
        todos: updatedTodos,
      },
    });
    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: cleanTitle,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          message: `Error updating todo: ${error.message}`,
          previousTodo,
        },
      });
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetchTodos = async () => {
      dispatch({ type: TODO_ACTIONS.FETCH_START });

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
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        if (data.tasks.length === 0) {
          dispatch({
            type: TODO_ACTIONS.FETCH_ERROR,
            payload: {
              message: "No matching todos found.",
              isFilterError: true,
            },
          });

          return;
        }

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: {
            todos: data.tasks,
          },
        });
      } catch (error) {
        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message:
              debouncedFilterTerm ||
              sortBy !== "creationDate" ||
              sortDirection !== "desc"
                ? `Error filtering/sorting todos: ${error.message}`
                : `Error fetching todos: ${error.message}`,

            isFilterError:
              debouncedFilterTerm ||
              sortBy !== "creationDate" ||
              sortDirection !== "desc",
          },
        });
      } finally {
        /*empty*/
      }
    };
    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);
  const hasSearch = debouncedFilterTerm.trim().length > 0;

  const isEmptyApp =
    !error &&
    !filterError &&
    !isTodoListLoading &&
    !hasSearch &&
    todoList.length === 0;

  const isNoResults =
    !error &&
    !filterError &&
    !isTodoListLoading &&
    hasSearch &&
    todoList.length === 0;

  const showTodos =
    !error && !filterError && !isTodoListLoading && todoList.length > 0;

  return (
    <>
      {error && <p>{error}</p>}

      {filterError && (
        <div>
          <p>{filterError}</p>

          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>
            Clear Filter Error
          </button>

          <button
            onClick={() => {
              dispatch({ type: TODO_ACTIONS.RESET_FILTERS });
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {isEmptyApp && <p>Add todo above to get started</p>}

      {isNoResults && (
        <div>
          <p>No matching todos found.</p>

          <button
            onClick={() =>
              dispatch({
                type: TODO_ACTIONS.RESET_FILTERS,
              })
            }
          >
            Clear Filter
          </button>
        </div>
      )}
      {isTodoListLoading && <p>Loading todos...</p>}
      <div className={styles.mainContent}>
        <div className={styles.formPanel}>
          <SortBy
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortByChange={(newSortBy) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                payload: {
                  sortBy: newSortBy,
                  sortDirection,
                },
              })
            }
            onSortDirectionChange={(newSortDirection) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                payload: {
                  sortBy,
                  sortDirection: newSortDirection,
                },
              })
            }
          />

          <StatusFilter />

          <FilterInput
            filterTerm={filterTerm}
            onFilterChange={handleFilterChange}
          />

          <TodoForm onAddTodo={addTodo} />
        </div>

        <div className={styles.linePanel}>
          {showTodos && (
            <TodoList
              todoList={todoList}
              onCompleteTodo={completeTodo}
              onUpdateTodo={updateTodo}
              dataVersion={dataVersion}
              statusFilter={statusFilter}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TodosPage;
