import {useState} from "react";
import "./searchForm.scss";

const SearchForm = ({
  onSearch,
  searchTerm,
}: {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(inputValue);
  };
  return (
    <div className="search">
      <form action="" onSubmit={handleSearch} className="search-form">
        <input
          className="search-input"
          type="search"
          value={inputValue}
          placeholder="Search for giphys... e.g. 'Kath & Kim'"
          onChange={event => setInputValue(event.target.value)}
        />
        <input
          type="submit"
          className="button button-blue"
          value="Search"
          onSubmit={handleSearch}
          aria-label="search"
        />
      </form>
      <div data-testid="search-results-message">
        {/* If we have a search term, display the string */}
        {searchTerm && (
          <p className="search-results">
            Showing results for:{" "}
            <span className="search-results-result">{searchTerm}</span>
          </p>
        )}
        {/* If there's no search term we default to trending giphys */}
        {!searchTerm && (
          <p className="search-results">
            Showing{" "}
            <span className="search-results-result ">
              <i>trending</i>
            </span>{" "}
            results...
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
