import { useState, useEffect, DependencyList } from 'react';

export const useQuery = <T, K>(
  url: string,
  // eslint-disable-next-line default-param-last
  deps: DependencyList = [],
  // eslint-disable-next-line no-undef
  config?: Omit<RequestInit, 'method'>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(0);
  const [data, setData] = useState<K | null>(null);

  useEffect(() => {
    console.log('asdsad');

    setIsLoading(true);
    try {
      fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      }).then(async (res) => {
        const responseData = (await res.json()) as K;
        setStatus(res.status);
        setData(responseData);
      });
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, error, isLoading, status };
};
