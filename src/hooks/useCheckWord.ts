import { useState } from 'react';

const useCheckWord = () => {
  const [loading, setLoading] = useState(false);
  const [checkWord, setCheckWord] = useState(false);
  const [error, setError] = useState(false);

  return {
    loading,
    checkWord,
    setCheckWord,
    setLoading,
    error,
    setError,
  };
};

export default useCheckWord;
