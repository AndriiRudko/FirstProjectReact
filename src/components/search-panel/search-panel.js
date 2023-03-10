import "./search-panel.css";

const SearchPanel = ({ onSearchInput, searchInput }) => {
  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="Найти сотрудника"
      onChange={onSearchInput}
      value={searchInput}
    />
  );
};

export default SearchPanel;
