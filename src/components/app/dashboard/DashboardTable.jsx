import moment from "moment";
import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import Status from "../../global/Status";
import TealPagination   from '../../../components/global/TealPagination'
import PageLimit   from '../../../components/global/PageLimit';

const DashboardTable = () => {
  const donations = [
    {
      donationId: "#D-321330",
      dateTime: "2025-04-01 03:55:23",
      donor: "John Due",
      detail: {
        name: "Sarah Blue",
        email: "Blue@fleetmanager.com",
      },
      amount: 3000,
      status: "Successful",
    },
    {
      donationId: "#D-321330",
      dateTime: "2025-04-01 03:55:23",
      donor: "John Due",
      detail: {
        name: "Sarah Blue",
        email: "Blue@fleetmanager.com",
      },
      amount: 3000,
      status: "Successful",
    },
    {
      donationId: "#D-321330",
      dateTime: "2025-04-01 03:55:23",
      donor: "John Due",
      detail: {
        name: "Sarah Blue",
        email: "Blue@fleetmanager.com",
      },
      amount: 3000,
      status: "Successful",
    },
    {
      donationId: "#D-321330",
      dateTime: "2025-04-01 03:55:23",
      donor: "John Due",
      detail: {
        name: "Sarah Blue",
        email: "Blue@fleetmanager.com",
      },
      amount: 3000,
      status: "Successful",
    },
    {
      donationId: "#D-321330",
      dateTime: "2025-04-01 03:55:23",
      donor: "John Due",
      detail: {
        name: "Sarah Blue",
        email: "Blue@fleetmanager.com",
      },
      amount: 3000,
      status: "Successful",
    },
  ];

  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-2">
        <p className="text-black font-semibold">Donations</p>
      </div>

      {donations.length === 0 ? (
        <p className="text-center py-6 text-gray-400">
          No Recent Customer found.
        </p>
      ) : (
        <div className="overflow-x-auto maintable">
          <table className="w-full mt-5 min-w-max md:min-w-full">
            <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
              <tr>
                <th className="px-3 py-4 flex items-center gap-0.5 rounded-tl-[12px] rounded-bl-[12px]">
                  <div className="flex items-center gap-0.5">
                    <span>Donation ID</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Date & Time</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Donor</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Detail</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Amount</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">
                  <div className="flex items-center gap-0.5">
                    <span>Status</span>
                    <ArrowTopSvg />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {donations.map((row, index) => (
                <tr key={index}>
                  <td className="px-3 py-4">{row.donationId}</td>

                  <td className="px-3 py-4 break-words max-w-[100px]">{row.dateTime}</td>

                  <td className="px-3 py-4 whitespace-nowrap ">
                    <div className="flex items-center gap-2">
                      <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                        <img
                          src={img}
                          alt="user avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {row.donor}
                    </div>
                  </td>

                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                        <img
                          src={img}
                          alt="user avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <h2 className="font-medium">
                          {row?.detail?.name}
                        </h2>
                        <p className="font-medium text-xs text-black/70">
                          {row?.detail?.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">{row.amount}</td>

                  <td className="px-3 py-4">
                    <Status status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
        <div className=" flex items-center gap-2 text-xs sm:text-sm text-[#313131]">
        <div>Show</div>
         <div className="w-fit h-[40px] ">
        <PageLimit totalpages={ 10} limit={10} setLimit={4}/>
        </div>
         <div>of 2560 results</div>

        </div>
          
               <TealPagination 
           totalPages={2}
              currentPage={1}
             setCurrentPage={1}
      />
                                      {/* Limit Dropdown */}
      
                          
                                  
                                    
                          
                                    
                                    </div>
    </div>
  );
};

export default DashboardTable;
