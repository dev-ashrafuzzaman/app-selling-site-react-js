import axios from "axios";
import { useEffect, useState } from "react";


const useWebUtils = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_BASE_URL}/api/v1/web/utils`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); // Re-fetch if the URL changes
  
    const refetch = () => {
      setLoading(true);
      fetchData();
    };
  
    return { data, loading, error, refetch };
};

export default useWebUtils;