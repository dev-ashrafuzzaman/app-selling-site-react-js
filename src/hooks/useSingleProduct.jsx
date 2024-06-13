import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleProduct = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isSingleProduct, refetch, isLoading: isSingleProductLoading } = useQuery({
        queryKey: ['isSingleProduct'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/single/products`);
            return res.data;
        }
    });
    
    return { isSingleProduct, refetch, isSingleProductLoading };
};

export default useSingleProduct;