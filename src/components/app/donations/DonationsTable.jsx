import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import Status from "../../global/Status";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import {useDispatch, useSelector } from "react-redux";

import SelectOption  from '../../../components/global/SelectOption';
import { baseURL } from '../../../config/api';
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'
import formatLabel   from '../../../utils/formatLabel'

import moment from 'moment/moment';



const DonationsTable = ({
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
}) => {


  const { docs , pages ,docsCount } = useSelector(state => state.donation);   



  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Donations</p>

      </div>

       {isLoading ? (
             <Loader />
           ) : isError ? (
             <DisplayError message={error?.message || "Something went wrong"} />
           ) : docs?.length > 0 ? (
         <div className="overflow-x-auto maintable">
          <table className="w-full mt-5  min-w-max md:min-w-full">
          <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
  <tr>

   <th className="px-3 py-4">
      <div className="flex items-center gap-1">
        Donor
      </div>
    </th>
      {/* <th className="px-3 py-4">
      <div className="flex items-center gap-1">
        Phone
      </div>
    </th> */}
      <th className="px-3 py-4">
      <div className="flex items-center gap-1">
        Email
      </div>
    </th>
    <th className="px-3 py-4 rounded-tl-[12px] rounded-bl-[12px]">
      <div className="flex items-center gap-1">
              Date & Time
      </div>
    </th>   


   <th className="px-3 py-4">
      <div className="flex items-center gap-1">
        Target Type
      </div>
    </th>
       <th className="px-3 py-4">
      <div className="flex items-center gap-1">
        Donation Type
      </div>
    </th>

    <th className="px-3 py-4">
      <div className="flex items-center gap-1">
        Amount
      </div>
    </th>
    <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">
      Status
    </th>
  </tr>
</thead>


          <tbody>
        {docs.map((item) => {
          const formattedDate = item?.createdAt
            ? moment(item.createdAt).format("MMM DD, YYYY hh:mm A")
            : "N/A";

          return (
            <tr key={item?._id} className="border-t">
              <td className="px-3 py-4">
                {item?.donorUser?.username || "Anonymous"}
              </td>

              {/* <td className="px-3 py-4">
                {item?.phone || "N/A"}
              </td> */}
                <td className="px-3 py-4">
                {item?.donorUser?.email || "N/A"}
              </td>
              <td className="px-3 py-4">
                {formattedDate}
              </td>

    
              

              <td className="px-3 py-4">
              
                
              {formatLabel(item?.targetType || "N/A")}
              </td>

              <td className="px-3 py-4">

              {formatLabel(item?.donationType || "N/A")}
              
              </td>

              <td className="px-3 py-4">
                {item?.amount ?? 0}
              </td>

              <td className="px-3 py-4">
                <Status status={item?.status} />
              </td>
            </tr>
          );
        })}
      </tbody>
          </table>
        </div>
    
    ) : (
                  <ItemNotFound message="No Donation found." />
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
                                      {/* Limit Dropdown */}
      
                          
                                  
                                    
                          
                                    
                                    </div>
    </div>
  );
};

export default DonationsTable;
