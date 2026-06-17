<<<<<<< HEAD
function TextInputWithLabel({
  labelText,
  elementId,
  onChange,
  value,
  inputRef,
}) {
=======
function TextInputWithLabel({ labelText, elementId, onChange, value, ref }) {
>>>>>>> origin/main
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>

      <input
        type="text"
        id={elementId}
        value={value}
        onChange={onChange}
<<<<<<< HEAD
        ref={inputRef}
=======
        ref={ref}
>>>>>>> origin/main
      />
    </>
  );
}

export default TextInputWithLabel;
