import { useCallback, useEffect, useState } from 'react';

export function usePagination(fetchFn) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

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
          setError(error);
          setData(null);
        })
        .finally(() => setIsLoading(false));
    },
    [fetchFn]
  );

  useEffect(() => {
    if (!data && !isLoading && !error) {
      fetchPage(1);
    }
  }, [data, isLoading, error, fetchPage]);

  return { data, isLoading, error, fetchPage, currentPage, pages };
}
