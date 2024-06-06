import { FaBell } from 'react-icons/fa';
import useWebUser from '../../../../hooks/web/useWebUser';

const UserInbox = () => {
    const [isWebUser] = useWebUser()
    return (
        <div className='max-w-screen-lg mx-auto my-10 flex justify-center items-center card glass md:p-10 p-2 '>
            <div>
                <p className='text-2xl font-bold text-red-600 flex items-center gap-1'><FaBell></FaBell> নির্দেশনা</p>
                <p className='text-justify my-2'>{isWebUser?.user?.notice}</p>
            </div>
        </div>
    );
};

export default UserInbox;