import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useUserSecure from "./useUserSecure";


const useWebUser = () => {
    const { WebUser, WebUserloading } = useAuth();
    const [axiosSecure] = useUserSecure();
    const { data: isWebUser, refetch, isLoading: isWebUserLoading } = useQuery({
        queryKey: ['isWebUser', WebUser],
        enabled: !WebUserloading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/web/user/${WebUser}`);
            return res.data;
        }
    })
    return [isWebUser, refetch, isWebUserLoading]
};

export default useWebUser;