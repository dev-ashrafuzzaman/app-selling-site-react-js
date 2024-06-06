import Swal from "sweetalert2";
import { SuccessToast } from "./Toastify";


export const HandleStatusChange = async (axiosSecure, refetch , id, route, status) => {
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
            const statusData = {
                status: status
            };
    
            await axiosSecure.patch(`/api/v1/admin/${route}/status/${id}`, {statusData})
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        refetch()
                        SuccessToast('Change Success')
                    }
                })
    
        } catch (error) {
            console.error(error);
        }
       
    }
}
