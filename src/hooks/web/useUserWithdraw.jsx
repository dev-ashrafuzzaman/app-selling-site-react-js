import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useUserSecure from "./useUserSecure";


const useUserWithdraw = () => {
    const { WebUser, WebUserloading } = useAuth();
    const [axiosSecure] = useUserSecure();
    const { data: isUserWithdraw, refetch, isLoading: isUserWithdrawLoading } = useQuery({
        queryKey: ['isUserWithdraw', WebUser],
        enabled: !WebUserloading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/web/user/withdraw/${WebUser}`);
            return res.data;
        }
    })
    return [isUserWithdraw, refetch, isUserWithdrawLoading]
};

export default useUserWithdraw;