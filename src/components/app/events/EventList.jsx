import Search from '../../global/Search';
import Titlebtn from '../../global/Titlebtn';
import img from '../../../assets/images/img1.jpg';
import DotSvg from '../../../assets/svgs/DotSvg';
import { FaRegClock } from 'react-icons/fa';
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import { useNavigate } from 'react-router-dom';
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'
import { baseURL } from '../../../config/api';
import moment from 'moment/moment';
import TrashSvg   from '../../../assets/svgs/TrashSvg';
import EyetSVG from "../../../assets/svgs/EyetSVG";
// import devLog from '../../../utils/logsHelper';
import confirmBox from '../../../utils/confirmBox';
import {Add_Event} from '../../../redux/actions/eventActions';
import {useDispatch ,useSelector } from "react-redux";
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const EventList = ({
    keyword,
    setKeyword,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    isLoading,
    isError,
    error,
    detail,
        selectedIndex,
  setSelectedIndex,

}) => {
   const navigate=useNavigate()


   const { docs , pages ,docsCount, } = useSelector(state => state.event);
   
//  devLog(' this is a docs',docs)
    const dispatch=useDispatch();
  const queryClient = useQueryClient();

    const handleDeleteEvent = async (data) => {
        const title = "Confirm Deletion";
        const message = "Are you sure you want to delete this Event?";
      
        const onYesClick = async () => {
          await dispatch(Add_Event(data?._id, toast));
          queryClient.invalidateQueries(["fetch-all-event"]);
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
           <Titlebtn label={'Add New'} url='/app/create-events'  />
        </div>
     
      </div>

    
  <div className="flex flex-col gap-4 w-full">
  {isLoading ? (
    <Loader />
  ) : isError ? (
    <DisplayError message={error} />
  ) : docs && docs.length > 0 ? (
    docs.map((item, index) => {
  
  const daysLeft =
    item?.eventDate && moment(item?.eventDate).isAfter(moment())
      ? moment(item?.eventDate).diff(moment(), 'days')
      : 0;


      const progress = Math.min(
        Math.round((item.appliedMembers?.length || 0 / (item.totalMembers || 1)) * 100),
        100
      );



const capacity =item?.capacity;       
const registeredCount = item?.registeredCount; 

const isInfinite = capacity === null;

// Progress calculation
const progressPercent =
  !isInfinite && capacity > 0
    ? Math.min((registeredCount / capacity) * 100, 100)
    : 100;
  
      return (
        <div
          key={item?._id}
            onClick={() => setSelectedIndex(index)}

          className={`
            group py-3 px-3 rounded-2xl
            flex flex-col gap-2.5
            md:flex-row md:justify-between md:items-center
            transition-all duration-500
            hover:shadow-lg hover:shadow-black/10
            cursor-pointer
                ${index === selectedIndex && !detail ? 'bg-[#9BD6F6]/30' : 'bg-white'}

    
          `}
        >
          {/* Left */}
          <div className="flex gap-1.5">
            <div className="w-[116px] h-[70px] overflow-hidden rounded-[8px]">
             <img
              src={item.featuredImage?.relativeAddress ? `${baseURL}/${item?.featuredImage?.relativeAddress}` : img}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />

            </div>

            <div className="flex flex-col gap-1.5">
         
                 {
                  item.city && item.state  &&(
                    <div className="bg-black/10 w-fit text-xs px-3 py-1 rounded-md ">
                {item.city}, {item.state}
              </div>
                  )
                 }
            
               <div className='  md:max-w-[200px] '>
                 <p className="font-medium text-[13px] sm:text-sm">{item.title}</p>
               </div>
            

             {
              item.hostedBy?.title   && (
                    <div className="text-xs flex gap-1">
                <span className="text-[#94A7B5]">Organizer:</span>
                <span>{item.hostedBy?.title || 'N/A'}</span>
              </div>
              )
             }

             
            </div>
          </div>

          {/* Middle */}
          <div className="flex flex-col gap-2  md:border-l border-black/40   md:border-r  px-3">
            <p className="font-medium text-sm">Apply Member</p>

            <div className="w-full md:w-[214px] bg-[#B2BCC599] rounded-full h-2">
              <div
                className="bg-[#9BD6F6] h-2 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm">
                <span className="font-medium">{registeredCount}</span>
                <span className="text-xs text-black/60"> /{isInfinite ? '∞' : capacity}</span>
              </p>

              <div className="block xl:hidden flex items-center gap-1">
                <FaRegClock />
                <p className="text-xs">{daysLeft} <span className=' font-medium   text-black/80'> days left</span></p>   
              </div>
            </div>
          </div>


<div className="flex flex-row md:flex-col gap-2 justify-end md:justify-center items-end">
    {/* Eye button */}

    <div
      onClick={(e) => {
        e.stopPropagation(); 
        navigate(`/app/events/${item?._id}`);
      }}
      className="w-fit px-2.5 py-2.5 rounded-lg bg-[#E5D5E5] cursor-pointer"
    >
      <EyetSVG stroke="black" />
    </div>
                 <div
   onClick={(e) => {
    e.stopPropagation(); 
    handleDeleteEvent(item?._id); 
  }}
  className="px-2.5 py-2.5 rounded-lg bg-darkred/90 cursor-pointer block xl:hidden"
>
  <TrashSvg />
</div>


    
    
  </div>
          {/* Right */}
          {/* <div className="hidden md:flex flex-col gap-2">
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#E5D5E5] text-sm">
              <DotSvg />
              Active
            </span>

            <div className="flex items-center gap-1">
              <FaRegClock />
          <p className=" text-sm md:text-sm">{daysLeft}<span className=' font-medium   text-black/50'> days left</span></p>   

            </div>
          </div> */}
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

export default EventList;
