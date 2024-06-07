import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useUserSecure from "./useUserSecure";


const useUserOrders = () => {
    const { WebUser, WebUserloading } = useAuth();
    const [axiosSecure] = useUserSecure();
    const { data: isUserOrders, refetch, isLoading: isUserOrdersLoading } = useQuery({
        queryKey: ['isUserOrders', WebUser],
        enabled: !WebUserloading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/web/user/order/${WebUser}`);
            return res.data;
        }
    })
    return [isUserOrders, refetch, isUserOrdersLoading]
};

export default useUserOrders;