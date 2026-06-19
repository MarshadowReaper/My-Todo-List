function TextInputWithLabel({
  labelText,
  elementId,
  onChange,
  value,
  inputRef,
  maxLength,
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>

      <input
        type="text"
        id={elementId}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
}

export default TextInputWithLabel;
