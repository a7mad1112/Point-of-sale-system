import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type UseFetchResult<T> = {
  response: FetchState<T>;
};

const useFetch = <T>(url: string): UseFetchResult<T> => {
  const [response, setResponse] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setResponse({
          data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setResponse({
          data: null,
          loading: false,
          error: (error as Error).message || "Error fetching data",
        });
      }
    };

    fetchData();
  }, [url]);

  return { response };
};

export default useFetch;
