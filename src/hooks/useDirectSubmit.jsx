import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDirectSubmit = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isDirectSubmit, refetch, isLoading: isDirectSubmitLoading } = useQuery({
        queryKey: ['isDirectSubmit', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/directs/submit?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isDirectSubmit, refetch, isDirectSubmitLoading };
};

export default useDirectSubmit;