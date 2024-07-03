import { useEffect, useState } from "react";

function useDebounce(data, delay) {
  const [value, setValue] = useState(data);
  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      setValue(data);
    }, delay);
    return () => clearTimeout(setTimeOutId);
  }, [data]);
  return value;
}

export default useDebounce;
