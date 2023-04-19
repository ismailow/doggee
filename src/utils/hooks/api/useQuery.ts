import { useState, useEffect, DependencyList } from 'react';

export const useQuery = <K>(request: () => Promise<any>, deps: DependencyList = []) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(0);
  const [data, setData] = useState<K | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      request().then(async (res) => {
        setStatus(res.status);

        setData(res.data);
        setIsLoading(false);
      });
    } catch (e: any) {
      setError(e);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, error, isLoading, status };
};
