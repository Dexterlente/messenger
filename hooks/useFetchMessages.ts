import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface UseAxiosOptions extends AxiosRequestConfig {
  token?: string;
  receiver_id: number;
}

interface Message {
  ID: number;
  conversation_id: number;
  SenderID: number;
  ReceiverID: number;
  Content: string;
  SentAt: string;
}

interface Pagination {
  limit: number;
  offset: number;
  current_page: number;
  total_items: number;
  total_pages: number;
}

interface APIResponse {
  messages: Message[];
  pagination: Pagination;
}

export function useFetchMessages(options: UseAxiosOptions) {
  const [data, setData] = useState<Message[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/messages`;

  const fetchData = async (pageToFetch = 1) => {
    setLoading(true);
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          ...(options.token && { Authorization: options.token }),
        },
        params: {
          receiver_id: options.receiver_id,
          page: pageToFetch,
        },
      };

      const response = await axios.get<APIResponse>(API_URL, config);
      const resData = response.data;

      setData(prev =>
        pageToFetch === 1 ? resData.messages : [...prev, ...resData.messages]
      );
      setHasNextPage(resData.pagination.current_page < resData.pagination.total_pages);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [options.receiver_id, options.token]);

  const fetchMore = () => {
    if (!loading && hasNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  const refetch = () => {
    setPage(1);
    fetchData(1);
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
