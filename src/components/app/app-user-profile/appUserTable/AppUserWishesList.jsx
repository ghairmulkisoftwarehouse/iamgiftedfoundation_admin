import imgwish from '../../../../assets/images/wishes.png';
import { FaHeart } from "react-icons/fa";
import { LuReply } from "react-icons/lu";
import TealPagination   from '../../../global/TealPagination'
import PageLimit   from '../../../global/PageLimit'
import ItemNotFound   from '../../../../components/global/ItemNotFound';
import DisplayError from '../../../../components/global/DisplayError';
import Loader   from '../../../../components/global/Loader'
import { useSelector } from 'react-redux';
import img from "../../../../assets/images/img1.jpg";
import { baseURL } from '../../../../config/api';
import moment from 'moment';



const AppUserWishesList = (
   {
   currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
}
) => {

  const { docs , pages ,docsCount } = useSelector(state => state.post);  
  


  return (
    <div className="flex flex-col gap-4">
 

     {isLoading ? (
                 <Loader />
               ) : isError ? (
                 <DisplayError message={error?.message || "Something went wrong"} />
               ) : docs?.length > 0 ? (
      docs.map((item, ) => (
        <div
          key={item?._id}
          className="bg-white rounded-[8px] py-4 flex flex-col gap-3 px-3.5"
        >
          {/* Header */}
          <div className="flex flex-row gap-1.5">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
             <img
      src={
        item?.attachments?.length > 0
          ? `${baseURL}/${item.attachments[0].relativeAddress}`
          : img // fallback image
      }
      alt="post image"
      className="w-full h-full object-cover"
    />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[15px] font-medium">{item?.title}</h2>
  <p className="text-black/60 text-xs">
      {item?.createdAt ? moment(item.createdAt).fromNow() : 'N/A'}
    </p>            </div>
          </div>

          {/* Message */}
          <div>
            <p className="text-black/80 text-xs break-words whitespace-normal">
               {item?.body}  
            </p>
          </div>

          {/* Likes info */}
          <div className="text-xs  pb-3.5">
            <span className="font-medium">{item?.likesCount} people</span>{" "}
            <span className="text-black/70">liked this Post</span>
          </div>

          {/* Actions */}
          {/* <div className="flex justify-between w-full">
            <div className="flex items-center gap-1">
              <span className="text-[#B22222]">
                <FaHeart />
              </span>
              <span className="text-xs"> Liked</span>
            </div>

         
          </div> */}
        </div>
     ))
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
      
                          
                                  
                                    
                          
                                    
                                    </div>
    </div>
  );
};

export default AppUserWishesList;
