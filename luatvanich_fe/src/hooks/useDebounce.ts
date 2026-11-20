import { useEffect, useState } from "react";

export function useDebouncedValue<T>(inputValue: T, delayMilliseconds = 350): T {
  const [debouncedResult, setDebouncedResult] = useState<T>(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedResult(inputValue);
    }, delayMilliseconds);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delayMilliseconds]);

  return debouncedResult;
}
