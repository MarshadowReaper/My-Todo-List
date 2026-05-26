function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div>
      {/* Sort By */}
      <label htmlFor="sortBy">Sort by:</label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="creationDate">Creation Date</option>
        <option value="title">Title</option>
      </select>

      {/* Sort Direction */}
      <label htmlFor="sortDirection">Order:</label>
      <select
        id="sortDirection"
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}

export default SortBy;
