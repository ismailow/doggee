import { useCallback, useState } from 'react';

import { ApiResponse } from './types';

type MutationMethods = 'post' | 'put' | 'delete';

interface User {
  username: string;
  password: string;
  id: string;
}

export const useMutation = <T, K>(
  url: string,
  method: MutationMethods,
  // eslint-disable-next-line no-undef
  config?: Omit<RequestInit, 'method'>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(0);

  // eslint-disable-next-line consistent-return
  const mutation = useCallback(async (body: T): Promise<ApiResponse<K>> => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        credentials: 'same-origin',
        method,
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        ...(body && { body: JSON.stringify(body) }),
      });
      // const responseData = (await response.json()) as Promise<ApiResponse<K>>;
      const responseData = await response.json();
      setStatus(response.status);
      return responseData;
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
