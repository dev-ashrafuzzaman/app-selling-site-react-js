import { getCurrentDateTime } from "../HandleCurrentDate";
import { ErrorToast, SuccessToast } from "../Toastify";

export const HandleUserBonus = async (axiosSecure, refetch, id, bonusValue, modalRef1, setBonusValue) => {
    if (bonusValue.amount == '') {
        ErrorToast('Input Field Is Empty')
    } else {
        try {
            await axiosSecure.patch(`/api/v1/admin/user/bonus/${id}`, { bonusValue, date: getCurrentDateTime() })
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        setBonusValue({ ...bonusValue, amount: 0 })
                        refetch()
                        modalRef1.current.close();
                        SuccessToast('Claim Success')
                    } else {
                        modalRef1.current.close();
                        ErrorToast(data.data.Error)
                    }
                })

        } catch (error) {
            modalRef1.current.close();
            console.error(error);
        }

    }

}