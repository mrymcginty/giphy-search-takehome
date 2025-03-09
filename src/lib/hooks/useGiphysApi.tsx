import {useState, useEffect} from "react";
const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

export const useGiphysApi = () => {
  const [giphys, setGiphys] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const pageLimit = 25;

  const baseUrl = "https://api.giphy.com/v1/gifs";
  //update pagination params for the API query
  const paginationParams = `&limit=${pageLimit}&offset=${
    (currentPage - 1) * pageLimit
  }`;
  const generalParams = `&rating=g&lang=en`;

  const apiUrl =
    !searchTerm || searchTerm == ""
      ? `${baseUrl}/trending?api_key=${apiKey}${paginationParams}${generalParams}`
      : `${baseUrl}/search?api_key=${apiKey}&q=${encodeURIComponent(
          searchTerm
        )}${paginationParams}${generalParams}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      fetch(apiUrl)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            setError(true);
            console.error("Error fetching data: ", error);
          }
        })
        .then(response => {
          setGiphys(response.data);
          setPageOffset(response.pagination.offset);
          setPageTotal(response.pagination.total_count);
          setError(false);
        })
        .catch(error => {
          setError(true);
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  }, [apiUrl]);

  return {
    giphys,
    isLoading,
    error,
    search: {
      searchTerm,
      setSearchTerm,
    },
    pagination: {
      currentPage,
      setCurrentPage,
      pageTotal,
      pageOffset,
      pageLimit,
    },
  };
};
