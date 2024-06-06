import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SuccessToast = (text) => {
    toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export const ErrorToast = (text) => {
    toast.error(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}