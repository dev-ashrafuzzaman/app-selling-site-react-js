import { FaPowerOff, FaTrash } from "react-icons/fa";
import {  HandleDeleteWithSingleImg } from "../../utils/HandleDelete";
import { HandleStatusChange } from "../../utils/HandleStatusChange";

const VisitEarnTable = ({ data, sl, refetch, axiosSecure }) => {
    return (
        <tr className='border-2 hover:bg-slate-100'>
            <th className='border-2'>{sl + 1}</th>
            <td className='border-2'>
                <img className="w-32" src={`${import.meta.env.VITE_BASE_URL}${data.url}`} alt="" />
            </td>
            <td className='border-2'>{data.status === true ? "Active" : 'De-active'}</td>
           
            <th className="flex justify-center items-center gap-2">
                <button onClick={() => HandleStatusChange(axiosSecure, refetch, data._id, 'visit', !data.status)} className={`btn btn-xs tooltip text-white ${data.status === true ? 'btn-success' : 'bg-slate-300'}`} data-tip="Status Change"><FaPowerOff></FaPowerOff> </button>
                <button onClick={() => HandleDeleteWithSingleImg(axiosSecure, refetch, data, 'visit')} className="btn btn-xs btn-error text-white tooltip" data-tip="Delete" ><FaTrash></FaTrash></button>
            </th>
        </tr>
    );
};

export default VisitEarnTable;