
import { useNavigate } from "react-router-dom";
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'
import TealPagination from '../../global/TealPagination';
import PageLimit from '../../global/PageLimit';
import { useSelector,useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import confirmBox from "../../../utils/confirmBox";
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import {Delete_Pillar} from '../../../redux/actions/pillarActions'
import DOMPurify from "dompurify";


const PillerList = ({
  currentPage,
  setCurrentPage,

  isLoading,
  isError,
  error
}) => {
  const  navigate= useNavigate();
         const { docs , pages ,docsCount, }= useSelector(state => state.piller);
     const   dispatch  =useDispatch();
  const queryClient = useQueryClient();

        //  console.log(' this is a  docs',docs)

const handleDeletePiller = async (data) => {
        const title = "Confirm Deletion";
        const message = "Are you sure you want to delete this Piller?";
      
        const onYesClick = async () => {
          await dispatch(Delete_Pillar(data?._id, toast));
          queryClient.invalidateQueries(["fetch-all-piller"]);
        };
      
        confirmBox({ title, message, onYesClick });
      };
      


  return (
    <div 
      className="relative flex flex-col gap-2 w-full  " >


      
            {isLoading ? (
        <Loader />
      ) : isError ? (
        <DisplayError message={error?.message || "Something went wrong"} />
      ) : docs?.length > 0 ? (

  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 cursor-pointer  ">
 
  {/* Pillar Cards */}
  {docs.map((item) => (
    <div
      key={item?._id} 
      className="border border-black/20 w-full flex flex-col gap-2 px-5 py-2.5 relative bg-white z-5 rounded-[20px] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-black/40 group"
    >

     <div className=" absolute top-2  right-4 flex gap-0.5">
    <button
  onClick={() => navigate(`/app/update-piller/${item._id}`)}
  className="text-gray-500 h-[30px] w-[30px] rounded-md hover:bg-primary/20 flex items-center justify-center cursor-pointer"
>
  <FaEdit />
</button>
          <button   
                     onClick={()=>handleDeletePiller(item)}
                  className="text-gray-500 h-[30px] w-[30px] rounded-md hover:text-red-500 hover:bg-primary/20 flex items-center justify-center  cursor-pointer"
                >
                <RxCross1/>
                </button>
  </div>
      {/* Title */}
      <h2 className="text-xl sm:text-[22px] lg:text-[25px] font-semibold pt-7">{item?.title}</h2>
      {/* Subtitle + Description */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[13px] xs:text-sm lg:text-[15px] font-semibold">{item?.subTitle}</h3>
        
           <div
           className="text-[#030F0CCC]/80 text-xs xs:text-xs lg:text-sm"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
     
    />
       
      </div>
      {/* Description 2 */}
      <div className="flex flex-col gap-1.5">

           <div
           className="text-[#030F0CCC]/80 text-xs xs:text-xs lg:text-sm"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description2) }}
     
    />
       
      </div>
      {/* Impact Info */}
      <div className="flex flex-row gap-4 mt-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{item?.impactSupportCount}</span>
          <span className="text-xs text-gray-500">Supporters</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">${item?.impactAmount}</span>
          <span className="text-xs text-gray-500">Funded</span>
        </div>
      </div>
      {/* Why Donors Support */}
      <div className="flex flex-col gap-0.5 pb-4 mt-2">
        <h2 className="text-[13px] xs:text-sm lg:text-[15px] font-semibold">Why Donors Support This</h2>
        <p className="text-[#030F0CCC]/80 text-xs xs:text-xs lg:text-sm">
            {item?.whyDonate}
        </p>
      </div>
    </div>
  ))}
</div>


      ): (
        <ItemNotFound message="No Piller found." />
      )}



          <div className="flex flex-row  justify-center w-full px-3 ">
     
          
               <TealPagination 
             totalPages={pages}
        currentPage={currentPage}
       setCurrentPage={setCurrentPage}
      />
                                      {/* Limit Dropdown */}
      
                          
                                  
                                    
                          
                                    
                                    </div>

    </div>
  )
}

export default PillerList;
