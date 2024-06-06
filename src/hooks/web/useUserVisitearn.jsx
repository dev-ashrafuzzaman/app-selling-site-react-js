import { useQuery } from "@tanstack/react-query";
import useUserSecure from "./useUserSecure";


const useUserVisitEarn = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useUserSecure();
    const { data: isUserVisitEarn, refetch, isLoading: isUserVisitEarnLoading } = useQuery({
        queryKey: ['isUserVisitEarn', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/web/user/visit-earn?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isUserVisitEarn, refetch, isUserVisitEarnLoading };
};

export default useUserVisitEarn;