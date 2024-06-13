const TruckTable = ({
    head,
    children,
  }) => {
    return (
      <>
        <div className="px-6">
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
        </div>
      </>
    );
  };
  
  export default TruckTable;