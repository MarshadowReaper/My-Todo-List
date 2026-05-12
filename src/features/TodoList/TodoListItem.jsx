import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { useState } from "react";
import { isValidTodoTitle } from "../../utils/todoValidation";
function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleUpdate = (event) => {
    if (!isValidTodoTitle(workingTitle)) return;

    event.preventDefault();

    onUpdateTodo({
      ...todo,
      title: workingTitle,
    });

    setIsEditing(false);
  };
  return (
    <li>
      {isEditing ? (
        <>
          <TextInputWithLabel
            elementId={`todo-${todo.id}`}
            labelText="Todo"
            value={workingTitle}
            onChange={(event) => setWorkingTitle(event.target.value)}
          />
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)}
          />

          <span
            onClick={() => {
              setWorkingTitle(todo.title);
              setIsEditing(true);
            }}
          >
            {todo.title}
          </span>
        </>
      )}
    </li>
  );
}
export default TodoListItem;
