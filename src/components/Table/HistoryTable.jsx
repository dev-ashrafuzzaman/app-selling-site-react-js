import { FaEdit, FaTrash } from "react-icons/fa";
import { HandleDelete } from "../../utils/HandleDelete";

const HistoryTable = ({ data, sl, refetch, axiosSecure }) => {
    return (
        <tr className='border-2 hover:bg-slate-100'>
            <th className='border-2'>{sl + 1}</th>
            <td className='border-2'>
                <div className="font-semibold">
                    <p className="text-error">{data?.date}</p>
                </div>
            </td>
            <td className='border-2'>
                <div className="font-semibold">
                    <p className="badge-ghost p-1 rounded-full text-center">{data?.by}</p>
                </div>
            </td>
            <td className='border-2'>
                <div className="font-semibold">
                <p className="badge-accent text-white  p-1 md:rounded-full text-center">{data?.type}</p>
                </div>
            </td>
            <td className='border-2 font-bold'>{data.amount}</td>
            <th className="md:space-x-1 space-y-1 w-[180px]">
                <button onClick={() => HandleDelete(axiosSecure, refetch, data._id, 'user')} className="btn btn-xs btn-error text-white tooltip" data-tip="Delete" ><FaTrash></FaTrash></button>
            </th>
        </tr>
    );
};

export default HistoryTable;