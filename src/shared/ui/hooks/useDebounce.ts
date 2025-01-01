import { useRef } from "react";

type useDebounceProps = {
  func: Function;
  timeout?: number;
};

export const useDebounce = ({ func, timeout = 300 }: useDebounceProps) => {
  const debounceRef = useRef<NodeJS.Timeout>();

  const debounce = () => {
    return (...args: any[]) => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  return debounce();
};
