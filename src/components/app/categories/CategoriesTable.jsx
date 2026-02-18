
// import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
// import img from "../../../assets/images/img1.jpg";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit';
import TrashSvg  from '../../../assets/svgs/TrashSvg';
import EditSvg   from '../../../assets/svgs/EditSvg';
import Titlebtn  from '../../global/Titlebtn';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from "../../global/DisplayError";
import Loader from "../../global/Loader";
import devLog from '../../../utils/logsHelper';
import {delete_Category}  from '../../../redux/actions/categoryActions';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import confirmBox from '../../../utils/confirmBox';




const CategoriesTable = ( 

    currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
) => {

   const { docs, pages ,docsCount } = useSelector(state => state.category);

 const  navigate=useNavigate();

   const dispatch=useDispatch();
  const queryClient = useQueryClient();

//  devLog(' this is a  devLog  docs',docs)




 const handleDeleteCategory = async (id) => {
   const title = "Confirm Deletion";
   const message = "Are you sure you want to delete this Category?";
 
   const onYesClick = async () => {
     await dispatch(delete_Category(id, toast));
     queryClient.invalidateQueries(["fetch-all-categories"]);
   };
 
   confirmBox({ title, message, onYesClick });
 };




  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Categories</p>
    
                <Titlebtn label="Add New" url="/app/create-categories" />

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
                    <span>ID</span>
                  </div>
                </th>

                  <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Type</span>
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Title</span>
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
              {docs.map((row, ) => (
                <tr key={row?._id}>
                  <td className="px-3 py-4">{row?.longAutoIncrementId}</td>
                    <td className="px-3 py-4">{row?.type}</td>

      
                   <td className="px-3 py-4 whitespace-nowrap">
                        {row?.title}
                  </td>
               

                  <td className="px-3 py-4">
                      <div className="flex flex-row gap-1.5 items-center">
                      <div
                            onClick={() => navigate(`/app/update-categories/${row?._id}`)}
                      className="w-fit px-2.5 py-2.5 rounded-lg bg-cyan-Blue cursor-pointer"
                    >
                      <EditSvg/>
                    </div>
                  
                      <div     
                      onClick={() => handleDeleteCategory(row?._id)}

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
      ) : (
              <ItemNotFound message="No Category found." />
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

export default CategoriesTable;
