import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGlobalData = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isGlobalData, refetch, isLoading: isGlobalDataLoading } = useQuery({
        queryKey: ['isGlobalData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/global`);
            return res.data;
        }
    })
    return [isGlobalData, refetch, isGlobalDataLoading]
};

export default useGlobalData;