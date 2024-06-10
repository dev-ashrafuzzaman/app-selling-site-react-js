import { useState, useMemo } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useCommonLogic = (initialPage = 1, initialPageSize = 10, initialSearchQuery = "") => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [totalCount, setTotalCount] = useState(0);
    const [axiosSecure] = useAxiosSecure();

    const totalPages = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize]);

    return {
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
    };
};

export default useCommonLogic;