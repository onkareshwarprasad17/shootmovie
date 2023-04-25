import React, { useEffect, useState } from 'react';
import { fetchFromApi } from '../../utils/api';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFromApi(url);
        setData(response);
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
