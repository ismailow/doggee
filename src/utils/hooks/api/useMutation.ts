import { useCallback, useState } from 'react';

import { ApiResponse } from './types';

type MutationMethods = 'post' | 'put' | 'delete';

interface User {
  username: string;
  password: string;
  id: string;
}

export const useMutation = <T, K>(request: (body: T) => Promise<any>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(0);

  // eslint-disable-next-line consistent-return
  const mutation = useCallback(async (body: T): Promise<ApiResponse<K>> => {
    setIsLoading(true);
    try {
      return await request(body).then(async (response) => {
        setStatus(response.status);
        return response.data;
      });
    } catch (e: any) {
      setError(e);
      return { success: false, data: { message: (e as Error).message } };
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { mutation, error, isLoading, status };
};
