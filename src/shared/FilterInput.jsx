function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div>
      <label htmlFor="filterInput">Search todos:</label>

      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
      />
      {filterTerm && <button onClick={() => onFilterChange("")}>Clear</button>}
    </div>
  );
}

export default FilterInput;
