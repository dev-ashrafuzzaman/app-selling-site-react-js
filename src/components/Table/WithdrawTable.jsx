import { FaEdit, FaTrash } from "react-icons/fa";
import { HandleDelete } from "../../utils/HandleDelete";
const WithdrawTable = ({ data, sl, refetch, axiosSecure, global, user, showModal }) => {
    console.log(data);
    return (
        <tr className='border-2 hover:bg-slate-100'>
            <th className='border-2'>{sl + 1}</th>
            <td className='border-2'>
                <div className="font-semibold">
                    <a className="text-sky-600 font-bold cursor-pointer" href={`/leery/admin/dashboard/track-user/${user?.email}`} target="_blank">Email: {user?.email}</a>
                    <p>RefId: {user?.referCode}</p>
                    <p className="text-error">RefBy: {user?.refBy?.length}</p>
                </div>
            </td>
            <td className='border-2'>
                <div className="font-semibold">
                    <p>Withdraw Number: {data?.withdrawNumber}</p>
                    <p>Withdraw Currency: {data?.currency}</p>
                    <p className="badge-accent text-white px-2 rounded-2xl">Method: {data?.mathod}</p>
                </div>
            </td>
            <td className='border-2'>
                <div className="font-semibold">
                    <p>Withdraw Amounts: {data?.outAmount}</p>
                    <p>Withdraw Charge: {global?.withdrawRules?.outAmount}</p>
                    <p className="font-bold">Final Amounts: {parseInt(data?.outAmount) + parseInt(global?.withdrawRules?.outAmount)}</p>
                </div>
            </td>
            <td className='border-2'><p className={`badge  ${data?.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-600' : data?.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-600' : 'bg-red-50 text-red-600 border-red-600'}`}>{data?.status}</p></td>
            <th className="md:space-x-1 space-y-1 w-[180px]">
                <button onClick={() => showModal(data)} className="btn btn-xs btn-info text-white"><FaEdit></FaEdit></button>
                <button onClick={() => HandleDelete(axiosSecure, refetch, data?._id, 'user')} className="btn btn-xs btn-error text-white tooltip" data-tip="Delete" ><FaTrash></FaTrash></button>
            </th>
        </tr>
    );
};

export default WithdrawTable;