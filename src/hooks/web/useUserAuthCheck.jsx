import { useEffect, useState } from 'react';
import axios from 'axios';

const useUserAuthCheck = () => {
    const [WebUser, setUser] = useState(null);
    const [WebUserloading, setLoading] = useState(true);

    const clearLocalStorage = () => {
        localStorage.removeItem('uid');
    };


    useEffect(() => {
        const currentWebUser = localStorage.getItem('uid');
        if (currentWebUser) {
            axios.post(`${import.meta.env.VITE_BASE_URL}/web-jwt`, { email: currentWebUser })
                .then(response => {
                    const { token, email } = response.data;
                    document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;
                    setLoading(false);
                    setUser(email);
                })
                .catch(() => {
                    setLoading(false);
                });
        }  else {
            clearLocalStorage();
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict';
        }
    }, []);



    const WebUserLogout = () => {
        clearLocalStorage();
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict';
        return true;
    };

    return { WebUser, WebUserloading, WebUserLogout };
};

export default useUserAuthCheck;