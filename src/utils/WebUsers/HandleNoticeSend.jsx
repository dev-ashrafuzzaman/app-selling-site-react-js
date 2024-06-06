import { ErrorToast, SuccessToast } from "../Toastify";

export const HandleNoticeSend = async (axiosSecure, id, noticeValue, modalRef) => {

    if (noticeValue.notice == '') {
        ErrorToast('Input Field Is Empty')
    } else {
        try {
            await axiosSecure.patch(`/api/v1/admin/user/notice/${id}`, { noticeValue})
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        modalRef.current.close();
                        SuccessToast('Send Success')
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