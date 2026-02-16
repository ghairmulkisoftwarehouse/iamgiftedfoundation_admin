import ArrowTopSvg from "../../../../assets/svgs/ArrowTopSvg";
import img from "../../../../assets/images/img1.jpg";
import Status from "../../../global/Status";

import SelectOption  from '../../../global/SelectOption';
import TealPagination   from '../../../global/TealPagination'
import PageLimit   from '../../../global/PageLimit'
import ItemNotFound   from '../../../../components/global/ItemNotFound';
import DisplayError from '../../../../components/global/DisplayError';
import Loader   from '../../../../components/global/Loader'
import { useSelector } from "react-redux";
import { baseURL } from "../../../../config/api";

import moment from "moment";

const AppUserEventTable = (  {
   currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
}) => {


    const { docs , pages ,docsCount } = useSelector(state => state.eventRegistration);   




  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4 ">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Going to Event</p>

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
          <div className="flex items-center gap-0.5">Event</div>
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
                      row?.event?.featuredImage?.relativeAddress
                        ? `${baseURL}/${row.event.featuredImage.relativeAddress}`
                        : img
                    }
                    alt={row?.event?.title || 'Event Image'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{row?.event?.title || 'N/A'}</span>
              </div>
            </td>
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
                      <ItemNotFound message="No Data  found." />
                    )}


                       <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
        <div className=" flex items-center gap-2 text-xs sm:text-sm text-[#313131]">
        <div>Show</div>
         <div className="w-fit h-[40px] ">
        <PageLimit totalpages={docsCount || 10} limit={limit} setLimit={setLimit}/>
        </div>
         <div>of {docsCount} results</div>

        </div>
          
               <TealPagination 
             totalPages={pages}
        currentPage={currentPage}
       setCurrentPage={setCurrentPage}
      />
      
                          
                                  
                                    
                          
                                    
                                    </div>

    
    </div>
  );
};

export default AppUserEventTable;
