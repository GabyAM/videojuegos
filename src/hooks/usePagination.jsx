import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from './useAuth';

export function usePagination(fetchFn) {
  const { removeToken } = useAuth();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  const fetchPage = useCallback(
    (page) => {
      setIsLoading(true);
      fetchFn(page)
        .then((data) => {
          setData(data.results);
          setCurrentPage(page);
          setPages(data.pages);
          setError(null);
        })
        .catch((error) => {
          if (error.status === 401) {
            removeToken();
          }
          setError(error);
          setData(null);
        })
        .finally(() => setIsLoading(false));
    },
    [fetchFn, removeToken]
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  return { data, isLoading, error, fetchPage, currentPage, pages };
}
