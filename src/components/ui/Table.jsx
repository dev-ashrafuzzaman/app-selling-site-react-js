import { useState } from "react";
import TopSearch from "../../utils/TopSearch";
import Pagination from "../../utils/Pagination";

const Table = ({
  head,
  children,
  refetch,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  searchQuery,
  setSearchQuery,
  totalPages,
  totalCount,
}) => {
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
