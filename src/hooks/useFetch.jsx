import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useFetch(fetchFn, { shouldFetch = true } = {}) {
  const { removeToken } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchFn()
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((e) => {
        if (e.status === 401) {
          removeToken();
        }
        setError(e);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, [shouldFetch, setIsLoading, setData, setError, fetchFn, removeToken]);

  return {
    data,
    setData,
    isLoading,
    error
  };
}
