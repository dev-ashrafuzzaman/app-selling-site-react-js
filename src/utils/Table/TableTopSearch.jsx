import { MdRefresh } from "react-icons/md";

const TableTopSearch = ({ searchQuery, setSearchQuery, refetch }) => {
    return (
        <div className='flex justify-end items-center mb-4 px-2'>
            <div className="join w-full md:w-[800px]">
                <div className="w-full">
                    <input
                        className="input input-bordered w-full join-item"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button onClick={() => refetch()} className="btn join-item border tooltip btn-error text-white" data-tip="Refresh"><MdRefresh></MdRefresh></button>
            </div>
        </div>
    );
};

export default TableTopSearch;