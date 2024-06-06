import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCustomer = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isCustomer, refetch, isLoading: isCustomerLoading } = useQuery({
        queryKey: ['isCustomer', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/users?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isCustomer, refetch, isCustomerLoading };
};

export default useCustomer;