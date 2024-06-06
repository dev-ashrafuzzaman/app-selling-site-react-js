import { FaPowerOff, FaTrash } from "react-icons/fa";
import { HandleDelete } from "../../utils/HandleDelete";
import { HandleStatusChange } from "../../utils/HandleStatusChange";

const VisitEarnTable = ({ data, sl, refetch, axiosSecure }) => {
    return (
        <tr className='border-2 hover:bg-slate-100'>
            <th className='border-2'>{sl + 1}</th>
            <td className='border-2'><a href={data.link} target="_blank" className="text-primary cursor-pointer font-bold">Click</a></td>
            <td className='border-2'><span className="line-clamp-1">{data?.title}</span></td>
            <td className='border-2'>{data?.published}</td>
            <td className='border-2'>{data?.count}</td>
            <td className='border-2'><p className="badge-success rounded-badge text-center font-bold text-white">{data?.amount}</p></td>
            <th className="flex justify-center items-center gap-2">
                <button onClick={() => HandleStatusChange(axiosSecure, refetch, data._id, 'visit', !data.status)} className={`btn btn-xs tooltip text-white ${data.status === true ? 'btn-success' : 'bg-slate-300'}`} data-tip="Status Change"><FaPowerOff></FaPowerOff> </button>
                <button onClick={() => HandleDelete(axiosSecure, refetch, data._id, 'visit')} className="btn btn-xs btn-error text-white tooltip" data-tip="Delete" ><FaTrash></FaTrash></button>
            </th>
        </tr>
    );
};

export default VisitEarnTable;