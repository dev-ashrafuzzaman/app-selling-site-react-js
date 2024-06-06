import { useState } from 'react';
import useAdmin from '../hooks/useAdmin';
import ScreenLoad from '../components/ScreenLoad';
import SidebarComponent from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [toggled, setToggled] = useState(false);
    const [isAdmin] = useAdmin();

    return (
        <>
            {
                !isAdmin && <ScreenLoad></ScreenLoad>
            }
            <div className='flex'>
                <SidebarComponent toggled={toggled} setToggled={setToggled}></SidebarComponent>
                <Navbar toggled={toggled} setToggled={setToggled}></Navbar>
            </div>
        </>
    );
};

export default Dashboard;