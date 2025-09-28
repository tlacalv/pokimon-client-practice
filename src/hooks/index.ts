import { useEffect, useRef, useState } from "react";

export const useLocalStorage = <T>(key: string, initialState: T) => {
  const [value, setValue] = useState<T>(() => {
    console.log("initializing state");
    const localStorageValue = localStorage.getItem(key);
    if (!localStorageValue) {
      setLocalStorage(initialState);
    }
    return localStorageValue ? JSON.parse(localStorageValue) : initialState;
  });
  const firstRun = useRef(true);

  useEffect(() => {
    if (!firstRun.current) {
      setLocalStorage(value);
    }
    firstRun.current = false;
  }, [value]);

  const setLocalStorage = (value: T | undefined) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { value, setValue };
};
