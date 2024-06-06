import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useVisitEarn = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isVisitEarn, refetch, isLoading: isVisitEarnLoading } = useQuery({
        queryKey: ['isVisitEarn', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/visits?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isVisitEarn, refetch, isVisitEarnLoading };
};

export default useVisitEarn;