import axios from "axios";
import { useEffect, useState } from "react";

const useProducts = (categoryId = null) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (categoryId) => {
    try {
      const url = categoryId
        ? `${import.meta.env.VITE_BASE_URL}/api/v1/web/products?categoryId=${categoryId}`
        : `${import.meta.env.VITE_BASE_URL}/api/v1/web/products`;
      const response = await axios(url);
      setProducts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(categoryId);
  }, [categoryId]);

  const refetch = () => {
    setLoading(true);
    fetchData(categoryId);
  };

  return { products, loading, error, refetch };
};

export default useProducts;