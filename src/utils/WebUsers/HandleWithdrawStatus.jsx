import { getCurrentDateTime } from "../HandleCurrentDate";
import { ErrorToast, SuccessToast } from "../Toastify";

export const HandleWithdrawStatus = async (axiosSecure, refetch, data, statusValue, modalRef) => {

    if (statusValue == '') {
        ErrorToast('Input Field Is Empty')
    } else {
        try {
            await axiosSecure.patch(`/api/v1/admin/withdraw/status/${data._id}`, { statusValue, data, date: getCurrentDateTime() })
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        refetch()
                        modalRef.current.close();
                        SuccessToast('Update Success')
                    } else {
                        modalRef.current.close();
                        ErrorToast(data.data.Error)
                    }
                })

        } catch (error) {
            modalRef.current.close();
            console.error(error);
        }

    }

}