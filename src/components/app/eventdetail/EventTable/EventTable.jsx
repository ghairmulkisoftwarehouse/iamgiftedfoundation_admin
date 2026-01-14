import ArrowTopSvg from "../../../../assets/svgs/ArrowTopSvg";
import img from "../../../../assets/images/img1.jpg";
import Status from "../../../global/Status";

import SelectOption  from '../../../global/SelectOption';




const EventTable = () => {
 const donationTable = [
    {
      id: "#D-321330",
      date: "2025-04-01 03:55:23",
      name: "John Due",
      description: "Sending Love & Support",
      amount: 3000,
      status: "Going",
    },
    {
      id: "#D-321330",
      date: "2025-04-01 03:55:23",
      name: "John Due",
      description: "Sending Love & Support",
      amount: 3000,
      status: "Going",
    },
    {
      id: "#D-321330",
      date: "2025-04-01 03:55:23",
      name: "anonymous",
      description: "Sending Love & Support",
      amount: 3000,
      status: "Going",
    },
     {
      id: "#D-321330",
      date: "2025-04-01 03:55:23",
      name: "John Due",
      description: "Sending Love & Support",
      amount: 3000,
      status: "Going",
    },
    {
      id: "#D-321330",
      date: "2025-04-01 03:55:23",
      name: "anonymous",
      description: "Sending Love & Support",
      amount: 3000,
      status: "Going",
    },
  ];
  const typeOptions = ["Donor", "Participation", "Volunteer"];

  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4 ">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Going to Event</p>
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
          User
               <ArrowTopSvg/>
                </div>
                
                </th>
             
                <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">
                    <div className="flex items-center gap-0.5">  
          Status
               <ArrowTopSvg/>
                </div>
              </th>
                
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

              

      

                  <td className="px-3 py-4">
                  <Status status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
      )}

    
    </div>
  );
};

export default EventTable;
