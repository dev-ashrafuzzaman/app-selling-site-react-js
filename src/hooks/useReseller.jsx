import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useCommonLogic from "./useCommonLogic";

const useReseller = (initialPage = 1, initialPageSize = 10, initialSearchQuery = "" , type) => {
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

    const { data: isReseller, refetch, isLoading: isResellerLoading } = useQuery({
        queryKey: ['isReseller', currentPage, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/reseller?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}&type=${type}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (isReseller) {
            setTotalCount(isReseller.totalCount); // Assuming the response has a totalCount field
        }
    }, [isReseller, setTotalCount]);

    return {
        isReseller,
        refetch,
        isResellerLoading,
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

export default useReseller;