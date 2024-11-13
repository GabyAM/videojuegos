import { useEffect, useState } from 'react';

export function useFetch(fetchFn) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchFn()
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((e) => {
        setError(e);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, [fetchFn]);

  return {
    data,
    setData,
    isLoading,
    error
  };
}
