import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useWebUser from "../hooks/web/useWebUser";
import ScreenLoad from "../components/ScreenLoad";

const PrivateRoute = ({ children }) => {
    const { WebUser, WebUserloading } = useAuth();
    const [isWebUser, isWebUserLoading] = useWebUser();
    const [userFound, setUserFound] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (WebUserloading || !isWebUserLoading) {
                setUserFound(false);
            }
        }, 5000); 
        
        setTimeout(() => {
            clearTimeout(timeout);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [WebUserloading, isWebUserLoading]);

    if (WebUser && isWebUser) {
        return children;
    }

    if (!userFound) {
        return <Navigate to="/user/auth/login" />;
    } else {
        return <ScreenLoad />
    }

 

};

export default PrivateRoute;