import { useNavigate } from 'react-router-dom';
import Search from '../../../components/global/Search';
import Titlebtn from '../../../components/global/Titlebtn';
import img from '../../../assets/images/programimg.png';
import DotSvg from '../../../assets/svgs/DotSvg';
import { FaRegClock } from 'react-icons/fa';
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'
// import devLog from '../../../utils/logsHelper';
import { baseURL } from '../../../config/api';
import EyetSVG from "../../../assets/svgs/EyetSVG";
import {delete_Programs} from '../../../redux/actions/programsAction';
import confirmBox from '../../../utils/confirmBox';
import {useDispatch ,useSelector } from "react-redux";

import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { RxCross1 } from "react-icons/rx";
import TrashSvg   from '../../../assets/svgs/TrashSvg';



const ProgramsList = ({
  keyword,
  setKeyword,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,detail,
    selectedIndex,
  setSelectedIndex
}) => {

  const navigate=useNavigate();

   const { docs , pages ,docsCount, } = useSelector(state => state.program);
     const dispatch=useDispatch();
  const queryClient = useQueryClient();
   
//  devLog(' this is a docs',docs)

const handleDeletePrograms = async (id) => {
        const title = "Confirm Deletion";
        const message = "Are you sure you want to delete this Program?";
      
        const onYesClick = async () => {
          await dispatch(delete_Programs(id, toast));
          queryClient.invalidateQueries(["fetch-all-program"]);
        };
      
        confirmBox({ title, message, onYesClick });
      };
      


  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-2  sm:flex-row sm:justify-between sm:items-center w-full">
        <div className=" w-full sm:w-[300px]  order-2 sm:order-1">
         <Search  keyword={keyword} setKeyword={setKeyword}/>
        </div>
        <div className=' flex justify-end order-1 sm:order-2'>
           <Titlebtn label={'Add New'} url='/app/create-programs'  />
        </div>
     
      </div>

    
  <div className="flex flex-col gap-4 w-full">
  {isLoading ? (
    <Loader />
  ) : isError ? (
    <DisplayError message={error} />
  ) : docs && docs.length > 0 ? (
    docs.map((item, index) => {
 

    

      return (
        <div
  key={item?._id}
  onClick={() => setSelectedIndex(index)}
  className={`
    group relative py-3 px-3 rounded-2xl
    flex gap-2.5 flex-row justify-between items-center
    transition-all duration-500
    hover:shadow-lg hover:shadow-black/10
    cursor-pointer
    ${index === selectedIndex && !detail ? 'bg-[#9BD6F6]/30' : 'bg-white'}
  `}
>

{/* <div
      onClick={(e) => {
        e.stopPropagation(); 
        setSelectedIndex(null); 
      }}
      className="absolute top-2 right-2 xl:hidden w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500 cursor-pointer"
    >
      <RxCross1 />
    </div> */}
  {/* Left */}
  <div className="flex items-center gap-1.5 ">
    <div className="w-[116px] h-[70px] overflow-hidden rounded-[8px]">
      <img
        src={item.featuredImage?.relativeAddress ? `${baseURL}/${item?.featuredImage?.relativeAddress}` : img}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
      />
    </div>

    <div className="flex flex-col gap-1.5">
      <div className="md:max-w-[200px]">
        <p className="font-medium text-[13px] sm:text-sm capitalize">{item?.title}</p>
      </div>
      {item?.piller && (
        <div className="bg-black/10 w-fit text-xs px-3 py-1 rounded-md">
          {item.piller.title}
        </div>
      )}
    </div>
  </div>

  {/* Right */}
  <div className="flex flex-col gap-2 items-end">
    {/* Eye button */}
    <div
      onClick={(e) => {
        e.stopPropagation(); // prevent selecting the card when clicking the eye
        navigate(`/app/Programs/${item?._id}`);
      }}
      className="w-fit px-2.5 py-2.5 rounded-lg bg-[#E5D5E5] cursor-pointer"
    >
      <EyetSVG stroke="black" />
    </div>
                 <div
  onClick={(e) => {
    e.stopPropagation(); 
    handleDeletePrograms(item?._id); 
  }}
  className="px-2.5 py-2.5 rounded-lg bg-darkred/90 cursor-pointer block xl:hidden"
>
  <TrashSvg />
</div>


    
    
  </div>
</div>

      );
    })
  ) : (
    <ItemNotFound message="No events found." />
  )}
</div>


 
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

export default ProgramsList;
