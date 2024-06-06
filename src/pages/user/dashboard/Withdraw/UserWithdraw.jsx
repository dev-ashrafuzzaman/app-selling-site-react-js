import { useNavigate, useParams } from 'react-router-dom';
import useWebUser from '../../../../hooks/web/useWebUser';
import { useState } from 'react';
import { ErrorToast, SuccessToast } from '../../../../utils/Toastify';
import { ToastContainer } from 'react-toastify';
import useUserSecure from '../../../../hooks/web/useUserSecure';
import ScreenLoad from '../../../../components/ScreenLoad';
import { softInfo } from '../../../../utils/info';

const UserWithdraw = () => {
    const [axiosSecure] = useUserSecure()
    const navigate = useNavigate();
    const [isWebUser] = useWebUser()
    const selectType = useParams();
    const [btnActive, setActive] = useState(false);
    const withdrawType = isWebUser.global.withdrawType.find(type => type.name == selectType.id);
    const [Values, setValues] = useState({
        amount: '',
        number: '',
    })



    const handleWithdraw = async () => {
        setActive(true)
        const withdraw = {
            amount: Values.amount,
            number: Values.number,
            uid: isWebUser.user.id,
            method: selectType.id,
        }
        if (Values.amount === '' || Values.number === '') {
            ErrorToast('Input Field Is Empty');
            setActive(false)
        } else {
            try {
                await axiosSecure.post(`${import.meta.env.VITE_BASE_URL}/api/v1/web/user/withdraw`, { withdraw, currency: softInfo.currency })
                    .then(data => {
                        if (data.data.insertedId) {
                            SuccessToast('Withdraw Success')
                            setValues({
                                amount: '',
                                number: '',
                            })
                            setActive(false)
                            const timeoutId = setTimeout(() => {
                                navigate('/user/auth/dashboard/withdraw-history');
                            }, 2000)
                            setTimeout(() => {
                                clearTimeout(timeoutId);
                            }, 2000);
                        } else {
                            ErrorToast(data.data.Error)
                            setActive(false)
                        }
                    })

            } catch (error) {
                console.error(error);
                setActive(false)
            }
        }
    };

    return (
        <> {btnActive && <ScreenLoad></ScreenLoad>}
            <div className='max-w-screen-sm mx-auto flex justify-center items-center my-10'>
                <div>
                    <div className="card bg-base-100 shadow-xl drop-shadow-lg border-2 border-dashed">
                        <div className="flex justify-center items-center border-b-2 border-dashed">
                            <img className="p-2" width={280} src={withdrawType.logo} alt="Withdraw" />
                        </div>
                        <div className="card-body">
                            <h2 className="text-center text-xl font-bold">{withdrawType.name}</h2>
                            <p className='text-center p-2 text-red-600 bg-red-50 rounded-lg border-2 border-dashed'>Your Available Balance: {isWebUser.user.balance}</p>
                            <p className="text-sm text-justify">{withdrawType.details}</p>
                            <div className='space-y-2'>
                                <label className="input input-bordered flex items-center gap-2">
                                    Amount
                                    <input type="number" name='amount' className="grow" placeholder="Enter Your Amount"
                                        onChange={e => setValues({ ...Values, amount: e.target.value })}
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    Number
                                    <input type="number" name='number' className="grow" placeholder="Enter Your Bkash Amount"
                                        onChange={e => setValues({ ...Values, number: e.target.value })} />
                                </label>
                            </div>
                            <div className="card-actions">
                                <button onClick={() => handleWithdraw()} disabled={btnActive} className="btn btn-success text-white w-full my-4">Withdraw</button>
                            </div>
                        </div>
                        <div className='bg-gray-100 p-2 rounded-b-xl space-y-2'>
                            <p className='font-bold mb-4 text-center text-xl'>Withdraw Rules</p>
                            <p className='border-2 p-2 border-dashed border-white'>1. Withdraw Minimum Amount: <span className='font-bold'>{isWebUser?.global?.withdrawRules?.minAmount}</span> </p>
                            <p className='border-2 p-2 border-dashed border-white'>2. Withdraw Maximum Amount: <span className='font-bold'>{isWebUser?.global?.withdrawRules?.maxAmount}</span></p>
                            <p className='border-2 p-2 border-dashed border-white'>3. Withdraw Charge: <span className='font-bold'>{isWebUser?.global?.withdrawRules?.outAmount}</span></p>
                            <p className='border-2 p-2 border-dashed border-white'>4. Minimum Refer Member: <span className='font-bold'>{isWebUser?.global?.withdrawRules?.minRef}</span></p>
                            <p className='border-2 p-2 border-dashed border-white'>5. Withdraw Time: <span className='font-bold'>{isWebUser?.global?.withdrawRules?.withTime}</span></p>
                        </div>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </>
    );
};

export default UserWithdraw;