import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDirectLink = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isDirectLink, refetch, isLoading: isDirectLinkLoading } = useQuery({
        queryKey: ['isDirectLink', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/directs?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isDirectLink, refetch, isDirectLinkLoading };
};

export default useDirectLink;