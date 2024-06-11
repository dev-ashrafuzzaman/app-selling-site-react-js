import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useCommonLogic from "./useCommonLogic";

const useProducts = (initialPage = 1, initialPageSize = 10, initialSearchQuery = "") => {
    const {
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        searchQuery,
        setSearchQuery,
        totalCount,
        setTotalCount,
        totalPages,
        axiosSecure
    } = useCommonLogic(initialPage, initialPageSize, initialSearchQuery);

    const { data: isProducts, refetch, isLoading: isProductsLoading } = useQuery({
        queryKey: ['isProducts', currentPage, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/products?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (isProducts) {
            setTotalCount(isProducts.totalCount); // Assuming the response has a totalCount field
        }
    }, [isProducts, setTotalCount]);

    return {
        isProducts,
        refetch,
        isProductsLoading,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        searchQuery,
        setSearchQuery,
        totalPages,
        totalCount
    };
};

export default useProducts;