import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePendingWithdraw = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isPendingWithdraw, refetch, isLoading: isPendingWithdrawLoading } = useQuery({
        queryKey: ['isPendingWithdraw', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/pending/withdraws?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isPendingWithdraw, refetch, isPendingWithdrawLoading };
};

export default usePendingWithdraw;