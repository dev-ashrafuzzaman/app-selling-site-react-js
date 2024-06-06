import { FaEdit, FaTrash } from "react-icons/fa";
import { HandleDeleteWithImg } from "../../utils/HandleDelete";

const JobSubmitTable = ({ data, sl, refetch, axiosSecure, showModal1, showModal  }) => {
    return (
        <tr className='border-2 hover:bg-slate-100'>
            <th className='border-2'>{sl + 1}</th>
            <td className='border-2'>
                <div className="font-semibold">
                <a className="text-sky-600 font-bold cursor-pointer" href={`/leery/admin/dashboard/track-user/${data.uid}`} target="_blank">User: {data?.uid}</a>
                </div>
                <div className="font-semibold">
                    <p className="text-error">{data?.visitTime}</p>
                </div>
            </td>
            <td className='border-2'>
                <div className="font-semibold">
                    <p>{data?.subTime1}</p>
                </div>
            </td>
            <td className='border-2 w-full h-16 tooltip' data-tip={'Click View Prof'} onClick={() => showModal1(data, 'p1')}>
                <img src={`${import.meta.env.VITE_BASE_URL}${data.prof1}`} alt="" />
            </td>
            <td className='border-2'>{data?.subTime2}</td>
            <td className='border-2 w-full h-16 tooltip' data-tip={'Click View Prof'} onClick={() => showModal1(data , 'p2')}>
                <img src={`${import.meta.env.VITE_BASE_URL}${data.prof2}`} alt="" />
            </td>
            <td className='border-2'><p className={`badge  ${data?.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-600' : data?.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-600' : 'bg-red-50 text-red-600 border-red-600'}`}>{data?.status}</p></td>
            <th className="md:space-x-1 space-y-1 w-[180px]">
                <button onClick={() => showModal(data)} className="btn btn-xs btn-info text-white"><FaEdit></FaEdit></button>
                <button onClick={() => HandleDeleteWithImg(axiosSecure, refetch, data, 'job/submit')} className="btn btn-xs btn-error text-white tooltip" data-tip="Delete" ><FaTrash></FaTrash></button>
            </th>
        </tr>
    );
};

export default JobSubmitTable;