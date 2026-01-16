import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import Status from "../../global/Status";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import { useSelector } from "react-redux";
import devLog from "../../../utils/logsHelper";
import { baseURL } from '../../../config/api';
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'

const CommunityTable = ({

  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
}) => {

const { docs , pages ,docsCount } = useSelector(state => state.post);   
 devLog(' this is a docs',docs)


  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Community</p>
        

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
                <th className="px-3 py-4 rounded-tl-[12px] rounded-bl-[12px]">
                     <div className="flex items-center gap-0.5">  
                   ID 
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">  
                   User
               <ArrowTopSvg/>
                </div>
               </th>
                <th className="px-3 py-4">
                 <div className="flex items-center gap-0.5">  
                  Image
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4">
                 <div className="flex items-center gap-0.5">  
                  Title
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4  rounded-tr-[12px] rounded-br-[12px]">
                 <div className="flex items-center gap-0.5">  
                  Description
               <ArrowTopSvg/>
                </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {docs.map((row, ) => (
                <tr key={row?._id} className="border-t">
                  <td className="px-3 py-4">{row?.longAutoIncrementId}</td>

                  <td className="px-3 py-4  ">
                    <div className="flex items-center gap-2">
                      <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                                             <img
                                               src={img}
                                               alt="user avatar"
                                               className="w-full h-full object-cover"
                                             />
                                           </div>
                      {row?.user?.username}
                    </div>
                  </td>

                  <td className="px-3 py-4">
                     <div className="w-[43px] h-[43px] overflow-hidden rounded-full">
                                            <img
                                              src={
                                                row?.attachments[0]?.relativeAddress
                                                  ? `${baseURL}/${row.attachments[0].relativeAddress}`
                                                  : img
                                              }
                                              alt="user avatar"
                                              className="w-full h-full object-cover"
                                            />
                                           </div>

                                           
                  </td>

                  <td className="px-3 py-4 ">
                    {row.title}
                  </td>
                  <td className="px-3 py-4 break-words  whitespace-normal  max-w-[280px]">
                  <span className="text-black/65">{row.body}</span>
                    
                  </td>

                  

              
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : (
          <ItemNotFound message="No Community found." />
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

export default CommunityTable;
