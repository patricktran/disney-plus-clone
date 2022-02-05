import { useEffect, useState, useRef, RefObject } from "react";

import throttle from "lodash.throttle";

interface Props {
  /** target element ref for addEventListeners */
  elementRef: RefObject<HTMLDivElement | null>;
  idleTimeoutMs?: number;
}

const useShowOverlayIdle = ({ elementRef, idleTimeoutMs = 3000 }: Props) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const handleActiveEvent = () => {
      setShowOverlay(true);

      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        // use most recent value since setTimeout will use the value that it was initially called with
        if (elementRef.current) {
          setShowOverlay(false);
        }
      }, idleTimeoutMs);
    };

    const handleReset = () => {
      setShowOverlay(false);

      if (timer.current) {
        clearTimeout(timer.current);
      }
    };

    const activeEvents = ["mousemove", "click", "mouseover"];
    const resetEvents = ["mouseout"];

    const throttledHandleActiveEvent = throttle(handleActiveEvent, 10);
    const throttledHandleResetEvent = throttle(handleReset, 10);

    const ref = elementRef.current;

    if (ref) {
      // console.log("adding listeners");
      for (const event of activeEvents) {
        ref.addEventListener(event, throttledHandleActiveEvent);
      }

      for (const event of resetEvents) {
        ref.addEventListener(event, throttledHandleResetEvent);
      }
    }

    return () => {
      timer.current = null;

      if (ref) {
        for (const event of activeEvents) {
          ref.removeEventListener(event, throttledHandleActiveEvent);
        }

        for (const event of resetEvents) {
          ref.removeEventListener(event, throttledHandleResetEvent);
        }
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idleTimeoutMs]);

  return showOverlay;
};

export default useShowOverlayIdle;
