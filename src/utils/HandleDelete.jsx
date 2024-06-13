import Swal from "sweetalert2";
import { ErrorToast, SuccessToast } from "./Toastify";


export const HandleDelete = async (axiosSecure, refetch , id, route) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
        const data = await axiosSecure.delete(`/api/v1/admin/${route}/${id}`);
        console.log(data, 'delete');
        if (data.data.deletedCount > 0) {
            refetch()
            SuccessToast('Delete Success')
        }
    }
}

export const HandleDeleteWithImg = async (axiosSecure, refetch , info, route) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
        const filenamesToDelete = [info?.prof1 , info?.prof2];
        const response = await axiosSecure.delete(`/public/upload/delete` , { data: { filenames: filenamesToDelete } });
        if(response.data.delete == true){
            const data = await axiosSecure.delete(`/api/v1/admin/${route}/${info._id}`);
            if (data.data.deletedCount > 0) {
                refetch()
                SuccessToast('Delete Success')
            }
        } else{
            ErrorToast('Image Delete Failed')
        }
 
    }
}
export const HandleDeleteWithSingleImg = async (axiosSecure, refetch , info, route) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
        const filenamesToDelete = [info?.url];
        const response = await axiosSecure.delete(`/public/upload/delete` , { data: { filenames: filenamesToDelete } });
        if(response.data.delete == true){
            await axiosSecure.delete(`/api/v1/admin/${route}/${info._id}`);
            refetch()
            SuccessToast('Delete Success')
        } else{
            ErrorToast('Image Delete Failed')
        }
 
    }
}
export const HandleDeleteOrder = async (axiosSecure, refetch , info, route) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
        const filenamesToDelete = [info?.custom?.logo];
        const response = await axiosSecure.delete(`/public/upload/delete` , { data: { filenames: filenamesToDelete } });
        if(response.data){
            await axiosSecure.delete(`/api/v1/admin/${route}/${info._id}`);
            refetch()
            SuccessToast('Delete Success')
        } else{
            ErrorToast('Image Delete Failed')
        }
 
    }
}
export const HandleDeleteProduct = async (axiosSecure, refetch , info, route) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
        const filenamesToDelete = [info?.imageUrls[0]];
        const response = await axiosSecure.delete(`/public/upload/delete` , { data: { filenames: filenamesToDelete } });
        if(response.data.delete == true){
            await axiosSecure.delete(`/api/v1/admin/${route}/${info._id}`);
            refetch()
            SuccessToast('Delete Success')
        } else{
            ErrorToast('Image Delete Failed')
        }
 
    }
}
