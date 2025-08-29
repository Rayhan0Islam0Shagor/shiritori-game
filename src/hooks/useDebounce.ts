import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay?: number): [boolean, T] => {
  const [loading, setLoading] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [loading, debouncedValue];
};

export default useDebounce;
