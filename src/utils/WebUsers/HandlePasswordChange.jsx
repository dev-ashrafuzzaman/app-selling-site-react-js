import Swal from "sweetalert2";
import { ErrorToast, SuccessToast } from "../Toastify";
import { getCurrentDateTime } from "../HandleCurrentDate";

export const HandlePassChange = async (axiosSecure, id, passValues, WebUserLogout, navigate) => {

    if (passValues.newPass == '' || passValues.oldPass == '') {
        ErrorToast('Input Field Is Empty')
    } else {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change it!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/api/v1/web/user/password-change/${id}`, { passValues, date: getCurrentDateTime() })
                    .then(data => {

                        if (data.data.modifiedCount > 0) {
                            SuccessToast('Change Success')
                            const timeoutId = setTimeout(() => {
                                WebUserLogout()
                                navigate('/user/auth/login');
                            }, 2000)
                            setTimeout(() => {
                                clearTimeout(timeoutId);
                            }, 2000);
                        } else {
                            ErrorToast(data.data.Error)
                        }
                    })

            } catch (error) {
                console.error(error);
            }

        }
    }

}
export const HandleUserPassChange = async (axiosSecure, id, passValues, modalRef) => {

    if (passValues.newPass == '') {
        ErrorToast('Input Field Is Empty')
    } else {
        try {
            await axiosSecure.patch(`/api/v1/admin/user/password-change/${id}`, { passValues, date: getCurrentDateTime() })
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        modalRef.current.close();
                        SuccessToast('Change Success')
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