import { useState } from "react";
import Pagination from "../../utils/Pagination";
import TopSearch from "../../utils/TopSearch";

const Table = ({ head, children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / pageSize);
  const refetch = {};
  return (
    <>
      <div className="px-6">
        <TopSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          refetch={refetch}></TopSearch>

        {/* Table Section With Pagination */}
        <table className="w-full">
            {/* THead */}
          <thead>
            <tr className="border bg-sky-50">
              {head?.map((item, index) => (
                <th key={index} className="border-2 p-2 font-bold">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
        {/* Pagination */}
        <Pagination
          setCurrentPage={setCurrentPage}
          refetch={refetch}
          searchQuery={searchQuery}
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          setPageSize={setPageSize}></Pagination>
      </div>
    </>
  );
};

export default Table;