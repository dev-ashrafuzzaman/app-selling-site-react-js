import { MdCopyAll } from "react-icons/md";
import useWebUser from "../../../../hooks/web/useWebUser";
import { SuccessToast } from "../../../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import SectionTitle from "../../../../components/SectionTitle";
import { FaUser } from "react-icons/fa";

const Refer = () => {
    const [isWebUser] = useWebUser()
    const myReferCopy = () => {
        var copyText = document.getElementById("myRefer");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        SuccessToast('Copy Success')
    }
    const myReferLink = () => {
        var copyText = document.getElementById("myReferLink");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        SuccessToast('Copy Success')
    }
    return (
        <div className="my-4">
            <div className="flex justify-between p-4 bg-green-600 my-6 rounded-xl text-white font-bold">
                <p>Team Size</p>
                <p>:</p>
                <p>{isWebUser?.user?.refBy?.length} People</p>
            </div>
            <div className="bg-white rounded-2xl drop-shadow-xl border mb-10">
                <div className="bg-gray-100 p-2 rounded-t-2xl text-xl font-bold">Refer Code</div>
                <div className="p-4">
                    <input type="text" defaultValue={isWebUser?.user?.referCode} id="myRefer" className="w-full bg-sky-100 p-4 rounded-2xl text-center font-bold" />
                    <div className="flex justify-center items-center my-2">
                        <button onClick={() => myReferCopy()} className="flex justify-center items-center gap-1 btn bg-green-600 text-white">Copy Refer Code <MdCopyAll></MdCopyAll></button>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl drop-shadow-xl border">
                <div className="bg-gray-100 p-2 rounded-t-2xl text-xl font-bold">Refer Link</div>
                <div className="p-4">
                    <input type="text" defaultValue={`https://fasterappmaker.com/user/auth/register?inviteCode=${isWebUser?.user?.referCode}`} id="myReferLink" className="w-full bg-sky-100 p-4 rounded-2xl text-center font-bold" />
                    <div className="flex justify-center items-center my-2">
                        <button onClick={() => myReferLink()} className="flex justify-center items-center gap-1 btn bg-green-600 text-white">Copy Refer Link <MdCopyAll></MdCopyAll></button>
                    </div>
                </div>
            </div>
            <SectionTitle heading={'My Refer Member'}></SectionTitle>
            <div className="grid md:grid-cols-3 gap-4 bg-white rounded-2xl border drop-shadow-xl p-6">
                {
                    isWebUser?.user?.refBy.map((ref, index) => <div
                        className="border-2 border-dashed p-4 flex items-center gap-2"
                        key={index}
                    ><FaUser></FaUser>{ref.uId}</div>)
                }
                {
                    isWebUser?.user?.refBy.length === 0 && <>
                        <p className="text-center text-red-600">{`Please provide your referral number as you don't have a team assigned.`}</p>
                    </>
                }
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Refer;