import { isValidTodoTitle } from "../utils/todoValidation";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import { useRef } from "react";
import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const [workingTodoTitle, setworkingTodoTitle] = useState("");
  const handleChange = (event) => {
    setworkingTodoTitle(event.target.value);
  };

  const handleChange = (event) => {
    setworkingTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

<<<<<<< HEAD
    if (isValidTodoTitle(workingTodoTitle)) {
      onAddTodo(workingTodoTitle);
      setworkingTodoTitle("");
=======
<<<<<<< HEAD:src/features/TodoForm.jsx
    if (isValidTodoTitle(workingTodoTitle)) {
      onAddTodo(workingTodoTitle);
      setworkingTodoTitle("");
=======
    const todoTitle = event.target.todoTitle.value.trim();
    if (todoTitle) {
      onAddTodo(todoTitle);
      event.target.reset();
>>>>>>> main:src/TodoForm.jsx
>>>>>>> origin/main
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
<<<<<<< HEAD
=======
<<<<<<< HEAD:src/features/TodoForm.jsx
>>>>>>> origin/main
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={handleChange}
        inputRef={inputRef}
<<<<<<< HEAD
      />

      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
=======
      />

      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
=======
      <label htmlFor="todoTitle">Todo</label>
      <input
        ref={inputRef}
        type="text"
        id="todoTitle"
        name="todoTitle"
        placeholder={"Todo text"}
        required
      />
      <button type="submit">Add Todo</button>
>>>>>>> main:src/TodoForm.jsx
>>>>>>> origin/main
    </form>
  );
}

export default TodoForm;
