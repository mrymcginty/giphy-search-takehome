import {
  Header,
  GiphyContainer,
  GiphyLoader,
  NoResults,
  Pagination,
  SearchForm,
} from "src/components";
import {useGiphysApi} from "src/lib";

import "./App.scss";

const App = () => {
  // Using a hook to fetch and update API calls
  const {giphys, isLoading, error, search, pagination} = useGiphysApi();
  const {searchTerm, setSearchTerm} = search;
  const {currentPage, setCurrentPage, pageTotal, pageLimit} = pagination;

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    //reset pagination on new search
    setCurrentPage(1);
  };

  return (
    <div className="page-wrapper">
      <Header />
      <SearchForm onSearch={handleSearch} searchTerm={searchTerm} />
      {/* Skeleton Loader */}
      {isLoading && <GiphyLoader numItems={pageLimit} />}
      {/* API error */}
      {error && <NoResults errorMessage="Error fetching giphys..." />}
      {/* Successful API call but zero results */}
      {giphys.length <= 0 && <NoResults searchTerm={searchTerm} />}
      {/* Successful API call - display results */}
      {!isLoading && giphys.length > 0 && <GiphyContainer giphys={giphys} />}
      {/* Paginate results */}
      <Pagination
        currentPage={currentPage}
        totalCount={pageTotal}
        pageSize={pageLimit}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
};

export default App;
