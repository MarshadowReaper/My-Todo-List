import { useRef } from "react";
import { useState } from "react";
function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const [workingTodoTitle, setworkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log("Event object:", event);
    console.log("Event target:", event.target);

    if (workingTodoTitle.trim()) {
      onAddTodo(workingTodoTitle);

      inputRef.current.focus();
    }
    setworkingTodoTitle("");
  };
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        ref={inputRef}
        type="text"
        id="todoTitle"
        name="todoTitle"
        placeholder={"Todo text"}
        required
        value={workingTodoTitle}
        onChange={(event) => setworkingTodoTitle(event.target.value)}
      />
      <button type="submit" disabled={!workingTodoTitle.trim()}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
