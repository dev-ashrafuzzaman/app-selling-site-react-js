import { ErrorToast, SuccessToast } from "../Toastify";

export const HandleDirectSubmitStatus = async (axiosSecure, refetch, info, statusValue, modalRef) => {
    if (!statusValue) {
        ErrorToast('Input Field Is Empty');
        return;
    }

    try {
        const filenamesToDelete = [info?.prof];
        const deleteResponse = await axiosSecure.delete(`/public/upload/delete`, { data: { filenames: filenamesToDelete } });

        if (deleteResponse.data.delete) {
            const patchResponse = await axiosSecure.patch(`/api/v1/admin/direct/submit/status/${info._id}`, { statusValue, info });

            if (patchResponse.data.deletedCount > 0) {
                refetch();
                modalRef.current.close();
                SuccessToast('Update Success');
            } else {
                modalRef.current.close();
                ErrorToast(patchResponse.data.Error);
            }
        } else {
            const patchResponse = await axiosSecure.patch(`/api/v1/admin/direct/submit/status/${info._id}`, { statusValue, info});

            if (patchResponse.data.deletedCount > 0) {
                refetch();
                modalRef.current.close();
                SuccessToast('Update Success');
            } else {
                modalRef.current.close();
                ErrorToast(patchResponse.data.Error);
            }
        }
    } catch (error) {
        modalRef.current.close();
        console.error(error);
    }
};