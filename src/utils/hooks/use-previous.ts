import { useRef, useEffect } from "react";

/**
 * React hook that provides previous value for a prop
 * Taken from: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
