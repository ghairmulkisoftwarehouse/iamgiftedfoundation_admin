import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import Status from "../../global/Status";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit';
import TrashSvg  from '../../../assets/svgs/TrashSvg';
import EyetSVG from "../../../assets/svgs/EyetSVG";
import { useSelector } from "react-redux";
import devLog from "../../../utils/logsHelper";
// import { baseURL } from '../../../config/api';
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'
import { useNavigate } from "react-router-dom";
import SelectOption from "../../global/SelectOption";
import { baseURL } from "../../../config/api";
const AppUserTable = ({
  
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
  setSelectRole,

}) => {


  const { docs,pages ,docsCount} = useSelector(state => state.appUser);   
 devLog(' this is a docs',docs)

const naviagate=useNavigate();


const typeOptions = [ 'All', "Donor", "Participant", "Volunteer"];

  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">App User</p>
       <SelectOption
  title="Type"
  options={typeOptions}
  onSelect={setSelectRole}
/>

      </div>

    {isLoading ? (
        <Loader />
      ) : isError ? (
        <DisplayError message={error?.message || "Something went wrong"} />
      ) : docs?.length > 0 ? (
        <div className="overflow-x-auto maintable">
        
          <table className="w-full mt-5 min-w-max md:min-w-full">
            <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
              <tr>
                <th className="px-3 py-4 flex items-center gap-0.5 rounded-tl-[12px] rounded-bl-[12px]">
                  <div className="flex items-center gap-0.5">
                    <span>ID Code</span>
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Users</span>
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Type</span>
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Email</span>
                
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Create Date</span>
                  </div>
                </th>

                <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">
                  <div className="flex items-center gap-0.5">
                    <span>Action</span>
                   
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {docs.map((row, index) => (
                <tr key={row?._id}>
                  <td className="px-3 py-4">
                    {index+1}
                  </td>

                <td className="px-3 py-4 whitespace-nowrap ">
                    <div className="flex items-center gap-2">
                      <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                        <img
                            src={
                                        row?.image?.relativeAddress
                                             ? `${baseURL}/${row?.image?.relativeAddress}`
                                        : img
                                     }
                          alt="user avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    {row?.username}
                    </div>
                  </td>

                  <td className="px-3 py-4  ">
                         {row?.roles[0]}
                  </td>

                  <td className="px-3 py-4 whitespace-nowrap">
                            {row?.email}
                  </td>

                  <td className="px-3 py-4">
                   N/a
                 
                  </td>

                  <td className="px-3 py-4">
                      <div className="flex flex-row gap-1.5 items-center">

                    <div
                       onClick={()=>naviagate(`/app/app-user-profile/${row?._id}`)}
                      className="w-fit px-2.5 py-2.5 rounded-lg bg-primary cursor-pointer"
                    >
                      <EyetSVG />
                    </div>   
                      <div
                       
                        className="w-fit px-2.5 py-2.5 rounded-lg bg-darkred cursor-pointer"
                      >
                        <TrashSvg />
                      </div>
                 
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    ): (
              <ItemNotFound message="No App User found." />
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

export default AppUserTable;
