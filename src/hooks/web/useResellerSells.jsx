import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useUserSecure from "./useUserSecure";


const useResellerSells = () => {
    const { WebUser, WebUserloading } = useAuth();
    const [axiosSecure] = useUserSecure();
    const { data: isResellerSell, refetch, isLoading: isResellerSellLoading } = useQuery({
        queryKey: ['isResellerSell', WebUser],
        enabled: !WebUserloading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/web/reseller/sell/${WebUser}`);
            return res.data;
        }
    })
    return [isResellerSell, refetch, isResellerSellLoading]
};

export default useResellerSells;