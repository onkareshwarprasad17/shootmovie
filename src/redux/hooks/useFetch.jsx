import React, { useEffect, useRef, useState } from "react";
import { fetchFromApi } from "../../utils/api";

const useFetch = (url) => {
  const cache = useRef({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Adding memoization for optimization
    const fetchData = async () => {
      setLoading(true);

      // Check if data exists in the cache
      if (cache.current[url]) {
        setData(cache.current[url]); // Return cached data
        setLoading(false);
        return;
      }

      try {
        const response = await fetchFromApi(url);
        setData(response);

        // Update cache with latest data
        cache.current[url] = response;

        setLoading(false);
      } catch (error) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
