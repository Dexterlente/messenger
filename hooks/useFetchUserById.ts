import { useEffect, useState } from 'react';

export type UserDetailResponse = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  image_profile: {
    String: string;
    Valid: boolean;
  };
};

export const useFetchUserById = (id: number | null) => {
  const [user, setUser] = useState<UserDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch user');

        const data: UserDetailResponse = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};
