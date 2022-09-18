import { useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => ReturnType<T>>(callback: T, wait = 500) {
  // track args & timeout handle between calls
  const argsRef = useRef<Parameters<T>>();
  const timeout = useRef<number>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => cleanup, []);

  return function debouncedCallback(...args: Parameters<T>) {
    // capture latest args
    argsRef.current = args;

    // clear debounce timer
    cleanup();

    // start waiting again
    timeout.current = window.setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
}
