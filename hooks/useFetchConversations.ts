import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface UseAxiosOptions extends AxiosRequestConfig {
  token?: string;
}

interface Pagination {
  current_page: number;
  total_pages: number;
}

interface APIResponse<T> {
  conversations: T[];
  pagination: Pagination;
}

export function useFetchConversations<T = any>(options?: UseAxiosOptions) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const API_URL = 'http://192.168.254.126:5000/conversations';

  const fetchData = async (pageToFetch: number = 1) => {
    setLoading(true);
    try {
      const config: AxiosRequestConfig = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
        params: {
          ...(options?.params || {}),
          page: pageToFetch,
        },
      };

      if (options?.token) {
        config.headers!['Authorization'] = options.token;
      }

      const response = await axios.get<APIResponse<T>>(API_URL, config);
      const resData = response.data;

      setData(prev =>
        pageToFetch === 1 ? resData.conversations : [...prev, ...resData.conversations]
      );

      setHasNextPage(resData.pagination.current_page < resData.pagination.total_pages);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [options?.token]);

  // Fetch next page
  const fetchMore = () => {
    if (!loading && hasNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

    const refetch = () => {
    setPage(1);
    fetchData(1); // fetch again from page 1
  };
  
  return {
    data,
    loading,
    error,
    fetchMore,
    hasNextPage,
    page,
    refetch,
  };
}

// | Returned Value | Type             | Purpose                          |
// | -------------- | ---------------- | -------------------------------- |
// | `data`         | `T[]`            | Array of conversations from API  |
// | `loading`      | `boolean`        | True while API is fetching       |
// | `error`        | `string \| null` | Error message if request fails   |
// | `fetchMore`    | `function`       | Triggers next page fetch         |
// | `hasNextPage`  | `boolean`        | Whether more pages are available |
// | `page`         | `number`         | Current page you're on           |
