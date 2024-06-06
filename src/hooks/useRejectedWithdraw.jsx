import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRejectedWithdraw = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isRejectedWithdraw, refetch, isLoading: isRejectedWithdrawLoading } = useQuery({
        queryKey: ['isRejectedWithdraw', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/rejected/withdraws?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isRejectedWithdraw, refetch, isRejectedWithdrawLoading };
};

export default useRejectedWithdraw;