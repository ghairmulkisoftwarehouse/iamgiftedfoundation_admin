import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import Status from "../../global/Status";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import SelectOption  from '../../../components/global/SelectOption';




const DonationsTable = () => {
 const donationTable = [
    {
      id: "#D-321330",
      date: "2025-04-01 03:55:23",
      name: "John Due",
      description: "Sending Love & Support",
      amount: 3000,
      status: "Successful",
    },
    {
      id: "#D-321330",
      date: "2025-04-01 03:55:23",
      name: "John Due",
      description: "Sending Love & Support",
      amount: 3000,
      status: "Successful",
    },
    {
      id: "#D-321330",
      date: "2025-04-01 03:55:23",
      name: "anonymous",
      description: "Sending Love & Support",
      amount: 3000,
      status: "Successful",
    },
  ];
  const typeOptions = ["Donor", "Participation", "Volunteer"];

  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Donations</p>
        <SelectOption title="Latest" options={typeOptions} />

      </div>

      { donationTable.length === 0 ? (
        <p className="text-center py-6 text-gray-400">
          No Recent Donation found.
        </p>
      ) : (
         <div className="overflow-x-auto maintable">
          <table className="w-full mt-5  min-w-max md:min-w-full">
            <thead className="text-left text-[13px] sm:text-sm md:text-[15px] ">
              <tr>
                <th className="px-3 py-4 rounded-tl-[12px] rounded-bl-[12px]">
               <div className="flex items-center gap-0.5">  
               ID
               <ArrowTopSvg/>
                </div>
               </th>
                <th className="px-3 py-4">
                    <div className="flex items-center gap-0.5">  
            Date & Time
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4">
                   <div className="flex items-center gap-0.5">  
           Donor
               <ArrowTopSvg/>
                </div>
                
                </th>
                <th className="px-3 py-4">
                
                  <div className="flex items-center gap-0.5">  
          Detail
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4">
                    <div className="flex items-center gap-0.5">  
           Amount
               <ArrowTopSvg/>
                </div>
              </th>
                <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">Status</th>
              </tr>
            </thead>

            <tbody>
              {donationTable.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-3 py-4">{row.id}</td>

                  <td className="px-3 py-4 break-words max-w-[100px] ">
                    {row.date}
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                                             <img
                                               src={img}
                                               alt="user avatar"
                                               className="w-full h-full object-cover"
                                             />
                                           </div>
                      {row.name}
                    </div>
                  </td>

                  <td className="px-3 py-4 break-words  whitespace-normal  max-w-[280px]">
                  <span className="text-black/65">{row.description}</span>
                    
                  </td>

                  <td className="px-3 py-4 ">
                    {row.amount}
                  </td>

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

export default DonationsTable;
