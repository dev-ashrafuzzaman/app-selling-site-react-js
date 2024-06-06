import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useJobSubmit = (page, pageSize, searchQuery) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isJobsSubmit, refetch, isLoading: isJobsSubmitLoading } = useQuery({
        queryKey: ['isJobsSubmit', page, pageSize, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/jobs/submit?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
            return res.data;
        }
    });
    
    return { isJobsSubmit, refetch, isJobsSubmitLoading };
};

export default useJobSubmit;