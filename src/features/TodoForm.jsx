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

    const todoTitle = event.target.todoTitle.value.trim();
    if (todoTitle) {
      onAddTodo(todoTitle);
      event.target.reset();

      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleAddTodo}>

      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={handleChange}
        ref={inputRef}
      />

      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
      />

      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>

    </form>
  );
}

export default TodoForm;
