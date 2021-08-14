import { useEffect, useState } from "react";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};

//通过useDebounce返回debounceParams参数，延迟赋值给参数，多次变化只赋值参数一次，达到节流的目的
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceParams, setDebounceParams] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceParams(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceParams;
};
