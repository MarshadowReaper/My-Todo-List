function TextInputWithLabel({ labelText, elementId, onChange, value, ref }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>

      <input
        type="text"
        id={elementId}
        value={value}
        onChange={onChange}
        ref={ref}
      />
    </>
  );
}

export default TextInputWithLabel;
