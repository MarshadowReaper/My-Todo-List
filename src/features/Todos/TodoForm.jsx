import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { useRef } from "react";
import { useState } from "react";
function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const [workingTodoTitle, setworkingTodoTitle] = useState([]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log("Event object:", event);
    console.log("Event target:", event.target);

    if (workingTodoTitle) {
      onAddTodo(workingTodoTitle);

      inputRef.current.focus();
    }
    setworkingTodoTitle("");
  };
  return (
    <form>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={handleChange}
        inputRef={inputRef}
      />

      <button
        type="submit"
        onSubmit={handleAddTodo}
        disabled={!workingTodoTitle.trim()}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
