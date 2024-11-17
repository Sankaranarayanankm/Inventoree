import { useEffect, useState } from "react";

export default function useFetch(url, options = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(url, { ...options });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);
  return { loading, error, data };
}


// export default useFetch;