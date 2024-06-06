import { FaEdit, FaEye, FaPowerOff, FaTrash } from "react-icons/fa";
import { HandleDelete } from "../../utils/HandleDelete";
import { HandleStatusChange } from "../../utils/HandleStatusChange";
import { Link } from "react-router-dom";

const PaymentTable = ({ data, sl, refetch , axiosSecure}) => {
    return (
        <tr className='border-2 hover:bg-slate-100'>
            <th className='border-2'>{sl + 1}</th>
            <td className='border-2'>{data.email}</td>
            <td className='border-2'>{data.refId}</td>
            <td className='border-2'>{data.name}</td>
            <td className='border-2'>{data.userName}</td>
            <td className='border-2'>{data.activeVip.validity}</td>
            <td className='border-2'>{data.balance}</td>
            <th className="md:space-x-1 space-y-1 w-[180px]">
                <button onClick={()=> HandleStatusChange(axiosSecure , refetch , data._id ,'user' , !data.status)} className={`btn btn-xs tooltip text-white ${data.status === true ? 'btn-success' : 'bg-slate-300'}`} data-tip="Status Change"><FaPowerOff></FaPowerOff> </button>
                <Link to={`/leery/admin/dashboard/update-user/${data._id}`} className="btn btn-xs btn-warning"><FaEye></FaEye></Link>
                <button className="btn btn-xs btn-info text-white"><FaEdit></FaEdit></button>
                <button onClick={() => HandleDelete(axiosSecure , refetch , data._id ,'user')} className="btn btn-xs btn-error text-white tooltip" data-tip="Delete" ><FaTrash></FaTrash></button>
            </th>
        </tr>
    );
};

export default PaymentTable;