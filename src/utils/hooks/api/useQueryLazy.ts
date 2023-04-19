import { useState, useCallback } from 'react';

import { ApiResponse } from './types';

export const useQueryLazy = <K>(request: () => Promise<any>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(0);

  const query = useCallback(
    async (): Promise<ApiResponse<K>> => {
      setIsLoading(true);
      try {
        setIsLoading(false);
        return request().then(async (res) => {
          setStatus(res.status);
          return res.data;
        });
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
