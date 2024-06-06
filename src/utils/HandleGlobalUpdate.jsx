import { ErrorToast, SuccessToast } from "./Toastify";


export const handleGlobalUpdate = async (setLoading, data ,axiosSecure, id, refetch) => {
    setLoading(true)
    try {
        await axiosSecure.patch(`/api/v1/admin/global/${id}`, { data })
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    setLoading(false)
                    refetch()
                    SuccessToast('Update Success')
                } else {
                    ErrorToast('No Change')
                    setLoading(false)
                }
            })

    } catch (error) {
        console.error(error);
    }
};