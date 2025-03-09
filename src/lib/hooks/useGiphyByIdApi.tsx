import {useState, useEffect} from "react";
import {GiphyProps} from "src/lib";
const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

export const useGiphyById = (id: string | undefined) => {
  const [giphy, setGiphy] = useState<GiphyProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const baseUrl = "https://api.giphy.com/v1/gifs";
  const generalParams = `&rating=g&lang=en`;

  useEffect(() => {
    if (typeof id === "string") {
      const fetchData = async () => {
        setIsLoading(true);
        const apiUrl = `${baseUrl}/${id}?api_key=${apiKey}${generalParams}`;

        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            setError(true);
            throw new Error(`Response status: ${response.status}`);
          }
          const json = await response.json();
          setGiphy(json.data);
        } catch (error) {
          setError(true);
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("An unknown error occurred");
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      setError(true);
    }
  }, [id]);

  return {
    giphy,
    isLoading,
    error,
  };
};
