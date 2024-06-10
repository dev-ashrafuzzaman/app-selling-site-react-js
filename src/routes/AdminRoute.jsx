import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useWebUser from "../hooks/web/useWebUser";
import ScreenLoad from "../components/ScreenLoad";
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    

    const [userFound, setUserFound] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (loading || !isAdminLoading) {
                setUserFound(false);
            }
        }, 5000); 
        
        setTimeout(() => {
            clearTimeout(timeout);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [loading, isAdminLoading]);

    if (user && isAdmin) {
        return children;
    }

    if (!userFound) {
        return <Navigate to="/leery/admin/auth/validation" />;
    } else {
        return <ScreenLoad />
    }

 

};

export default AdminRoute;