
import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import Status from "../../global/Status";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit';
import TrashSvg  from '../../../assets/svgs/TrashSvg';
import EyetSVG from "../../../assets/svgs/EyetSVG";
import EditSvg   from '../../../assets/svgs/EditSvg';
import Titlebtn  from '../../global/Titlebtn';
import { useDispatch, useSelector } from "react-redux";
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader from "../../global/Loader";
import moment from "moment";
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import confirmBox from '../../../utils/confirmBox';
import {delete_Post} from '../../../redux/actions/postActions'
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";




const PostTable = ({  currentPage,
         setCurrentPage,
            limit,
               setLimit,
     isLoading,
               isError,
                error,}) => {
    const { docs , pages ,docsCount, }= useSelector(state => state.post);


          const dispatch=useDispatch();
          const queryClient = useQueryClient();
    const navigate =useNavigate();



        const handleDeletePost = async (id) => {
          const title = "Confirm Deletion";
          const message = "Are you sure you want to delete this Post?";

          const onYesClick = async () => {
            await dispatch(delete_Post(id, toast));
            queryClient.invalidateQueries(["fetch-all-post"]);
          };

          confirmBox({ title, message, onYesClick });
        };


  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Post</p>
    
                <Titlebtn label="Add New" url="/app/create-posts" />

      </div>

  {isLoading ? (
         <Loader />
       ) : isError ? (
         <DisplayError message={error?.message || "Something went wrong"} />
       ) : docs?.length > 0 ? (
        <div className="overflow-x-auto maintable">
        
          <table className="w-full mt-5 min-w-max md:w-full">
            <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
              <tr>
                <th className="px-3 py-4 flex items-center gap-0.5 rounded-tl-[12px] rounded-bl-[12px]">
                  <div className="flex items-center gap-0.5">
                    <span>ID</span>
                  </div>
                </th>
                  <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>User</span>
                  </div>
                </th>
                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Title</span>
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Body</span>
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Likes Count</span>
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Comments Count</span>
                  </div>
                </th>
                  <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Featured</span>
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
              {docs.map((item, ) => (
                <tr key={item?._id}>
                  <td className="px-3 py-4">{item?.longAutoIncrementId}</td>

                <td className="px-3 py-4 whitespace-nowrap ">
                  {item?.user?.username}
                  </td>


                         <td className="px-3 py-4 whitespace-nowrap">
                                           {item?.title}

                      
                  </td>
               
                 <td className="px-3 py-4  break-words whitespace-normal  max-w-[250px]">

               <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.body) }}
     
    />
              </td>

               

                  <td className="px-3 py-4">
                   {item?.likesCount}
                  </td>
                      <td className="px-3 py-4  ">
                                         {item?.commentsCount}

                        
                  </td>

             
                 <td className="px-3 py-4  whitespace-normal">
  {item?.isFeatured ? (
    <div className="text-green-600 font-semibold">Featured</div>
  ) : (
    <div className="text-gray-400">Not Featured</div>
  )}
</td>


    <td className="px-3 py-4 whitespace-normal">
  {moment(item?.createdAt).format("DD MMM YYYY hh:mm a")}
</td>
               


                  <td className="px-3 py-4">
                      <div className="flex flex-row gap-1.5 items-center">

                 
                      <div
                        onClick={() =>
                      navigate(`/app/update-posts/${item?._id}`)
                    }
                      className="w-fit px-2.5 py-2.5 rounded-lg bg-cyan-Blue cursor-pointer"
                    >
                      <EditSvg/>
                    </div>
                    

                   
                      <div
                                            onClick={() => handleDeletePost(item?._id)}

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
           <ItemNotFound message="No Post found." />
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

export default PostTable;
