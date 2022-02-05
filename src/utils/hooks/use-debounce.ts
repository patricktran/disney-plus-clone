import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let handler: NodeJS.Timeout;
    if (JSON.stringify(debouncedValue) !== JSON.stringify(value)) {
      handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    }
    return () => {
      if (handler) {
        clearTimeout(handler);
      }
    };
  }, [value, delay, debouncedValue]);

  return debouncedValue;
};

export default useDebounce;
