import { useState, useCallback, DependencyList } from 'react';

import { ApiResponse } from './types';

export const useQueryLazy = <T, K>(
  url: string,
  // eslint-disable-next-line no-undef
  config?: Omit<RequestInit, 'method'>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(0);

  const query = useCallback(
    async (): Promise<ApiResponse<K>> => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'same-origin',
          ...config,
          headers: {
            'Content-Type': 'application/json',
            ...config?.headers,
          },
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { query, error, isLoading, status };
};
