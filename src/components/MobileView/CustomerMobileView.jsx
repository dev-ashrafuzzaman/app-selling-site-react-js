import { FaCoins, FaConnectdevelop, FaEdit, FaNetworkWired, FaPowerOff, FaTrash, FaUserAlt } from "react-icons/fa";
import { MdCardMembership, MdEmail, MdPassword } from "react-icons/md";
import { HandleDelete } from "../../utils/HandleDelete";
import { HandleStatusChange } from "../../utils/HandleStatusChange";
import { Link } from "react-router-dom";

const CustomerMobileView = ({ data, refetch, axiosSecure, showModal, showModal1 }) => {
    return (
        <div className="border-2 border-dashed  p-2 rounded-xl space-y-1">
            <p className="flex items-center gap-1"><MdEmail></MdEmail>{data?.email}</p>
            <div className="flex items-center justify-between">
                <p className="flex items-center gap-1"><MdCardMembership></MdCardMembership>{data?.referCode}</p>
                <p className="flex items-center gap-1"><FaNetworkWired></FaNetworkWired>{data?.refBy?.length}</p>
                <p className="flex items-center gap-1"><FaCoins></FaCoins>{data?.balance}</p>
                <p className="flex items-center gap-1"><FaConnectdevelop></FaConnectdevelop>{data.ipAddress}</p>
            </div>
            <p className="flex items-center gap-1 "><FaUserAlt></FaUserAlt>{data.name}</p>
            <div className="flex justify-center items-center gap-5 py-2">
                <button onClick={() => HandleStatusChange(axiosSecure, refetch, data._id, 'user', !data.status)} className={`btn btn-xs tooltip text-white ${data.status === true ? 'btn-success' : 'bg-slate-300'}`} data-tip="Status Change"><FaPowerOff></FaPowerOff> </button>
                <Link to={`/leery/admin/dashboard/track-user/${data._id}`} className="btn btn-xs btn-warning"><FaEdit></FaEdit></Link>
                <button onClick={() => showModal(data)} className="btn btn-xs btn-info text-white tooltip" data-tip={'Pass Change'}><MdPassword></MdPassword></button>
                <button onClick={() => showModal1(data)} className="btn btn-xs btn-neutral text-white tooltip" data-tip={'Bonus'}><FaCoins></FaCoins></button>
                <button onClick={() => HandleDelete(axiosSecure, refetch, data._id, 'user')} className="btn btn-xs btn-error text-white tooltip" data-tip="Delete" ><FaTrash></FaTrash></button>
            </div>
        </div>
    );
};

export default CustomerMobileView;