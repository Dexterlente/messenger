import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface UseAxiosOptions extends AxiosRequestConfig {
  token?: string;
}

export function useAxiosConversations<T = any>(options?: UseAxiosOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const config: AxiosRequestConfig = {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
          },
        };

        if (options?.token) {
          config.headers!['Authorization'] = options.token;
        }
        const API_URL = 'http://192.168.254.126:5000/conversations';

        const response = await axios.get(API_URL, config);

        if (isMounted) setData(response.data);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Unknown error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [options?.token]);

  return { data, loading, error };
}