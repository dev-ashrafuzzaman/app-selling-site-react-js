
import useWebUser from '../hooks/web/useWebUser';
import { useState } from 'react';
import ScreenLoad from '../components/ScreenLoad';
import WebNavbar from '../components/WebUser/WebNavbar';
import WebSidebar from '../components/WebUser/WebSidebar';

const WebDashboard = () => {
    const [toggled, setToggled] = useState(false);
    const [isWebUser] = useWebUser()
    return (
        <>
        {
            !isWebUser && <ScreenLoad></ScreenLoad>
        }
        <div className='flex'>
            <WebSidebar toggled={toggled} setToggled={setToggled}></WebSidebar>
            <WebNavbar toggled={toggled} setToggled={setToggled} isWebUser={isWebUser?.user?.name}></WebNavbar>
        </div>
    </>
    );
};

export default WebDashboard;