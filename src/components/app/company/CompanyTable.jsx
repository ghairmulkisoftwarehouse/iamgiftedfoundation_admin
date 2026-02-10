import img from "../../../assets/images/img1.jpg";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import Titlebtn  from '../../global/Titlebtn';
import TrashSvg  from '../../../assets/svgs/TrashSvg';
import EditSvg   from '../../../assets/svgs/EditSvg';
import {useDispatch, useSelector } from "react-redux";
import devLog from "../../../utils/logsHelper";
import { baseURL } from '../../../config/api';
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'
import {delete_Company} from '../../../redux/actions/companyActions'
import confirmBox from '../../../utils/confirmBox';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";






const CompanyTable = ({
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
}) => {

 

const { docs , pages ,docsCount } = useSelector(state => state.company);   
 devLog(' this is a docs',docs)
 const navigate = useNavigate(); 

   const dispatch=useDispatch();
   const queryClient = useQueryClient();



   const handleDeleteCompany = async (id) => {
  const title = "Confirm Deletion";
  const message = "Are you sure you want to delete this  Company?";

  const onYesClick = async () => {
    await dispatch(delete_Company(id, toast));
    queryClient.invalidateQueries(["fetch-all-company"]);
  };

  confirmBox({ title, message, onYesClick });
};


  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Company</p>
      <Titlebtn label="Add New" url="/app/create-company" />
        

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
                </div>
                </th>
                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">  
                   Logo
                </div>
               </th>
               
                <th className="px-3 py-4">
                 <div className="flex items-center gap-0.5">  
                  Title
                </div>
                 
                </th>
            
             
                <th className="px-3 py-4  rounded-tr-[12px] rounded-br-[12px]">
                 <div className="flex items-center gap-0.5">  
                  Action
                </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {docs.map((item,) => (
                <tr key={item?._id} className="border-t">
                  <td className="px-3 py-4">
                     {item?.longAutoIncrementId}
                  </td>

                  <td className="px-3 py-4  ">
                    <div className="flex items-center gap-2">
                      <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                                             <img
                                                src={
                                                              item?.logo?.relativeAddress
                                                                ? `${baseURL}/${item?.logo?.relativeAddress}`
                                                                : img
                                                            }
                                               alt="user avatar"
                                               className="w-full h-full object-cover"
                                             />
                                           </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                                      {item?.title}

                  </td>


                 

                  <td className="px-3 py-4 ">
                      <td className="px-3 py-4">
                <div className="flex gap-1.5 items-center">
                   <div
      onClick={() => navigate(`/app/update-company/${item?._id}`)}
      className="px-2.5 py-2.5 rounded-lg bg-cyan-Blue cursor-pointer"
    >
      <EditSvg />
    </div>

                  <div
                        onClick={() => handleDeleteCompany(item?._id)}
                    className="px-2.5 py-2.5 rounded-lg bg-darkred cursor-pointer"
                  >
                    <TrashSvg />
                  </div>
                </div>
              </td>
                  
                  </td>

                  

              
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
        ) : (
               <ItemNotFound message="No Company found." />
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

export default CompanyTable;
