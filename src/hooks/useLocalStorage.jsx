import { useEffect, useState } from "react";

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });

  useEffect(() => {
    if (value != undefined) {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    }
  }, [key, value]);

  return [value, setValue];
}
