import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useApprovedWithdraw = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isApprovedWithdraw, refetch, isLoading: isApprovedWithdrawLoading } = useQuery({
        queryKey: ['isApprovedWithdraw', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/approved/withdraws?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isApprovedWithdraw, refetch, isApprovedWithdrawLoading };
};

export default useApprovedWithdraw;