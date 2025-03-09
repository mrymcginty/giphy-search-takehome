import "./noResults.scss";

const NoResults = ({
  searchTerm,
  errorMessage,
}: {
  searchTerm?: string;
  errorMessage?: string;
}) => {
  return (
    <div className="noResults">
      {searchTerm && <h2>No results for "{searchTerm}" 😭</h2>}
      {errorMessage && <h2>{errorMessage}</h2>}
      <div>
        <img src="/src/assets/img/no-results.gif" alt="No results found" />
      </div>
    </div>
  );
};

export default NoResults;
