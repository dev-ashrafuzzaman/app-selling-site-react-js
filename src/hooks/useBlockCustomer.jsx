import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useBlockCustomer = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isBlockCustomer, refetch, isLoading: isBlockCustomerLoading } = useQuery({
        queryKey: ['isBlockCustomer', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/block/users?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isBlockCustomer, refetch, isBlockCustomerLoading };
};

export default useBlockCustomer;