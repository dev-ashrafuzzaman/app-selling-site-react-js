import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useCommonLogic from "./useCommonLogic";

const useOrders = (initialPage = 1, initialPageSize = 10, initialSearchQuery = "") => {
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

    const { data: isOrders, refetch, isLoading: isOrdersLoading } = useQuery({
        queryKey: ['isOrders', currentPage, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/orders?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (isOrders) {
            setTotalCount(isOrders.totalCount); // Assuming the response has a totalCount field
        }
    }, [isOrders, setTotalCount]);

    return {
        isOrders,
        refetch,
        isOrdersLoading,
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

export default useOrders;