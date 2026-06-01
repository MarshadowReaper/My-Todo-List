export const TODO_ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  ADD_TODO_START: "ADD_TODO_START",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_ERROR: "ADD_TODO_ERROR",

  COMPLETE_TODO_START: "COMPLETE_TODO_START",
  COMPLETE_TODO_SUCCESS: "COMPLETE_TODO_SUCCESS",

  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_ERROR: "UPDATE_TODO_ERROR",
  SET_SORT: "SET_SORT",
  SET_FILTER: "SET_FILTER",
  CLEAR_ERROR: "CLEAR_ERROR",
};

export const initialTodoState = {
  todoList: [],
  error: "",
  filterError: "",
  isTodoListLoading: true,
  sortBy: "createdDate",
  sortDirection: "desc",
  filterTerm: "",
  dataVersion: 0,
};

export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: "",
        filterError: "",
      };

    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        todoList: action.payload.todos,
        hasSearched: false,
        isTodoListLoading: false,
      };

    case TODO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isTodoListLoading: false,

        filterError: action.payload.isFilterError ? action.payload.message : "",
        error: !action.payload.isFilterError ? action.payload.message : "",
      };
    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filterTerm: "",
        sortBy: "creationDate",
        sortDirection: "asc",
      };
    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        todoList: [action.payload.todo, ...state.todoList],
      };
    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.tempId ? action.payload.todo : todo,
        ),
      };
    case TODO_ACTIONS.COMPLETE_TODO_START:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.todoId
            ? { ...todo, isCompleted: true }
            : todo,
        ),
      };
    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.todo.id ? action.payload.todo : todo,
        ),
      };
    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return {
        ...state,
        error: action.payload.message,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.todoId
            ? { ...todo, isCompleted: false }
            : todo,
        ),
      };
    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filterTerm: action.payload.filterTerm,
      };
    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
      };
    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todoList: action.payload.todos,
      };
    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: "",
        filterError: "",
      };

    default:
      return state;
  }
}
