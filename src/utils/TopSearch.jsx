import { FaSearch } from "react-icons/fa";
const TopSearch = ({ searchQuery, setSearchQuery, refetch }) => {
    return (
        <div className='flex justify-end items-center mb-4 mt-10 join'>
        <div className="flex justify-center items-center  w-[400px]">
            <div className="w-full">
                <input
                    className="input input-bordered  w-full join-item "
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button onClick={() => refetch()} className="btn join-item  btn-error text-white" data-tip="Refresh"><FaSearch></FaSearch></button>
        </div>
    </div>
    );
};

export default TopSearch;