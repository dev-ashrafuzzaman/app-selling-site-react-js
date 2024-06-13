import { FaCoins, FaEdit,  FaPowerOff, FaTrash } from "react-icons/fa";
import { HandleDelete } from "../../utils/HandleDelete";
import { HandleStatusChange } from "../../utils/HandleStatusChange";
import { Link } from "react-router-dom";
import { MdPassword } from "react-icons/md";

const CustomerTable = ({ data, sl, refetch, axiosSecure,showModal,showModal1 }) => {
    return (
        <tr className='border-2 hover:bg-slate-100'>
            <th className='border-2'>{sl + 1}</th>
            <td className='border-2'> <a className="text-sky-600 font-bold cursor-pointer" href={`/leery/admin/dashboard/track-user/${data.email}`} target="_blank">{data?.email}</a></td>
            <td className='border-2'>{data?.referCode}</td>
            <td className='border-2'>{data?.name}</td>
            <td className='border-2'>{data?.refBy?.length}</td>
            <td className='border-2'>{data?.reseller}</td>
            <td className='border-2'><p className="badge-success rounded-badge text-center font-bold text-white">{data?.balance}</p></td>
            <th className="flex justify-center items-center gap-2">
                <button onClick={() => HandleStatusChange(axiosSecure, refetch, data._id, 'user', !data.status)} className={`btn btn-xs tooltip text-white ${data.status === true ? 'btn-success' : 'bg-slate-300'}`} data-tip="Status Change"><FaPowerOff></FaPowerOff> </button>
                <Link to={`/leery/admin/dashboard/track-user/${data.email}`} className="btn btn-xs btn-warning"><FaEdit></FaEdit></Link>
                <button onClick={()=>showModal(data)} className="btn btn-xs btn-info text-white tooltip" data-tip={'Pass Change'}><MdPassword></MdPassword></button>
                <button onClick={()=>showModal1(data)} className="btn btn-xs btn-neutral text-white tooltip" data-tip={'Bonus'}><FaCoins></FaCoins></button>
                <button onClick={() => HandleDelete(axiosSecure, refetch, data._id, 'user')} className="btn btn-xs btn-error text-white tooltip" data-tip="Delete" ><FaTrash></FaTrash></button>
            </th>
        </tr>
    );
};

export default CustomerTable;