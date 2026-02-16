import ArrowTopSvg from "../../../../assets/svgs/ArrowTopSvg";
import img from "../../../../assets/images/img1.jpg";
import Status from "../../../global/Status";
import SelectOption  from '../../../global/SelectOption';
import { useSelector } from "react-redux";
import TealPagination   from '../../../global/TealPagination'
import PageLimit   from '../../../global/PageLimit'
import ItemNotFound   from '../../../../components/global/ItemNotFound';
import DisplayError from '../../../../components/global/DisplayError';
import Loader   from '../../../../components/global/Loader'
import moment from "moment";
import { baseURL } from "../../../../config/api";



const EventTable = ( {
   currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
}) => {

    const { docs ,} = useSelector(state => state.eventRegistration);

  
//  const donationTable = [
//     {
//       id: "#D-321330",
//       date: "2025-04-01 03:55:23",
//       name: "John Due",
//       description: "Sending Love & Support",
//       amount: 3000,
//       status: "Going",
//     },
//     {
//       id: "#D-321330",
//       date: "2025-04-01 03:55:23",
//       name: "John Due",
//       description: "Sending Love & Support",
//       amount: 3000,
//       status: "Going",
//     },
//     {
//       id: "#D-321330",
//       date: "2025-04-01 03:55:23",
//       name: "anonymous",
//       description: "Sending Love & Support",
//       amount: 3000,
//       status: "Going",
//     },
//      {
//       id: "#D-321330",
//       date: "2025-04-01 03:55:23",
//       name: "John Due",
//       description: "Sending Love & Support",
//       amount: 3000,
//       status: "Going",
//     },
//     {
//       id: "#D-321330",
//       date: "2025-04-01 03:55:23",
//       name: "anonymous",
//       description: "Sending Love & Support",
//       amount: 3000,
//       status: "Going",
//     },
//   ];
  // const typeOptions = ["Donor", "Participation", "Volunteer"];

  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4 ">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Going to Event</p>
        {/* <SelectOption title="Latest" options={typeOptions} /> */}

      </div>

    {isLoading ? (
                   <Loader />
                 ) : isError ? (
                   <DisplayError message={error?.message || "Something went wrong"} />
                 ) : docs?.length > 0 ? (
       <div className="overflow-x-auto maintable">
     <table className="w-full mt-5 min-w-max md:min-w-full">
       {/* Table Header */}
       <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
         <tr>
           <th className="px-3 py-4 rounded-tl-[12px] rounded-bl-[12px]">
             <div className="flex items-center gap-0.5">Event ID</div>
           </th>
   
           <th className="px-3 py-4">
             <div className="flex items-center gap-0.5">User</div>
           </th>
              <th className="px-3 py-4">
             <div className="flex items-center gap-0.5">Email</div>
           </th>
              <th className="px-3 py-4">
             <div className="flex items-center gap-0.5">Roles</div>
           </th>
           
           
   
           <th className="px-3 py-4">
             <div className="flex items-center gap-0.5">Event Date</div>
           </th>
   
     <th className="px-3 py-4">
     <div className="flex items-center gap-0.5">Registered Date</div>
   </th>
   
           
   
           <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">
             <div className="flex items-center gap-0.5">Status</div>
           </th>
         </tr>
       </thead>
   
       {/* Table Body */}
       <tbody>
         {docs?.map((row) => {
           // Format event date
       const eventDate = row?.event?.eventDate
     ? moment(row.event.eventDate).format('MMM DD, YYYY hh:mm A')
     : 'N/A';
   
   const registerDate = row?.updatedAt
     ? moment(row.updatedAt).format('MMM DD, YYYY hh:mm A')
     : 'N/A';
   
   
   
           return (
             <tr key={row?._id} className="border-t">
               {/* Event ID */}
               <td className="px-3 py-4">{row?.event?.longAutoIncrementId || 'N/A'}</td>
   
               {/* Event Title with Image */}
               <td className="px-3 py-4">
                 <div className="flex items-center gap-2">
                   <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                     <img
                       src={
                           row?.user?.image?.relativeAddress
                           ? `${baseURL}/${row?.user?.image?.relativeAddress}`
                           : img
                       }
                       alt={row?.username || 'username'}
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <span>{row?.user?.username || 'N/A'}</span>
                 </div>
               </td>

                <td className="px-3 py-4">{row?.user?.email}</td>
                
                <td className="px-3 py-4">{row?.user?.roles[0]}</td>
               <td className="px-3 py-4">{eventDate}</td>
                <td className="px-3 py-4">{registerDate}</td>
   
               
   
               {/* Status */}
               <td className="px-3 py-4">
                 <Status status={row?.status} />
               </td>
             </tr>
           );
         })}
       </tbody>
     </table>
   </div>
   
       
          ) : (
                         <ItemNotFound message="No Event  found." />
                       )}

    
    </div>
  );
};

export default EventTable;
